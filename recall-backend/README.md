# recall-backend

Supabase backend for Recall — Postgres + Auth + Storage + Edge Functions. Lives in this repo but is
**fully independent** of the app: the frontend talks to it only over HTTPS (PostgREST / RPC / Storage /
Auth), and the only shared artifact is the generated type file.

## Layout

```
supabase/
  config.toml        local stack config
  migrations/        SQL, applied in order
    0001 extensions + enums
    0002 tables, triggers (updated_at, profile-on-signup), FTS column, counts view
    0003 indexes (owner/recency, collection, GIN FTS, FKs)
    0004 RLS (owner-only on every table)
    0005 storage bucket + path-prefix policies
    0006 RPCs: search_saved_items, save_item_with_file, archive_saved_item
  seed.sql           dev-only sample data
  functions/         Edge Functions (Deno) — add trusted/server-only logic here
  tests/             pgTAP / RLS policy tests
```

## Prerequisites (not installed yet)

- [Supabase CLI](https://supabase.com/docs/guides/cli) + Docker Desktop (for the local stack).

## Run locally

```bash
cd recall-backend
supabase start            # boots Postgres + Auth + Storage + Studio
supabase db reset         # applies migrations/ then seed.sql
npm run gen:types         # regenerate ../src/services/generated/database.types.ts
```

`supabase start` prints the local **API URL** and **anon key** — put them in the app's `.env` as
`EXPO_PUBLIC_SUPABASE_URL` / `EXPO_PUBLIC_SUPABASE_ANON_KEY`.

## Deploy (later)

```bash
supabase link --project-ref <ref>
supabase db push
supabase functions deploy
```

## Rules

- **service-role key never leaves this project / CI.** The app only ever uses the anon key + RLS.
- Schema changes = a new migration file. Never edit applied migrations.
- After any schema change, rerun `gen:types` so the app's contract stays in sync.
