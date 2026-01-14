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

    const platformAccess = await prisma.platformAccess.findMany({
      where: {
        userId,
      },
      select: {
        platform: true,
        enabled: true,
      },
    });

    return NextResponse.json({
      success: true,
      platformAccess,
    });
  } catch (error) {
    console.error("Error fetching platform access:", error);
    return NextResponse.json(
      { error: "Failed to fetch platform access" },
      { status: 500 }
    );
  }
}
