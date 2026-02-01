# LOUD Legacy - Multi-Platform Architecture

## 🎯 Overview

The LOUD Legacy ecosystem consists of 5 integrated platforms sharing a single user database and authentication system:

1. **VALORA** - Real Estate Valuation & Analysis
2. **BUSINESS NOW** - Business Management & Planning
3. **LEGACY CRM** - Customer Relationship Management
4. **HUB** - Central Dashboard & Platform Switcher
5. **VENUEVR** - VR Venue Tours

## 🔐 Shared Authentication

### Single Sign-On (SSO)
- **One account** works across ALL platforms
- User table shared in central Prisma database
- NextAuth.js for authentication
- JWT tokens with platform access control

### Test Account (Works Everywhere)
```
Email: demo@valora.com
Password: demo123
Role: SUPER_ADMIN
Access: All 5 platforms
```

## 📊 Database Architecture

### Central PostgreSQL Database (Google Cloud SQL)
Located at: `apps/loud-legacy-web/prisma/schema.prisma`

#### Core Models (Shared)
- **User** - Single user table for all platforms
- **Account** - OAuth providers (Google, etc.)
- **Session** - Active user sessions
- **PlatformAccess** - Controls which platforms each user can access

#### Platform-Specific Models

**VALORA:**
- Property, PropertyImage
- Valuation, ValuationScenario, Comparable
- Organization, OrganizationMember
- Portfolio, MarketData

**BUSINESS NOW:**
- BusinessProject
- BusinessTask
- BusinessMilestone

**LEGACY CRM:**
- CRMLead
- CRMDeal
- CRMActivity
- CRMNote

#### Payment Models (Shared)
- **Subscription** - Per-platform subscriptions (Stripe)
- **Payment** - Payment history and invoices

## 💳 Payment Architecture

### No Bundling Rule
Each platform has **separate subscriptions**:
- Users pay per platform they use
- No forced bundles
- Independent billing cycles

### Stripe Integration

#### Subscription Plans (per platform)
```typescript
enum SubscriptionPlan {
  FREE        // Limited features
  STARTER     // $29/month
  PROFESSIONAL // $79/month
  ENTERPRISE  // $199/month
}
```

#### Implementation Pattern
```typescript
// Check subscription for specific platform
const hasAccess = await checkSubscription(userId, 'VALORA', 'PROFESSIONAL');

// Each platform checks independently
if (subscription.platform === 'BUSINESS_NOW' &&
    subscription.status === 'ACTIVE' &&
    subscription.planType >= 'STARTER') {
  // Grant access
}
```

### Payment Flow
1. User signs up (free access initially)
2. Chooses platform to subscribe to
3. Redirected to Stripe Checkout
4. Webhook creates Subscription record
5. Platform access granted based on active subscription

## 🏗️ Platform Structure

### Directory Structure
```
loud-legacy/
├── apps/
│   ├── loud-legacy-web/      # VALORA (Complete ✓)
│   │   ├── prisma/            # Central database
│   │   ├── app/
│   │   │   ├── dashboard/
│   │   │   ├── api/
│   │   │   └── auth/
│   │   └── lib/auth.ts
│   │
│   ├── business-now-web/      # BUSINESS NOW (To build)
│   │   ├── app/
│   │   │   ├── dashboard/     # Projects, tasks, milestones
│   │   │   ├── api/           # Business project APIs
│   │   │   ├── auth/          # Shared auth from loud-legacy-web
│   │   │   └── billing/       # Stripe integration
│   │   └── lib/prisma.ts      # Points to shared database
│   │
│   ├── legacy-crm-web/        # LEGACY CRM (To build)
│   │   ├── app/
│   │   │   ├── dashboard/     # Leads, deals, pipeline
│   │   │   ├── api/           # CRM APIs
│   │   │   ├── auth/          # Shared auth
│   │   │   └── billing/       # Stripe integration
│   │   └── lib/prisma.ts
│   │
│   ├── hub-web/               # HUB (To build)
│   │   ├── app/
│   │   │   ├── dashboard/     # Platform switcher
│   │   │   ├── api/           # Hub APIs
│   │   │   └── auth/          # Shared auth
│   │   └── lib/prisma.ts
│   │
│   └── venuevr-web/           # VENUEVR (To build)
│       ├── app/
│       │   ├── dashboard/     # VR tours
│       │   ├── api/           # VR APIs
│       │   ├── auth/          # Shared auth
│       │   └── billing/       # Stripe integration
│       └── lib/prisma.ts
│
└── packages/
    ├── shared-auth/           # Shared authentication
    ├── shared-analytics/      # Shared analytics
    └── shared-design-system/  # Shared UI components
```

