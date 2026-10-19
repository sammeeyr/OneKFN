# Supabase Edge Functions

Planned functions:
- `donation-initialize`: authenticate, validate amount/currency, create a pending donation and request provider checkout.
- `payment-webhook`: verify provider signature and transaction, process idempotently, update payment state.
- `bank-transfer-review`: finance-role-only reconciliation.
- `send-live-alert`: content-admin/super-admin authorized push.
- `send-prayer-response`: authorized pastoral response and notification.

Do not deploy placeholder functions as secure implementations. Each function must validate authentication, authorization, input, provider signatures and idempotency.
