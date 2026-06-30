-- Fix: public.collection_item_counts was created without security_invoker, so it
-- ran as the view owner (SECURITY DEFINER semantics) and bypassed RLS on
-- saved_items — a user could read item counts for other users' collections.
-- Force the view to run with the querying user's permissions + RLS so each user
-- only sees counts for their own collections. (PG15+; Supabase supports this.)
alter view public.collection_item_counts set (security_invoker = true);
