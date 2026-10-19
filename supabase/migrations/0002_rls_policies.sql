-- Keep policies least-privilege. Privileged admin writes and pastoral reads
-- must be implemented through reviewed, role-checked server-side operations.

create policy "profiles_select_own" on public.profiles
  for select to authenticated using (id = (select auth.uid()));
create policy "profiles_insert_own" on public.profiles
  for insert to authenticated with check (id = (select auth.uid()));
create policy "profiles_update_own" on public.profiles
  for update to authenticated using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

-- Users can inspect their own role rows but cannot grant or edit roles.
create policy "user_roles_select_own" on public.user_roles
  for select to authenticated using (user_id = (select auth.uid()));

create policy "services_read_published" on public.services
  for select to anon, authenticated using (is_published = true);

create policy "streaming_links_read_enabled" on public.streaming_links
  for select to anon, authenticated using (
    is_enabled = true and (service_id is null or exists (
      select 1 from public.services s
      where s.id = streaming_links.service_id and s.is_published = true
    ))
  );

create policy "announcements_read_published_audience" on public.announcements
  for select to anon, authenticated using (
    is_published = true and
    (audience = 'public' or (select auth.uid()) is not null)
  );

create policy "prayer_requests_select_own" on public.prayer_requests
  for select to authenticated using (member_id = (select auth.uid()));
create policy "prayer_requests_insert_own" on public.prayer_requests
  for insert to authenticated with check (member_id = (select auth.uid()));
-- No member UPDATE policy: status and assignment are workflow-controlled.

create policy "pastoral_responses_member_visible" on public.pastoral_responses
  for select to authenticated using (
    member_visible_response is not null and exists (
      select 1 from public.prayer_requests p
      where p.id = pastoral_responses.prayer_request_id
        and p.member_id = (select auth.uid())
    )
  );

create policy "donations_select_own" on public.donations
  for select to authenticated using (member_id = (select auth.uid()));

create policy "device_tokens_select_own" on public.device_tokens
  for select to authenticated using (user_id = (select auth.uid()));
create policy "device_tokens_insert_own" on public.device_tokens
  for insert to authenticated with check (user_id = (select auth.uid()));
create policy "device_tokens_update_own" on public.device_tokens
  for update to authenticated using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));
create policy "device_tokens_delete_own" on public.device_tokens
  for delete to authenticated using (user_id = (select auth.uid()));

-- Intentionally no client policies on payment_events, transfer approvals or audit_logs.
