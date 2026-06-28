-- Private bucket for uploaded item files. Objects are namespaced by user id
-- ("<user_id>/<uuid>.<ext>"); policies enforce that prefix = the owner.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'item-files',
  'item-files',
  false,
  20971520, -- 20 MiB
  array['image/png','image/jpeg','image/webp','application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain']
)
on conflict (id) do nothing;

-- The first path segment must equal the user's id.
create policy "item_files_select_own" on storage.objects
  for select using (
    bucket_id = 'item-files' and (storage.foldername(name))[1] = auth.uid()::text
  );
create policy "item_files_insert_own" on storage.objects
  for insert with check (
    bucket_id = 'item-files' and (storage.foldername(name))[1] = auth.uid()::text
  );
create policy "item_files_update_own" on storage.objects
  for update using (
    bucket_id = 'item-files' and (storage.foldername(name))[1] = auth.uid()::text
  );
create policy "item_files_delete_own" on storage.objects
  for delete using (
    bucket_id = 'item-files' and (storage.foldername(name))[1] = auth.uid()::text
  );
