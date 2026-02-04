import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * GET /api/settings
 * Return the current user's account info, subscription, and payment history
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = (session.user as any).id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
        subscriptions: {
          orderBy: { createdAt: 'desc' },
          include: {
            payments: {
              orderBy: { createdAt: 'desc' },
              take: 10,
            },
          },
        },
        platformAccess: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Find active subscription
    const activeSubscription = user.subscriptions.find(
      (s) => s.status === 'ACTIVE' || s.status === 'TRIALING'
    );

    // Usage stats
    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);

    const usageCount = await prisma.activityLog.count({
      where: {
        userId,
        action: 'property_record_lookup',
        createdAt: { gte: thisMonth },
      },
    });

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
        memberSince: user.createdAt,
      },
      subscription: activeSubscription
        ? {
            id: activeSubscription.id,
            plan: activeSubscription.planType,
            status: activeSubscription.status,
            billingCycle: activeSubscription.billingCycle,
            amount: activeSubscription.amount,
            currency: activeSubscription.currency,
            currentPeriodStart: activeSubscription.currentPeriodStart,
            currentPeriodEnd: activeSubscription.currentPeriodEnd,
            cancelAtPeriodEnd: activeSubscription.cancelAtPeriodEnd,
            trialEnd: activeSubscription.trialEnd,
            hasStripe: !!activeSubscription.stripeCustomerId,
          }
        : null,
      usage: {
        lookups: usageCount,
      },
      payments: activeSubscription?.payments.map((p) => ({
        id: p.id,
        amount: p.amount,
        currency: p.currency,
        status: p.status,
        last4: p.last4,
        brand: p.brand,
        paidAt: p.paidAt,
        invoiceUrl: p.invoiceUrl,
        receiptUrl: p.receiptUrl,
      })) || [],
      platforms: user.platformAccess.map((p) => p.platform),
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * PUT /api/settings
 * Update user profile (name, image)
 */
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = (session.user as any).id;
    const body = await request.json();

    const updateData: any = {};
    if (body.name !== undefined) updateData.name = body.name;

    const updated = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: { id: true, name: true, email: true, image: true },
    });

    return NextResponse.json({ user: updated });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
