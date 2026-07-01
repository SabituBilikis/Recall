# Release & OTA Guide — Recall (Android)

How to build, version, ship, and update Recall on the Play Store. Keep this the
single source of truth for the release path.

## Versioning

- **`version`** (`app.json` → `expo.version`, e.g. `1.0.0`) — the user-facing marketing
  version. Bump per release (semver).
- **`versionCode`** (Android build number) — **managed by EAS**, not hardcoded. `eas.json`
  sets `cli.appVersionSource: "remote"` and the `production` profile sets
  `autoIncrement: true`, so every production build gets a unique, monotonically increasing
  `versionCode`. **Do not** set `android.versionCode` in `app.json` — it would fight the
  remote source and risk a duplicate-code rejection from Play.
- **Rule:** production Play uploads must come from `eas build --profile production`. Local
  `gradlew`/`assembleRelease` builds default to `versionCode 1` and must never be uploaded
  to Play (they're for local size/behaviour testing only).

## Build commands

```bash
# Production (Play Store) — AAB, auto-incrementing versionCode, minified (R8) + shrunk
eas build --platform android --profile production

# Preview (internal device testing) — APK, arm64-only, ~26MB
eas build --platform android --profile preview

# Submit the latest production build to Play
eas submit --platform android --profile production
```

Build config already applied (see `app.json` `expo-build-properties` + `eas.json`):
R8 minify, resource shrinking, legacy `.so` packaging; preview is arm64-only via
`gradleCommand`. Production AAB is per-ABI split automatically by Play.

## OTA updates (`expo-updates`) — channel discipline

`app.json` sets `updates.url` and `runtimeVersion.policy: "appVersion"`. Implications:

- **`runtimeVersion` = the app version.** An OTA update only reaches installs whose native
  runtime matches. **Any change that touches native code / SDK / a new native module
  requires a new store build** — you cannot OTA it. Bump `version` and rebuild in that case.
- **Channels map to build profiles.** `eas.json` sets `channel: "preview"` and
  `channel: "production"`. Publish updates to the matching channel:

```bash
# Ship a JS-only fix to internal testers first
eas update --branch preview --message "fix: ..."

# Promote to production ONLY after verifying on the preview channel
eas update --branch production --message "fix: ..."
```

- **Discipline:** never `eas update --branch production` as the first step. Publish to
  `preview`, verify on a device, then promote. A bad production update reaches all users
  instantly.
- **Rollback:** republish the previous known-good commit to the production branch, or use
  `eas update --branch production --republish` to roll back to a prior update.

## Pre-submission checklist

Blockers still open (see the audit / `Priority Fix List`):

- [x] **Account deletion** (Play policy) — in-app flow (Profile → Delete Account) +
      `delete-account` edge function (deployed). **Still TODO:** host a public web
      **account-deletion URL** and declare it in the Play Data Safety form (Play requires a
      web deletion path in addition to the in-app one).
- [ ] **Crash reporting** wired (Sentry/Crashlytics) into the `reportError` seam in
      `src/components/ui/error-boundary.tsx`.
- [ ] **Analytics** events implemented (PRD §32).
- [ ] **Terms URL** set — `src/features/auth/constants/signup-content.ts` `termsUrl` is a
      placeholder (`https://recall.app/terms`); point to the real hosted page.
- [ ] **Privacy Policy** URL hosted + entered in the Play listing.
- [ ] **Accessibility** device pass — TalkBack sweep, contrast, 200% font scaling.
- [ ] Leaked-password protection enabled (Supabase → Auth → Policies).

Release config (done / verify):

- [x] Production build is AAB with `autoIncrement` versionCode.
- [x] R8 + resource shrink + legacy packaging enabled.
- [x] `RECORD_AUDIO` permission removed; only photo access (image picker) declared.
- [x] Root `ErrorBoundary` in place; console stripped in prod builds.
- [ ] Data Safety form completed (auth + photos only).
- [ ] Store listing, screenshots, content rating, target-audience declaration.
- [ ] `npm run typecheck` and `npm test` green.

## Secrets

- The only client key is the Supabase **publishable** key (safe to ship; RLS is the real
  authorization). It lives in `eas.json` build profiles / `.env` (gitignored).
- If any Supabase **access token** or DB password was ever pasted into a chat/log, rotate it
  in the Supabase dashboard.
