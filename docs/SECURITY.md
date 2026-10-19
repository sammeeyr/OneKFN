# Security baseline

- Enable RLS on every table exposed through Supabase APIs.
- Use least-privilege grants and explicit role checks.
- Users may update only approved profile fields and cannot grant themselves roles.
- Prayer requests are private by default; members read only their own requests. Pastoral access must be role-checked and restricted.
- Keep internal pastoral notes separate from member-visible responses.
- Never put Supabase service-role keys, payment secrets or webhook secrets in client bundles.
- Confirm payments server-side; verify webhook signatures and provider transaction details; make processing idempotent.
- Validate amount, currency, provider reference and transaction status on the server.
- Avoid logging prayer text, tokens, payment secrets or unnecessary personal data.
- Audit role changes, sensitive prayer access, transfer reconciliation and finance actions.
- Define consent, privacy notice, retention and deletion rules before launch.
- Test cross-user access denial, unauthenticated access denial and role-escalation denial.
