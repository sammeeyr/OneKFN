# Database security tests

Run the local database test suite with the Supabase CLI and Docker:

```bash
supabase start
supabase db reset
supabase db lint --local
supabase test db
```

The pgTAP regression suite checks required tables and baseline policy definitions. These catalog-level tests are not a substitute for end-to-end tests using separate authenticated users.

Before production rollout, add cross-user tests proving that:
- anonymous users cannot read profiles, member donations, prayer requests or pastoral notes;
- authenticated users cannot read another member's private rows;
- users cannot insert, update or delete their own role grants;
- member-visible pastoral responses are visible only to the owner of the related prayer request;
- payment events and audit logs remain inaccessible through client roles.

The current RLS policies intentionally do not grant client access to privileged pastoral, finance, audit or webhook operations. Do not relax them to make the admin UI work; implement audited server-side operations instead.
