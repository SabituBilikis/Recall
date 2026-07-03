// Account deletion (Google Play policy: apps with account creation must let users
// delete their account + data in-app). Order matters: delete the auth user FIRST —
// every app table FKs auth.users ON DELETE CASCADE, so all owned rows (items,
// collections, tags, favorites, files, notifications, profile) go atomically with
// it. Storage objects are cleaned up after, best-effort with pagination; a partial
// storage failure can never leave a live account missing its files (the account is
// already gone), and leftovers are logged for a sweep. verify_jwt is enabled.

import { createClient } from "jsr:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type"
};

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" }
  });
}

// Remove every object under "<userId>/" in a bucket. list() pages at most 1000
// rows per call, so loop until a page comes back short.
async function removeUserObjects(
  admin: ReturnType<typeof createClient>,
  bucket: string,
  userId: string
): Promise<void> {
  const PAGE = 1000;
  for (;;) {
    // Always request offset 0: each remove() shrinks the listing, so the next
    // page of survivors starts at the top.
    const { data: objects, error } = await admin.storage.from(bucket).list(userId, { limit: PAGE });
    if (error) {
      console.error(`[delete-account] list failed for ${bucket}/${userId}:`, error.message);
      return;
    }
    if (!objects || objects.length === 0) {
      return;
    }
    const paths = objects.map((o) => `${userId}/${o.name}`);
    const { error: removeError } = await admin.storage.from(bucket).remove(paths);
    if (removeError) {
      console.error(`[delete-account] remove failed for ${bucket}/${userId}:`, removeError.message);
      return;
    }
    if (objects.length < PAGE) {
      return;
    }
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return json({ error: "Missing authorization" }, 401);
  }

  const url = Deno.env.get("SUPABASE_URL")!;
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  // Identify the caller from their JWT.
  const caller = createClient(url, anonKey, { global: { headers: { Authorization: authHeader } } });
  const { data: { user }, error: userErr } = await caller.auth.getUser();
  if (userErr || !user) {
    return json({ error: "Not authenticated" }, 401);
  }

  const admin = createClient(url, serviceKey);

  // 1. Delete the auth user → cascades every owned row across the schema. If this
  //    fails, nothing has been touched — the caller can retry safely.
  const { error: delErr } = await admin.auth.admin.deleteUser(user.id);
  if (delErr) {
    return json({ error: delErr.message }, 500);
  }

  // 2. Best-effort storage cleanup (paginated, all owner-namespaced buckets).
  //    Failures are logged for a manual sweep; the account itself is already gone.
  for (const bucket of ["avatars", "item-files"]) {
    await removeUserObjects(admin, bucket, user.id);
  }

  return json({ ok: true }, 200);
});
