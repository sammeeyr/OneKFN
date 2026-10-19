begin;

create extension if not exists pgtap with schema extensions;
select plan(15);

select has_table('public', 'profiles', 'profiles table exists');
select has_table('public', 'user_roles', 'user roles table exists');
select has_table('public', 'prayer_requests', 'prayer requests table exists');
select has_table('public', 'donations', 'donations table exists');
select has_table('public', 'pastoral_internal_notes', 'internal pastoral notes use a separate table');

select ok(
  exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'profiles' and policyname = 'profiles_select_own'),
  'profile read policy is scoped to the owner'
);
select ok(
  not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'user_roles' and cmd in ('INSERT', 'UPDATE', 'DELETE')),
  'clients cannot create, edit or delete role grants'
);
select ok(
  not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'payment_events'),
  'payment webhook events are not exposed to client roles'
);
select ok(
  not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'audit_logs'),
  'audit logs are not exposed to client roles'
);
select ok(
  not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'pastoral_internal_notes'),
  'internal pastoral notes have no client-facing RLS policies'
);
select ok(
  exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'prayer_requests' and policyname = 'prayer_requests_select_own' and qual like '%member_id%'),
  'members can only select their own prayer requests'
);
select ok(
  exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'pastoral_responses' and policyname = 'pastoral_responses_member_visible' and qual like '%member_visible_response%'),
  'member response policy excludes internal-only notes'
);
select ok(
  exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'streaming_links' and policyname = 'streaming_links_read_enabled'),
  'enabled official stream links have a read policy'
);
select ok(
  exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'announcements' and policyname = 'announcements_read_published_audience'),
  'published announcements have an audience-aware read policy'
);
select ok(
  exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'donations' and policyname = 'donations_select_own'),
  'donation reads are scoped to the donor'
);

select * from finish();
rollback;
