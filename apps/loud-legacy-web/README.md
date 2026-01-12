# Loud Legacy Web (Portfolio Hub)

Central hub application for the Loud Legacy portfolio ecosystem. Provides unified navigation and brand storytelling across VALORA, VenueVR, Business Now, DIY Mr Fix It, and Legacy CRM.

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

- `NEXT_PUBLIC_VALORA_URL` - VALORA brand URL
- `NEXT_PUBLIC_VENUEVR_URL` - VenueVR brand URL
- `NEXT_PUBLIC_BUSINESS_URL` - Business Now brand URL
- `NEXT_PUBLIC_DIY_URL` - DIY Mr Fix It brand URL
- `NEXT_PUBLIC_CRM_URL` - Legacy CRM brand URL

## Project Structure

```
app/
├── page.tsx              # Homepage with ecosystem overview
├── brands/               # Brand detail pages
├── story/                # Company narrative
├── press/                # Media and press releases
├── careers/              # Hiring information
└── contact/              # Contact forms

components/               # Reusable UI components
public/                   # Static assets
```

## Key Features

- **Ecosystem Hub** - Central landing page with brand navigation
- **Brand Showcases** - Deep dive pages for each brand (/brands/[slug])
- **Company Story** - Portfolio narrative and mission
- **Unified Design** - Shared design system across all brands
- **Static Export** - Supports static export for hosting on GoDaddy or Netlify

## Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Shared Design System
- **Deployment:** Netlify with static export support

## Deployment

Configured for Netlify deployment with automatic builds:

```toml
[build]
base = "apps/loud-legacy-web"
command = "npm install && npm run build"
publish = "out"
```

## SPA Bundling

This app includes a prebuild script that bundles sub-apps (VALORA, VenueVR, etc.) into a single-page application for unified deployment. See `package.json` for details.

## Next Steps

- [ ] Complete brand detail pages for all brands
- [ ] Add press release management system
- [ ] Implement contact form with email integration
- [ ] Add analytics tracking for cross-brand journeys
