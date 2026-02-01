# 🚨 URGENT: Create Test Account NOW

## Problem
Server can't test features without the test account existing in the database first.

## Solution: 3-Minute Setup

### Step 1: Open Google Cloud SQL Console
1. Go to: **https://console.cloud.google.com/sql/instances**
2. Login to your account
3. Select your **loud-legacy** database

### Step 2: Open SQL Editor
1. Click **SQL Editor** in the left sidebar
2. Or click **"Query"** button

### Step 3: Copy & Paste This SQL

```sql
INSERT INTO "User" (
  id,
  email,
  name,
  password,
  role,
  "emailVerified",
  "createdAt",
  "updatedAt"
)
VALUES (
  gen_random_uuid(),
  'demo@valora.com',
  'Demo Admin',
  '$2a$10$BsUmWxMW4feuOFvHUuzjueMhJaoi38Z4emUPOjsFbdadxtEgI0J.a',
  'SUPER_ADMIN',
  NOW(),
  NOW(),
  NOW()
)
ON CONFLICT (email)
DO UPDATE SET
  password = EXCLUDED.password,
  role = EXCLUDED.role,
  "emailVerified" = NOW(),
  "updatedAt" = NOW();
```

### Step 4: Click "Run" or Press Ctrl+Enter

You should see: **"INSERT 0 1"** or **"UPDATE 1"**

## ✅ Test Account Ready!

**Credentials:**
- Email: `demo@valora.com`
- Password: `demo123`
- Role: `SUPER_ADMIN`

## Now Test the Server

### If Testing Locally:
```bash
cd apps/loud-legacy-web
npm run dev
```

Visit: http://localhost:3007/auth/signin

### If Testing on Netlify:
Visit: https://your-site.netlify.app/auth/signin

## Verify It Works

After logging in, you should be able to:
- ✅ Access `/dashboard`
- ✅ Create valuations at `/dashboard/valuations/new`
- ✅ Upload building images with AI analysis
- ✅ Edit CMS content at `/dashboard/cms`
- ✅ Manage media at `/dashboard/media`

## Still Not Working?

### Check Environment Variables in Netlify:

**Required:**
- `DATABASE_URL` - Your Google Cloud SQL connection string ✓
- `NEXTAUTH_SECRET` - Run: `openssl rand -base64 32`
- `NEXTAUTH_URL` - Your site URL (e.g., `https://your-site.netlify.app`)

**Optional (for AI features):**
- `ANTHROPIC_API_KEY` - For building image analysis
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - For maps

### Check Database Connection:

Run this in Cloud SQL console or psql to verify user exists:
```sql
SELECT id, email, name, role, "emailVerified"
FROM "User"
WHERE email = 'demo@valora.com';
```

Should show one row with:
- email: demo@valora.com
- role: SUPER_ADMIN
- emailVerified: (a timestamp)

## Common Issues

**"Invalid credentials" error:**
- User might not exist - run the INSERT SQL again
- Password hash might be wrong - run the INSERT with ON CONFLICT to fix it

**Can't reach login page:**
- Check Netlify deployment succeeded
- Check build logs for errors
- Visit `https://your-site.netlify.app` first to wake up the site

**Login succeeds but redirects fail:**
- Check `NEXTAUTH_URL` matches your actual domain
- Check `NEXTAUTH_SECRET` is set and not empty

## Files You Can Use

- `CREATE_ACCOUNT_NOW.sql` - The SQL script (ready to copy/paste)
- `create-test-user.sql` - Same thing, different file
- `NETLIFY_SETUP.md` - Full deployment guide
- `QUICKSTART_TEST_ACCOUNT.md` - Serverless function method (requires working server)

## Need Help?

The SQL method above is the **fastest and most reliable** way to create the test account. It works even when the server is down or not deployed yet.
