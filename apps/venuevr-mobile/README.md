# Mobile Companion (Expo)

This Expo (React Native) project delivers the Sports Event VR mobile companion app for iOS and Android. Fans can view upcoming events, manage entitlements, receive notifications, and launch VR sessions from their phone.

## Setup

```bash
cd sports_event_vr/frontend/mobile
npm install
npm run start  # choose iOS, Android, or web
```

Set `apiBase` under `expo.extra` in `app.json` (defaults to `http://localhost:8000/api`) to point at the backend.

## Architecture
- `App.tsx` – Bootstraps React Navigation and React Query.
- `src/navigation/RootNavigator.tsx` – Bottom tab navigator (Home, Events, Wallet, Settings).
- `src/screens/` – Platform-optimized screens for discovery, event list, entitlements, and preferences.
- `src/hooks/useApi.ts` – Shared API client reusing types from `frontend/shared`.
- Shared models in `../shared/types.ts` keep parity with backend contracts.

## Next Steps
- Wire deep links to trigger headset pairing or seat jump presets.
- Add secure storage for auth tokens and integrate passkey/magic link flows.
- Implement push notification registration and in-app message overlays.
