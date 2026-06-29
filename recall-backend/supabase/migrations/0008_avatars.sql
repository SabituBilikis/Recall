-- Public avatars bucket. Objects are namespaced by user id ("<user_id>/avatar.<ext>");
-- write policies enforce that prefix = the owner. Public read so the avatar URL
-- renders directly (avatars are low-sensitivity, owner-namespaced).

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'avatars',
  'avatars',
  true,
  20971520, -- 20 MiB
  null -- accept any image type; the picker only yields images and paths are owner-namespaced
)
on conflict (id) do nothing;

-- The first path segment must equal the user's id. Owner SELECT lets the client's
-- upsert read existing object metadata; public read is served separately.
create policy "avatars_select_own" on storage.objects
  for select using (
    bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text
  );
create policy "avatars_insert_own" on storage.objects
  for insert with check (
    bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text
  );
create policy "avatars_update_own" on storage.objects
  for update using (
    bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text
  );
create policy "avatars_delete_own" on storage.objects
  for delete using (
    bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text
  );
