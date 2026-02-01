# VALORA Backend Setup Guide

Complete step-by-step guide to set up the backend for your VALORA application.

## Prerequisites

- Node.js 20+ installed
- PostgreSQL database (local or hosted)
- OpenAI API key (optional, for AI features)

## Step 1: Database Setup

### Option A: Local PostgreSQL

1. Install PostgreSQL:
```bash
# macOS
brew install postgresql@15
brew services start postgresql@15

# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql

# Windows
# Download from https://www.postgresql.org/download/windows/
```

2. Create database:
```bash
# Login to PostgreSQL
psql postgres

# Create database
CREATE DATABASE valora_db;

# Create user (optional)
CREATE USER valora_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE valora_db TO valora_user;

# Exit
\q
```

### Option B: Hosted Database (Recommended for Production)

**Free Options:**
- **Google Cloud SQL**: https://console.cloud.google.com/sql/instances (managed PostgreSQL)
- **Supabase**: https://supabase.com (includes auth & storage)
- **Railway**: https://railway.app (includes PostgreSQL)
- **Heroku Postgres**: https://www.heroku.com/postgres (free tier)

**Paid Options:**
- **AWS RDS**: Most popular for production
- **Digital Ocean**: Managed PostgreSQL
- **Google Cloud SQL**: Enterprise grade

After creating your database, you'll get a connection string like:
```
postgresql://username:password@host:5432/database_name
```

## Step 2: Environment Variables

1. Navigate to your app directory:
```bash
cd /home/user/loud-legacy/apps/loud-legacy-web
```

2. Copy the example environment file:
```bash
cp .env.example .env.local
```

3. Edit `.env.local` with your values:
```bash
# Database - REQUIRED
DATABASE_URL="postgresql://username:password@localhost:5432/valora_db"

# NextAuth - REQUIRED for authentication
NEXTAUTH_URL="http://localhost:3007"
NEXTAUTH_SECRET="generate-a-random-secret-here-use-openssl-rand-base64-32"

# OpenAI API - OPTIONAL (for AI features)
OPENAI_API_KEY="sk-proj-your-api-key-here"

# Optional: AWS S3 for production file storage
# AWS_ACCESS_KEY_ID="your-access-key"
# AWS_SECRET_ACCESS_KEY="your-secret-key"
# AWS_REGION="us-east-1"
# AWS_S3_BUCKET="valora-uploads"
```

### Generate NEXTAUTH_SECRET:
```bash
# Option 1: OpenSSL
openssl rand -base64 32

# Option 2: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Step 3: Install Dependencies

```bash
cd /home/user/loud-legacy/apps/loud-legacy-web
npm install
```

## Step 4: Run Prisma Migrations

This creates all the database tables:

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Or run migrations (for production)
npx prisma migrate dev --name init
```

## Step 5: Seed Database (Optional)

Create demo data for testing:

```bash
# Create seed file
cat > prisma/seed.ts << 'EOF'
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create demo user
  const hashedPassword = await bcrypt.hash('demo123', 10);

  const user = await prisma.user.upsert({
    where: { email: 'demo@valora.com' },
    update: {},
    create: {
      email: 'demo@valora.com',
      name: 'Demo User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('Created user:', user.email);

  // Create demo property
  const property = await prisma.property.create({
    data: {
      address: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      zip: '94102',
      country: 'USA',
      propertyType: 'COMMERCIAL',
      squareFeet: 25000,
      yearBuilt: 2010,
    },
  });

  console.log('Created property:', property.address);

  // Create demo valuation
  const valuation = await prisma.valuation.create({
    data: {
      userId: user.id,
      propertyId: property.id,
      name: 'Main Street Commercial Analysis',
      purchasePrice: 5000000,
      currentValue: 5500000,
      incomeData: {
        grossRent: 450000,
        otherIncome: 25000,
        vacancyRate: 5,
      },
      expenseData: {
        propertyTax: 60000,
        insurance: 15000,
        utilities: 20000,
        maintenance: 40000,
        propertyManagement: 30000,
      },
      financingData: {
        loanAmount: 3750000,
        interestRate: 6.5,
        loanTerm: 30,
      },
      noi: 285750,
      capRate: 5.19,
      status: 'PUBLISHED',
      visibility: 'PUBLIC',
    },
  });

  console.log('Created valuation:', valuation.name);
  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
EOF

# Run seed
npm run db:seed
```

## Step 6: Start Development Server

```bash
npm run dev
```

Your app will be available at: http://localhost:3007

## Step 7: Test the Backend

### Test Database Connection:
```bash
npx prisma studio
```
This opens a GUI to view your database at http://localhost:5555

### Test API Endpoints:

1. **Create a property:**
```bash
curl -X POST http://localhost:3007/api/properties \
  -H "Content-Type: application/json" \
  -d '{
    "address": "456 Market St",
    "propertyType": "COMMERCIAL"
  }'
```

2. **Test authentication:**
- Visit http://localhost:3007/auth/signin
- Try signing in with: demo@valora.com / demo123

3. **Test dashboard:**
- Visit http://localhost:3007/dashboard

## Netlify Deployment Setup

### Required Environment Variables in Netlify:

Go to: Site settings → Environment variables → Add variables

**Required:**
```
DATABASE_URL=your-production-database-url
NEXTAUTH_SECRET=your-secret-from-step-2
NEXTAUTH_URL=https://your-site.netlify.app
```

**Optional:**
```
OPENAI_API_KEY=your-openai-key
```

### Deploy:
```bash
# Push to main branch
git push origin main

# Or use Netlify CLI
npm install -g netlify-cli
netlify deploy --prod
```

## Database Management Commands

```bash
# View database in browser
npx prisma studio

# Reset database (CAUTION: deletes all data)
npx prisma db push --force-reset

# Create new migration
npx prisma migrate dev --name your_migration_name

# Apply migrations in production
npx prisma migrate deploy

# Generate Prisma Client after schema changes
npx prisma generate
```

## Troubleshooting

### "Can't reach database server"
- Check DATABASE_URL is correct
- Ensure PostgreSQL is running
- Verify firewall allows connections
- For hosted DB, check IP whitelist

### "Invalid `prisma.xxx()` invocation"
- Run: `npx prisma generate`
- Restart your dev server

### "NEXTAUTH_SECRET is not set"
- Add to .env.local
- Generate with: `openssl rand -base64 32`

### "OpenAI API errors"
- AI features work without API key (demo mode)
- Add OPENAI_API_KEY for real AI analysis

### Build fails on Netlify
- Ensure all environment variables are set
- Check build logs for specific errors
- Verify DATABASE_URL is accessible from Netlify

## Production Checklist

- [ ] PostgreSQL database created
- [ ] DATABASE_URL configured
- [ ] NEXTAUTH_SECRET generated
- [ ] NEXTAUTH_URL set to production URL
- [ ] Prisma migrations applied
- [ ] Environment variables set in Netlify
- [ ] Test authentication works
- [ ] Test API endpoints work
- [ ] Database backups configured
- [ ] SSL/HTTPS enabled

## Next Steps

1. Create your admin account
2. Invite team members
3. Create your first valuation
4. Configure organization settings
5. Set up automated backups

## Getting Help

- Check logs: `npm run dev` (local) or Netlify dashboard (production)
- Database issues: `npx prisma studio` to inspect data
- API issues: Check Network tab in browser DevTools

## Security Notes

- Never commit .env.local to git
- Rotate NEXTAUTH_SECRET regularly
- Use strong passwords for database
- Enable SSL for database connections in production
- Implement database backups
- Monitor API usage and rate limits