## 🚀 Building Each Platform

### Phase 1: Setup Shared Resources

#### 1. Copy Prisma Client to Each App
```bash
# In each app (business-now-web, legacy-crm-web, etc.)
cp apps/loud-legacy-web/lib/prisma.ts ./lib/prisma.ts
```

#### 2. Copy Auth Configuration
```bash
# Copy NextAuth setup
cp apps/loud-legacy-web/lib/auth.ts ./lib/auth.ts
cp -r apps/loud-legacy-web/app/api/auth ./app/api/auth
cp -r apps/loud-legacy-web/app/auth ./app/auth
```

#### 3. Add Dependencies
```json
{
  "dependencies": {
    "@prisma/client": "5.22.0",
    "next-auth": "^4.24.5",
    "bcryptjs": "^2.4.3",
    "stripe": "^14.0.0"
  }
}
```

### Phase 2: BUSINESS NOW Platform

#### Features to Build
1. **Dashboard**
   - Project overview cards
   - Task list with kanban board
   - Milestone tracker
   - AI business advisor chat

2. **Project Management**
   - Create/edit projects
   - Business plan editor (Executive Summary, Market Analysis, Financial Plan)
   - Task assignment and tracking
   - Milestone management

3. **Business Planning Tools**
   - Financial projections calculator
   - Market research templates
   - Business model canvas
   - Pitch deck generator

4. **API Endpoints**
   ```typescript
   /api/projects              // CRUD for projects
   /api/projects/[id]/tasks   // Task management
   /api/projects/[id]/milestones // Milestone tracking
   /api/business-plan         // AI-powered business plan generation
   ```

5. **Payment Integration**
   ```typescript
   /api/billing/subscribe     // Create Stripe subscription
   /api/billing/portal        // Stripe customer portal
   /api/webhooks/stripe       // Handle Stripe webhooks
   ```

#### Pricing Tiers
- **FREE**: 1 project, 10 tasks
- **STARTER** ($29/mo): 5 projects, unlimited tasks
- **PROFESSIONAL** ($79/mo): Unlimited projects, AI advisor, templates
- **ENTERPRISE** ($199/mo): Everything + priority support

### Phase 3: LEGACY CRM Platform

#### Features to Build
1. **Dashboard**
   - Sales pipeline visualization
   - Lead conversion funnel
   - Deal forecast chart
   - Activity timeline

2. **Lead Management**
   - Lead capture forms
   - Lead scoring (0-100)
   - Lead nurturing workflows
   - Bulk import/export

3. **Deal Pipeline**
   - Drag-and-drop pipeline stages
   - Deal probability tracking
   - Revenue forecasting
   - Win/loss analysis

4. **Activities & Communication**
   - Call logging
   - Email integration
   - Meeting scheduler
   - Task reminders

5. **API Endpoints**
   ```typescript
   /api/leads                 // CRUD for leads
   /api/leads/[id]/convert    // Convert lead to deal
   /api/deals                 // Deal pipeline management
   /api/activities            // Activity logging
   /api/reports/pipeline      // Pipeline analytics
   ```

6. **Payment Integration**
   ```typescript
   /api/billing/subscribe     // Stripe subscription
   /api/webhooks/stripe       // Webhooks
   ```

#### Pricing Tiers
- **FREE**: 50 leads, 10 deals
- **STARTER** ($29/mo): 500 leads, 100 deals
- **PROFESSIONAL** ($79/mo): Unlimited leads/deals, email integration
- **ENTERPRISE** ($199/mo): Everything + API access, custom fields

### Phase 4: HUB Platform

