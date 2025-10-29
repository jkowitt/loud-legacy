# Frontend Overview

The Sports Event VR product ships two primary front-end surfaces that share design language, data contracts, and analytics:

- **Web portal** – Next.js + React + TypeScript SPA for discovery, previews, tickets, highlights, and sponsor activations. Targets desktop and mobile browsers.
- **Mobile companion** – Expo (React Native) application for iOS and Android, focused on account management, entitlement sync, notifications, and lightweight highlights playback.

Both experiences consume the REST endpoints exposed by the backend (`/api`) and connect to shared utility modules for authentication, API clients, analytics, and feature flags.

## Shared Principles
- **Design system**: Tailwind-like utility tokens implemented via CSS modules on web and `StyleSheet` helpers on mobile. Components align with dark premium theme specified in the blueprint.
- **State management**: React Query for network caching, Zustand for lightweight client-side state.
- **Routing**: Next.js App Router on web; React Navigation stack + bottom tabs on mobile.
- **Analytics**: Wrapper around segment-like tracker to log screen views, purchases, party invites, and creative interactions.
- **Localization**: Minimal i18n scaffolding ready for future locales.

## Quick Start
- **Web**: `cd web && npm install && npm run dev` (set `NEXT_PUBLIC_API_BASE` if backend not on default port).
- **Mobile**: `cd mobile && npm install && npm run start` (update `app.json` `expo.extra.apiBase`).

The following folders hold implementation details:
- `web/` – Web portal source.
- `mobile/` – Expo project with shared hooks located under `mobile/src/hooks`.
- `shared/` – Cross-platform TypeScript modules (API client, models, analytics).

See `web/README.md` and `mobile/README.md` for per-platform setup and architecture.
