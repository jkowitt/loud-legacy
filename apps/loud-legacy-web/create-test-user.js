const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const PLATFORMS = ['VALORA', 'BUSINESS_NOW', 'LEGACY_CRM', 'HUB', 'VENUEVR'];

async function main() {
  console.log('🔍 Checking for demo account...');

  try {
    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email: 'demo@valora.com' },
      include: { platformAccess: true },
    });

    if (user) {
      console.log('✅ Demo account already exists:');
      console.log('   Email: demo@valora.com');
      console.log('   Password: demo123');
      console.log('   Role:', user.role);
      console.log('   ID:', user.id);
    } else {
      console.log('📝 Creating demo account...');

      // Create demo admin account
      const hashedPassword = await bcrypt.hash('demo123', 10);

      user = await prisma.user.create({
        data: {
          email: 'demo@valora.com',
          name: 'Demo Admin',
          password: hashedPassword,
          role: 'SUPER_ADMIN',
          emailVerified: new Date(),
        },
        include: { platformAccess: true },
      });

      console.log('✅ Demo account created successfully!');
      console.log('   Email: demo@valora.com');
      console.log('   Password: demo123');
      console.log('   Role: SUPER_ADMIN');
      console.log('   ID:', user.id);
    }

    // Check and create platform access for all platforms
    console.log('\n🔐 Checking platform access...');
    const existingPlatforms = user.platformAccess.map((pa) => pa.platform);
    const missingPlatforms = PLATFORMS.filter((p) => !existingPlatforms.includes(p));

    if (missingPlatforms.length === 0) {
      console.log('✅ All platform access already granted:');
    } else {
      console.log(`📝 Granting access to ${missingPlatforms.length} platform(s)...`);

      for (const platform of missingPlatforms) {
        await prisma.platformAccess.create({
          data: {
            userId: user.id,
            platform: platform,
            enabled: true,
          },
        });
        console.log(`   ✅ Granted access to ${platform}`);
      }
    }

    // Display final platform access status
    const finalAccess = await prisma.platformAccess.findMany({
      where: { userId: user.id },
    });
    console.log('\n📊 Platform Access Summary:');
    for (const access of finalAccess) {
      console.log(`   ${access.enabled ? '✅' : '❌'} ${access.platform}`);
    }

    console.log('\n🎉 Demo account ready!');
    console.log('   Login with: demo@valora.com / demo123');

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
