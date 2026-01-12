# VALORA Mobile App

Companion mobile application for VALORA platform. Capture property photos and documents on-the-go for seamless valuation workflows.

## Getting Started

```bash
# Install dependencies
npm install

# Start Expo development server
npm run start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

- `EXPO_PUBLIC_GATEWAY_URL` - Valora API gateway endpoint

## Project Structure

```
screens/           # Application screens
├── CameraUploadScreen.tsx
└── (additional screens)

lib/              # Utilities and API clients
components/       # Reusable UI components
App.tsx           # Application entry point
```

## Key Features

- **Camera Capture** - Take photos of properties, vehicles, equipment
- **Image Library** - Select existing photos from device
- **Upload to Valuation** - Automatic upload to associated valuation record
- **Offline Queue** - Queue uploads when offline, sync when online

## Technology Stack

- **Framework:** Expo + React Native
- **Language:** TypeScript
- **Navigation:** React Navigation
- **Camera:** expo-camera
- **Styling:** React Native StyleSheet + Shared Design System tokens

## Development Notes

- Requires camera permissions on device
- Test on physical devices for best camera experience
- Uses Expo Go for development builds

## Next Steps

- [ ] Add README with setup instructions
- [ ] Implement offline upload queue
- [ ] Add photo preview and editing features
- [ ] Integrate with shared analytics package
