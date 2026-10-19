# One Kingdom Family Network (OKFN)

Cross-platform mobile app for OKFN members and visitors, with an admin portal and Supabase backend.

> **Status:** Foundation and initial authentication slice. This is not yet production-ready. Brand assets, official stream links, beneficiary details, payment merchant accounts, and privacy/retention policies must be verified before launch.

## Monorepo
- `apps/mobile` — Expo + React Native + TypeScript (Android/iOS)
- `apps/admin` — Next.js administration portal
- `packages/shared` — shared domain types and validation
- `supabase/migrations` — PostgreSQL schema, RLS policies and auth triggers
- `supabase/functions` — planned secure payment and notification workflows
- `supabase/tests` — database policy regression tests
- `docs` — architecture, security and release guidance
- `.github/workflows/ci.yml` — mobile export, type checks, unit tests, admin build and database checks

## Product/security principles
- Visitors can browse public services, official streams and public announcements.
- Authentication is required for member account features.
- No public social feed or member-to-member messaging in v1.
- Prayer requests are private by default; internal pastoral notes are separate from member-visible responses.
- Roles cannot be self-assigned.
- Payment status is server-verified; client apps never declare a donation paid.
- Do not commit secrets, real prayer requests, payment credentials or production data.

## Requirements
- Node.js 22 LTS and npm
- Docker Desktop for local Supabase development
- Supabase CLI

## Quick start

```bash
npm install
cp apps/mobile/.env.example apps/mobile/.env
cp apps/admin/.env.example apps/admin/.env.local
npm run dev:mobile
```

Set the mobile environment values to a dedicated **development** Supabase project before testing sign-in. Never use production keys or data for local development.

## Local database and checks

```bash
supabase start
supabase db reset
supabase db lint --local
supabase test db
npm run typecheck
npm test
npm --workspace @okfn/admin run build
```

The database test suite currently checks schema and policy definitions. Cross-user end-to-end RLS tests are still required before production rollout.

## Authentication setup
1. Configure `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` in `apps/mobile/.env`.
2. Enable email/password authentication in the development Supabase project.
3. Allow the app deep link `okfn://auth/callback` in Supabase Auth URL configuration.
4. Test sign-up, email confirmation, sign-in, app restart/session restoration and sign-out on Android and iOS.

## First setup tasks
1. Add the official OKFN logo, brand palette and app-store assets.
2. Configure separate development/staging/production Supabase projects.
3. Add verified official stream URLs, WhatsApp contact and service schedule/time zone.
4. Verify beneficiary details and payment provider eligibility.
5. Approve prayer consent, pastoral access, retention and deletion rules.
6. Protect the default branch and require CI checks before merging.

Read [Architecture](docs/ARCHITECTURE.md), [Security](docs/SECURITY.md), and [Release Checklist](docs/RELEASE_CHECKLIST.md).
