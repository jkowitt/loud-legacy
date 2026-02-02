import { NextRequest, NextResponse } from "next/server";
import { analyzeComparables } from "@/lib/openai";

export const dynamic = 'force-dynamic';

// Haversine formula to calculate distance between two lat/lng points in miles
function haversineDistance(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 3958.8; // Earth radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Server-side geocoding using Google Geocoding REST API
async function geocodeServer(address: string): Promise<{ lat: number; lng: number; formattedAddress: string } | null> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) return null;

  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.status === "OK" && data.results?.[0]) {
      const loc = data.results[0].geometry.location;
      return {
        lat: loc.lat,
        lng: loc.lng,
        formattedAddress: data.results[0].formatted_address,
      };
    }
  } catch (err) {
    console.error("Geocode error for:", address, err);
  }
  return null;
}

// Cross-reference comps with Google Geocoding and calculate real distances
async function crossReferenceComps(
  comps: Array<Record<string, unknown>>,
  subjectLat: number,
  subjectLng: number,
  city: string,
  state: string
): Promise<Array<Record<string, unknown>>> {
  const enriched = await Promise.all(
    comps.map(async (comp) => {
      const compAddress = `${comp.address}, ${city}, ${state}`;
      const geo = await geocodeServer(compAddress);

      if (geo) {
        const dist = haversineDistance(subjectLat, subjectLng, geo.lat, geo.lng);
        return {
          ...comp,
          lat: geo.lat,
          lng: geo.lng,
          formattedAddress: geo.formattedAddress,
          distance: `${dist.toFixed(1)} mi`,
          distanceMiles: Math.round(dist * 10) / 10,
          googleValidated: true,
        };
      }

      // Keep original distance if geocoding fails
      return {
        ...comp,
        googleValidated: false,
      };
    })
  );

  // Sort by distance from subject
  return enriched.sort((a, b) => {
    const distA = ('distanceMiles' in a ? (a.distanceMiles as number) : 999);
    const distB = ('distanceMiles' in b ? (b.distanceMiles as number) : 999);
    return distA - distB;
  });
}

