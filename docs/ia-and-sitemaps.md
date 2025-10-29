# Information Architecture & Sitemaps

## Hub (loudlegacy.com)
- Home – ecosystem hero, relationship map, brand cards
- Brands directory – `/brands/[slug]`
- Story – `/story`
- Press & media – `/press`
- Careers – `/careers`
- Contact – `/contact`
- Investor room – `/investors`

## VALORA (valora.ai)
- Marketing: Home, Product, Pricing, Docs, Security
- App: Dashboard, Assets, New valuation flow, API Keys, Usage & billing
- Mobile: Capture + upload tooling powered by `valora-mobile`

## VenueVR (venuevr.com)
- Marketing: Home, For venues, For fans, Pricing, Knowledge center, Device help
- App: Venue dashboard, Device registration, Stream control, Recording library
- Mobile: Companion navigation that consumes shared tokens (`venuevr-mobile`)

## Business Now (businessnow.com)
- Marketing: Courses catalog, Templates library, Coaching, Blog
- App (roadmap): Course player, Progress tracking, Certificate export

## DIY Mr Fix It (diymrfixit.com)
- Marketing: Projects, Tools & calculators, Videos, Store
- App: Project planner, Materials calculator, Shopping list, Account hub

## Shared systems
- Single sign on (Auth0/Clerk) with apps registered per brand
- Stripe billing with shared customer/org records and brand-specific products
- Analytics schema (`@loud-legacy/shared-analytics`) to track cross-brand journeys
- Design system tokens ensure consistent surfaces, typography, and interaction states
