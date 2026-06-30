-- These are trigger functions (they fire as the table/auth owner via SECURITY
-- DEFINER). They were also EXECUTE-able directly through the PostgREST RPC
-- endpoint by anon/authenticated, which is an unintended public surface.
-- Revoking EXECUTE removes the /rest/v1/rpc/* exposure without affecting trigger
-- firing (triggers do not depend on the caller's EXECUTE grant).
revoke execute on function public.enforce_collection_ownership() from anon, authenticated, public;
revoke execute on function public.handle_new_user() from anon, authenticated, public;
revoke execute on function public.rls_auto_enable() from anon, authenticated, public;
