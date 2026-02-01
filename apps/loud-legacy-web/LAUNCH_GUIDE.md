# 🚀 VALORA Dashboard Launch Guide

Your complete dashboard is ready to launch! Follow these steps to get it running.

## Prerequisites

Before launching, make sure you have:
- ✅ Node.js 18+ installed
- ✅ PostgreSQL database set up
- ✅ OpenAI API key ready

## Step 1: Environment Setup

1. Navigate to the app directory:
```bash
cd apps/loud-legacy-web
```

2. Ensure `.env.local` is configured with:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/valora_db"

# NextAuth
NEXTAUTH_URL="http://localhost:3007"
NEXTAUTH_SECRET="your-secret-key-here"

# OpenAI
OPENAI_API_KEY="your-openai-key-here"

# App Config
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3007"
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

## Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 14
- NextAuth for authentication
- Prisma for database
- OpenAI SDK
- bcryptjs for password hashing

## Step 3: Set Up Database

```bash
# Push Prisma schema to database
npm run db:push

# (Optional) Open Prisma Studio to view your database
npm run db:studio
```

## Step 4: Launch the Dashboard

```bash
npm run dev
```

The dashboard will be available at: **http://localhost:3007**

## Step 5: Create Your Account

1. Go to http://localhost:3007/auth/signup
2. Fill in:
   - Full Name
   - Email address
   - Password (minimum 8 characters)
3. Click "Create Account"
4. You'll be redirected to sign in

## Step 6: Sign In

1. Go to http://localhost:3007/auth/signin (or click the link)
2. Enter your email and password
3. Click "Sign In"
4. You'll be redirected to the dashboard!

Alternatively, click "Continue with Google" for OAuth authentication.

## Dashboard Features

### 🏠 Main Dashboard (`/dashboard`)
- Welcome message with your name
- Stats overview (valuations, properties, AI status)
- Quick action cards
- Getting started guide

### 💰 Valuations (`/dashboard/valuations`)
- View all your property valuations
- See purchase price, NOI, cap rate
- Filter by status (draft, in progress, completed)
- Create new valuations

### 🏢 Properties (`/dashboard/properties`)
- Grid view of all properties
- Property images and details
- Square footage, units, property type
- AI condition scores
- Create valuations from properties

### 🤖 AI Tools (`/dashboard/ai-tools`)
- **Upload property images** for AI analysis
- Get **condition scores** (0-100)
- Identify **wear and tear issues**
- Receive **AI recommendations** with cost estimates
- Smart geocoding from photos
- Property improvement suggestions

### ⚙️ Admin (`/dashboard/admin`) - Admins Only
- Platform analytics and user stats
- Most active users
- Popular actions
- Content Management System (CMS)
- User management

## Quick Actions

### Create Your First Property

1. Click "Add Property" or go to `/dashboard/properties?action=new`
2. Fill in:
   - Address
   - City, State, ZIP
   - Property Type (Commercial, Residential, Multifamily, Industrial)
   - Square Feet
   - Year Built
3. Submit and your property is created!

### Analyze Property with AI

1. Go to `/dashboard/ai-tools`
2. Click "Click to upload property image"
3. Select a photo of your property
4. Click "🤖 Analyze with AI"
5. See results:
   - Condition score
   - Issues identified
   - Recommendations with costs

### Create a Valuation

1. Go to `/dashboard/valuations`
2. Click "New Valuation"
3. Fill in financial details:
   - Purchase price
   - Income (rent, other income)
   - Expenses (taxes, insurance, maintenance)
   - Financing terms
4. System auto-calculates:
   - NOI (Net Operating Income)
   - Cap Rate
   - Cash-on-Cash Return
   - DSCR

## API Access

All backend tools are accessible via the API client:

```typescript
import api from '@/lib/api-client';

// List valuations
const { valuations } = await api.valuations.list();

// Create property
const property = await api.properties.create({
  address: "123 Main St",
  city: "San Francisco",
  propertyType: "COMMERCIAL"
});

// Analyze image
const analysis = await api.ai.analyzeImage(imageUrl);
```

## Making Yourself an Admin

If you need admin access:

1. Open Prisma Studio:
```bash
npm run db:studio
```

2. Navigate to `User` table
3. Find your user
4. Change `role` from `USER` to `ADMIN` or `SUPER_ADMIN`
5. Refresh your dashboard
6. You'll now see the Admin menu item

## Troubleshooting

### "Authentication required" errors
- Make sure you're signed in
- Check that `.env.local` has correct `NEXTAUTH_SECRET`
- Clear cookies and sign in again

### Database connection errors
- Verify `DATABASE_URL` in `.env.local`
- Ensure PostgreSQL is running
- Run `npm run db:push` to sync schema

### OpenAI API errors
- Check your API key is valid
- Ensure you have credits
- Verify key starts with `sk-proj-` or `sk-`

### Page not loading
- Check console for errors
- Ensure `npm run dev` is running
- Try clearing `.next` folder: `rm -rf .next`

### Authentication not working
- Verify `NEXTAUTH_URL` matches your dev URL
- Check `NEXTAUTH_SECRET` is set
- Clear browser cookies

## Production Deployment

See `BACKEND_README.md` for detailed production deployment instructions.

Quick checklist:
- [ ] Set up production database (Google Cloud SQL, Supabase, Railway)
- [ ] Configure all environment variables
- [ ] Run migrations: `npm run db:migrate`
- [ ] Build: `npm run build`
- [ ] Deploy to Vercel or Netlify
- [ ] Test all features
- [ ] Monitor logs and errors

## Available Routes

**Public:**
- `/` - Homepage
- `/valora` - VALORA product page
- `/auth/signin` - Sign in
- `/auth/signup` - Sign up

**Protected (requires authentication):**
- `/dashboard` - Main dashboard
- `/dashboard/valuations` - Valuations list
- `/dashboard/properties` - Properties grid
- `/dashboard/ai-tools` - AI features
- `/dashboard/admin` - Admin panel (admin only)

**API Endpoints:**
- `/api/auth/*` - Authentication
- `/api/valuations` - Valuations CRUD
- `/api/properties` - Properties CRUD
- `/api/ai/*` - AI features
- `/api/upload` - File uploads
- `/api/admin/*` - Admin endpoints

## Need Help?

- Check `BACKEND_README.md` - Complete API documentation
- Check `QUICK_START.md` - 5-minute setup guide
- Review code in `lib/api-client.ts` - All API functions
- Look at `lib/calculations.ts` - Financial formulas

## Next Steps

1. ✅ Sign up and sign in
2. ✅ Add your first property
3. ✅ Upload a photo and analyze with AI
4. ✅ Create your first valuation
5. ✅ Explore the admin panel (if admin)
6. ✅ Invite team members
7. ✅ Customize with your branding

---

## 🌐 Netlify Links

**Dashboard:**
https://app.netlify.com/sites/2172943d-002d-4d16-9916-845705df93d7

**To Deploy:**
Merge PR: https://github.com/jkowitt/loud-legacy/compare/main...claude/analyze-loud-legacy-aNPp5?expand=1

---

**Your VALORA dashboard is ready to launch! 🎉**