// Fallback comps when OpenAI is not configured
function generateFallbackComps(propertyData: {
  propertyType: string;
  sqft?: number;
  city?: string;
  state?: string;
}) {
  const baseSqft = propertyData.sqft || 2000;
  const basePricePerSqft = propertyData.propertyType === "commercial" ? 250
    : propertyData.propertyType === "industrial" ? 120
    : propertyData.propertyType === "multifamily" ? 180
    : 200;

  const comps = [
    { id: "1", address: "123 Oak Street", distance: "0.3 mi", salePrice: Math.round(baseSqft * basePricePerSqft * 0.95), saleDate: "2025-10-15", sqft: Math.round(baseSqft * 1.05), pricePerSqft: Math.round(basePricePerSqft * 0.95), propertyType: propertyData.propertyType, yearBuilt: 1998, beds: 4, baths: 2.5, adjustments: "Similar size, slightly older", googleValidated: false },
    { id: "2", address: "456 Maple Avenue", distance: "0.5 mi", salePrice: Math.round(baseSqft * basePricePerSqft * 0.92), saleDate: "2025-11-08", sqft: Math.round(baseSqft * 0.95), pricePerSqft: Math.round(basePricePerSqft * 0.98), propertyType: propertyData.propertyType, yearBuilt: 2001, beds: 3, baths: 2, adjustments: "Smaller lot, better condition", googleValidated: false },
    { id: "3", address: "789 Pine Road", distance: "0.7 mi", salePrice: Math.round(baseSqft * basePricePerSqft * 1.05), saleDate: "2025-09-28", sqft: Math.round(baseSqft * 1.12), pricePerSqft: Math.round(basePricePerSqft * 0.97), propertyType: propertyData.propertyType, yearBuilt: 2003, beds: 4, baths: 3, adjustments: "Larger, recently renovated", googleValidated: false },
    { id: "4", address: "321 Elm Boulevard", distance: "0.9 mi", salePrice: Math.round(baseSqft * basePricePerSqft * 0.98), saleDate: "2025-12-20", sqft: Math.round(baseSqft * 1.02), pricePerSqft: Math.round(basePricePerSqft * 0.99), propertyType: propertyData.propertyType, yearBuilt: 1995, beds: 4, baths: 2, adjustments: "Comparable size and condition", googleValidated: false },
    { id: "5", address: "654 Cedar Lane", distance: "1.1 mi", salePrice: Math.round(baseSqft * basePricePerSqft * 1.02), saleDate: "2026-01-14", sqft: Math.round(baseSqft * 1.08), pricePerSqft: Math.round(basePricePerSqft * 0.96), propertyType: propertyData.propertyType, yearBuilt: 2005, beds: 4, baths: 2.5, adjustments: "Superior location", googleValidated: false },
  ];

  const suggestedValue = Math.round(baseSqft * basePricePerSqft);

  return {
    comps,
    marketSummary: {
      avgPricePerSqft: basePricePerSqft,
      medianSalePrice: comps.sort((a, b) => a.salePrice - b.salePrice)[Math.floor(comps.length / 2)].salePrice,
      suggestedValue,
      valueRange: { low: Math.round(suggestedValue * 0.92), high: Math.round(suggestedValue * 1.08) },
      confidence: 72,
      marketTrend: "stable",
      keyInsights: [
        `Average price per sqft in ${propertyData.city || "the area"} is $${basePricePerSqft}`,
        "Market showing steady demand with moderate inventory",
        "Properties selling within 30-45 days on average",
        "Recent sales support current pricing levels",
      ],
    },
    source: "fallback",
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { address, city, state, propertyType, sqft, beds, baths, yearBuilt, units, purchasePrice, lat, lng } = body;

    if (!propertyType) {
      return NextResponse.json({ error: "Property type is required" }, { status: 400 });
    }

    // Geocode the subject property if coordinates not provided
    let subjectLat = lat ? parseFloat(lat) : null;
    let subjectLng = lng ? parseFloat(lng) : null;

    if ((!subjectLat || !subjectLng) && address) {
      const fullAddress = `${address}, ${city || ""}, ${state || ""}`.trim();
      const subjectGeo = await geocodeServer(fullAddress);
      if (subjectGeo) {
        subjectLat = subjectGeo.lat;
        subjectLng = subjectGeo.lng;
      }
    }

    // Try OpenAI-powered analysis
    if (process.env.OPENAI_API_KEY) {
      try {
        const result = await analyzeComparables({
          address: address || "Subject Property",
          city: city || "Unknown",
          state: state || "Unknown",
          propertyType,
          sqft: sqft ? parseInt(sqft) : undefined,
          beds: beds ? parseInt(beds) : undefined,
          baths: baths ? parseFloat(baths) : undefined,
          yearBuilt: yearBuilt ? parseInt(yearBuilt) : undefined,
          units: units ? parseInt(units) : undefined,
          purchasePrice: purchasePrice ? parseFloat(purchasePrice) : undefined,
        });

        // Add IDs to comps if missing
        if (result.comps) {
          result.comps = result.comps.map((comp: Record<string, unknown>, i: number) => ({
            ...comp,
            id: comp.id || (i + 1).toString(),
          }));

          // Cross-reference with Google Geocoding if we have subject coordinates
          if (subjectLat && subjectLng && city && state) {
            result.comps = await crossReferenceComps(
              result.comps, subjectLat, subjectLng, city, state
            );
          }
        }

        return NextResponse.json({
          success: true,
          ...result,
          subjectCoordinates: subjectLat && subjectLng ? { lat: subjectLat, lng: subjectLng } : null,
          source: "openai",
        });
      } catch (aiError) {
        console.error("OpenAI comps analysis failed, using fallback:", aiError);
      }
    }

    // Fallback to generated comps
    const fallback = generateFallbackComps({ propertyType, sqft: sqft ? parseInt(sqft) : undefined, city, state });
    return NextResponse.json({
      success: true,
      ...fallback,
      subjectCoordinates: subjectLat && subjectLng ? { lat: subjectLat, lng: subjectLng } : null,
    });
  } catch (error) {
    console.error("Error in comps API:", error);
    return NextResponse.json({ error: "Failed to analyze comparables" }, { status: 500 });
  }
}
