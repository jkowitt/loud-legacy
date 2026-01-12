# Deployment Guide

This document describes the automatic deployment setup for the Loud Legacy monorepo.

## Automatic Deployment Overview

The repository is configured for **continuous deployment** - every push to the repository triggers an automatic build and deployment.

### Deployment Triggers

| Event | Branch | Action |
|-------|--------|--------|
| Push to main/master | `main` or `master` | Production deployment to Netlify |
| Push to feature branch | `claude/**` or any branch | Preview deployment to Netlify |
| Pull request opened/updated | Any PR | Deploy preview with unique URL |

## How It Works

### 1. Netlify Integration (Recommended)

**Automatic Netlify Deployment** is the primary deployment method:

1. Connect your repository to Netlify via GitHub integration
2. Configure build settings (already set in `netlify.toml`)
3. Every push automatically triggers a deployment

**Configuration:** See `netlify.toml` in the repository root.

**Build Settings:**
- **Base directory:** `apps/loud-legacy-web`
- **Build command:** `npm install && npm run build`
- **Publish directory:** `out`
- **Node version:** 20

### 2. GitHub Actions CI/CD (Optional)

A GitHub Actions workflow (`.github/workflows/deploy.yml`) provides additional automation:

**What it does:**
- ✅ Runs on every push and pull request
- ✅ Installs dependencies and bootstraps workspace
- ✅ Runs linters across all apps
- ✅ Builds the loud-legacy-web app
- ✅ Deploys to Netlify (if configured)

**Required Secrets:** (only needed if using GitHub Actions for deployment)
- `NETLIFY_AUTH_TOKEN` - Your Netlify personal access token
- `NETLIFY_SITE_ID` - Your Netlify site ID

To add secrets:
1. Go to GitHub repository → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID`

## Getting Netlify Credentials

### Netlify Auth Token
1. Log in to [Netlify](https://app.netlify.com)
2. Go to User Settings → Applications → Personal access tokens
3. Click "New access token"
4. Copy the token and add it as a GitHub secret

### Netlify Site ID
1. Go to your site in Netlify dashboard
2. Navigate to Site Settings → General
3. Find "Site ID" under Site details
4. Copy the ID and add it as a GitHub secret

## Deployment Contexts

### Production Deployment
- **Trigger:** Push to `main` or `master` branch
- **URL:** Your custom domain or primary Netlify URL
- **Command:** `npm install && npm run build`

### Branch Previews
- **Trigger:** Push to any non-production branch
- **URL:** Unique URL like `https://branch-name--your-site.netlify.app`
- **Command:** `npm install && npm run build`

### Pull Request Previews
- **Trigger:** Open or update a pull request
- **URL:** Unique URL like `https://deploy-preview-123--your-site.netlify.app`
- **Command:** `npm install && npm run build`
- **Comment:** GitHub bot adds preview URL to PR

## Manual Deployment (Fallback)

If automatic deployment is not working, you can deploy manually:

### Using Netlify CLI
```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy to production
cd apps/loud-legacy-web
npm run build
netlify deploy --prod --dir=out

# Deploy as preview
netlify deploy --dir=out
```

### Using Git Push
```bash
# Push to trigger automatic deployment
git add .
git commit -m "Your commit message"
git push origin your-branch-name
```

## Deployment Checklist

Before deploying to production, ensure:

- [ ] All environment variables are set in Netlify dashboard
- [ ] Build succeeds locally: `cd apps/loud-legacy-web && npm run build`
- [ ] Linters pass: `npm run lint` from repository root
- [ ] All tests pass (when implemented)
- [ ] No console errors in production build
- [ ] Changes tested on preview deployment first

## Environment Variables

Configure these in Netlify dashboard (Site Settings → Environment Variables):

### Required Variables
- `NODE_VERSION` - Set to `20` (already in netlify.toml)
- `NEXT_TELEMETRY_DISABLED` - Set to `1` (already in netlify.toml)

### Optional Variables (per app)
See `.env.example` files in each app directory:
- `NEXT_PUBLIC_VALORA_URL`
- `NEXT_PUBLIC_VENUEVR_URL`
- `NEXT_PUBLIC_BUSINESS_URL`
- `NEXT_PUBLIC_DIY_URL`
- `NEXT_PUBLIC_CRM_URL`

## Monitoring Deployments

### Netlify Dashboard
- View deployment status: https://app.netlify.com
- Check build logs for errors
- Review deploy timeline and history

### GitHub Actions
- View workflow runs: Repository → Actions tab
- Check logs for build/lint failures
- Review deployment artifacts

## Troubleshooting

### Deployment Failed - Build Error
1. Check Netlify build logs for specific error
2. Verify Node version matches local environment (20)
3. Ensure all dependencies are in package.json
4. Test build locally: `cd apps/loud-legacy-web && npm run build`

### Deployment Failed - Timeout
1. Increase timeout in Netlify settings
2. Optimize build by removing unnecessary dependencies
3. Use build cache if available

### Preview Not Generated
1. Ensure Netlify GitHub integration is active
2. Check that PR is from a branch in the same repository
3. Verify Netlify build settings are correct

### Environment Variables Missing
1. Add required variables in Netlify dashboard
2. Redeploy after adding variables
3. Check variable names match code expectations

## Deployment Performance

Current build times (approximate):
- **Cold build:** 3-5 minutes
- **Cached build:** 1-2 minutes

To improve build performance:
- Enable Netlify build cache
- Use lockfile for consistent dependencies
- Minimize dependencies in loud-legacy-web app

## Rollback Process

If a deployment causes issues:

### Using Netlify Dashboard
1. Go to Deploys tab
2. Find the last working deployment
3. Click "Publish deploy" to rollback

### Using Git
```bash
# Revert the problematic commit
git revert <commit-hash>
git push origin main

# Or reset to previous commit (destructive)
git reset --hard <previous-commit>
git push --force origin main
```

## Support

- **Netlify Documentation:** https://docs.netlify.com
- **GitHub Actions Docs:** https://docs.github.com/actions
- **Repository Issues:** https://github.com/jkowitt/loud-legacy/issues