#### Features to Build
1. **Platform Switcher**
   - Unified dashboard showing activity across all platforms
   - Quick launch cards for each platform
   - Cross-platform search

2. **Account Management**
   - Profile settings
   - Notification preferences
   - Connected accounts (Google, etc.)

3. **Subscription Manager**
   - View all active subscriptions
   - Upgrade/downgrade plans
   - Billing history
   - Payment method management

4. **Analytics Dashboard**
   - Usage across platforms
   - Cost optimization insights
   - Feature adoption tracking

5. **API Endpoints**
   ```typescript
   /api/hub/activity          // Cross-platform activity feed
   /api/hub/subscriptions     // All user subscriptions
   /api/hub/analytics         // Usage analytics
   ```

#### Pricing
- **FREE**: Included with any platform subscription
- No standalone pricing

### Phase 5: VENUEVR Platform

#### Features to Build
1. **Dashboard**
   - Venue tour gallery
   - Tour analytics (views, engagement)
   - Client management

2. **VR Tour Creator**
   - 360° image upload
   - Hotspot placement
   - Tour navigation setup
   - Branding customization

3. **Tour Viewer**
   - WebXR-based VR viewer
   - Desktop/mobile/VR headset support
   - Social sharing

4. **Client Portal**
   - Share tours with clients
   - Collect feedback
   - Lead capture forms

5. **API Endpoints**
   ```typescript
   /api/venues                // Venue management
   /api/tours                 // Tour CRUD
   /api/tours/[id]/analytics  // View tracking
   /api/tours/[id]/share      // Share links
   ```

6. **Payment Integration**
   ```typescript
   /api/billing/subscribe     // Stripe subscription
   /api/webhooks/stripe       // Webhooks
   ```

#### Pricing Tiers
- **FREE**: 2 tours, 100 views/month
- **STARTER** ($49/mo): 10 tours, 1,000 views/month
- **PROFESSIONAL** ($99/mo): 50 tours, 10,000 views/month
- **ENTERPRISE** ($299/mo): Unlimited tours/views, white-label

## 🔧 Shared Components

### Authentication Middleware
```typescript
// middleware.ts (in each app)
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      // Check if user has access to this platform
      const platform = 'BUSINESS_NOW'; // or 'LEGACY_CRM', etc.
      const hasAccess = await checkPlatformAccess(token.id, platform);
      return !!token && hasAccess;
    },
  },
});
```

### Subscription Check Hook
```typescript
// hooks/useSubscription.ts
export function useSubscription(platform: Platform) {
  const { data: session } = useSession();
  const { data: subscription } = useSWR(
    `/api/subscriptions/${platform}`,
    fetcher
  );

  return {
    hasAccess: subscription?.status === 'ACTIVE',
    plan: subscription?.planType,
    needsUpgrade: (requiredPlan: SubscriptionPlan) => {
      return !subscription || subscription.planType < requiredPlan;
    },
  };
}
```

### Stripe Integration
```typescript
// lib/stripe.ts (shared)
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function createCheckoutSession(
  userId: string,
  platform: Platform,
  priceId: string
) {
  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing/cancel`,
    metadata: {
      userId,
      platform,
    },
  });

  return session;
}
```

## 🎨 Design System

All platforms share the same design system from `packages/shared-design-system`:

- **Colors**: Brand colors, semantic colors
- **Typography**: Consistent font scales
- **Components**: Button, Card, Input, Select, etc.
- **Layouts**: Dashboard layout, auth layout, marketing layout

## 🧪 Testing Strategy

### Test Account Usage
```bash
# 1. Run database migrations
cd apps/loud-legacy-web
npm run db:push

# 2. Seed database with test account
npm run seed

# 3. Test account will have access to:
- VALORA at http://localhost:3007
- BUSINESS_NOW at http://localhost:3001
- LEGACY_CRM at http://localhost:3002
- HUB at http://localhost:3003
- VENUEVR at http://localhost:3004

