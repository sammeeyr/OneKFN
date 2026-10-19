create extension if not exists pgcrypto;

create type public.app_role as enum (
  'member', 'pastor', 'prayer_team', 'content_admin',
  'finance_officer', 'member_admin', 'super_admin'
);
create type public.announcement_audience as enum ('public', 'members');
create type public.payment_status as enum ('pending', 'successful', 'failed', 'abandoned', 'refunded');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  phone text,
  avatar_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.user_roles (
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  granted_by uuid references auth.users(id),
  granted_at timestamptz not null default now(),
  primary key (user_id, role)
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  starts_at timestamptz,
  timezone text not null default 'Africa/Lagos',
  is_published boolean not null default false,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table public.streaming_links (
  id uuid primary key default gen_random_uuid(),
  service_id uuid references public.services(id) on delete cascade,
  provider text not null check (provider in ('youtube','mixlr','zoom','facebook','other')),
  label text not null,
  url text not null check (url ~ '^https://'),
  is_live boolean not null default false,
  is_enabled boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  audience public.announcement_audience not null default 'public',
  published_at timestamptz,
  is_published boolean not null default false,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table public.prayer_requests (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references auth.users(id) on delete cascade,
  subject text,
  message text not null,
  consent_to_follow_up boolean not null default false,
  status text not null default 'received' check (status in ('received','in_review','responded','closed')),
  assigned_to uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.pastoral_responses (
  id uuid primary key default gen_random_uuid(),
  prayer_request_id uuid not null references public.prayer_requests(id) on delete cascade,
  author_id uuid not null references auth.users(id),
  member_visible_response text,
  created_at timestamptz not null default now()
);

create table public.donations (
  id uuid primary key default gen_random_uuid(),
  member_id uuid references auth.users(id) on delete set null,
  provider text not null check (provider in ('paystack','flutterwave','paypal','bank_transfer')),
  provider_reference text unique,
  amount_minor bigint not null check (amount_minor > 0),
  currency char(3) not null,
  status public.payment_status not null default 'pending',
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.payment_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  event_id text,
  provider_reference text,
  event_type text not null,
  signature_valid boolean not null default false,
  processed_at timestamptz,
  received_at timestamptz not null default now(),
  unique (provider, event_id)
);

create table public.bank_transfer_submissions (
  id uuid primary key default gen_random_uuid(),
  donation_id uuid not null references public.donations(id) on delete cascade,
  submitted_by uuid references auth.users(id) on delete set null,
  transfer_reference text,
  proof_storage_path text,
  review_status text not null default 'pending' check (review_status in ('pending','approved','rejected')),
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.device_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  expo_push_token text not null unique,
  platform text not null check (platform in ('ios','android')),
  enabled boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id),
  action text not null,
  resource_type text not null,
  resource_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.services enable row level security;
alter table public.streaming_links enable row level security;
alter table public.announcements enable row level security;
alter table public.prayer_requests enable row level security;
alter table public.pastoral_responses enable row level security;
alter table public.donations enable row level security;
alter table public.payment_events enable row level security;
alter table public.bank_transfer_submissions enable row level security;
alter table public.device_tokens enable row level security;
alter table public.audit_logs enable row level security;
