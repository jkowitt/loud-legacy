# Demo Account Setup & Testing Guide

## Overview

This guide will help you set up and test the demo account across all LOUD Legacy platforms.

**Demo Account Credentials:**
- Email: `demo@valora.com`
- Password: `demo123`
- Role: `SUPER_ADMIN`
- Platform Access: All platforms (VALORA, BUSINESS_NOW, LEGACY_CRM, HUB, VENUEVR)

---

## Step 1: Create Demo Account in Database

### Option A: Using Neon Console (Recommended)

1. Go to your [Neon Console](https://console.neon.tech/)
2. Select your project: `neondb`
3. Click on "SQL Editor"
4. Copy and paste the entire contents of `CREATE_TEST_ACCOUNT_ALL_PLATFORMS.sql`
5. Click "Run" to execute the SQL
6. Verify the account was created by checking the verification query results

### Option B: Using psql Command Line

```bash
psql "postgresql://neondb_owner:npg_2bHkKQlRE8sx@ep-late-mouse-ahud1v4a-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require" -f CREATE_TEST_ACCOUNT_ALL_PLATFORMS.sql
```

---

## Step 2: Install Dependencies for All Platforms

Run these commands from the repository root:

```bash
# Install root dependencies
npm install

# Install dependencies for each platform
cd apps/loud-legacy-web && npm install && cd ../..
cd apps/business-now-web && npm install && cd ../..
cd apps/legacy-crm-web && npm install && cd ../..
cd apps/hub-web && npm install && cd ../..
```

---

## Step 3: Generate Prisma Client for All Platforms

Each platform needs its Prisma client generated:

```bash
# VALORA
cd apps/loud-legacy-web
npx prisma generate
cd ../..

# Business Now
cd apps/business-now-web
npx prisma generate
cd ../..

# Legacy CRM
cd apps/legacy-crm-web
npx prisma generate
cd ../..

# Hub
cd apps/hub-web
npx prisma generate
cd ../..
```

---

## Step 4: Start All Platforms

Open **4 separate terminal windows** and run one platform in each:

### Terminal 1 - VALORA (Real Estate Valuation)
```bash
cd apps/loud-legacy-web
npm run dev
```
Access at: http://localhost:3007

### Terminal 2 - Business Now (Business Management)
```bash
cd apps/business-now-web
npm run dev
```
Access at: http://localhost:3001

### Terminal 3 - Legacy CRM (Customer Relationship Management)
```bash
cd apps/legacy-crm-web
npm run dev
```
Access at: http://localhost:3002

### Terminal 4 - Hub (Central Dashboard)
```bash
cd apps/hub-web
npm run dev
```
Access at: http://localhost:3003

---

## Step 5: Test Demo Account Login

### Test 1: Hub Platform (Central Dashboard)

1. Open browser to: http://localhost:3003
2. You should see the Hub signin page
3. Enter credentials:
   - Email: `demo@valora.com`
   - Password: `demo123`
4. Click "Sign In"
5. You should see the Hub dashboard with cards for all platforms
6. Verify you can see:
   - VALORA card
   - Business Now card
   - Legacy CRM card
   - VenueVR card (coming soon)

### Test 2: VALORA Platform

1. Open browser to: http://localhost:3007
2. If not already logged in, sign in with `demo@valora.com` / `demo123`
3. You should see the VALORA dashboard
4. Verify you can access:
   - Dashboard
   - Properties
   - Valuations
   - Analytics (if implemented)

### Test 3: Business Now Platform

1. Open browser to: http://localhost:3001/auth/signin
2. Sign in with `demo@valora.com` / `demo123`
3. You should see the Business Now dashboard
4. Verify you can see:
   - Project overview
   - Task stats
   - Quick actions
5. Try creating a new project:
   - The API should successfully create a project for your user

### Test 4: Legacy CRM Platform

1. Open browser to: http://localhost:3002/auth/signin
2. Sign in with `demo@valora.com` / `demo123`
3. You should see the Legacy CRM dashboard
4. Verify you can see:
   - Lead stats
   - Deal pipeline
   - Sales metrics
5. Try creating a new lead:
   - Fill in first name, last name, email
   - The API should successfully create a lead

---

## Step 6: Test Cross-Platform Single Sign-On (SSO)

1. Log in to Hub (http://localhost:3003)
2. Open a new tab and go to VALORA (http://localhost:3007)
3. You should be automatically logged in (same session)
4. Open another tab and go to Business Now (http://localhost:3001)
5. You should be automatically logged in
6. Open another tab and go to Legacy CRM (http://localhost:3002)
7. You should be automatically logged in

**Note:** All platforms share the same NextAuth session since they use the same `NEXTAUTH_SECRET`.

---

## Troubleshooting

### Issue: "Unauthorized" or "No access to platform"

**Cause:** User doesn't have PlatformAccess record for that platform

**Solution:**
```sql
-- Run in Neon Console to grant access
INSERT INTO "PlatformAccess" ("id", "userId", "platform", "enabled", "createdAt")
SELECT
  gen_random_uuid(),
  (SELECT id FROM "User" WHERE email = 'demo@valora.com'),
  'BUSINESS_NOW'::text,  -- or 'LEGACY_CRM', 'HUB', 'VENUEVR'
  true,
  NOW()
ON CONFLICT ("userId", "platform") DO UPDATE SET enabled = true;
```

### Issue: "Invalid credentials"

**Cause:** User not created in database or password hash incorrect

**Solution:** Re-run the entire `CREATE_TEST_ACCOUNT_ALL_PLATFORMS.sql` file

### Issue: "Prisma Client Not Found"

**Cause:** Prisma client not generated for that platform

**Solution:**
```bash
cd apps/<platform-name>
npx prisma generate
```

### Issue: Database Connection Error

**Cause:** DATABASE_URL not set in .env.local

**Solution:** Verify `.env.local` exists in the platform's directory with correct DATABASE_URL

### Issue: Port Already in Use

**Cause:** Another process is using the port

**Solution:**
```bash
# Find process using port (example: 3001)
lsof -i :3001

# Kill the process
kill -9 <PID>
```

---

## Verification Checklist

After following all steps, verify:

- [ ] Demo account created in database
- [ ] All platforms have dependencies installed
- [ ] All platforms have Prisma client generated
- [ ] All 4 platforms are running on their respective ports
- [ ] Can log in to Hub (port 3003) with demo@valora.com
- [ ] Can log in to VALORA (port 3007) with demo@valora.com
- [ ] Can log in to Business Now (port 3001) with demo@valora.com
- [ ] Can log in to Legacy CRM (port 3002) with demo@valora.com
- [ ] Hub dashboard shows all accessible platforms
- [ ] SSO works across platforms (log in once, access all)

---

## Platform URLs Reference

| Platform | Port | URL | Status |
|----------|------|-----|--------|
| VALORA | 3007 | http://localhost:3007 | ✅ Complete |
| Business Now | 3001 | http://localhost:3001 | ✅ Complete |
| Legacy CRM | 3002 | http://localhost:3002 | ✅ Complete |
| Hub | 3003 | http://localhost:3003 | ✅ Complete |
| VenueVR | 3004 | http://localhost:3004 | 🔴 Not Started |

---

## Database Schema Verification

Run this query in Neon Console to verify the demo account setup:

```sql
SELECT
  u.email,
  u.name,
  u.role,
  pa.platform,
  pa.enabled
FROM "User" u
LEFT JOIN "PlatformAccess" pa ON u.id = pa."userId"
WHERE u.email = 'demo@valora.com'
ORDER BY pa.platform;
```

Expected results:
```
email              | name       | role        | platform     | enabled
-------------------+------------+-------------+--------------+---------
demo@valora.com    | Demo Admin | SUPER_ADMIN | BUSINESS_NOW | true
demo@valora.com    | Demo Admin | SUPER_ADMIN | HUB          | true
demo@valora.com    | Demo Admin | SUPER_ADMIN | LEGACY_CRM   | true
demo@valora.com    | Demo Admin | SUPER_ADMIN | VALORA       | true
demo@valora.com    | Demo Admin | SUPER_ADMIN | VENUEVR      | true
```

---

## Next Steps

After successful login testing:

1. **Test API Endpoints:**
   - Create a project in Business Now
   - Create a lead and deal in Legacy CRM
   - Create a property valuation in VALORA

2. **Test Platform Features:**
   - Upload an image in VALORA
   - Create tasks in Business Now
   - Move deals through pipeline in Legacy CRM

3. **Payment Integration:**
   - Add Stripe keys to .env.local files
   - Test subscription flows
   - Verify webhook handling

4. **Build for Production:**
   - Run `npm run build` in each platform
   - Fix any TypeScript errors
   - Test production builds locally

---

**Last Updated:** January 14, 2026
**Demo Account:** demo@valora.com / demo123
**Platforms Ready:** 4 of 5 (Hub, VALORA, Business Now, Legacy CRM)
