import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
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
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'user_registered',
        entityType: 'user',
        entityId: user.id,
        details: {
          email: user.email,
        },
      },
    });

    return NextResponse.json(
      { user },
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
