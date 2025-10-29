# Loud Legacy Technical Blueprint

The Loud Legacy monorepo brings VALORA, VenueVR, Business Now, and DIY Mr Fix It together with a shared design system, auth utilities, analytics schema, and service layer.

## Repository layout

```
apps/
  hub-web/                # Next.js hub experience
  valora-web/             # Vite + React valuation interface
  valora-mobile/          # Expo mobile tooling for valuations
  venuevr-web/            # VenueVR Next.js control center
  venuevr-mobile/         # VenueVR companion app (Expo)
  diy-mr-fix-it-web/      # DIY marketing + app shell
  business-now-web/       # Business Now marketing starter
packages/
  shared-design-system/   # VALORA-based tokens + component primitives
  shared-auth/            # Session and API client helpers
  shared-analytics/       # Event schema + destinations + shared types
services/
  valora/                 # FastAPI backends, models, orchestration
  venuevr/                # VenueVR service scaffold + sandbox API
  ...
docs/                     # Centralized docs and IA
```

## Shared packages

- **Design system** (`@loud-legacy/shared-design-system`)
  - Exposes CSS variables (`tokens.css`) and JSON tokens for mobile clients.
  - Tokens mirror the VALORA palette and type scale so every brand carries the same visual DNA.
- **Auth utilities** (`@loud-legacy/shared-auth`)
  - Provides a resilient `ApiClient` wrapper with bearer token injection and error normalization.
  - Ships a `SessionManager` abstraction to plug into Auth0/Clerk adapters across apps.
- **Analytics** (`@loud-legacy/shared-analytics`)
  - Defines a unified event schema, brand keys, and an HTTP destination helper.
  - Includes VenueVR API and entity types that were previously scattered in the legacy repo.

## Frontend alignment

- All web apps import `@loud-legacy/shared-design-system/tokens.css` to inherit colors, typography, spacing, and motion tokens.
- DIY Mr Fix It tailwind config now maps to the shared palette while keeping its warm accent token.
- Expo apps (`valora-mobile`, `venuevr-mobile`) consume the JSON tokens to set navigation themes and color values instead of hard-coded hex values.
- The new **Hub** Next.js app implements the marketing routes outlined in the spec (`/story`, `/press`, `/careers`, `/investors`, `/contact`, `/brands/[slug]`).
- Business Now receives a starter marketing shell ready to wire into courses and Stripe checkout flows.

## Backend organization

- VALORA Python services live under `services/valora` unchanged, with docs relocated to `docs/valora/reference`.
- VenueVR FastAPI scaffold and sandbox API reside in `services/venuevr`, keeping the `.venv` local to the service.
- Shared docs from the legacy “sports event vr” project sit under `docs/venuevr` for quick lookup.

## Next steps

- Wire Auth0/Clerk adapters into `@loud-legacy/shared-auth` (`SessionAdapter`) for real login flows.
- Adopt the shared design system package inside component libraries (e.g., create React + React Native kits in `packages/shared-design-system`).
- Expand `@loud-legacy/shared-analytics` with additional brand-specific event helpers and tests.
- Create deployment workflows that map to the new workspace layout (GitHub Actions matrix or Turborepo pipeline).
