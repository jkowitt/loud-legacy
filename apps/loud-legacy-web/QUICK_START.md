# VALORA Quick Start Guide

Get up and running with VALORA in 5 minutes.

## 📋 Prerequisites

- Node.js 18+ installed
- PostgreSQL database (or use a free hosted option like Supabase)
- OpenAI API key

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
cd apps/loud-legacy-web
npm install
```

### 2. Configure Environment

Create `.env.local` file:

```bash
# Copy from example
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/valora_db"

# NextAuth (generate a random secret)
NEXTAUTH_URL="http://localhost:3007"
NEXTAUTH_SECRET="your-random-secret-here"

# OpenAI API Key
OPENAI_API_KEY="sk-proj-your-key-here"

# App Config
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3007"
```

**Generate a secret:**
```bash
openssl rand -base64 32
```

### 3. Setup Database

```bash
# Push schema to database
npm run db:push

# Or run migrations (for production)
npm run db:migrate
```

### 4. Start Development Server

```bash
npm run dev
```

Visit: http://localhost:3007

## 🎯 Using the Tools

### API Client

```typescript
import api from '@/lib/api-client';

// List valuations
const { valuations } = await api.valuations.list({
  status: 'COMPLETED',
  page: 1,
  limit: 20
});

// Create property
const property = await api.properties.create({
  address: '123 Main St',
  city: 'San Francisco',
  state: 'CA',
  propertyType: 'COMMERCIAL',
  squareFeet: 10000
});

// Analyze image with AI
const analysis = await api.ai.analyzeImage(imageUrl, propertyId);

// Generate recommendations
const recs = await api.ai.generateRecommendations(propertyId);

// Upload file
const result = await api.upload.uploadFile(file, 'properties');
```

### Financial Calculations

```typescript
import {
  calculateNOI,
  calculateCapRate,
  calculateCashOnCash,
  calculateValuationMetrics
} from '@/lib/calculations';

const income = {
  grossRent: 120000,
  otherIncome: 5000,
  vacancyRate: 5 // 5%
};

const expenses = {
  propertyTax: 15000,
  insurance: 3000,
  maintenance: 8000,
  propertyManagement: 6000
};

const financing = {
  loanAmount: 750000,
  interestRate: 5.5,
  loanTerm: 30,
  closingCosts: 25000
};

// Calculate all metrics at once
const metrics = calculateValuationMetrics(
  income,
  expenses,
  financing,
  1000000, // purchase price
  25 // down payment %
);

console.log(metrics);
// {
//   noi: 93250,
//   capRate: 9.33,
//   annualDebtService: 51186,
//   dscr: 1.82,
//   annualCashFlow: 42064,
//   totalCashRequired: 275000,
//   cashOnCash: 15.3
// }
```

## 🗄️ Database Management

```bash
# View/edit data visually
npm run db:studio

# Create migration
npm run db:migrate

# Push schema changes (dev only)
npm run db:push
```

## 🔑 Creating Your First User

Since you don't have a UI yet, create a user directly:

```typescript
// In Prisma Studio or via script
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const hashedPassword = await bcrypt.hash('your-password', 10);

await prisma.user.create({
  data: {
    email: 'admin@loud-legacy.com',
    name: 'Admin User',
    password: hashedPassword,
    role: 'SUPER_ADMIN',
    emailVerified: new Date()
  }
});
```

## 📊 Admin Tools

### CMS - Edit Content

```typescript
import { cms } from '@/lib/api-client';

// Get all content
const content = await cms.getContent();

// Update content
await cms.updateContent({
  key: 'homepage_hero_title',
  value: 'New Hero Title',
  type: 'TEXT',
  section: 'homepage'
});

// Delete content
await cms.deleteContent('old_key');
```

### Analytics

```typescript
import { analytics } from '@/lib/api-client';

// Get platform analytics (last 30 days)
const stats = await analytics.getAnalytics(30);

console.log(stats);
// {
//   overview: { totalUsers, totalValuations, activeUsers, ... },
//   distribution: { usersByRole, organizationsByPlan },
//   trends: { activity: [...] },
//   topUsers: [...],
//   popularActions: [...]
// }
```

## 🧪 Testing API Endpoints

Use cURL or Postman:

```bash
# List valuations
curl http://localhost:3007/api/valuations \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN"

# Create property
curl -X POST http://localhost:3007/api/properties \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -d '{
    "address": "456 Oak Ave",
    "city": "Los Angeles",
    "state": "CA",
    "propertyType": "MULTIFAMILY",
    "squareFeet": 8000,
    "units": 12
  }'

# Analyze image with AI
curl -X POST http://localhost:3007/api/ai/analyze-image \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -d '{
    "imageUrl": "https://example.com/property.jpg",
    "propertyId": "clx123abc"
  }'
```

## 🔒 Security Notes

1. **Never commit `.env.local`** - it's in .gitignore
2. **Rotate your OpenAI key** after initial setup
3. **Use strong NEXTAUTH_SECRET** in production
4. **Enable SSL/TLS** for production database

## 🐛 Troubleshooting

### "Prisma Client not found"
```bash
npm run postinstall
```

### "Cannot connect to database"
- Check DATABASE_URL format
- Ensure PostgreSQL is running
- Test connection: `psql $DATABASE_URL`

### "OpenAI API error"
- Verify API key is valid
- Check you have credits
- Ensure key starts with `sk-proj-` or `sk-`

### Build errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run dev
```

## 📚 Next Steps

1. **Read BACKEND_README.md** - Full API documentation
2. **Explore Prisma Studio** - Visualize your data
3. **Test AI features** - Upload property images
4. **Create test data** - Build sample valuations
5. **Customize** - Modify calculations for your use case

## 💡 Pro Tips

- Use `npm run db:studio` to explore data visually
- Check activity logs to debug issues
- Use TypeScript types from `@/lib/types`
- Import calculations from `@/lib/calculations`
- All API functions return promises - use async/await

## 🌐 Production Deployment

See `BACKEND_README.md` for detailed deployment instructions.

Quick checklist:
- [ ] Set up production database
- [ ] Configure environment variables
- [ ] Run migrations: `npm run db:migrate`
- [ ] Build: `npm run build`
- [ ] Deploy to Vercel/Netlify
- [ ] Test all endpoints
- [ ] Monitor logs

---

Need help? Check the full documentation in `BACKEND_README.md`
