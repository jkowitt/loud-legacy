# Loud Legacy Hub

Next.js App Router project that tells the unified story for VALORA, VenueVR, Business Now, and DIY Mr Fix It. The app consumes shared design system tokens and shared analytics/auth helpers from the workspaces under `packages/`.

## Available routes
- `/` – Overview, relationship map, and brand cards
- `/story`, `/press`, `/careers`, `/contact`, `/investors` – marketing pages detailed in the spec
- `/brands/[slug]` – deep dive pages for each brand (VALORA, VenueVR, Business Now, DIY Mr Fix It)

## Local development
```bash
npm install
npm run dev:hub
```

The global styles import `@loud-legacy/shared-design-system/tokens.css` so any token updates propagate automatically.
