import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/interest-rates
 * Fetch current interest rates for commercial and residential properties
 *
 * In production, this would connect to:
 * - Freddie Mac Primary Mortgage Market Survey
 * - Federal Reserve Economic Data (FRED) API
 * - Bloomberg Terminal API
 * - Custom rate sheet aggregators
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyType = searchParams.get('propertyType') || 'MULTIFAMILY';

    // Mock real-time interest rates
    // In production, fetch from actual APIs
    const rates = getCurrentInterestRates(propertyType);

    return NextResponse.json({
      success: true,
      propertyType,
      rates,
      timestamp: new Date().toISOString(),
      source: 'Mock Data (Replace with real API)',
    });
  } catch (error) {
    console.error('Error fetching interest rates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch interest rates' },
      { status: 500 }
    );
  }
}

/**
 * Get current interest rates based on property type
 * These are mock rates that simulate real market data
 */
function getCurrentInterestRates(propertyType: string) {
  // Base rate (simulates current market conditions)
  const baseRate = 7.125; // As of early 2024

  // Adjust based on property type and loan characteristics
  const ratesByType: Record<string, any> = {
    RESIDENTIAL: {
      type: 'Single Family Residential',
      rates: {
        thirtyYearFixed: baseRate - 0.5,
        fifteenYearFixed: baseRate - 1.25,
        fiveOneARM: baseRate - 0.875,
      },
      typical: baseRate - 0.5,
      range: {
        min: baseRate - 1.0,
        max: baseRate + 0.5,
      },
    },
    MULTIFAMILY: {
      type: 'Multifamily (5+ units)',
      rates: {
        agencyFixed: baseRate + 0.25, // Fannie/Freddie
        bankFixed: baseRate + 0.75,
        bridgeLoan: baseRate + 2.5,
      },
      typical: baseRate + 0.50,
      range: {
        min: baseRate,
        max: baseRate + 3.0,
      },
    },
    MIXED_USE: {
      type: 'Mixed Use',
      rates: {
        bankFixed: baseRate + 1.0,
        sbaLoan: baseRate + 0.5,
        portfolioLoan: baseRate + 1.25,
      },
      typical: baseRate + 1.0,
      range: {
        min: baseRate + 0.25,
        max: baseRate + 2.0,
      },
    },
    INDUSTRIAL: {
      type: 'Industrial/Warehouse',
      rates: {
        bankFixed: baseRate + 1.25,
        cmbs: baseRate + 1.5,
        lifeInsurance: baseRate + 0.75,
      },
      typical: baseRate + 1.25,
      range: {
        min: baseRate + 0.5,
        max: baseRate + 2.5,
      },
    },
    LAND: {
      type: 'Land',
      rates: {
        bankLoan: baseRate + 2.0,
        sellerFinancing: baseRate + 1.5,
      },
      typical: baseRate + 2.0,
      range: {
        min: baseRate + 1.0,
        max: baseRate + 4.0,
      },
    },
  };

  return ratesByType[propertyType] || ratesByType.MULTIFAMILY;
}
