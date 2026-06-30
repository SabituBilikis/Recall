-- Core schema. Conventions: uuid PK (client may supply for idempotency),
-- user_id owner FK, created_at/updated_at (trigger-maintained), deleted_at
-- soft-delete (powers Archive + sync tombstones).

-- 1:1 with auth.users. Holds profile fields the app shows.
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  first_name text not null default '',
  last_name text not null default '',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.collections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null check (char_length(name) between 2 and 120),
  description text not null default '',
  color public.collection_color not null default 'purple',
  icon public.collection_icon not null default 'folder',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table public.saved_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  type public.saved_item_type not null,
  title text not null default '',
  description text not null default '',
  content text not null default '',          -- note body
  url text,                                   -- link
  file_type text,                             -- "PNG" | "PDF" …
  collection_id uuid references public.collections (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,                      -- archive / tombstone
  -- Full-text search vector — generated, indexed in 0003.
  fts tsvector generated always as (
    to_tsvector(
      'english',
      coalesce(title, '') || ' ' || coalesce(description, '') || ' ' ||
      coalesce(url, '') || ' ' || coalesce(content, '')
    )
  ) stored
);

-- Uploaded file metadata; the binary lives in Storage at storage_path.
create table public.files (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  saved_item_id uuid not null references public.saved_items (id) on delete cascade,
  storage_path text not null,                 -- "<user_id>/<uuid>.<ext>"
  file_name text not null,
  mime_type text,
  size_bytes bigint,
  created_at timestamptz not null default now()
);

create table public.tags (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null check (char_length(name) between 1 and 60),
  created_at timestamptz not null default now(),
  unique (user_id, name)
);

create table public.saved_item_tags (
  saved_item_id uuid not null references public.saved_items (id) on delete cascade,
  tag_id uuid not null references public.tags (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  primary key (saved_item_id, tag_id)
);

create table public.favorites (
  user_id uuid not null references auth.users (id) on delete cascade,
  saved_item_id uuid not null references public.saved_items (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, saved_item_id)
);

-- updated_at auto-touch on every table that has it.
create trigger trg_profiles_updated before update on public.profiles
  for each row execute function extensions.moddatetime (updated_at);
create trigger trg_collections_updated before update on public.collections
  for each row execute function extensions.moddatetime (updated_at);
create trigger trg_saved_items_updated before update on public.saved_items
  for each row execute function extensions.moddatetime (updated_at);

-- Auto-create a profile row when a user signs up.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, first_name, last_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'first_name', ''),
    coalesce(new.raw_user_meta_data ->> 'last_name', ''),
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

create trigger trg_on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Item counts per collection (active items only). Read-side convenience.
-- security_invoker: the view runs with the querying user's permissions + RLS,
-- so a user only ever sees counts for their own collections (never SECURITY DEFINER).
create view public.collection_item_counts
  with (security_invoker = true) as
  select collection_id, count(*)::int as item_count
  from public.saved_items
  where deleted_at is null and collection_id is not null
  group by collection_id;
