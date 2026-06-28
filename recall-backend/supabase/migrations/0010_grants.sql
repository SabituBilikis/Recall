-- Table privileges for the API roles. RLS is the real authorization; these are
-- the base GRANTs PostgREST needs so authenticated/anon can reach the tables at
-- all. Tables created via direct psql (0007–0009) didn't inherit Supabase's
-- default grants, causing "42501 permission denied". This restores them and sets
-- default privileges so future tables are covered.

grant usage on schema public to anon, authenticated, service_role;

grant select, insert, update, delete on all tables in schema public to anon, authenticated, service_role;
grant usage, select on all sequences in schema public to anon, authenticated, service_role;

alter default privileges in schema public
  grant select, insert, update, delete on tables to anon, authenticated, service_role;
alter default privileges in schema public
  grant usage, select on sequences to anon, authenticated, service_role;
