#!/bin/bash
# Run this script on your local machine

set -e

echo "🚀 VALORA Backend Setup"
echo "======================="
echo ""

# Set environment variable to bypass checksum issues
export PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1

# Generate Prisma Client
echo "🔨 Generating Prisma Client..."
npx prisma generate

# Push schema to database
echo "🗄️  Pushing database schema to Neon..."
npx prisma db push

# Seed database (optional)
echo ""
read -p "Do you want to seed the database with demo data? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌱 Seeding database..."
    npm run db:seed
    echo ""
    echo "📧 Demo login credentials:"
    echo "   Email: demo@valora.com"
    echo "   Password: demo123"
fi

echo ""
echo "✅ Backend setup complete!"
echo ""
echo "Next steps:"
echo "1. npm run dev               - Start development server"
echo "2. npx prisma studio         - Open database GUI"
echo "3. Visit http://localhost:3007"
