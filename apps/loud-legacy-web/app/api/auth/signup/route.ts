import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

// Rate limiting for signup (10 attempts per IP per hour)
const signupRateLimit = new Map<string, { count: number; resetTime: number }>();
const SIGNUP_RATE_LIMIT = 10;
const SIGNUP_RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function checkSignupRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = signupRateLimit.get(ip);
  if (!record || now > record.resetTime) {
    signupRateLimit.set(ip, { count: 1, resetTime: now + SIGNUP_RATE_WINDOW });
    return true;
  }
  if (record.count >= SIGNUP_RATE_LIMIT) return false;
  record.count++;
  return true;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    // Rate limit check
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    if (!checkSignupRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many signup attempts. Please try again later.' },
        { status: 429 }
      );
    }

    // Check if database is configured
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        {
          error: 'Database not configured. Please contact support or try again later.',
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { name, email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'USER',
        emailVerified: new Date(),
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    // Grant free BETA access to all platforms
    const platforms = ['VALORA', 'BUSINESS_NOW', 'LEGACY_CRM', 'HUB', 'VENUEVR', 'LOUD_WORKS'] as const;
    for (const platform of platforms) {
      await prisma.platformAccess.upsert({
        where: {
          userId_platform: {
            userId: user.id,
            platform,
          },
        },
        update: { enabled: true },
        create: {
          userId: user.id,
          platform,
          enabled: true,
        },
      });
    }

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'beta_user_registered',
        entityType: 'user',
        entityId: user.id,
        details: {
          email: user.email,
          isBeta: true,
          platformsGranted: platforms.length,
        },
      },
    });

    return NextResponse.json(
      { user, beta: true },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Error creating user:', error);

    // Handle specific database errors
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    if (errorMessage.includes('DATABASE_URL')) {
      return NextResponse.json(
        { error: 'Database not configured. Please contact support.' },
        { status: 503 }
      );
    }

    if (errorMessage.includes('Connection') || errorMessage.includes('connect')) {
      return NextResponse.json(
        { error: 'Unable to connect to the database. Please try again later.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create account. Please try again.' },
      { status: 500 }
    );
  }
}
