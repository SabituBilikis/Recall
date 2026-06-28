-- Realtime: stream row changes for the user's own data to the client.
-- RLS still applies — subscribers only receive rows their policies allow.
-- REPLICA IDENTITY FULL so UPDATE/DELETE payloads carry the old row (needed for
-- client-side filtering on user_id and for delete events).

alter table public.saved_items replica identity full;
alter table public.collections replica identity full;
alter table public.favorites replica identity full;

alter publication supabase_realtime add table public.saved_items;
alter publication supabase_realtime add table public.collections;
alter publication supabase_realtime add table public.favorites;
