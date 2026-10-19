# Release checklist

## Before beta
- [ ] Confirm OKFN logo, brand palette, legal/app-store organization details.
- [ ] Set app identifiers, bundle IDs, icons, splash screens and deep links.
- [ ] Approve privacy policy, prayer consent, retention and deletion policy.
- [ ] Configure Supabase environments, RLS, backups and migrations.
- [ ] Configure push credentials and permission flows.
- [ ] Verify official stream URLs and fallback behavior.
- [ ] Test Android and iOS on physical devices.
- [ ] Test accessibility, adaptive themes, offline/loading/error states.
- [ ] Run automated tests and dependency/security audits.

## Before payments go live
- [ ] Confirm merchant onboarding and supported currencies/countries.
- [ ] Verify beneficiary bank details through authorized OKFN finance staff.
- [ ] Test successful, failed, pending, abandoned, duplicate and replayed webhooks.
- [ ] Verify transactions server-side and implement reconciliation.
- [ ] Generate receipts only for verified transactions.
