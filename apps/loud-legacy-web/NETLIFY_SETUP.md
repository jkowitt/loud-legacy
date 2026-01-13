# Netlify Deployment Setup

## Test Account Creation

Since your Neon database credentials are configured in Netlify, you can create the test account after deployment.

### Option 1: Netlify CLI (Recommended)

After your site is deployed, run:

```bash
netlify env:import .env.local  # If not already done
netlify dev
npm run seed
```

Or directly on Netlify:

```bash
netlify functions:invoke --name create-test-account
```

### Option 2: Via Netlify Build Hook

Add this to your `netlify.toml`:

```toml
[build]
  command = "npm run build && npm run seed"
```

**Note:** This will run the seed on every build. To run it only once, remove it after the first successful deployment.

### Option 3: Manual via Netlify Console

1. Go to your Netlify site dashboard
2. Navigate to **Deploys** > **Deploy settings** > **Build & deploy**
3. Add a **Build hook** or use the **Netlify CLI**
4. SSH into your deployment or use a serverless function:

```bash
# In Netlify Functions
cd /var/task
npm run seed
```

### Option 4: Direct SQL via Neon Console

1. Go to [Neon Console](https://console.neon.tech/)
2. Open your database
3. Run the SQL from `create-test-user.sql`:

```sql
INSERT INTO "User" (id, email, name, password, role, "emailVerified", "createdAt", "updatedAt")
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
ON CONFLICT (email) DO UPDATE SET
  password = '$2a$10$BsUmWxMW4feuOFvHUuzjueMhJaoi38Z4emUPOjsFbdadxtEgI0J.a',
  role = 'SUPER_ADMIN',
  "emailVerified" = NOW();
```

## Environment Variables Required

Make sure these are set in Netlify:

### Required:
- `DATABASE_URL` - Your Neon PostgreSQL connection string ✓ (already set)
- `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
- `NEXTAUTH_URL` - Your Netlify site URL (e.g., `https://your-site.netlify.app`)

### Optional (for full functionality):
- `ANTHROPIC_API_KEY` - For AI building image analysis
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - For maps and geocoding
- `OPENAI_API_KEY` - For AI features

## Test Account Credentials

After running the seed:

- **Email:** demo@valora.com
- **Password:** demo123
- **Role:** SUPER_ADMIN

Login at: `https://your-site.netlify.app/auth/signin`

## Verification

Test the account by:
1. Logging in at `/auth/signin`
2. Accessing `/dashboard/cms` (requires SUPER_ADMIN)
3. Accessing `/dashboard/media` (requires SUPER_ADMIN)
4. Creating a new valuation at `/dashboard/valuations/new`

## Troubleshooting

### Seed fails with "Prisma not initialized"
```bash
netlify functions:invoke --name build
# This will trigger prisma generate
npm run seed
```

### User already exists
The seed script uses `upsert`, so it's safe to run multiple times. It will update the password if the user exists.

### Can't connect to database
Verify `DATABASE_URL` in Netlify environment variables:
1. Go to **Site settings** > **Environment variables**
2. Check `DATABASE_URL` is set correctly
3. Ensure it includes `?sslmode=require` for Neon

### Authentication not working
1. Check `NEXTAUTH_SECRET` is set
2. Check `NEXTAUTH_URL` matches your deployment URL
3. Enable debug mode temporarily in `lib/auth.ts`
