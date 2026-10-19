begin;

create extension if not exists pgtap with schema extensions;
select plan(9);

-- Isolated, synthetic fixtures. The transaction rolls back at the end of this test.
insert into auth.users (
  id, aud, role, email, encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at
) values
  ('11111111-1111-4111-8111-111111111111', 'authenticated', 'authenticated', 'okfn-test-a@example.invalid', '', now(), '{}'::jsonb, '{}'::jsonb, now(), now()),
  ('22222222-2222-4222-8222-222222222222', 'authenticated', 'authenticated', 'okfn-test-b@example.invalid', '', now(), '{}'::jsonb, '{}'::jsonb, now(), now());

insert into public.prayer_requests (id, member_id, subject, message)
values
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1', '11111111-1111-4111-8111-111111111111', 'Test A', 'Synthetic private request A'),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb2', '22222222-2222-4222-8222-222222222222', 'Test B', 'Synthetic private request B');

insert into public.pastoral_responses (prayer_request_id, author_id, member_visible_response)
values
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1', '11111111-1111-4111-8111-111111111111', 'Visible response A'),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb2', '22222222-2222-4222-8222-222222222222', 'Visible response B');

insert into public.pastoral_internal_notes (prayer_request_id, author_id, note)
values ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1', '11111111-1111-4111-8111-111111111111', 'Synthetic internal pastoral note A');

insert into public.donations (member_id, provider, provider_reference, amount_minor, currency, status)
values
  ('11111111-1111-4111-8111-111111111111', 'bank_transfer', 'okfn-test-donation-a', 1000, 'NGN', 'pending'),
  ('22222222-2222-4222-8222-222222222222', 'bank_transfer', 'okfn-test-donation-b', 2000, 'NGN', 'pending');

insert into public.announcements (title, body, audience, is_published, published_at)
values
  ('Public test announcement', 'Synthetic public notice', 'public', true, now()),
  ('Members test announcement', 'Synthetic members notice', 'members', true, now());

insert into public.streaming_links (provider, label, url, is_live, is_enabled)
values ('youtube', 'Synthetic test stream', 'https://youtube.com/@okfn-test', false, true);

set local role anon;
create temporary table anon_observed as
select
  (select count(*)::integer from public.profiles) as profiles_count,
  (select count(*)::integer from public.announcements) as announcements_count,
  (select count(*)::integer from public.streaming_links) as streams_count;
reset role;

select is((select profiles_count from anon_observed), 0, 'anonymous visitors cannot read member profiles');
select is((select announcements_count from anon_observed), 1, 'anonymous visitors only see public announcements');
select is((select streams_count from anon_observed), 1, 'anonymous visitors can read enabled official streams');

set local role authenticated;
select set_config('request.jwt.claim.sub', '11111111-1111-4111-8111-111111111111', true);
select set_config('request.jwt.claims', '{"sub":"11111111-1111-4111-8111-111111111111","role":"authenticated"}', true);
create temporary table member_a_observed as
select
  (select count(*)::integer from public.profiles) as profiles_count,
  (select count(*)::integer from public.prayer_requests) as prayers_count,
  (select count(*)::integer from public.donations) as donations_count,
  (select count(*)::integer from public.pastoral_responses) as responses_count,
  (select count(*)::integer from public.pastoral_internal_notes) as internal_notes_count;
reset role;

select is((select profiles_count from member_a_observed), 1, 'member A can only read their own profile');
select is((select prayers_count from member_a_observed), 1, 'member A can only read their own prayer request');
select is((select donations_count from member_a_observed), 1, 'member A can only read their own donation');
select is((select responses_count from member_a_observed), 1, 'member A only sees their own member-visible response');
select is((select internal_notes_count from member_a_observed), 0, 'member A cannot read internal pastoral notes');

set local role authenticated;
select set_config('request.jwt.claim.sub', '22222222-2222-4222-8222-222222222222', true);
select set_config('request.jwt.claims', '{"sub":"22222222-2222-4222-8222-222222222222","role":"authenticated"}', true);
create temporary table member_b_observed as
select (select count(*)::integer from public.prayer_requests) as prayers_count;
reset role;

select is((select prayers_count from member_b_observed), 1, 'member B cannot see member A prayer request');

select * from finish();
rollback;
