-- In-app notifications: per-user rows, created server-side (trigger / service-role),
-- read + marked-read by the owner. Realtime-streamed for live delivery.

create type public.notification_type as enum ('welcome', 'reminder', 'system', 'item', 'collection');

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  type public.notification_type not null,
  title text not null,
  body text not null default '',
  data jsonb,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index notifications_user_created_idx on public.notifications (user_id, created_at desc);
create index notifications_unread_idx on public.notifications (user_id) where read_at is null;

-- RLS: owner-only. No user INSERT — rows are created by the trigger / service role.
alter table public.notifications enable row level security;

create policy "notifications_select_own" on public.notifications
  for select using (user_id = auth.uid());
create policy "notifications_update_own" on public.notifications
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "notifications_delete_own" on public.notifications
  for delete using (user_id = auth.uid());

-- Realtime (mirror 0007): old row in UPDATE/DELETE payloads + publish changes.
alter table public.notifications replica identity full;
alter publication supabase_realtime add table public.notifications;

-- Greet new users: extend the signup trigger to drop a welcome notification.
create or replace function public.handle_new_user()
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

  insert into public.notifications (user_id, type, title, body)
  values (
    new.id,
    'welcome',
    'Welcome to Recall',
    'Save everything important and find it instantly. Capture your first item to get started.'
  );

  return new;
end;
$$;
