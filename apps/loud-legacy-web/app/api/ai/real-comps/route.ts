import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { checkPropertyRecordAccess, recordPropertyRecordUsage, OVERAGE_PRICE_CENTS } from "@/lib/usage";
import { fetchRecentSales } from "@/lib/rentcast";

export const dynamic = 'force-dynamic';

/**
 * Real Comps API — fetches verified recent sales from RentCast.
 *
 * This is an opt-in, user-initiated pull that counts against
 * the user's property record lookup quota.
 * Each pull = 1 lookup. Overage is $2.00 per pull.
 *
 * The endpoint searches for recent sales within a radius of the
 * subject property. If fewer than 4 comps are found at 0.5 mi,
 * it automatically expands to 1 mile.
 */
export async function POST(request: NextRequest) {
  try {
    // Require authentication
    const session = await getServerSession(authOptions);
    const userId = (session?.user as { id?: string })?.id;

    if (!userId) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const body = await request.json();
    const {
      address, city, state, zipCode,
      latitude, longitude,
      propertyType,
      lookbackMonths = "6",
      limit = 6,
    } = body;

    if (!address || !city || !state) {
      return NextResponse.json(
        { error: "address, city, and state are required" },
        { status: 400 }
      );
    }

    if (!process.env.RENTCAST_API_KEY) {
      return NextResponse.json({
        success: false,
        error: "Real comparable sales require a RentCast API key. Configure RENTCAST_API_KEY to enable this feature.",
        comps: [],
        source: "unavailable",
      });
    }

    // Check usage limits (always allowed, but may be flagged as overage)
    const { willBeOverage, usage } = await checkPropertyRecordAccess(userId);

    // Fetch real comps from RentCast
    const result = await fetchRecentSales({
      address,
      city,
      state,
      zipCode,
      latitude: latitude ? parseFloat(latitude) : undefined,
      longitude: longitude ? parseFloat(longitude) : undefined,
      propertyType,
      lookbackMonths: ["6", "9", "12"].includes(lookbackMonths) ? lookbackMonths : "6",
      limit: Math.min(Math.max(parseInt(limit) || 6, 1), 15),
      minComps: 4,
    });

    // If RentCast returned no results, don't charge the user
    if (!result || result.comps.length === 0) {
      return NextResponse.json({
        success: true,
        comps: [],
        totalFound: 0,
        radiusUsed: 1.0,
        lookbackDays: 0,
        expanded: false,
        source: "rentcast",
        message: "No recent sales found in this area. Try expanding the lookback period to 9 or 12 months.",
        usage: {
          used: usage.used,
          limit: usage.limit,
          remaining: usage.remaining,
          plan: usage.plan,
          overageCount: usage.overageCount,
          overageCostCents: usage.overageCostCents,
          wasOverage: false,
          charged: false,
        },
      });
    }

    // Sales found — record usage (counts against quota)
    await recordPropertyRecordUsage(userId, {
      address: `${address}, ${city}, ${state}`,
      source: "rentcast-comps",
      wasOverage: willBeOverage,
    });

    const usageInfo = {
      used: usage.used + 1,
      limit: usage.limit,
      remaining: Math.max(0, usage.remaining - 1),
      plan: usage.plan,
      overageCount: willBeOverage ? usage.overageCount + 1 : usage.overageCount,
      overageCostCents: willBeOverage ? usage.overageCostCents + OVERAGE_PRICE_CENTS : usage.overageCostCents,
      wasOverage: willBeOverage,
      charged: true,
    };

    let disclaimer = `${result.comps.length} verified sale${result.comps.length !== 1 ? "s" : ""} found within ${result.radiusUsed} mi (${Math.round(result.lookbackDays / 30)}-month lookback).`;
    if (result.expanded) {
      disclaimer += " Radius was expanded to 1 mile to find enough comparable sales.";
    }
    if (willBeOverage) {
      disclaimer += ` This lookup exceeded your ${usage.plan} plan limit of ${usage.limit}/month. An additional charge of $${(OVERAGE_PRICE_CENTS / 100).toFixed(2)} applies.`;
    }

    return NextResponse.json({
      success: true,
      comps: result.comps,
      totalFound: result.totalFound,
      radiusUsed: result.radiusUsed,
      lookbackDays: result.lookbackDays,
      expanded: result.expanded,
      source: "rentcast",
      disclaimer,
      usage: usageInfo,
    });
  } catch (error) {
    console.error("Error in real-comps API:", error);
    return NextResponse.json(
      { error: "Failed to fetch real comparable sales" },
      { status: 500 }
    );
  }
}
