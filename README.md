# loud-legacy

Unified workspace for the Loud Legacy portfolio (Hub, VALORA, VenueVR, Business Now, DIY Mr Fix It). The repository merges the existing projects into a single structure with shared packages for design tokens, auth, and analytics.

## Structure
- `apps/` – customer-facing web and mobile clients per brand plus the Loud Legacy hub
- `packages/` – shared design system tokens, auth client, and analytics schema
- `services/` – backend services (VALORA microservices, VenueVR FastAPI scaffold, etc.)
- `docs/` – consolidated documentation, sitemaps, and runbooks

## Getting started
```bash
npm install
npm run dev:hub            # Hub marketing site
npm run dev:valora         # VALORA web app (Vite)
npm run dev:venuevr        # VenueVR Next.js console
npm run dev:mfix           # DIY Mr Fix It Next.js app
npm run dev:business       # Business Now marketing shell
```

Mobile apps run through Expo:
```bash
npm run dev:valora-mobile
npm run dev:venuevr-mobile
```

## Shared design language
The `@loud-legacy/shared-design-system` package publishes VALORA-derived tokens as CSS variables (`tokens.css`) and JSON (`tokens.json`). Every app imports these tokens to stay visually consistent while still allowing brand-specific accents (e.g., DIY Mr Fix It’s warmer highlight).

## Auth & analytics
- `@loud-legacy/shared-auth` exports an `ApiClient` wrapper plus a `SessionManager` adapter to plug into Auth0/Clerk.
- `@loud-legacy/shared-analytics` defines a shared event schema, HTTP destination helper, and VenueVR domain types.

## Next steps
1. Wire shared-auth SessionAdapter implementations for Auth0 or Clerk.
2. Expand shared-design-system with reusable React / React Native components.
3. Set up CI (GitHub Actions) with workspace-aware linting, testing, and deploy steps.
4. Gradually refactor brand apps to replace local styling with shared primitives.
