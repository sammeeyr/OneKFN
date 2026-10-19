# Architecture

## Stack
- Mobile: Expo, React Native, TypeScript, Expo Router.
- Admin: Next.js and TypeScript.
- Backend: Supabase PostgreSQL, Auth, Storage, Row Level Security (RLS), Edge Functions.
- Push: Expo Notifications backed by APNs/FCM.
- Payments: provider adapters for Paystack and Flutterwave; PayPal only if merchant eligibility is confirmed.
- Official streams: YouTube, Mixlr, Zoom and Facebook URLs opened through platform linking.

## Modules
- `features/streams`: official stream links and live alerts
- `features/announcements`: public/member announcements
- `features/giving`: donation intent, checkout, bank transfers and receipts
- `features/prayer`: private requests and authorized pastoral responses
- `features/profile`: profile and preferences
- `features/notifications`: device tokens and preferences

UI components must not implement payment verification, role assignment or pastoral authorization. Enforce sensitive access in server functions and PostgreSQL RLS.

## Payment flow
Create a pending donation server-side, initiate provider checkout, verify the provider webhook and transaction server-side, process idempotently, then expose the verified status. Never trust client-submitted payment success.

Use separate development, staging and production Supabase projects. Test migrations and payment webhooks outside production first.
