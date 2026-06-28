-- Security hardening (adversarial-review follow-ups):
--  1. Length caps on user-supplied text → block storage-exhaustion abuse.
--  2. Enforce collection ownership on saved_items (covers direct insert + RPC).
--  3. Tighten anon: SELECT only (RLS still governs rows); writes need a real user.

-- 1. Length constraints -------------------------------------------------------
alter table public.saved_items
  add constraint saved_items_title_len check (char_length(title) <= 500),
  add constraint saved_items_desc_len check (char_length(coalesce(description, '')) <= 2000),
  add constraint saved_items_content_len check (char_length(coalesce(content, '')) <= 100000),
  add constraint saved_items_url_len check (char_length(coalesce(url, '')) <= 2048);

alter table public.collections
  add constraint collections_name_len check (char_length(name) <= 120),
  add constraint collections_desc_len check (char_length(coalesce(description, '')) <= 1000);

alter table public.notifications
  add constraint notifications_title_len check (char_length(title) <= 200),
  add constraint notifications_body_len check (char_length(coalesce(body, '')) <= 1000);

alter table public.profiles
  add constraint profiles_first_len check (char_length(coalesce(first_name, '')) <= 100),
  add constraint profiles_last_len check (char_length(coalesce(last_name, '')) <= 100),
  add constraint profiles_avatar_len check (char_length(coalesce(avatar_url, '')) <= 1000);

-- 2. Collection ownership -----------------------------------------------------
-- A saved_item may only reference a collection owned by the same user. Covers
-- both direct inserts (items.service.createItem) and the save_item_with_file RPC.
-- Security definer so the lookup isn't blocked by collections' RLS.
create function public.enforce_collection_ownership()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if new.collection_id is not null
     and not exists (
       select 1 from public.collections c
       where c.id = new.collection_id and c.user_id = new.user_id
     )
  then
    raise exception 'collection % is not owned by the user', new.collection_id
      using errcode = 'check_violation';
  end if;
  return new;
end;
$$;

create trigger trg_saved_items_collection_owner
  before insert or update of collection_id on public.saved_items
  for each row execute function public.enforce_collection_ownership();

-- 3. Tighten anon privileges --------------------------------------------------
revoke insert, update, delete on all tables in schema public from anon;
alter default privileges in schema public revoke insert, update, delete on tables from anon;
