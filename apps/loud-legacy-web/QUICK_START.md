# VALORA Quick Start Guide

## 🚀 Super Fast Setup (5 minutes)

### Step 1: Get a Database (Choose One)

**Option A: Neon (Easiest - Serverless PostgreSQL)**
1. Go to https://neon.tech
2. Sign up (free)
3. Create a project
4. Copy the connection string

**Option B: Local PostgreSQL**
```bash
# macOS
brew install postgresql@15
brew services start postgresql@15
psql postgres -c "CREATE DATABASE valora_db;"

# Your DATABASE_URL will be:
# postgresql://localhost:5432/valora_db
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

## 📋 Essential Commands

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

## 🔧 Environment Variables (.env.local)

**Minimum Required:**
```bash
DATABASE_URL="postgresql://user:pass@host:5432/db"
NEXTAUTH_SECRET="your-random-secret-32-chars"
NEXTAUTH_URL="http://localhost:3007"
```

**Optional (AI Features):**
```bash
OPENAI_API_KEY="sk-proj-your-key"
```

---

## 🌐 Netlify Deployment

### 1. Set Environment Variables in Netlify

Go to: **Site settings → Environment → Add variable**

Add these:
```
DATABASE_URL       = your-production-database-url
NEXTAUTH_SECRET    = same-as-local-or-generate-new
NEXTAUTH_URL       = https://your-site.netlify.app
```

Optional:
```
OPENAI_API_KEY     = your-openai-key
```

### 2. Deploy
```bash
git push origin main
```

Netlify automatically deploys on push!

---

## ✅ Verification Checklist

After setup, test these:

- [ ] Visit http://localhost:3007 - Site loads
- [ ] Visit /dashboard - Dashboard accessible (no login required)
- [ ] Visit /dashboard/valuations/new - Can access form
- [ ] Create a valuation - Calculations work
- [ ] Visit /auth/signin - Login page loads
- [ ] Sign in with demo@valora.com - Authentication works
- [ ] Run `npx prisma studio` - Database GUI opens

---

## 🐛 Common Issues

### "Can't reach database server"
```bash
# Check DATABASE_URL in .env.local
cat .env.local | grep DATABASE_URL

# Test database connection
npx prisma db push
```

### "Prisma Client not generated"
```bash
npx prisma generate
```

### "Port 3007 already in use"
```bash
# Kill process on port 3007
lsof -ti:3007 | xargs kill -9

# Or use a different port
npm run dev -- -p 3008
```

### Build fails
```bash
# Clear build cache
rm -rf .next node_modules
npm install
npm run build
```

---

## 📖 Full Documentation

- **Backend Setup**: See `BACKEND_SETUP.md`
- **Database Schema**: See `prisma/schema.prisma`

---

## 🎯 What You Get

✅ **Working dashboard** at /dashboard
✅ **Valuation calculator** at /dashboard/valuations/new
✅ **Authentication system** at /auth/signin
✅ **API endpoints** at /api/*
✅ **Database** with Prisma ORM
✅ **AI integration** (optional)
✅ **Demo mode** (no login required)

---

## 💡 Tips

- Use `npx prisma studio` to view/edit database visually
- Demo mode works without database (mock data)
- API routes require database for persistence
- OpenAI key is optional (AI features work in demo mode)
- Start with free Neon database for testing
