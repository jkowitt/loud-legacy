# VALORA Backend Documentation

Complete backend implementation for VALORA - AI-Powered Real Estate Intelligence Platform.

## 🚀 Features

### Core Capabilities
- ✅ **User Authentication** - NextAuth with credentials and OAuth (Google)
- ✅ **Property Management** - Full CRUD for properties (Commercial, Residential, Multifamily, Industrial)
- ✅ **Valuation Engine** - Sophisticated underwriting with P&L modeling
- ✅ **AI Image Recognition** - OpenAI Vision API for property condition analysis
- ✅ **AI Recommendations** - Intelligent property improvement suggestions
- ✅ **Smart Geocoding** - Extract location from property photos
- ✅ **Portfolio Management** - Aggregate valuations and track performance
- ✅ **Team Collaboration** - Organizations, roles, and permissions
- ✅ **Admin CMS** - Content management without code changes
- ✅ **File Upload** - Image and document management
- ✅ **Activity Logging** - Complete audit trail
- ✅ **Analytics Dashboard** - Platform usage and metrics

## 📁 Project Structure

```
apps/loud-legacy-web/
├── app/
│   └── api/
│       ├── auth/[...nextauth]/    # Authentication endpoints
│       ├── valuations/             # Valuation CRUD
│       ├── properties/             # Property CRUD
│       ├── ai/                     # AI-powered features
│       │   ├── analyze-image/      # Image condition analysis
│       │   ├── geocode/            # Location extraction
│       │   └── recommendations/    # Property improvements
│       ├── upload/                 # File uploads
│       └── admin/                  # Admin endpoints
│           ├── cms/                # Content management
│           └── analytics/          # Platform analytics
├── lib/
│   ├── auth.ts                     # NextAuth configuration
│   ├── prisma.ts                   # Prisma client
│   └── openai.ts                   # OpenAI integrations
├── prisma/
│   └── schema.prisma               # Database schema
├── .env.local                      # Environment variables
└── .env.example                    # Environment template
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
cd apps/loud-legacy-web
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

**Required Variables:**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/valora_db"
NEXTAUTH_SECRET="your-secret-key"
OPENAI_API_KEY="sk-proj-your-key-here"
```

### 3. Set Up Database

```bash
# Push schema to database
npm run db:push

# Or run migrations
npm run db:migrate

# Open Prisma Studio to view data
npm run db:studio
```

### 4. Start Development Server

```bash
npm run dev
```

Server runs at: http://localhost:3007

## 📊 Database Schema

### Key Models

#### User & Authentication
- `User` - User accounts with roles (USER, ADMIN, ANALYST, VIEWER, SUPER_ADMIN)
- `Account` - OAuth accounts
- `Session` - User sessions
- `Organization` - Teams and companies
- `OrganizationMember` - Team membership with roles

#### Property & Valuation
- `Property` - Real estate properties with AI analysis
- `PropertyImage` - Property photos with AI annotations
- `Valuation` - Property valuations with financial modeling
- `ValuationScenario` - What-if scenarios (best/base/worst case)
- `Comparable` - Comparable sales data
- `Portfolio` - Grouped valuations

#### AI & Analytics
- `MarketData` - Market intelligence and trends
- `ActivityLog` - Complete audit trail
- `MediaAsset` - Uploaded files and images

#### Content Management
- `CMSContent` - Editable site content
- `SystemConfig` - Platform configuration

## 🔌 API Endpoints

### Authentication

**POST `/api/auth/signin`**
- Sign in with credentials or OAuth

**POST `/api/auth/signout`**
- Sign out current user

**GET `/api/auth/session`**
- Get current session

### Valuations

**GET `/api/valuations`**
- List all valuations for authenticated user
- Query params: `status`, `organizationId`, `page`, `limit`

**POST `/api/valuations`**
- Create new valuation
- Body: `{ propertyId, name, purchasePrice, incomeData, expenseData, ... }`

**GET `/api/valuations/:id`**
- Get specific valuation with all details

**PUT `/api/valuations/:id`**
- Update valuation (auto-recalculates metrics)

**DELETE `/api/valuations/:id`**
- Delete valuation

### Properties

**GET `/api/properties`**
- Search and list properties
- Query params: `search`, `propertyType`, `city`, `state`, `page`, `limit`

**POST `/api/properties`**
- Create new property
- Body: `{ address, city, state, propertyType, squareFeet, ... }`

### AI Features

**POST `/api/ai/analyze-image`**
- Analyze property image for condition and wear/tear
- Body: `{ imageUrl, propertyId? }`
- Returns: `{ conditionScore, issues, recommendations, tags }`

**POST `/api/ai/recommendations`**
- Generate property improvement recommendations
- Body: `{ propertyId }`
- Returns: `{ recommendations: [{ priority, recommendation, estimatedCost, valueIncrease, timeline }] }`

**POST `/api/ai/geocode`**
- Extract location info from property photo
- Body: `{ imageUrl }`
- Returns: `{ visibleAddress, propertyType, features, locationClues }`

### File Upload

**POST `/api/upload`**
- Upload files (max 10MB, images only)
- Form data: `file`, `folder`, `alt`, `caption`
- Returns: `{ url, fileName, ... }`

### Admin - CMS

**GET `/api/admin/cms`**
- Get all CMS content (admin only)
- Query params: `section`

**POST `/api/admin/cms`**
- Create or update CMS content (admin only)
- Body: `{ key, value, type, section }`

**DELETE `/api/admin/cms?key=...`**
- Delete CMS content (admin only)

### Admin - Analytics

