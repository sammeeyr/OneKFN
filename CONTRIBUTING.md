# Contributing

## Workflow
1. Create a feature branch from `main`: `feat/<short-name>` or `fix/<short-name>`.
2. Keep changes focused and modular.
3. Add or update tests for behavior changes.
4. Run lint, type checks and tests before opening a pull request.
5. Never commit secrets, production data, real prayer requests or payment credentials.

Changes to authorization, prayer requests, payments, roles, webhooks and notification targeting require explicit tests and reviewer approval. Do not broaden RLS policies merely to make a screen work.

Use conventional commits: `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`, `security:`.
