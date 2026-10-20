# Implementation Plan - OKFN Cross-Platform Mobile Apps & Admin Control Panel

## Overview
This plan establishes the multi-repo/folder structure for the One Kingdom Family Network (OKFN) ecosystem:
1. **`apps/mobile`**: Shared React Native + Expo codebase supporting both Android and iOS devices, featuring the complete OKFN UI/UX screens (Splash, Visitor Home, Watch & Listen, Announcements, Giving with Paystack/Flutterwave/Bank Transfer, Prayer Desk with WhatsApp integration, Member Profile, Notifications, Settings, and Live Player).
2. **`apps/admin`**: Dedicated Admin Portal Control Panel to manage services, announcements, prayer desk, giving reconciliation, and push real-time updates via Supabase Webhooks.
3. **Master Rebuild Prompt**: A master prompt for rebuilding and deploying the mobile application natively across Android and iOS.

## Proposed Changes

### 1. Mobile App (`apps/mobile`)
- Organize screens in `apps/mobile/app/` using Expo Router for Android and iOS.
- Implement UI components adhering to the OKFN brand guidelines (Royal Blue `#064EA2`, Gold `#D4AF37`, Dark Navy `#0B132B`).
- Configure Supabase client integration for real-time sync with Supabase Webhooks.

### 2. Admin Portal Control Panel (`apps/admin`)
- Next.js administrative control panel allowing administrators to publish announcements, live stream updates, and push configuration changes directly to mobile app clients.
- Configured with Supabase Webhooks notification dispatch.

### 3. Documentation & Master Prompts
- Create `apps/android/MASTER_PROMPT.md` and `apps/ios/README.md` containing complete instructions and prompts for building and compiling native Android and iOS builds.

## Verification Plan
- Run `compile_applet` to ensure successful compilation of the Next.js admin portal.
- Verify Expo mobile app configuration.
