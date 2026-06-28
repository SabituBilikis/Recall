# Google sign-in setup

The app side is wired (PKCE + `expo-web-browser` redirect → `recall://auth-callback`). What's left is
provider configuration, which needs **your** Google Cloud credentials.

## ⚠️ Local stack won't work with Google

Google only allows redirect URIs that are `https://…` or `http://localhost`. The local Supabase runs at
`http://10.193.248.210:54321` (a private LAN IP) → Google rejects it. So Google sign-in needs **one of**:

- a **hosted Supabase project** (`https://<ref>.supabase.co`) — recommended, or
- a public HTTPS tunnel to the local stack (e.g. `ngrok http 54321`) used as the Supabase URL.

Email/password works locally already; only Google needs the above.

## 1. Google Cloud — create an OAuth client

1. Google Cloud Console → APIs & Services → Credentials → **Create OAuth client ID** → type **Web application**.
2. **Authorized redirect URI** = your Supabase callback:
   - hosted: `https://<project-ref>.supabase.co/auth/v1/callback`
   - tunnel: `https://<your-tunnel>.ngrok.io/auth/v1/callback`
3. Copy the **Client ID** and **Client secret**.

## 2. Give the creds to Supabase

**Hosted:** Dashboard → Authentication → Providers → **Google** → enable, paste Client ID + Secret. Under
URL Configuration add `recall://` to the redirect allow-list.

**Local/tunnel (CLI):** export the creds, then restart the stack so `config.toml` picks them up:

```bash
export SUPABASE_AUTH_GOOGLE_CLIENT_ID="...apps.googleusercontent.com"
export SUPABASE_AUTH_GOOGLE_SECRET="..."
npx supabase stop && npx supabase start
```

(`config.toml` already references these env vars and allows the `recall://` redirect.)

## 3. Point the app at that backend

In the app's `.env`:

```
EXPO_PUBLIC_SUPABASE_URL=<hosted or tunnel URL>
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<that project's publishable/anon key>
EXPO_PUBLIC_USE_BACKEND=true
```

Restart Metro with `--clear` after changing `.env`. Tap **Continue with Google** → in-app browser → Google
consent → back to the app, signed in (session persisted).

## Troubleshooting

- "redirect_uri_mismatch" → the URI in Google must **exactly** match `<SUPABASE_URL>/auth/v1/callback`.
- Browser opens then nothing → app scheme must be `recall` (it is, in `app.json`) and the dev client
  rebuilt after adding `expo-web-browser`.
- Works on web but not device → you're on the local LAN IP; use hosted/tunnel (see top).
