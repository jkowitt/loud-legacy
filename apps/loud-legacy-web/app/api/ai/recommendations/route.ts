import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { generatePropertyRecommendations } from '@/lib/openai';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/ai/recommendations
 * Generate AI-powered property improvement recommendations
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { propertyId } = body;

    if (!propertyId) {
      return NextResponse.json(
        { error: 'Property ID is required' },
        { status: 400 }
      );
    }

    // Fetch property data
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      include: {
        images: true,
      },
    });

    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    // Parse existing issues
    let issues: string[] = [];
    if (property.aiWearTearNotes) {
      try {
        const parsed = JSON.parse(property.aiWearTearNotes);
        issues = Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        issues = [];
      }
    }

    // Generate recommendations
    const recommendations = await generatePropertyRecommendations({
      propertyType: property.propertyType,
      condition: property.aiConditionScore || 75,
      yearBuilt: property.yearBuilt || undefined,
      squareFeet: property.squareFeet || undefined,
      issues,
    });

    // Save recommendations to property
    await prisma.property.update({
      where: { id: propertyId },
      data: {
        aiRecommendations: JSON.stringify(recommendations),
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: (session.user as any).id,
        action: 'generated_property_recommendations',
        entityType: 'property',
        entityId: propertyId,
        details: {
          recommendationsCount: recommendations.length,
        },
      },
    });

    return NextResponse.json({
      success: true,
      recommendations,
    });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate recommendations',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
