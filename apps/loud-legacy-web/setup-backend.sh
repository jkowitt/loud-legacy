#!/bin/bash

# VALORA Backend Setup Script
# Automates the backend setup process

set -e

echo "🚀 VALORA Backend Setup"
echo "======================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo -e "${GREEN}✓${NC} Created .env.local"
    echo ""
    echo -e "${YELLOW}⚠️  IMPORTANT: Edit .env.local with your database credentials${NC}"
    echo ""
    read -p "Press Enter to continue after you've edited .env.local..."
else
    echo -e "${GREEN}✓${NC} .env.local already exists"
fi

# Check if DATABASE_URL is set
if ! grep -q "^DATABASE_URL=\"postgresql://" .env.local 2>/dev/null; then
    echo -e "${RED}✗${NC} DATABASE_URL not properly configured in .env.local"
    echo "Please set your database connection string and run this script again"
    exit 1
fi

# Check if NEXTAUTH_SECRET is set
if ! grep -q "^NEXTAUTH_SECRET=" .env.local 2>/dev/null || grep -q "^NEXTAUTH_SECRET=\"generate-a-secret" .env.local; then
    echo ""
    echo "🔐 Generating NEXTAUTH_SECRET..."
    SECRET=$(openssl rand -base64 32)

    # Update .env.local with generated secret
    if grep -q "^NEXTAUTH_SECRET=" .env.local; then
        # Replace existing line
        if [[ "$OSTYPE" == "darwin"* ]]; then
            sed -i '' "s|^NEXTAUTH_SECRET=.*|NEXTAUTH_SECRET=\"$SECRET\"|" .env.local
        else
            sed -i "s|^NEXTAUTH_SECRET=.*|NEXTAUTH_SECRET=\"$SECRET\"|" .env.local
        fi
    else
        # Add new line
        echo "NEXTAUTH_SECRET=\"$SECRET\"" >> .env.local
    fi

    echo -e "${GREEN}✓${NC} Generated and saved NEXTAUTH_SECRET"
fi

echo ""
echo "📦 Installing dependencies..."
npm install
echo -e "${GREEN}✓${NC} Dependencies installed"

echo ""
echo "🔨 Generating Prisma Client..."
npx prisma generate
echo -e "${GREEN}✓${NC} Prisma Client generated"

echo ""
echo "🗄️  Pushing database schema..."
npx prisma db push
echo -e "${GREEN}✓${NC} Database schema created"

echo ""
read -p "Do you want to seed the database with demo data? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌱 Seeding database..."

    # Check if seed file exists
    if [ ! -f prisma/seed.ts ]; then
        echo "Creating seed file..."
        cat > prisma/seed.ts << 'SEED_EOF'
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

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
SEED_EOF
    fi

    npm run db:seed
    echo -e "${GREEN}✓${NC} Database seeded"
    echo ""
    echo "📧 Demo login credentials:"
    echo "   Email: demo@valora.com"
    echo "   Password: demo123"
fi

echo ""
echo -e "${GREEN}✅ Backend setup complete!${NC}"
echo ""
echo "Next steps:"
echo "1. npm run dev               - Start development server"
echo "2. npx prisma studio         - Open database GUI"
echo "3. Visit http://localhost:3007"
echo ""
echo "📖 See BACKEND_SETUP.md for full documentation"
