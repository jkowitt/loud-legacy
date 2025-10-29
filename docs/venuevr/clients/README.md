# Client Shells

This folder tracks the multi-platform client experiences called out in the blueprint.

- `vr/` (Unity + OpenXR): primary headset experience for Quest, Vision Pro, and Pico. Handles live watch, seat jumps, zoom, spatial audio, party mode, and sponsor zones.
- `web/` (Next.js): fan portal for previews, highlights, store, and replays.
- `admin/` (React + Three.js): venue and sponsor operator tooling with stadium map, anchor editor, creative scheduling, and health tiles.
- `mobile/` (iOS/Android): companion app for notifications, entitlements, and account management.

Each client will share authentication flows and analytics instrumentation with the backend services. Detailed specs and UX flows live in `../docs/blueprint.md`.
