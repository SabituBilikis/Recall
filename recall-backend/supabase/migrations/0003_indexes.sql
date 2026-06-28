-- Indexes for the hot paths: owner lists, recency, collection filter, FTS, joins.

-- Owner + recency (keyset pagination on created_at).
create index idx_saved_items_user_created on public.saved_items (user_id, created_at desc);
create index idx_saved_items_collection on public.saved_items (collection_id);
create index idx_saved_items_type on public.saved_items (user_id, type);
-- Only index live rows for the common "not archived" queries.
create index idx_saved_items_active on public.saved_items (user_id, created_at desc) where deleted_at is null;

-- Full-text search.
create index idx_saved_items_fts on public.saved_items using gin (fts);

create index idx_collections_user_created on public.collections (user_id, created_at desc);

create index idx_files_item on public.files (saved_item_id);
create index idx_files_user on public.files (user_id);

create index idx_tags_user on public.tags (user_id);
create index idx_sit_tag on public.saved_item_tags (tag_id);
create index idx_favorites_item on public.favorites (saved_item_id);
