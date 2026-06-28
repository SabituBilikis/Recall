# Recall — Go-Live Runbook

End-to-end production checklist. Order matters. Steps marked **[you]** need your
accounts/credentials; **[run]** are commands once the prerequisite is met. Nothing here
has been executed — the repo only carries the config prep (see "Prepared already").

## Prepared already (in repo)
- `recall-backend/supabase/config.toml` → `enable_confirmations = true` (email verify on).
- `.env.example` → hosted URL + publishable key + `EXPO_PUBLIC_USE_BACKEND=true`.
- Backend is deploy-ready: 11 ordered migrations, `link-preview` edge fn (self-contained,
  JWT-gated, in-memory rate limit — no extra secrets), RLS on every table.

## 0. Install tooling (one time)
- [you] Supabase CLI, EAS CLI: `npm i -g supabase eas-cli` (Docker already present).
- [run] `supabase login` · `eas login`.

## 1. Hosted Supabase
1. [you] supabase.com → New project → save **project-ref**, **DB password**, region.
2. [run] from `recall-backend/`:
   ```bash
   supabase link --project-ref <ref>
   supabase db push            # applies migrations/0001..0011 in order
   supabase functions deploy link-preview
   ```
3. [run] regen types against hosted, commit:
   ```bash
   npm run gen:types
   ```
4. [you] Dashboard → Storage: confirm `item-files` + `avatars` buckets exist (created by
   migrations 0005/0008); file size limit 20 MiB.

## 2. Auth config (hosted)
5. [run] push config (confirmations + redirect URLs):
   ```bash
   supabase config push        # carries enable_confirmations=true, site_url, redirects
   ```
   (Or set in Dashboard → Auth: enable email confirmations; Site URL `recall://`;
   Redirect URLs `recall://`, `exp://`.)
6. [you] Auth → Email templates: confirm sender/branding. Confirmation link must deep-link
   back (`recall://`). Test one signup end-to-end before launch.

## 3. Google OAuth  (guide: recall-backend/GOOGLE_OAUTH.md)
7. [you] Google Cloud → OAuth client (Web). Authorized redirect URI:
   `https://<ref>.supabase.co/auth/v1/callback`. Copy client id + secret.
8. [you] Supabase Dashboard → Auth → Providers → Google: paste id + secret, enable.
   (config.toml references `env(SUPABASE_AUTH_GOOGLE_CLIENT_ID/SECRET)` for CLI flow —
   set those as project secrets if pushing via CLI instead of Dashboard.)

## 4. App config + build
9. [you] create `.env` from `.env.example` with the **hosted** URL + publishable key,
   `EXPO_PUBLIC_USE_BACKEND=true`.
10. [run] sanity: `npm run typecheck` · `npm run lint`.
11. [you] EAS: Apple Developer ($99/yr) + Google Play ($25 one-time) accounts.
12. [run] `eas build --platform all --profile production` → then `eas submit` (or upload
    the binaries manually).

## 5. Store listings
13. [you] App Store Connect + Play Console: app name, description (from PRD), privacy
    policy URL, category.
14. [you] Screenshots — export the frames from the Figma "App Store Screenshots" page
    (bold or soft set) as PNG: iOS 1290×2796, Android 1080×1920. Upload.

## 6. Pre-launch verification (on the production build)
- Signup → receive confirmation email → confirm → login. Session persists across cold
  restart (encrypted).
- Save each type (note/link/file/screenshot) → no logout; appears in Home + Search.
- Create collection → saves (UUID fix), list renders, no crash.
- Storage screen + Profile % reflect real usage; update live after a save.
- Google sign-in round-trips.
- Offline: create note offline → reconnect → replays once (no dupes).

## Rollback / safety
- Migrations are additive + ordered; never edit an applied one — fix forward with a new
  migration. `supabase db push` is forward-only.
- Service-role key stays in the project/CI — never in the app or this repo.
- Keep `enable_confirmations = true` in prod. Only flip false for isolated local dev.

## Still out of scope (post-launch)
- Device push notifications, Tags UI (needs Figma), web dashboard, browser extension.
