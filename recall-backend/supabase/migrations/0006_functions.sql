-- RPCs for logic that shouldn't be a raw client query: full-text search and
-- the atomic file+item save (so an upload never leaves an orphan row).
-- All run with the caller's auth (security invoker) → RLS still applies.

-- Ranked, owner-scoped search across title/description/url/content/filename.
-- Mirrors the frontend's searchItems util scope.
create function public.search_saved_items(query text)
returns setof public.saved_items
language sql
stable
security invoker
set search_path = public
as $$
  select si.*
  from public.saved_items si
  left join public.files f on f.saved_item_id = si.id
  where si.user_id = auth.uid()
    and si.deleted_at is null
    and (
      si.fts @@ websearch_to_tsquery('english', query)
      or coalesce(f.file_name, '') ilike '%' || query || '%'
    )
  order by ts_rank(si.fts, websearch_to_tsquery('english', query)) desc,
           si.created_at desc;
$$;

-- Create a saved_item and its file row in one transaction. The binary is
-- uploaded to Storage first; this just records the metadata atomically.
create function public.save_item_with_file(
  p_type public.saved_item_type,
  p_title text,
  p_storage_path text,
  p_file_name text,
  p_collection_id uuid default null,
  p_mime_type text default null,
  p_size_bytes bigint default null,
  p_file_type text default null
)
returns public.saved_items
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_item public.saved_items;
begin
  insert into public.saved_items (user_id, type, title, collection_id, file_type)
  values (auth.uid(), p_type, p_title, p_collection_id, p_file_type)
  returning * into v_item;

  insert into public.files (user_id, saved_item_id, storage_path, file_name, mime_type, size_bytes)
  values (auth.uid(), v_item.id, p_storage_path, p_file_name, p_mime_type, p_size_bytes);

  return v_item;
end;
$$;

-- Soft delete (archive / tombstone) — keeps the row for sync, hides it from lists.
create function public.archive_saved_item(p_id uuid)
returns void
language sql
security invoker
set search_path = public
as $$
  update public.saved_items
  set deleted_at = now()
  where id = p_id and user_id = auth.uid();
$$;