# Login with: demo@valora.com / demo123
```

## 📈 Deployment Strategy

### Netlify Configuration
Each platform deploys independently:

```toml
# netlify.toml (in each app)
[build]
  base = "apps/business-now-web"
  command = "npm install && npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"
  DATABASE_URL = "$DATABASE_URL"          # Shared Google Cloud SQL database
  NEXTAUTH_SECRET = "$NEXTAUTH_SECRET"
  STRIPE_SECRET_KEY = "$STRIPE_SECRET_KEY"
  STRIPE_WEBHOOK_SECRET = "$STRIPE_WEBHOOK_SECRET_BUSINESS_NOW"
```

### Environment Variables Required

**Shared across all platforms:**
- `DATABASE_URL` - Google Cloud SQL PostgreSQL connection
- `NEXTAUTH_SECRET` - JWT secret
- `NEXTAUTH_URL` - Platform-specific URL

**Platform-specific:**
- `STRIPE_SECRET_KEY` - Stripe API key
- `STRIPE_WEBHOOK_SECRET_[PLATFORM]` - Unique webhook secret per platform
- `NEXT_PUBLIC_APP_URL` - Public URL

## 🚢 Rollout Plan

### Week 1: Infrastructure
- [ ] Set up shared database package
- [ ] Copy auth to all platforms
- [ ] Set up Stripe integration boilerplate
- [ ] Create shared components library

### Week 2: Business Now
- [ ] Dashboard & navigation
- [ ] Project management CRUD
- [ ] Task kanban board
- [ ] Milestone tracker
- [ ] Stripe integration

### Week 3: Legacy CRM
- [ ] Dashboard & pipeline view
- [ ] Lead management
- [ ] Deal tracking
- [ ] Activity logging
- [ ] Stripe integration

### Week 4: Hub & VenueVR
- [ ] Hub platform switcher
- [ ] Subscription manager
- [ ] VenueVR tour creator (basic)
- [ ] VenueVR viewer
- [ ] Stripe integration

### Week 5: Testing & Polish
- [ ] End-to-end testing
- [ ] Payment flow testing
- [ ] Performance optimization
- [ ] Documentation
- [ ] Deploy to production

## 📚 Documentation

### For Developers
- [API Documentation](./API_DOCS.md) - Coming soon
- [Database Schema](./apps/loud-legacy-web/prisma/schema.prisma) - Complete
- [Authentication Guide](./AUTH_GUIDE.md) - Coming soon
- [Stripe Integration](./STRIPE_GUIDE.md) - Coming soon

### For Users
- [Getting Started](./USER_GUIDE.md) - Coming soon
- [Platform Comparison](./PLATFORM_COMPARISON.md) - Coming soon
- [Pricing](./PRICING.md) - Coming soon

## 🎯 Success Metrics

### Technical
- [ ] Single sign-on works across all platforms
- [ ] Test account accessible on all platforms
- [ ] Independent payment flows for each platform
- [ ] Database migrations work seamlessly
- [ ] Build times < 3 minutes per platform

### Business
- [ ] Users can subscribe to individual platforms
- [ ] Stripe webhooks process correctly
- [ ] Invoices generated automatically
- [ ] Subscription upgrades/downgrades work
- [ ] Customer portal accessible

## 🛠️ Current Status

✅ **COMPLETED:**
- Database schema extended for all platforms
- Subscription & payment models defined
- Test account with all-platform access
- VALORA platform fully functional
- AI building image analysis (VALORA)
- Google Maps integration (VALORA)
- CMS & Media management (VALORA)

🚧 **IN PROGRESS:**
- Business Now platform structure
- Legacy CRM platform structure
- Hub platform structure
- VenueVR platform structure

📋 **TODO:**
- Complete Business Now features
- Complete Legacy CRM features
- Complete Hub features
- Complete VenueVR features
- Stripe integration for all platforms
- Cross-platform testing
- Production deployment

## 🤝 Contributing

When building a new platform:

1. Copy auth setup from `loud-legacy-web`
2. Copy Prisma client setup
3. Reference shared design system
4. Implement platform-specific features
5. Add Stripe integration
6. Test with demo@valora.com account
7. Ensure build succeeds before committing
8. Update this documentation

---

**Last Updated:** January 13, 2026
**Status:** Schema Complete, Platforms In Development
**Test Account:** demo@valora.com / demo123
