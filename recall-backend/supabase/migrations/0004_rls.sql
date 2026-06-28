-- Row-Level Security: the real authorization. Owner-only on every table.
-- Enabled BEFORE any data flows. JWT's auth.uid() is the tenant key.

alter table public.profiles        enable row level security;
alter table public.collections     enable row level security;
alter table public.saved_items     enable row level security;
alter table public.files           enable row level security;
alter table public.tags            enable row level security;
alter table public.saved_item_tags enable row level security;
alter table public.favorites       enable row level security;

-- profiles: a user sees/edits only their own row (no insert — the signup trigger does it).
create policy "profiles_select_own" on public.profiles
  for select using (id = auth.uid());
create policy "profiles_update_own" on public.profiles
  for update using (id = auth.uid()) with check (id = auth.uid());

-- Generic owner policies for the user_id-owned tables.
create policy "collections_all_own" on public.collections
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "saved_items_all_own" on public.saved_items
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "files_all_own" on public.files
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "tags_all_own" on public.tags
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "saved_item_tags_all_own" on public.saved_item_tags
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "favorites_all_own" on public.favorites
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());
