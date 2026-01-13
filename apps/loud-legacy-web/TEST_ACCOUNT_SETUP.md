# Test Account Setup Instructions

## Test Account Credentials

**Email:** demo@valora.com  
**Password:** demo123  
**Role:** SUPER_ADMIN

## Issue: Database Connectivity

The current environment cannot reach the Neon PostgreSQL database due to network restrictions. This is why the test account cannot be created automatically.

## Solution Options

### Option 1: Create User via Netlify/Production Database

If you're deploying to Netlify, the database will be accessible from there. To create the test user:

1. **Access your database** directly via Neon console or psql
2. **Run this SQL command:**

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
  "emailVerified" = NOW(),
  "updatedAt" = NOW();
```

### Option 2: Run Seed Script After Deployment

Once your app is deployed to Netlify:

1. **Access Netlify console**
2. **Run this command** in Netlify Functions or via SSH:

```bash
npm run db:seed
```

Note: The seed script has a syntax issue in package.json. You may need to run:

```bash
npx tsx prisma/seed.ts
```

### Option 3: Create User via Signup Page

1. **Navigate to:** https://your-domain.com/auth/signup
2. **Sign up with:**
   - Email: demo@valora.com
   - Password: demo123
   - Name: Demo Admin
3. **Manually update role** in database:

```sql
UPDATE "User" 
SET role = 'SUPER_ADMIN' 
WHERE email = 'demo@valora.com';
```

## Verification

After creating the user, test login at:
- Local: http://localhost:3007/auth/signin
- Production: https://your-domain.com/auth/signin

## Password Hash

If you need to reset the password manually, use this bcrypt hash for "demo123":
```
$2a$10$BsUmWxMW4feuOFvHUuzjueMhJaoi38Z4emUPOjsFbdadxtEgI0J.a
```

## Full User Record

The complete user should have:
- **email:** demo@valora.com
- **password:** (bcrypt hash above)
- **name:** Demo Admin
- **role:** SUPER_ADMIN
- **emailVerified:** (current timestamp)
- **createdAt:** (current timestamp)
- **updatedAt:** (current timestamp)

## Troubleshooting

If login still doesn't work:

1. **Check environment variables:**
   - NEXTAUTH_SECRET is set
   - NEXTAUTH_URL matches your domain
   - DATABASE_URL is correct

2. **Check database:**
   - User exists: `SELECT * FROM "User" WHERE email = 'demo@valora.com';`
   - Password is hashed (starts with $2a$)
   - emailVerified is not NULL

3. **Check NextAuth:**
   - Enable debug mode in lib/auth.ts
   - Check browser console for errors
   - Check Netlify function logs

4. **Check credentials provider:**
   - CredentialsProvider is enabled in lib/auth.ts
   - bcrypt is comparing passwords correctly
