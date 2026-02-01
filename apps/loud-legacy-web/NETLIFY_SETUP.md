# Netlify Deployment Setup

## Test Account Creation

Since your Google Cloud SQL database credentials are configured in Netlify, you can create the test account after deployment.

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

### Option 3: Direct SQL via Cloud SQL Console

1. Go to [Google Cloud SQL Console](https://console.cloud.google.com/sql/instances)
2. Open your instance → **Cloud Shell** or connect via `psql`
3. Run the SQL:

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
- `DATABASE_URL` - Google Cloud SQL PostgreSQL connection string
  - Format: `postgresql://postgres:PASSWORD@PUBLIC_IP:5432/legacyre?sslmode=require`
- `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
- `NEXTAUTH_URL` - Your Netlify site URL (e.g., `https://your-site.netlify.app`)

### Optional (for full functionality):
- `ANTHROPIC_API_KEY` - For AI building image analysis
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - For maps, Street View, Places, Distance Matrix
- `GOOGLE_CLIENT_ID` - For Google Sign-In
- `GOOGLE_CLIENT_SECRET` - For Google Sign-In

## Google Cloud SQL Setup for Netlify

1. **Create instance** at https://console.cloud.google.com/sql/instances
   - PostgreSQL 15
   - Choose a region close to your users
   - Set a strong password

2. **Enable Public IP** under Connections

3. **Authorize Netlify** under Connections → Authorized Networks:
   - Add `0.0.0.0/0` for serverless (Netlify does not have fixed IPs)
   - For tighter security, use Cloud SQL Proxy or a VPN

4. **Create the database:**
   ```bash
   psql "postgresql://postgres:PASSWORD@PUBLIC_IP:5432/postgres?sslmode=require" \
     -c "CREATE DATABASE legacyre;"
   ```

5. **Push the schema:**
   ```bash
   DATABASE_URL="postgresql://postgres:PASSWORD@PUBLIC_IP:5432/legacyre?sslmode=require" \
     npx prisma db push
   ```

## Test Account Credentials

After running the seed:

- **Email:** demo@valora.com
- **Password:** demo123
- **Role:** SUPER_ADMIN

Login at: `https://your-site.netlify.app/auth/signin`

## Verification

Test the account by:
1. Logging in at `/auth/signin`
2. Accessing `/admin` (requires SUPER_ADMIN)
3. Creating a new valuation at `/valora/dashboard`

## Troubleshooting

### Seed fails with "Prisma not initialized"
```bash
npx prisma generate
npm run seed
```

### User already exists
The seed script uses `upsert`, so it's safe to run multiple times.

### Can't connect to database
1. Go to **Google Cloud SQL** → your instance → **Connections**
2. Verify **Public IP** is enabled
3. Check your IP is in **Authorized Networks**
4. Verify `DATABASE_URL` includes `?sslmode=require`

### Authentication not working
1. Check `NEXTAUTH_SECRET` is set in Netlify env vars
2. Check `NEXTAUTH_URL` matches your deployment URL exactly
3. Redeploy after changing env vars
