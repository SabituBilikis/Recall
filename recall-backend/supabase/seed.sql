-- Dev-only seed. Runs on `supabase db reset`. Real users come from Auth signup;
-- here we fabricate one auth user + sample data so the app has something to read.
-- DO NOT run against production.

do $$
declare
  v_user uuid := '00000000-0000-0000-0000-000000000001';
  v_design uuid;
  v_research uuid;
begin
  insert into auth.users (id, email, raw_user_meta_data, created_at, updated_at, aud, role)
  values (v_user, 'demo@recall.app',
          '{"first_name":"Bilikis","last_name":"Demo"}'::jsonb,
          now(), now(), 'authenticated', 'authenticated')
  on conflict (id) do nothing;

  insert into public.collections (id, user_id, name, description, color, icon)
  values (gen_random_uuid(), v_user, 'Design Inspiration', 'UI references and patterns.', 'purple', 'folder')
  returning id into v_design;

  insert into public.collections (id, user_id, name, description, color, icon)
  values (gen_random_uuid(), v_user, 'Research', 'Market notes and links.', 'blue', 'briefcase')
  returning id into v_research;

  insert into public.saved_items (user_id, type, title, description, collection_id, file_type)
  values
    (v_user, 'screenshot', 'Mobile Onboarding References', 'Onboarding flows.', v_design, 'PNG'),
    (v_user, 'link', 'Pricing Research', 'Competitor pricing.', v_research, null),
    (v_user, 'note', 'Product Ideas', 'Concepts to revisit.', v_design, null),
    (v_user, 'file', 'Research Summary', 'PDF summary.', v_research, 'PDF');

  -- Welcome notification comes from the signup trigger; add a couple more
  -- (one already read) so the list + unread badge have something to show.
  insert into public.notifications (user_id, type, title, body, read_at, created_at)
  values
    (v_user, 'item', 'Item saved', 'Pricing Research was added to Research.',
     now() - interval '2 hours', now() - interval '2 hours'),
    (v_user, 'collection', 'New collection', 'You created the Design Inspiration collection.',
     null, now() - interval '1 hour');
end $$;
