# Web Portal (Next.js)

This Next.js application powers the Sports Event VR web portal for event discovery, ticket purchase flows, sponsor activations, and health monitoring.

## Getting Started

```bash
cd sports_event_vr/frontend/web
npm install
npm run dev
```

Set `NEXT_PUBLIC_API_BASE` to point at the backend FastAPI service (defaults to `http://localhost:8000/api`). The app uses the public `/events`, `/catalog`, `/creative`, `/health`, and `/parties` endpoints to render real data.

## Key Areas
- `app/` – App Router pages: home dashboard, events management, sponsor zones, account, operations.
- `components/` – Shared UI components aligned with VR design language (hero, lists, party panel, health tiles, sponsor showcase).
- `lib/api.ts` – Typed API client using shared domain models (`frontend/shared/types.ts`).
- `lib/store.ts` – Zustand store for cross-component state such as the active viewer session.
- `styles/` – Global theme and CSS modules for premium dark aesthetic.

React Query handles client-side mutations (e.g., party creation) and caching, while server components fetch initial data for SSR-friendly loading.

## Next Steps
- Hook up real auth tokens and entitlement checks.
- Add purchase flow that calls `/orders` and Stripe Checkout session endpoint.
- Introduce highlights/gallery routes and integrate sponsor analytics overlays.
