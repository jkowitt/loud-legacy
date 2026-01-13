const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Checking for test account...');

  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: 'demo@valora.com' },
    });

    if (existingUser) {
      console.log('✅ Test account already exists:');
      console.log('   Email: demo@valora.com');
      console.log('   Password: demo123');
      console.log('   Role:', existingUser.role);
      console.log('   ID:', existingUser.id);
      return;
    }

    console.log('📝 Creating test account...');

    // Create test admin account
    const hashedPassword = await bcrypt.hash('demo123', 10);

    const testUser = await prisma.user.create({
      data: {
        email: 'demo@valora.com',
        name: 'Demo Admin',
        password: hashedPassword,
        role: 'SUPER_ADMIN',
        emailVerified: new Date(),
      },
    });

    console.log('✅ Test account created successfully!');
    console.log('   Email: demo@valora.com');
    console.log('   Password: demo123');
    console.log('   Role: SUPER_ADMIN');
    console.log('   ID:', testUser.id);

  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
