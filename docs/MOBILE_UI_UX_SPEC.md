# OKFN Mobile UI/UX Specification

## Reference fidelity target
Use the supplied OKFN mobile UI/UX board as the visual source of truth. It depicts the gold dove above a royal-blue globe, a premium deep-blue/gold brand palette, bright white screens, compact rounded cards, blue primary actions, visible bottom navigation, event-led Home, and practical member workflows. The uploaded October "In His Presence" artwork should be integrated as the event hero image when the original image file is added to the repository.

## Brand system
- Royal blue: #0646A2 (primary actions, active navigation, links)
- Deep blue: #062B63 (hero cards and high-emphasis surfaces)
- Gold: #D4AF37 (brand accent; avoid small gold text on white)
- White: #FFFFFF
- Mist: #F3F7FC
- Ink: #17243A
- Muted: #64748B
- Border: #DCE5F0
- System fonts (SF on iOS, Roboto on Android); headings 24–30sp, section headings 18–20sp, body 14–16sp, captions 12–13sp.
- Spacing scale: 4, 8, 12, 16, 20, 24, 32. Card radius 16; controls radius 12; pill radius 999.
- Minimum touch target 44pt, safe areas, keyboard handling, and dynamic font scaling.

## Navigation
Reference navigation: Home, Watch, Give, Prayer, More. More contains Profile, News & Announcements, Notifications, and Settings. Prayer is a primary tab and is also available as a member support route. Existing route names for announcements and profile are preserved for backward compatibility. Five tabs maximum.

## Screens and flows
- Splash/launch: centered gold dove and blue globe logo, soft blue/white background, tagline "One Family • One Kingdom • One Mission".
- Home (visitor): brand header, event hero, four quick actions (Watch, Give, Prayer, News), live service card, latest announcement link, notification shortcut.
- Watch & Listen: official service providers and verified links from Supabase. Only open safe HTTPS URLs after a user action.
- Live service: branded live-service landing page; loads enabled stream links from Supabase. No fabricated in-app video player. A native player can be added when an approved playback URL and provider are known.
- News & Announcements: published ministry updates, event categories, loading/empty/error states.
- Giving: giving categories and amount/payment selection can be added when the server-verified payment provider is configured. Never collect card or bank credentials directly in the app; do not show payment completion until provider verification is implemented.
- Prayer: authenticated private request submission; request content must remain protected by database row-level security. Keep sensitive request text out of notification previews and analytics.
- Prayer request detail: show member-owned request, status, and approved pastoral response only. Do not expose internal pastoral notes to the member client.
- Sign in / registration: email/password, validation, safe return routes, email verification flow, generic error copy that avoids disclosing whether an account exists.
- Member profile: account identity, member details when backed by verified data, and sign out.
- Notifications: design preview with service/news/prayer/giving categories. Connect real push notification records/preferences before presenting sample items as actual messages.
- Settings: appearance preferences, notification preferences, profile/account, privacy, help and sign-out routes.
- More: navigation hub for Profile, Announcements, Notifications and Settings.

## Component patterns
Use shared ScreenContainer, ScreenHeading, ContentCard, ActionButton, and StateMessage. Keep form field labels visible, input hit areas at least 48px, submit states disabled while saving, and loading/error/empty states explicit. Prefer accessible icons and labels over emoji for production. Use blue for primary interaction and gold only for brand emphasis.

## Implementation architecture
- Expo SDK 54 / React Native 0.81 / TypeScript.
- Expo Router file-based routes.
- Supabase Auth and RLS-protected data; never place service-role keys in the app.
- apps/mobile/src/theme/tokens.ts is the source of truth for colors and spacing.
- apps/mobile/src/components/ui.tsx contains reusable UI primitives.
- Keep screen modules small and move data calls into feature hooks/services as workflows mature.
- Use environment variables from apps/mobile/.env.example; do not commit .env or real secrets.

## Google AI Studio and Antigravity compatibility
- Keep source files plain .tsx, .ts, .json, .md, and standard Expo conventions.
- Maintain a clear root README with install, environment, run, test and build commands.
- Avoid IDE-specific hidden state, generated-only files, and undocumented external services.
- Every code change should be committed to a named Git branch and validated with Expo export, TypeScript, unit tests, and Supabase migration/security tests in GitHub Actions.
- In AI Studio/Antigravity, instruct agents to inspect the repository and current branch first; preserve existing auth, RLS, route contracts and env names; never invent credentials; change only requested files where possible; run checks and report actual results.

## Assets and fidelity notes
The repository still needs the original transparent OKFN logo and October event artwork added as image assets. Until those source assets are committed, the app uses a lightweight visual stand-in in the Home header and typographic event hero; this is not a pixel-exact replacement for the supplied dove/globe artwork. The current Live Service route opens an enabled verified external stream; it is not an embedded player yet. Giving remains intentionally non-transactional until server-side payment verification is implemented.
