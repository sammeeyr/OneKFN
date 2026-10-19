-- Never store internal pastoral notes on a row readable by the member.
-- Row-level policies filter rows, not columns.
alter table public.pastoral_responses drop column if exists internal_note;

create table if not exists public.pastoral_internal_notes (
  id uuid primary key default gen_random_uuid(),
  prayer_request_id uuid not null references public.prayer_requests(id) on delete cascade,
  author_id uuid not null references auth.users(id),
  note text not null,
  created_at timestamptz not null default now()
);

create index if not exists pastoral_internal_notes_request_idx
  on public.pastoral_internal_notes (prayer_request_id, created_at desc);

alter table public.pastoral_internal_notes enable row level security;

-- Deliberately no anon/authenticated policies. Future pastoral tooling must use
-- an explicitly authorized server-side operation with audit logging.
