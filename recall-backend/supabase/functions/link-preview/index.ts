// Edge function: fetch a URL server-side and extract Open Graph / meta tags.
// Runs server-side to dodge mobile CORS and keep the client thin. Auth-gated by
// the platform (verify_jwt default); returns { title, description, image, url }.

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

const FETCH_TIMEOUT_MS = 6000;
const MAX_BYTES = 512 * 1024; // Only need the <head>; cap the download.
const MAX_REDIRECTS = 3;

// Best-effort per-caller rate limit. In-memory (per edge instance) — a sliding
// window that throttles abusive fetch volume; not a hard global guarantee.
const RATE_MAX = 20;
const RATE_WINDOW_MS = 60_000;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > RATE_MAX;
}

// Caller id from the (platform-verified) JWT sub claim; falls back to a constant.
function callerKey(req: Request): string {
  const auth = req.headers.get("authorization") ?? "";
  const token = auth.replace(/^Bearer\s+/i, "");
  try {
    const payload = JSON.parse(atob(token.split(".")[1] ?? ""));
    return typeof payload.sub === "string" ? payload.sub : "anon";
  } catch {
    return "anon";
  }
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" }
  });
}

function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}

// Pull a meta tag's content by property/name, order-independent on attributes.
function metaContent(html: string, key: string): string | null {
  const attr = `(?:property|name)=["']${key}["']`;
  const patterns = [
    new RegExp(`<meta[^>]*${attr}[^>]*content=["']([^"']*)["']`, "i"),
    new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*${attr}`, "i")
  ];
  for (const re of patterns) {
    const match = re.exec(html);
    if (match?.[1]) {
      return decodeEntities(match[1]);
    }
  }
  return null;
}

function titleTag(html: string): string | null {
  const match = /<title[^>]*>([^<]*)<\/title>/i.exec(html);
  return match?.[1] ? decodeEntities(match[1]) : null;
}

// SSRF guard: reject internal/private/loopback/link-local targets so the
// function can't be used to probe the cluster's internal network or cloud
// metadata. Covers literal IPs + common internal hostnames (DNS-rebinding to a
// private IP remains a residual risk in the edge runtime).
function isBlockedHost(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (host === "localhost" || host.endsWith(".local") || host.endsWith(".internal")) {
    return true;
  }
  if (host === "::1" || host.startsWith("fc") || host.startsWith("fd") || host.startsWith("fe80")) {
    return true; // IPv6 loopback / ULA / link-local
  }
  const v4 = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (v4) {
    const [a, b] = [Number(v4[1]), Number(v4[2])];
    if (a === 10 || a === 127 || a === 0) return true;
    if (a === 192 && b === 168) return true;
    if (a === 169 && b === 254) return true; // link-local + cloud metadata
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT
  }
  return false;
}

function absoluteUrl(image: string | null, base: string): string | null {
  if (!image) {
    return null;
  }
  try {
    return new URL(image, base).toString();
  } catch {
    return null;
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS });
  }
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }
  if (rateLimited(callerKey(req))) {
    return json({ error: "Too many requests" }, 429);
  }

  let url: string;
  try {
    url = (await req.json()).url;
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return json({ error: "Unsupported protocol" }, 400);
    }
    if (isBlockedHost(parsed.hostname)) {
      return json({ error: "Blocked host" }, 400);
    }
  } catch {
    return json({ error: "Invalid url" }, 400);
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    // Follow redirects manually, re-validating each hop's host so a redirect
    // can't bounce the request to an internal/private target (SSRF).
    let current = url;
    let res: Response | null = null;
    for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
      res = await fetch(current, {
        signal: controller.signal,
        redirect: "manual",
        headers: { "User-Agent": "RecallLinkPreview/1.0", Accept: "text/html" }
      });
      if (res.status < 300 || res.status >= 400) {
        break;
      }
      const location = res.headers.get("location");
      if (!location) {
        break;
      }
      const next = new URL(location, current);
      if ((next.protocol !== "http:" && next.protocol !== "https:") || isBlockedHost(next.hostname)) {
        return json({ error: "Blocked redirect" }, 400);
      }
      void res.body?.cancel();
      current = next.toString();
    }
    if (!res || !res.ok || !res.body) {
      return json({ error: `Upstream ${res?.status ?? "error"}` }, 502);
    }

    // Read up to MAX_BYTES — the <head> carries the metadata.
    const reader = res.body.getReader();
    const chunks: Uint8Array[] = [];
    let total = 0;
    while (total < MAX_BYTES) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      chunks.push(value);
      total += value.length;
      if (/<\/head>/i.test(new TextDecoder().decode(value))) {
        break;
      }
    }
    void reader.cancel();
    const html = new TextDecoder().decode(await new Blob(chunks).arrayBuffer());

    const title = metaContent(html, "og:title") ?? titleTag(html) ?? new URL(url).hostname;
    const description =
      metaContent(html, "og:description") ?? metaContent(html, "description") ?? "";
    const image = absoluteUrl(metaContent(html, "og:image") ?? metaContent(html, "twitter:image"), url);

    return json({ title, description, image, url });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "fetch failed" }, 502);
  } finally {
    clearTimeout(timer);
  }
});
