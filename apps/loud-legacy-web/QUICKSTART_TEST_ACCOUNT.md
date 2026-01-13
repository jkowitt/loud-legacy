# 🚀 Quick Start: Create Test Account

## Easiest Method (After Netlify Deployment)

Once your site is deployed to Netlify, simply visit this URL in your browser:

```
https://your-site.netlify.app/.netlify/functions/create-test-account
```

**Replace `your-site.netlify.app` with your actual Netlify domain.**

This will automatically create the test account and return a JSON response confirming creation.

## Test Account Credentials

- **Email:** demo@valora.com
- **Password:** demo123
- **Role:** SUPER_ADMIN

## Login

After the account is created, login at:

```
https://your-site.netlify.app/auth/signin
```

## What This Account Can Do

✅ Create and manage property valuations
✅ Upload and analyze building images with AI
✅ Edit site content via CMS (/dashboard/cms)
✅ Manage media library (/dashboard/media)
✅ Access all dashboard features
✅ Full admin privileges

## Alternative Methods

If the serverless function doesn't work:

### Via Neon Console (Direct SQL)
1. Login to [Neon Console](https://console.neon.tech/)
2. Open SQL Editor
3. Run the SQL from `create-test-user.sql`

### Via Netlify Build
Add to `netlify.toml`:
```toml
[build]
  command = "npm run build && npm run seed"
```

See `NETLIFY_SETUP.md` for detailed instructions.

## Verification Checklist

- [ ] Visit `/.netlify/functions/create-test-account`
- [ ] See success message in JSON response
- [ ] Login at `/auth/signin` with demo@valora.com / demo123
- [ ] Access `/dashboard` successfully
- [ ] Can view `/dashboard/cms` (SUPER_ADMIN required)
- [ ] Can view `/dashboard/media` (SUPER_ADMIN required)

## Troubleshooting

**500 Error when visiting function URL:**
- Check DATABASE_URL is set in Netlify environment variables
- Make sure the site has been deployed at least once
- Check Netlify function logs for details

**"User already exists" message:**
- This is normal! The account was created successfully
- Just login with the credentials above

**Can't login:**
- Make sure NEXTAUTH_SECRET and NEXTAUTH_URL are set in Netlify
- Clear browser cookies and try again
- Check browser console for errors
