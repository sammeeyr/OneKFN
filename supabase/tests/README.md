# Database security tests

Run database tests locally with the Supabase CLI and Docker after configuring the local stack:

```bash
supabase start
supabase db reset
supabase db lint
```

Before production rollout, add pgTAP tests for:
- anonymous users cannot read profiles, member donations, prayer requests or pastoral notes;
- authenticated users cannot read another member's private rows;
- users cannot insert, update or delete their own role grants;
- member-visible pastoral responses are visible only to the owner of the related prayer request;
- public announcements and published service links are readable without authentication;
- payment events and audit logs remain inaccessible through client roles.

The current RLS policies intentionally do not grant client access to privileged pastoral, finance, audit or webhook operations. Do not relax them to make the admin UI work; implement audited server-side operations instead.
