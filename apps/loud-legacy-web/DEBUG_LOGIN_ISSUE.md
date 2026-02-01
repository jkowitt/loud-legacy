# 🔍 Debug: Why Login Isn't Working

## Common Issues & Solutions

### Issue 1: User Doesn't Exist in Database ❌

**Symptom:** "Invalid credentials" error

**Check:**
Run this in Cloud SQL console or psql:
```sql
SELECT email, role, password, "emailVerified"
FROM "User"
WHERE email = 'demo@valora.com';
```

**Fix:**
If you see 0 rows, run the SQL in `FIX_TEST_ACCOUNT.sql`

---

### Issue 2: Missing Environment Variables ❌

**Symptom:**
- Server error on login page
- Redirects don't work
- "Configuration error" message

**Check in Netlify:**
Go to: **Site settings** → **Environment variables**

**Required variables:**
```
DATABASE_URL           = postgresql://... (already set ✓)
NEXTAUTH_SECRET        = (must be set!)
NEXTAUTH_URL           = https://your-site.netlify.app
```

**Fix:**
1. Set `NEXTAUTH_SECRET`:
   ```
   4w1lZlQZQlk+x4McELDzeEoQnA0EWagOeiD0blx2cGw=
   ```
   Or generate new: `openssl rand -base64 32`

2. Set `NEXTAUTH_URL`:
   ```
   https://your-actual-site-name.netlify.app
   ```
   ⚠️ Must match EXACTLY (no trailing slash)

3. **Trigger new deploy** after setting variables

---

### Issue 3: Password Hash Mismatch ❌

**Symptom:** Login form accepts input but says "Invalid credentials"

**Fix:**
Run this SQL with a FRESH password hash:
```sql
DELETE FROM "User" WHERE email = 'demo@valora.com';

INSERT INTO "User" (
  id, email, name, password, role, "emailVerified", "createdAt", "updatedAt"
)
VALUES (
  gen_random_uuid(),
  'demo@valora.com',
  'Demo Admin',
  '$2a$10$CoNB03ab5x6tieqKeF1pR.uM1NFd2W..qgXoZzGrmhGLvxVe9U4yO',
  'SUPER_ADMIN',
  NOW(), NOW(), NOW()
);
```

**Verify hash format:**
- Should start with `$2a$10$`
- Should be exactly 60 characters long

---

### Issue 4: Wrong Login URL ❌

**Symptom:** 404 or page not found

**Correct URLs:**
- Production: `https://your-site.netlify.app/auth/signin`
- Local dev: `http://localhost:3007/auth/signin`

---

### Issue 5: NEXTAUTH_URL Mismatch ❌

**Symptom:** Login succeeds but redirects fail or loop

**Fix:**
1. Check current deployment URL in Netlify
2. Set `NEXTAUTH_URL` to EXACT match:
   ```
   https://your-site-name.netlify.app
   ```
3. No trailing slash
4. Must include `https://`
5. Redeploy after changing

---

## Step-by-Step Fix Process

### Step 1: Verify Database User
```sql
-- Run in Google Cloud SQL Console
SELECT * FROM "User" WHERE email = 'demo@valora.com';
```

**Expected result:**
- 1 row returned
- `role` = 'SUPER_ADMIN'
- `password` starts with '$2a$10$'
- `emailVerified` has a timestamp

**If not correct:** Run `FIX_TEST_ACCOUNT.sql`

---

### Step 2: Check Netlify Environment

Go to **Netlify** → **Site settings** → **Environment variables**

**Must have:**
- [x] `DATABASE_URL` - Your Google Cloud SQL connection string
- [ ] `NEXTAUTH_SECRET` - A random 32+ character string
- [ ] `NEXTAUTH_URL` - Your site URL (https://...)

**If missing:** Add them and trigger new deploy

---

### Step 3: Test Login Flow

1. **Visit:** `https://your-site.netlify.app/auth/signin`
2. **Enter:**
   - Email: `demo@valora.com`
   - Password: `demo123`
3. **Click:** Sign In

**Expected:** Redirect to `/dashboard`

---

### Step 4: Check Browser Console

Open browser DevTools (F12) → Console tab

**Look for errors like:**
- "Failed to fetch"
- "Network error"
- "CORS error"
- "Invalid credentials"

**Common fixes:**
- Clear cookies and cache
- Try incognito/private window
- Check Network tab for failed requests

---

### Step 5: Check Netlify Function Logs

Go to **Netlify** → **Functions** → **Logs**

**Look for:**
- Database connection errors
- "Prisma Client" errors
- "NextAuth" errors
- Environment variable warnings

---

## Quick Verification Script

Run this in Google Cloud SQL Console to verify everything:

```sql
-- 1. Check user exists
SELECT
  email,
  role,
  password LIKE '$2a$10$%' as "password_format_ok",
  "emailVerified" IS NOT NULL as "email_verified",
  LENGTH(password) as "password_length"
FROM "User"
WHERE email = 'demo@valora.com';

-- Expected:
-- email: demo@valora.com
-- role: SUPER_ADMIN
-- password_format_ok: true (t)
-- email_verified: true (t)
-- password_length: 60
```

---

## Nuclear Option: Complete Reset

If nothing works, do a complete reset:

```sql
-- 1. Delete old user
DELETE FROM "User" WHERE email = 'demo@valora.com';

-- 2. Create fresh user
INSERT INTO "User" (
  id, email, name, password, role, "emailVerified", "createdAt", "updatedAt"
)
VALUES (
  gen_random_uuid(),
  'demo@valora.com',
  'Demo Admin',
  '$2a$10$CoNB03ab5x6tieqKeF1pR.uM1NFd2W..qgXoZzGrmhGLvxVe9U4yO',
  'SUPER_ADMIN',
  NOW(), NOW(), NOW()
);

-- 3. Verify
SELECT email, role FROM "User" WHERE email = 'demo@valora.com';
```

Then in Netlify:
1. Clear all `NEXTAUTH_*` variables
2. Re-add them correctly:
   - `NEXTAUTH_SECRET` = `4w1lZlQZQlk+x4McELDzeEoQnA0EWagOeiD0blx2cGw=`
   - `NEXTAUTH_URL` = `https://your-site-name.netlify.app`
3. Trigger fresh deploy
4. Wait for deploy to complete (2-3 min)
5. Try login again

---

## Test Account Credentials

After everything is fixed:

```
Email: demo@valora.com
Password: demo123
```

Login at: `https://your-site.netlify.app/auth/signin`

---

## Still Not Working?

### Enable Debug Mode

Temporarily enable debug to see detailed errors:

1. In Netlify, set: `NODE_ENV=development`
2. Redeploy
3. Check browser console for detailed NextAuth logs
4. Check Netlify function logs

### Check Database Connection

Run this to verify Prisma can connect:
```sql
SELECT current_database(), current_user, version();
```

Should return your database name and PostgreSQL version.

---

## Most Common Root Cause

**99% of login issues are:**
1. ❌ `NEXTAUTH_SECRET` not set in Netlify
2. ❌ `NEXTAUTH_URL` doesn't match deployment URL
3. ❌ User doesn't exist or password hash is wrong

**Fix these three and login will work!**