**GET `/api/admin/analytics`**
- Get platform analytics (admin only)
- Query params: `period` (days, default 30)
- Returns: users, valuations, activity trends, top users, popular actions

## 🤖 AI Integration

### OpenAI Functions

#### Image Analysis
```typescript
import { analyzePropertyImage } from '@/lib/openai';

const analysis = await analyzePropertyImage(imageUrl);
// Returns: { conditionScore, issues, recommendations, tags }
```

#### Property Recommendations
```typescript
import { generatePropertyRecommendations } from '@/lib/openai';

const recs = await generatePropertyRecommendations({
  propertyType: 'COMMERCIAL',
  condition: 75,
  yearBuilt: 1995,
  issues: ['roof damage', 'hvac aging']
});
```

#### Geocoding from Image
```typescript
import { geocodePropertyFromImage } from '@/lib/openai';

const location = await geocodePropertyFromImage(imageUrl);
// Returns: { visibleAddress, propertyType, features, locationClues }
```

## 🔐 Authentication & Authorization

### User Roles

- **SUPER_ADMIN** - Full platform access
- **ADMIN** - Organization admin, CMS access
- **ANALYST** - Create and manage valuations
- **VIEWER** - Read-only access
- **USER** - Basic access

### Organization Roles

- **OWNER** - Full organization control
- **ADMIN** - Manage members and settings
- **MEMBER** - Create content
- **VIEWER** - Read-only within org

### Checking Permissions

```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const session = await getServerSession(authOptions);
if (!session) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

// Check role
const user = await prisma.user.findUnique({
  where: { id: session.user.id }
});

if (user.role !== 'ADMIN') {
  return NextResponse.json({ error: 'Access denied' }, { status: 403 });
}
```

## 📈 Financial Calculations

### Net Operating Income (NOI)
```typescript
function calculateNOI(incomeData: any, expenseData: any): number {
  const totalIncome = Object.values(incomeData).reduce((sum, val) => sum + val, 0);
  const totalExpenses = Object.values(expenseData).reduce((sum, val) => sum + val, 0);
  return totalIncome - totalExpenses;
}
```

### Cap Rate
```typescript
const capRate = (noi / currentValue) * 100;
```

### IRR, Cash-on-Cash, DSCR
These can be calculated based on the financial data structure in `ValuationScenario`.

## 📝 Activity Logging

Every significant action is logged automatically:

```typescript
await prisma.activityLog.create({
  data: {
    userId: session.user.id,
    organizationId: org.id,
    action: 'created_valuation',
    entityType: 'valuation',
    entityId: valuation.id,
    details: {
      valuationName: name,
      propertyAddress: property.address
    }
  }
});
```

**Common Actions:**
- `created_valuation`, `updated_valuation`, `deleted_valuation`
- `created_property`, `updated_property`
- `analyzed_property_image`
- `generated_property_recommendations`
- `uploaded_file`
- `updated_cms_content`

## 🔄 Database Migrations

### Create Migration
```bash
npm run db:migrate
```

### Push Schema (Dev)
```bash
npm run db:push
```

### View Data
```bash
npm run db:studio
```

## 🚨 Error Handling

All API routes follow this pattern:

```typescript
try {
  // Logic here
  return NextResponse.json(data);
} catch (error) {
  console.error('Error description:', error);
  return NextResponse.json(
    { error: 'User-friendly message' },
    { status: 500 }
  );
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (not logged in)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

## 🔒 Security Best Practices

1. ✅ **Environment Variables** - Never commit `.env.local`
2. ✅ **API Key Rotation** - Rotate OpenAI key regularly
3. ✅ **Input Validation** - Validate all user inputs
4. ✅ **Authentication** - Check session on every protected route
5. ✅ **Authorization** - Verify user permissions for resources
6. ✅ **SQL Injection** - Use Prisma (parameterized queries)
7. ✅ **File Upload** - Validate file type and size
8. ✅ **Rate Limiting** - Add rate limiting for production
9. ✅ **CORS** - Configure CORS in production
10. ✅ **Audit Logging** - Log all sensitive operations

## 📦 Deployment

### Environment Setup

1. Set up PostgreSQL database
2. Configure all environment variables
3. Run migrations: `npm run db:migrate`
4. Build: `npm run build`
5. Start: `npm start`

### Vercel Deployment

```bash
# Set environment variables in Vercel dashboard
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
vercel env add OPENAI_API_KEY

# Deploy
vercel --prod
```

### Database (Recommended Services)
- **Supabase** - Free tier with PostgreSQL
- **Neon** - Serverless PostgreSQL
- **Railway** - Easy PostgreSQL hosting
- **AWS RDS** - Production PostgreSQL

## 🐛 Troubleshooting

### Prisma Client Not Found
```bash
npm run postinstall
```

### Database Connection Error
- Check `DATABASE_URL` format
- Ensure database exists
- Verify network access

### OpenAI API Error
- Verify API key is valid
- Check API rate limits
- Ensure sufficient credits

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run lint`

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)

## ⚠️ Important Security Note

**The OpenAI API key in `.env.local` should be rotated immediately after setup.**

1. Go to https://platform.openai.com/api-keys
2. Delete the exposed key
3. Generate a new key
4. Update `.env.local` with the new key

## 🌐 Netlify Links

**Dashboard:**
https://app.netlify.com/sites/2172943d-002d-4d16-9916-845705df93d7

**To Deploy:**
Merge PR: https://github.com/jkowitt/loud-legacy/compare/main...claude/analyze-loud-legacy-aNPp5?expand=1

---

Built with ❤️ for Loud Legacy
