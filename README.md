# One Kingdom Family Network (OKFN)

Cross-platform mobile app for OKFN members and visitors, with an admin portal and Supabase backend.

> **Status:** Foundation scaffold. Branding assets, official stream links, beneficiary details, payment merchant accounts, and privacy/retention rules must be verified before production use.

## Monorepo
- `apps/mobile` — Expo + React Native + TypeScript (Android/iOS)
- `apps/admin` — Next.js administration portal
- `packages/shared` — shared domain types
- `supabase/migrations` — PostgreSQL schema and RLS policies
- `supabase/functions` — planned secure payment and notification workflows
- `docs` — architecture, security, contribution and release guidance
- `.github/workflows` — CI

## Product/security principles
- Visitors can browse public services, official streams and public announcements.
- Authentication is required for member features.
- No public social feed or member-to-member messaging in v1.
- Prayer requests are private by default; internal pastoral notes are separate from member-visible responses.
- Roles cannot be self-assigned.
- Payment status is server-verified; client apps never declare a donation paid.
- Do not commit secrets, real prayer requests, payment credentials or production data.

## Quick start
Requires Node.js 22 LTS and npm.

```bash
npm install
cp apps/mobile/.env.example apps/mobile/.env
cp apps/admin/.env.example apps/admin/.env.local
npm run dev:mobile
```

The initial screens and modules are scaffold-level. Configure Supabase and implement/test secure workflows before enabling sensitive features.

## First setup tasks
1. Add the official OKFN logo, brand palette and app-store assets.
2. Configure separate development/staging/production Supabase projects.
3. Add verified official stream URLs, WhatsApp contact and service schedule/time zone.
4. Verify beneficiary details and payment provider eligibility.
5. Approve prayer consent, pastoral access, retention and deletion rules.
6. Enable branch protection and require passing CI checks.

Read [Architecture](docs/ARCHITECTURE.md), [Security](docs/SECURITY.md), and [Release Checklist](docs/RELEASE_CHECKLIST.md).
