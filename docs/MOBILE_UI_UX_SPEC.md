# OKFN Mobile UI/UX Specification

## Product direction
One Kingdom Family Network (OKFN) is a faith, family and community app for Android and iOS. The interface should feel trustworthy, warm, premium and easy to use. Preserve the supplied gold dove over blue globe identity. Use the supplied October “In His Presence” event artwork as an event/promotional asset, not as a substitute for native interface text.

## Brand system
- Royal blue: #0646A2 (primary actions, active navigation, links)
- Deep blue: #062B63 (headers, high-emphasis surfaces)
- Gold: #D4AF37 (brand accent, premium highlights; avoid small gold text on white)
- White: #FFFFFF (main canvas)
- Mist: #F3F7FC (cards/secondary canvas)
- Ink: #17243A (primary text)
- Muted: #64748B (secondary text)
- Border: #DCE5F0
- Typography: system sans (iOS SF / Android Roboto); headings 24–30sp, section headings 18–20sp, body 14–16sp, captions 12–13sp.
- Spacing scale: 4, 8, 12, 16, 20, 24, 32. Card radius 16; controls radius 12; pills radius 999.
- Touch targets at least 44x44pt; respect safe areas and dynamic font scaling.

## Navigation
Use a five-item bottom tab bar: Home, Watch, News, Give, Profile. Prayer is a prominent shortcut on Home and a route reachable from Profile/More; do not overload the tab bar. Announcements screen route remains named announcements for existing code. Keep labels visible and selected state blue; gold is an accent, not the primary interaction color.

## Screen requirements
### Splash / launch
Centered logo, subtle blue-to-white background, optional short line “One Family • One Kingdom • One Mission”. No long animation; allow app launch to proceed if network is unavailable.

### Home (visitor and signed-in)
- Header: compact logo/OKFN wordmark and notification button.
- Welcome: “One Family. One Kingdom. One Mission.”
- Hero: upcoming or live service with image, date/time, status chip and primary “Watch service” CTA.
- Quick actions: Watch, Prayer, Give, Announcements.
- Upcoming events: compact cards with date, title and “View details”.
- Latest announcements: two or three rows, date and category.
- Visitors can browse public content; sign-in is required only for member-specific actions.
- Show graceful loading, empty, offline and retry states.

### Watch & Listen
List enabled official platforms (YouTube, Facebook, Mixlr, Zoom or configured alternatives) from Supabase. Platform cards use recognizable platform labels, a short description and “Open stream”. Validate links and open only after an explicit tap. Distinguish “Live now” from “Upcoming”; never imply a stream is live unless the data says so.

### Announcements
- Filter chips: All, General, Events, Ministry (only show categories supported by data).
- Card: title, category, publish date, short excerpt and optional image.
- Detail screen should support accessible text, deep links and share action where available.
- Only published announcements are visible to members/visitors.

### Giving
- Explain giving purpose and show configured categories.
- Amount selection plus custom amount; currency displayed from configured church settings (do not hard-code currency assumptions).
- Payment provider options only appear when integrated and configured. Never collect card/bank credentials directly in the app. Confirm via trusted provider/server response; show receipt/reference and status.
- If payments are not configured, show a clear “Giving is not available yet” state and approved offline instructions, if provided by admins.

### Prayer
- Require sign-in before submitting private/member prayer requests.
- Request form: title/topic, request details, privacy choice (pastoral team only / share with prayer team, if supported), submit button.
- “My requests” list with submitted date and status. Show pastoral responses only to the request owner and authorized pastoral staff.
- Do not expose internal pastoral notes to the member client. Use a separate protected data model and server-side authorization.

### Authentication
- Sign in, create account, reset password and email callback screens share the same field/button styles.
- Clear validation and error messages; password visibility toggle; terms/privacy consent where required.
- No account is required for public announcements and streams unless a service requires it.

### Profile
- Member initials/avatar, name and role/member label.
- Editable profile fields only when backend support exists.
- Preferences: region, language, notifications, privacy and sign out.
- Avoid exposing internal IDs or administrative fields.

### Notifications
- Tabs All/Unread; notification type icon, title, excerpt and relative date.
- Ask for OS notification permission contextually, after the user understands the benefit.
- Support disabled-permission state and notification preferences.

### Settings and help
- Appearance: system/light/dark.
- Notification preferences, privacy, account, help/contact, about/version, sign out.
- Use accessible list rows with clear current values and chevrons.

### Live service / player
- Embedded player only when technically supported and the provider permits it; otherwise open official platform via safe URL.
- Provide service title, live/upcoming status, schedule, description, related platforms and calendar action if implemented.
- Do not fabricate chat or schedule functionality.

## Reusable components
- ScreenContainer: safe-area aware canvas and consistent horizontal padding.
- ScreenHeader: title, optional back button and action.
- PrimaryButton, SecondaryButton, TextField, Chip, StatusBadge.
- ContentCard, AnnouncementRow, EventCard, PlatformCard, EmptyState, ErrorState, LoadingSkeleton.
- BrandMark: uses approved transparent logo asset once committed.
- SectionHeader: title and optional “See all”.
Keep components typed, small and reusable; avoid duplicating inline hex values across screens.

## Accessibility and responsive behavior
- Support Android and iOS safe areas, notch/home indicator and keyboard avoidance.
- Minimum 44pt touch targets; meaningful accessible labels for icon-only controls.
- Maintain WCAG AA contrast for body text and controls; gold on white is decorative only.
- Never encode status with color alone; add text/icon labels.
- Support larger text, screen readers, reduced motion and predictable focus order.
- Avoid using the event flyer as a full-screen background behind body copy.

## Data and security rules
- Supabase is the source of truth for published announcements, stream links, authenticated profile and member requests.
- Treat client state as presentation only. Enforce permissions in database RLS and trusted server logic.
- Use only verified payment status and server-generated receipts.
- External URLs must be validated and opened on user action.
- Do not log passwords, private prayer content or payment secrets.

## Implementation plan
1. Introduce shared design tokens and reusable button/card/chip primitives.
2. Restyle the tab navigator and Home screen first; preserve existing Supabase/auth logic.
3. Apply the same tokens to Watch, Announcements, Giving and Profile.
4. Add/finish Prayer, Notification, Settings and detail routes only as backend capabilities are available.
5. Add approved logo and event artwork in apps/mobile/assets/brand/; optimize raster assets and avoid embedding artwork as text.
6. Verify with npm run typecheck --workspace @okfn/mobile, Expo Android export, iOS simulator/device, accessibility checks and small/large screen review.

## Acceptance checklist
- [ ] Existing auth and Supabase queries still work.
- [ ] Five tabs render with labels, selected states and safe-area padding.
- [ ] Home shows real data or explicit loading/empty/error states.
- [ ] Stream links open only after explicit tap and pass URL validation.
- [ ] Giving never suggests a payment is successful without provider confirmation.
- [ ] Member prayer requests and responses are protected by RLS.
- [ ] No internal pastoral notes appear in client-facing data.
- [ ] Light/dark mode is legible; dynamic type and screen readers are supported.
- [ ] Typecheck and CI pass before merging.
