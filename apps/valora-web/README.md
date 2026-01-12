# VALORA Web App

Multi-asset valuation platform for real estate, vehicles, equipment, and more. Built with Vite + React for optimal performance.

## Getting Started

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

- `VITE_VALORA_API` - Valora backend API endpoint
- `VITE_DATA_FEEDS_URL` - Data feeds service endpoint
- `VITE_GOOGLE_MAPS_API_KEY` - Google Maps API key (required for property location features)

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Application pages
├── lib/            # Utilities and API clients
├── hooks/          # Custom React hooks
└── main.tsx        # Application entry point
```

## Key Features

- **Dashboard** - Asset management and overview
- **Valuation Flows** - Step-by-step valuation wizards for different asset types
- **API Keys Management** - Developer API key generation and management
- **Usage & Billing** - Track API usage and manage subscriptions
- **Mobile Integration** - Companion mobile app for photo/document capture

## Technology Stack

- **Framework:** Vite + React 18
- **Language:** TypeScript
- **State Management:** Zustand, TanStack React Query
- **Styling:** Tailwind CSS + Shared Design System
- **Authentication:** Shared Auth Package (Auth0/Clerk adapter)

## API Integration

Uses `@loud-legacy/shared-auth` for authenticated API requests:

```typescript
import { valoraApi } from './lib/apiClient';

// GET request
const data = await valoraApi.get('/valuations');

// POST request
const result = await valoraApi.post('/valuations', { type: 'real_estate' });
```

## Next Steps

- [ ] Complete authentication adapter wiring (Login.tsx:12)
- [ ] Resolve peer dependency conflicts (remove --legacy-peer-deps requirement)
- [ ] Add unit tests for core valuation logic
- [ ] Implement error boundary components
