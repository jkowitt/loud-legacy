import { NextRequest, NextResponse } from "next/server";
import { analyzeImprovementsFromImage } from "@/lib/openai";

export const dynamic = 'force-dynamic';

// Fallback analyses keyed by area
const FALLBACK_ANALYSES: Record<string, {
  overallScore: number;
  condition: string;
  issues: string[];
  improvements: Array<{
    title: string;
    description: string;
    estimatedCost: { low: number; high: number };
    potentialROI: number;
    priority: string;
    timeframe: string;
  }>;
  estimatedValueImpact: number;
}> = {
  "exterior-front": {
    overallScore: 68,
    condition: "fair",
    issues: ["Faded exterior paint", "Dated front door", "Basic landscaping", "Missing house numbers"],
    improvements: [
      { title: "Fresh Exterior Paint", description: "Repaint the front facade with modern neutral colors. Consider a contrasting accent color for the front door.", estimatedCost: { low: 3500, high: 6000 }, potentialROI: 150, priority: "high", timeframe: "3-5 days" },
      { title: "New Front Door", description: "Replace with a modern fiberglass or steel entry door with decorative glass.", estimatedCost: { low: 1500, high: 3000 }, potentialROI: 200, priority: "high", timeframe: "1 day" },
      { title: "Landscape Enhancement", description: "Add foundation plantings, mulch beds, and seasonal flowers for curb appeal.", estimatedCost: { low: 2000, high: 5000 }, potentialROI: 120, priority: "medium", timeframe: "2-3 days" },
      { title: "Exterior Lighting", description: "Install modern outdoor sconces and path lighting for safety and aesthetics.", estimatedCost: { low: 500, high: 1500 }, potentialROI: 180, priority: "medium", timeframe: "1 day" },
    ],
    estimatedValueImpact: 18500,
  },
  "kitchen": {
    overallScore: 55,
    condition: "fair",
    issues: ["Outdated cabinets", "Old countertops", "Basic appliances", "Poor lighting"],
    improvements: [
      { title: "Cabinet Refacing", description: "Replace cabinet doors and hardware with modern shaker-style fronts in white or gray.", estimatedCost: { low: 4000, high: 8000 }, potentialROI: 175, priority: "high", timeframe: "3-5 days" },
      { title: "Quartz Countertops", description: "Install durable quartz countertops in a neutral pattern. Include new sink and faucet.", estimatedCost: { low: 3500, high: 6000 }, potentialROI: 160, priority: "high", timeframe: "2-3 days" },
      { title: "Stainless Appliances", description: "Upgrade to matching stainless steel appliances for a cohesive modern look.", estimatedCost: { low: 3000, high: 7000 }, potentialROI: 130, priority: "medium", timeframe: "1 day" },
      { title: "Under-Cabinet Lighting", description: "Add LED under-cabinet lighting and update overhead fixtures.", estimatedCost: { low: 500, high: 1200 }, potentialROI: 220, priority: "medium", timeframe: "1 day" },
      { title: "Tile Backsplash", description: "Install a modern subway or mosaic tile backsplash.", estimatedCost: { low: 800, high: 2000 }, potentialROI: 190, priority: "low", timeframe: "1-2 days" },
    ],
    estimatedValueImpact: 35000,
  },
  "bathroom": {
    overallScore: 62,
    condition: "fair",
    issues: ["Dated vanity", "Old fixtures", "Basic tile", "Inadequate storage"],
    improvements: [
      { title: "New Vanity", description: "Install a modern floating vanity with quartz top and undermount sink.", estimatedCost: { low: 1500, high: 3000 }, potentialROI: 165, priority: "high", timeframe: "1-2 days" },
      { title: "Updated Fixtures", description: "Replace faucets, showerhead, and hardware with brushed nickel or matte black.", estimatedCost: { low: 400, high: 900 }, potentialROI: 200, priority: "high", timeframe: "1 day" },
      { title: "Tile Refresh", description: "Re-grout existing tile or install new floor tile. Consider a tile accent wall.", estimatedCost: { low: 1000, high: 3500 }, potentialROI: 145, priority: "medium", timeframe: "2-3 days" },
      { title: "Mirror & Lighting", description: "Install a frameless mirror with integrated LED lighting.", estimatedCost: { low: 300, high: 800 }, potentialROI: 210, priority: "medium", timeframe: "1 day" },
    ],
    estimatedValueImpact: 12000,
  },
  "roof": {
    overallScore: 72,
    condition: "good",
    issues: ["Minor wear visible", "Some debris accumulation", "Gutters need cleaning"],
    improvements: [
      { title: "Professional Cleaning", description: "Power wash roof and clean gutters. Remove moss and debris.", estimatedCost: { low: 300, high: 600 }, potentialROI: 180, priority: "high", timeframe: "1 day" },
      { title: "Gutter Guards", description: "Install gutter guards to prevent debris buildup and reduce maintenance.", estimatedCost: { low: 800, high: 1800 }, potentialROI: 120, priority: "medium", timeframe: "1 day" },
      { title: "Seal & Repair", description: "Seal any minor cracks and repair damaged shingles to extend roof life.", estimatedCost: { low: 500, high: 1500 }, potentialROI: 150, priority: "medium", timeframe: "1-2 days" },
    ],
    estimatedValueImpact: 5000,
  },
  "living-room": {
    overallScore: 64,
    condition: "fair",
    issues: ["Worn carpet or flooring", "Dated light fixtures", "Plain walls need refresh"],
    improvements: [
      { title: "New Flooring", description: "Install hardwood or luxury vinyl plank for a modern, durable finish.", estimatedCost: { low: 3000, high: 8000 }, potentialROI: 160, priority: "high", timeframe: "2-4 days" },
      { title: "Fresh Paint", description: "Repaint with modern neutral tones to brighten and update the space.", estimatedCost: { low: 500, high: 1500 }, potentialROI: 250, priority: "high", timeframe: "1-2 days" },
      { title: "Updated Lighting", description: "Replace dated fixtures with modern recessed or track lighting.", estimatedCost: { low: 400, high: 1200 }, potentialROI: 200, priority: "medium", timeframe: "1 day" },
    ],
    estimatedValueImpact: 15000,
  },
  "bedroom": {
    overallScore: 70,
    condition: "good",
    issues: ["Basic flooring", "Insufficient closet space", "Standard fixtures"],
    improvements: [
      { title: "Closet System", description: "Install a custom closet organizer system to maximize storage.", estimatedCost: { low: 800, high: 2500 }, potentialROI: 140, priority: "medium", timeframe: "1 day" },
      { title: "Fresh Paint & Trim", description: "Repaint walls and update baseboards and crown molding.", estimatedCost: { low: 400, high: 1000 }, potentialROI: 200, priority: "medium", timeframe: "1-2 days" },
      { title: "Upgraded Flooring", description: "Install new carpet or hardwood flooring.", estimatedCost: { low: 1500, high: 4000 }, potentialROI: 130, priority: "low", timeframe: "1-2 days" },
    ],
    estimatedValueImpact: 8000,
  },
  "default": {
    overallScore: 65,
    condition: "fair",
    issues: ["General wear and tear", "Dated finishes", "Deferred maintenance"],
    improvements: [
      { title: "Deep Cleaning & Staging", description: "Professional deep cleaning and staging to present the space at its best.", estimatedCost: { low: 200, high: 500 }, potentialROI: 300, priority: "high", timeframe: "1 day" },
      { title: "Fresh Paint", description: "Apply fresh paint in modern neutral tones throughout.", estimatedCost: { low: 500, high: 1500 }, potentialROI: 250, priority: "high", timeframe: "1-2 days" },
      { title: "Update Fixtures", description: "Replace dated light fixtures and hardware with modern alternatives.", estimatedCost: { low: 300, high: 800 }, potentialROI: 200, priority: "medium", timeframe: "1 day" },
    ],
    estimatedValueImpact: 8000,
  },
};

