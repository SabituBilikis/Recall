// Account deletion (Google Play policy: apps with account creation must let users
// delete their account + data in-app). Deletes the caller's storage objects, then
// the auth.users row — every app table FKs auth.users ON DELETE CASCADE, so all
// owned data (items, collections, tags, favorites, files, notifications, profile)
// is removed automatically. verify_jwt is enabled, so the caller is authenticated.

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

  // Remove owner-namespaced storage objects (buckets keep "<user_id>/..." prefixes).
  for (const bucket of ["avatars", "item-files"]) {
    const { data: objects } = await admin.storage.from(bucket).list(user.id);
    if (objects && objects.length > 0) {
      await admin.storage.from(bucket).remove(objects.map((o) => `${user.id}/${o.name}`));
    }
  }

  // Delete the auth user → cascades every owned row across the schema.
  const { error: delErr } = await admin.auth.admin.deleteUser(user.id);
  if (delErr) {
    return json({ error: delErr.message }, 500);
  }

  return json({ ok: true }, 200);
});
