# Environment Variables Checklist for Netlify

## ✅ Required Variables (Server Won't Work Without These)

Go to: **Netlify Dashboard** → **Site settings** → **Environment variables**

### 1. DATABASE_URL ✓
**Status:** Already set (you mentioned Neon variable is in Netlify)
```
postgresql://username:password@host.neon.tech/dbname?sslmode=require
```

### 2. NEXTAUTH_SECRET ⚠️
**Status:** Needs to be set
**Generate it:**
```bash
openssl rand -base64 32
```
Or use this pre-generated one:
```
4w1lZlQZQlk+x4McELDzeEoQnA0EWagOeiD0blx2cGw=
```

### 3. NEXTAUTH_URL ⚠️
**Status:** Needs to match your deployment
**Value:**
- Production: `https://your-site-name.netlify.app`
- Custom domain: `https://yourdomain.com`

**Important:** Must match EXACTLY (including https://)

---

## Optional Variables (For Full Functionality)

### 4. ANTHROPIC_API_KEY
**For:** AI building image analysis
**Get it:** https://console.anthropic.com/
**Format:** `sk-ant-api03-...`

Without this, AI analysis will show mock data.

### 5. NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
**For:** Property maps and GPS geocoding
**Get it:** https://console.cloud.google.com/google/maps-apis
**Format:** `AIza...`

**Enable these APIs:**
- Maps JavaScript API
- Geocoding API

**Set restrictions:**
- HTTP referrers: `https://your-site.netlify.app/*`

Without this, maps will show mock/demo mode.

### 6. OPENAI_API_KEY (Optional)
**For:** Additional AI features (if used)
**Get it:** https://platform.openai.com/api-keys
**Format:** `sk-proj-...`

---

## How to Set Variables in Netlify

### Method 1: Via Netlify UI
1. Go to **Site settings** → **Environment variables**
2. Click **Add a variable**
3. Choose **Add a single variable**
4. Enter key and value
5. Select scope: **Same value for all deploy contexts**
6. Click **Create variable**

### Method 2: Via Netlify CLI
```bash
netlify env:set NEXTAUTH_SECRET "your-secret-here"
netlify env:set NEXTAUTH_URL "https://your-site.netlify.app"
netlify env:set ANTHROPIC_API_KEY "sk-ant-api-your-key"
netlify env:set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY "AIza-your-key"
```

### Method 3: Bulk Import
Create a `.env` file:
```bash
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="https://your-site.netlify.app"
ANTHROPIC_API_KEY="sk-ant-api-your-key"
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="AIza-your-key"
```

Then import:
```bash
netlify env:import .env
```

---

## Verify Variables Are Set

### Via Netlify UI:
1. Go to **Site settings** → **Environment variables**
2. You should see all variables listed
3. Values are hidden for security, but you'll see the key names

### Via Netlify CLI:
```bash
netlify env:list
```

---

## After Setting Variables

1. **Trigger a new deploy:**
   - Go to **Deploys** → **Trigger deploy** → **Deploy site**
   - Or push a new commit to trigger automatic deployment

2. **Wait for build to complete** (2-3 minutes)

3. **Create test account** using SQL in Neon console (see URGENT_TEST_ACCOUNT_SETUP.md)

4. **Test login** at `https://your-site.netlify.app/auth/signin`

---

## Troubleshooting

### "Server Error" on login page:
- Check `NEXTAUTH_SECRET` is set and not empty
- Check `DATABASE_URL` is correct

### Login fails with "Invalid credentials":
- Test account doesn't exist yet - run SQL in Neon console
- Check database connection by running: `SELECT * FROM "User" LIMIT 1;`

### Redirects to wrong URL after login:
- Check `NEXTAUTH_URL` matches your actual site URL exactly
- Must include `https://` and have no trailing slash

### AI features not working:
- Set `ANTHROPIC_API_KEY` for building analysis
- Set `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` for maps

### Environment changes not reflected:
- Variables only update on new deploys
- Trigger a new deploy after changing variables
- Old deploys keep old variable values

---

## Quick Test Checklist

After setting all variables and deploying:

- [ ] Visit site homepage - no errors
- [ ] Visit `/auth/signin` - page loads
- [ ] Login with demo@valora.com / demo123 - succeeds
- [ ] Redirects to `/dashboard` - shows dashboard
- [ ] Visit `/dashboard/valuations/new` - form loads
- [ ] Upload building image - AI analysis works (if API key set)
- [ ] Visit `/dashboard/cms` - CMS editor loads
- [ ] Visit `/dashboard/media` - media library loads

If any step fails, check the corresponding environment variable is set correctly.
