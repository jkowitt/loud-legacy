/**
 * Netlify Function to create test account
 *
 * Deploy and visit: https://your-site.netlify.app/.netlify/functions/create-test-account
 *
 * This will create the demo@valora.com test account in your database.
 */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

exports.handler = async (event, context) => {
  // Only allow POST or GET requests
  if (event.httpMethod !== 'POST' && event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    console.log('🔍 Checking for test account...');

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: 'demo@valora.com' },
    });

    if (existingUser) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          success: true,
          message: 'Test account already exists',
          account: {
            email: 'demo@valora.com',
            password: 'demo123',
            role: existingUser.role,
          },
        }),
      };
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

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        message: 'Test account created successfully!',
        account: {
          email: 'demo@valora.com',
          password: 'demo123',
          role: testUser.role,
          id: testUser.id,
        },
        nextSteps: [
          'Login at /auth/signin',
          'Email: demo@valora.com',
          'Password: demo123',
        ],
      }),
    };

  } catch (error) {
    console.error('❌ Error:', error);

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        error: error.message,
        hint: 'Make sure DATABASE_URL is set in Netlify environment variables',
      }),
    };
  } finally {
    await prisma.$disconnect();
  }
};
