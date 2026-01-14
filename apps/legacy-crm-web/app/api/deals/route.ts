import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    const deals = await prisma.cRMDeal.findMany({
      where: {
        userId,
      },
      include: {
        lead: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      deals,
    });
  } catch (error) {
    console.error("Error fetching deals:", error);
    return NextResponse.json(
      { error: "Failed to fetch deals" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await request.json();

    const { title, description, value, currency, stage, probability, leadId, expectedCloseDate } = body;

    if (!title || value === undefined) {
      return NextResponse.json(
        { error: "Title and value are required" },
        { status: 400 }
      );
    }

    const deal = await prisma.cRMDeal.create({
      data: {
        userId,
        title,
        description,
        value,
        currency: currency || "USD",
        stage: stage || "PROSPECTING",
        probability,
        leadId,
        expectedCloseDate: expectedCloseDate ? new Date(expectedCloseDate) : null,
      },
      include: {
        lead: true,
      },
    });

    return NextResponse.json({
      success: true,
      deal,
    });
  } catch (error) {
    console.error("Error creating deal:", error);
    return NextResponse.json(
      { error: "Failed to create deal" },
      { status: 500 }
    );
  }
}