export async function POST(request: NextRequest) {
  try {
    // Allow both NextAuth sessions and demo mode (no session)
    // AI analysis doesn't require user-specific DB data

    const body = await request.json();
    const { imageUrl, imageBase64, area } = body;

    if (!imageUrl && !imageBase64) {
      return NextResponse.json({ error: "Image URL or base64 data is required" }, { status: 400 });
    }

    const areaLabel = area || "property";

    // Try OpenAI Vision analysis
    if (process.env.OPENAI_API_KEY) {
      try {
        const imgInput = imageBase64
          ? `data:image/jpeg;base64,${imageBase64}`
          : imageUrl;

        const analysis = await analyzeImprovementsFromImage(imgInput, areaLabel);
        return NextResponse.json({ success: true, ...analysis, source: "openai" });
      } catch (aiError) {
        console.error("OpenAI improvements analysis failed, using fallback:", aiError);
      }
    }

    // Fallback to pre-built analysis
    const fallback = FALLBACK_ANALYSES[area] || FALLBACK_ANALYSES["default"];
    return NextResponse.json({ success: true, ...fallback, source: "fallback" });
  } catch (error) {
    console.error("Error in improvements API:", error);
    return NextResponse.json({ error: "Failed to analyze improvements" }, { status: 500 });
  }
}
