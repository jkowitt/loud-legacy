# Legacy RE Quick Start Guide

## Super Fast Setup (5 minutes)

### Step 1: Get a Database (Choose One)

**Option A: Google Cloud SQL (Recommended)**
1. Go to https://console.cloud.google.com/sql/instances
2. Click **Create Instance** → **PostgreSQL**
3. Choose PostgreSQL 15, set a password, pick a region
4. Under **Connections**, enable **Public IP** and add your IP to Authorized Networks
5. Copy the Public IP address

Your `DATABASE_URL` will be:
```
postgresql://postgres:YOUR_PASSWORD@PUBLIC_IP:5432/legacyre?sslmode=require
```

Create the database:
```bash
# Connect via Cloud Shell or psql
psql "postgresql://postgres:YOUR_PASSWORD@PUBLIC_IP:5432/postgres?sslmode=require" -c "CREATE DATABASE legacyre;"
```

**Option B: Local PostgreSQL**
```bash
# macOS
brew install postgresql@15
brew services start postgresql@15
psql postgres -c "CREATE DATABASE legacyre;"

# Your DATABASE_URL will be:
# postgresql://localhost:5432/legacyre
```

### Step 2: Run Setup Script
```bash
cd apps/loud-legacy-web
./setup-backend.sh
```

The script will:
- Create .env.local
- Generate secrets
- Install dependencies
- Create database tables
- Seed demo data (optional)

### Step 3: Start App
```bash
npm run dev
```

Visit: http://localhost:3007

**Demo Login:**
- Email: `demo@valora.com`
- Password: `demo123`

---

## Essential Commands

```bash
# Development
npm run dev                    # Start dev server (http://localhost:3007)
npm run build                  # Build for production
npm start                      # Run production build

# Database
npx prisma studio              # Visual database editor (http://localhost:5555)
npx prisma db push             # Push schema changes to database
npx prisma generate            # Regenerate Prisma Client
npm run db:seed                # Add demo data

# Prisma Migrations (Production)
npx prisma migrate dev         # Create and apply migration
npx prisma migrate deploy      # Apply migrations (production)
```

---

## Environment Variables (.env.local)

**Minimum Required:**
```bash
DATABASE_URL="postgresql://postgres:password@CLOUD_SQL_IP:5432/legacyre?sslmode=require"
NEXTAUTH_SECRET="your-random-secret-32-chars"
NEXTAUTH_URL="http://localhost:3007"
```

**Optional (AI Features):**
```bash
ANTHROPIC_API_KEY="sk-ant-api-your-key"
```

---

## Netlify Deployment

### 1. Set Environment Variables in Netlify

Go to: **Site settings → Environment → Add variable**

Add these:
```
DATABASE_URL       = postgresql://postgres:password@CLOUD_SQL_IP:5432/legacyre?sslmode=require
NEXTAUTH_SECRET    = same-as-local-or-generate-new
NEXTAUTH_URL       = https://your-site.netlify.app
```

Optional:
```
ANTHROPIC_API_KEY             = your-anthropic-key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = your-google-maps-key
```

### 2. Authorize Netlify IPs

In Google Cloud SQL → your instance → **Connections** → **Authorized Networks**, add:
- `0.0.0.0/0` (for Netlify serverless — restrict further in production)

### 3. Deploy
```bash
git push origin main
```

Netlify automatically deploys on push.

---

## Verification Checklist

After setup, test these:

- [ ] Visit http://localhost:3007 - Site loads
- [ ] Visit /valora/dashboard - Dashboard accessible
- [ ] Create a valuation - Calculations work
- [ ] Visit /auth/signin - Login page loads
- [ ] Sign in with demo@valora.com - Authentication works
- [ ] Run `npx prisma studio` - Database GUI opens

---

## Common Issues

### "Can't reach database server"
```bash
# Check DATABASE_URL in .env.local
cat .env.local | grep DATABASE_URL

# For Cloud SQL: ensure your IP is in Authorized Networks
# Go to: https://console.cloud.google.com/sql/instances → Connections

# Test database connection
npx prisma db push
```

### "SSL connection error"
Make sure your DATABASE_URL ends with `?sslmode=require` for Cloud SQL.

### "Prisma Client not generated"
```bash
npx prisma generate
```

### "Port 3007 already in use"
```bash
lsof -ti:3007 | xargs kill -9
npm run dev -- -p 3008
```

### Build fails
```bash
rm -rf .next node_modules
npm install
npm run build
```

---

## Full Documentation

- **Backend Setup**: See `BACKEND_SETUP.md`
- **Database Schema**: See `prisma/schema.prisma`
- **Environment Variables**: See `ENVIRONMENT_VARIABLES_CHECKLIST.md`

---

## What You Get

- **Working dashboard** at /valora/dashboard
- **Underwriting workspace** with rent rolls, P&L, and scenario analysis
- **Authentication system** at /auth/signin
- **API endpoints** at /api/*
- **Database** with Prisma ORM on Google Cloud SQL
- **AI building analysis** (with Anthropic API key)
- **Google Maps integration** (with Google Maps API key)
- **Demo mode** (no login required)

---

## Tips

- Use `npx prisma studio` to view/edit database visually
- Demo mode works without database (mock data)
- API routes require database for persistence
- Start with a small Cloud SQL instance (db-f1-micro is ~$7/month)
- Scale up the instance as needed without changing code
