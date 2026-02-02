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
    costBasis: string;
    valueRationale: string;
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
      { title: "Fresh Exterior Paint", description: "Repaint the front facade with modern neutral colors. A fresh coat of paint is one of the most cost-effective ways to improve curb appeal, which directly influences buyer first impressions and perceived home value.", estimatedCost: { low: 3500, high: 6000 }, potentialROI: 150, costBasis: "Based on average exterior painting costs of $2-4 per square foot for a typical 1,500 sqft facade, including prep, primer, two coats of premium paint, and labor at $35-50/hr.", valueRationale: "National Association of Realtors data shows exterior paint recovery rate of 150% at resale. Fresh exterior paint is consistently ranked in the top 3 ROI home improvements by real estate professionals.", priority: "high", timeframe: "3-5 days" },
      { title: "New Front Door", description: "Replace with a modern fiberglass or steel entry door with decorative glass. The front door is the focal point of curb appeal and sets buyer expectations for the rest of the home.", estimatedCost: { low: 1500, high: 3000 }, potentialROI: 200, costBasis: "Fiberglass or steel entry door ($800-$2,000), decorative glass insert ($200-$500), new hardware and lockset ($100-$300), professional installation ($400-$600).", valueRationale: "Remodeling Magazine Cost vs. Value report consistently ranks front door replacement as the #1 ROI project, recovering 90-100% or more of cost. A 200% ROI reflects the outsized impact on first impressions.", priority: "high", timeframe: "1 day" },
      { title: "Landscape Enhancement", description: "Add foundation plantings, mulch beds, and seasonal flowers to boost curb appeal. Landscaping creates a welcoming first impression that makes buyers emotionally invested before they enter the home.", estimatedCost: { low: 2000, high: 5000 }, potentialROI: 120, costBasis: "Foundation shrubs and perennials ($800-$2,000), mulch and edging ($400-$1,000), seasonal color plantings ($200-$500), design and installation labor ($600-$1,500).", valueRationale: "Michigan State University research shows professional landscaping adds 5-11% to perceived home value. The 120% ROI reflects the moderate cost recovery rate while accounting for the property's enhanced marketability.", priority: "medium", timeframe: "2-3 days" },
      { title: "Exterior Lighting", description: "Install modern outdoor sconces, path lighting, and accent fixtures. Proper exterior lighting improves safety, extends usable outdoor hours, and gives the property a polished, upscale appearance.", estimatedCost: { low: 500, high: 1500 }, potentialROI: 180, costBasis: "LED wall sconces ($100-$300 each, 2-3 units), path lights ($15-$40 each, 6-10 units), installation labor including wiring ($200-$500).", valueRationale: "Low-cost exterior lighting improvements have an outsized impact on perceived value. Evening and twilight showings benefit enormously. The 180% ROI accounts for the low cost base with meaningful aesthetic improvement.", priority: "medium", timeframe: "1 day" },
    ],
    estimatedValueImpact: 18500,
  },
  "kitchen": {
    overallScore: 55,
    condition: "fair",
    issues: ["Outdated cabinets", "Old countertops", "Basic appliances", "Poor lighting"],
    improvements: [
      { title: "Cabinet Refacing", description: "Replace cabinet doors and hardware with modern shaker-style fronts in white or gray. Cabinet refacing delivers the visual impact of a full remodel at a fraction of the cost, transforming the kitchen's entire appearance.", estimatedCost: { low: 4000, high: 8000 }, potentialROI: 175, costBasis: "Shaker-style replacement doors ($50-$150 per door for 15-25 doors), new handles and pulls ($5-$20 each), professional installation labor at $40-$60/hr for 2-3 days.", valueRationale: "Kitchen updates are the #1 factor in home buyer decisions per NAR surveys. Cabinet refacing recovers 75-85% of cost directly, with additional indirect value from faster sale. 175% ROI reflects the combined impact.", priority: "high", timeframe: "3-5 days" },
      { title: "Quartz Countertops", description: "Install durable quartz countertops in a neutral pattern, including a new undermount sink and faucet. Quartz is the most requested countertop material by buyers, signaling a modern, move-in ready kitchen.", estimatedCost: { low: 3500, high: 6000 }, potentialROI: 160, costBasis: "Quartz slab material at $50-$100/sqft for approximately 40 sqft of counter space, undermount sink ($200-$400), faucet ($150-$350), templating and professional installation ($500-$1,000).", valueRationale: "Quartz countertops are the #1 desired kitchen feature per Houzz surveys. Properties with updated countertops sell 5-10 days faster. The 160% ROI factors in direct appraisal value increase plus reduced time on market.", priority: "high", timeframe: "2-3 days" },
      { title: "Stainless Appliances", description: "Upgrade to matching stainless steel appliances for a cohesive, modern look. Mismatched or dated appliances are one of the most common buyer complaints during showings.", estimatedCost: { low: 3000, high: 7000 }, potentialROI: 130, costBasis: "Stainless steel appliance package: refrigerator ($800-$2,000), range/oven ($500-$1,500), dishwasher ($400-$800), microwave ($200-$400), delivery and haul-away ($100-$300).", valueRationale: "Matching stainless appliances are expected by buyers in the mid-range and above. While appliance value depreciates, the 130% ROI reflects elimination of a key buyer objection that would otherwise reduce offers.", priority: "medium", timeframe: "1 day" },
      { title: "Under-Cabinet Lighting", description: "Add LED under-cabinet task lighting and update overhead fixtures. Good lighting makes kitchens appear larger and more functional, a low-cost change with high visual impact.", estimatedCost: { low: 500, high: 1200 }, potentialROI: 220, costBasis: "LED under-cabinet light strips ($100-$300), updated overhead pendant or recessed fixtures ($150-$400), electrical work and installation ($200-$500).", valueRationale: "Lighting updates have among the highest ROIs due to very low cost with dramatic visual improvement. The 220% ROI reflects the fact that properly lit kitchens photograph better and show better, directly impacting offers.", priority: "medium", timeframe: "1 day" },
      { title: "Tile Backsplash", description: "Install a modern subway or mosaic tile backsplash. A backsplash ties the kitchen design together and signals attention to detail that buyers associate with a well-maintained home.", estimatedCost: { low: 800, high: 2000 }, potentialROI: 190, costBasis: "Subway or mosaic tile at $5-$15/sqft for approximately 30 sqft, thinset and grout ($50-$100), installation labor ($300-$800).", valueRationale: "Backsplash installation is one of the most efficient kitchen upgrades. The 190% ROI is driven by the low material cost combined with the finished, designer look it provides.", priority: "low", timeframe: "1-2 days" },
    ],
    estimatedValueImpact: 35000,
  },
  "bathroom": {
    overallScore: 62,
    condition: "fair",
    issues: ["Dated vanity", "Old fixtures", "Basic tile", "Inadequate storage"],
    improvements: [
      { title: "New Vanity", description: "Install a modern floating vanity with quartz top and undermount sink. The vanity is the centerpiece of any bathroom and an updated one instantly modernizes the entire space.", estimatedCost: { low: 1500, high: 3000 }, potentialROI: 165, costBasis: "Floating vanity with quartz top ($600-$1,500), undermount sink ($150-$400), faucet ($100-$300), plumbing connections and installation ($300-$800).", valueRationale: "Bathroom updates recover 60-70% of cost per NARI, with vanity replacement being the highest-impact single change. The 165% ROI accounts for the visual transformation relative to moderate cost.", priority: "high", timeframe: "1-2 days" },
      { title: "Updated Fixtures", description: "Replace faucets, showerhead, and hardware with brushed nickel or matte black finishes. Coordinated hardware creates a cohesive, updated look throughout the bathroom.", estimatedCost: { low: 400, high: 900 }, potentialROI: 200, costBasis: "Faucet ($80-$250), rain showerhead ($60-$200), towel bars and hooks ($40-$100), toilet handle and hinges ($20-$50), installation labor ($100-$300).", valueRationale: "Fixture updates are among the highest-ROI bathroom changes due to extremely low cost with visible impact. The 200% ROI reflects that coordinated modern hardware eliminates the dated look buyers penalize.", priority: "high", timeframe: "1 day" },
      { title: "Tile Refresh", description: "Re-grout existing tile or install new floor tile with a tile accent wall. Updated tile transforms the bathroom from dated to contemporary at moderate cost.", estimatedCost: { low: 1000, high: 3500 }, potentialROI: 145, costBasis: "Floor tile at $3-$10/sqft for 40-60 sqft, accent wall tile at $5-$15/sqft for 20-30 sqft, thinset, grout and supplies ($100-$200), installation labor ($500-$1,500).", valueRationale: "Tile work has a moderate ROI of 145% because the cost is higher but the transformation is significant. Updated tile eliminates a common buyer objection about aging bathrooms.", priority: "medium", timeframe: "2-3 days" },
      { title: "Mirror & Lighting", description: "Install a frameless mirror with integrated LED lighting. Modern bathroom lighting makes the space feel larger and more luxurious while improving daily functionality.", estimatedCost: { low: 300, high: 800 }, potentialROI: 210, costBasis: "LED-integrated frameless mirror ($150-$400), vanity light fixture ($80-$200), electrical connections and installation ($70-$200).", valueRationale: "Low-cost, high-impact improvement. The 210% ROI reflects how modern lighting and mirrors transform bathroom photography and showing experience at minimal expense.", priority: "medium", timeframe: "1 day" },
    ],
    estimatedValueImpact: 12000,
  },
  "roof": {
    overallScore: 72,
    condition: "good",
    issues: ["Minor wear visible", "Some debris accumulation", "Gutters need cleaning"],
    improvements: [
      { title: "Professional Cleaning", description: "Power wash roof and clean gutters to remove moss and debris. A clean roof signals proper maintenance and prevents buyers from worrying about hidden damage.", estimatedCost: { low: 300, high: 600 }, potentialROI: 180, costBasis: "Professional roof power washing ($200-$400), gutter cleaning ($100-$200). Costs based on average single-family roof of 1,500-2,000 sqft.", valueRationale: "A dirty roof creates disproportionate buyer concern about deferred maintenance. The 180% ROI reflects the very low cost against the elimination of a major visual red flag during inspections.", priority: "high", timeframe: "1 day" },
      { title: "Gutter Guards", description: "Install gutter guards to prevent debris buildup and reduce ongoing maintenance costs. This is a selling point that reduces buyer concerns about long-term upkeep.", estimatedCost: { low: 800, high: 1800 }, potentialROI: 120, costBasis: "Gutter guard material at $5-$10/linear foot for approximately 150 linear feet of gutters, professional installation labor ($300-$600).", valueRationale: "Gutter guards are valued by buyers as a maintenance-reducing upgrade. The 120% ROI is conservative, reflecting steady but moderate value impact across the property's marketability.", priority: "medium", timeframe: "1 day" },
      { title: "Seal & Repair", description: "Seal minor cracks and repair damaged shingles to extend roof life. Proactive repairs prevent small issues from becoming deal-breaking problems during buyer inspections.", estimatedCost: { low: 500, high: 1500 }, potentialROI: 150, costBasis: "Roofing sealant and flashing repair ($100-$300), shingle replacement ($200-$500 for minor areas), professional roofer labor at $50-$75/hr for 3-6 hours.", valueRationale: "Roof concerns are the #1 deal-killer in home inspections. The 150% ROI reflects that even minor repairs can save a sale worth thousands more than the repair cost.", priority: "medium", timeframe: "1-2 days" },
    ],
    estimatedValueImpact: 5000,
  },
  "living-room": {
    overallScore: 64,
    condition: "fair",
    issues: ["Worn carpet or flooring", "Dated light fixtures", "Plain walls need refresh"],
    improvements: [
      { title: "New Flooring", description: "Install hardwood or luxury vinyl plank for a modern, durable finish. Hard surface flooring is the most requested feature in buyer surveys and worn carpet is a top showing turn-off.", estimatedCost: { low: 3000, high: 8000 }, potentialROI: 160, costBasis: "Luxury vinyl plank at $3-$7/sqft material cost for approximately 400-600 sqft, installation at $2-$4/sqft, subfloor prep ($200-$500), transitions and trim ($200-$400).", valueRationale: "NAR reports that hardwood/LVP floors recover 100-150% of cost. Homes with hard surface flooring sell 10-15% faster. The 160% ROI accounts for both direct value and reduced days on market.", priority: "high", timeframe: "2-4 days" },
      { title: "Fresh Paint", description: "Repaint with modern neutral tones to brighten and update the space. Fresh paint is the single most cost-effective improvement, making rooms feel cleaner, larger, and more inviting.", estimatedCost: { low: 500, high: 1500 }, potentialROI: 250, costBasis: "Paint at $30-$50/gallon (3-5 gallons for a typical living room), primer ($20-$30/gallon), supplies ($50-$100), labor at $35-$50/hr for 8-16 hours, or DIY to reduce cost.", valueRationale: "Interior painting is consistently the highest-ROI home improvement at 250%+. Fresh neutral paint appeals to the broadest buyer pool and photographs dramatically better for online listings.", priority: "high", timeframe: "1-2 days" },
      { title: "Updated Lighting", description: "Replace dated fixtures with modern recessed or track lighting. Good lighting transforms how a space is perceived, making rooms appear larger and more inviting.", estimatedCost: { low: 400, high: 1200 }, potentialROI: 200, costBasis: "Recessed or track lighting fixtures ($50-$150 each, 4-6 units), dimmer switches ($20-$40 each), electrical installation ($200-$500).", valueRationale: "Updated lighting has a 200% ROI because the low cost produces dramatic visual improvement. Properly lit spaces photograph better for listings and feel more premium during showings.", priority: "medium", timeframe: "1 day" },
    ],
    estimatedValueImpact: 15000,
  },
  "bedroom": {
    overallScore: 70,
    condition: "good",
    issues: ["Basic flooring", "Insufficient closet space", "Standard fixtures"],
    improvements: [
      { title: "Closet System", description: "Install a custom closet organizer system to maximize storage. Adequate, organized closet space is a top buyer priority, especially in master bedrooms.", estimatedCost: { low: 800, high: 2500 }, potentialROI: 140, costBasis: "Closet organization system components ($300-$1,200), shelving and rods ($100-$400), professional installation ($200-$600), or DIY with kit systems.", valueRationale: "Closet space is rated as a top-5 feature by home buyers. The 140% ROI reflects moderate cost recovery at resale, with additional value from making the property more competitive against similar listings.", priority: "medium", timeframe: "1 day" },
      { title: "Fresh Paint & Trim", description: "Repaint walls and update baseboards and crown molding. Clean, neutral walls with sharp trim create a finished look that photographs well and appeals to buyers.", estimatedCost: { low: 400, high: 1000 }, potentialROI: 200, costBasis: "Interior paint ($30-$50/gallon, 2-3 gallons), trim paint ($25-$40/gallon), crown molding if adding ($3-$8/linear ft for 50-60 ft), installation labor ($200-$500).", valueRationale: "Fresh paint with updated trim is a low-cost improvement that signals move-in readiness. The 200% ROI comes from the strong cost-to-perception ratio that influences buyer willingness to pay.", priority: "medium", timeframe: "1-2 days" },
      { title: "Upgraded Flooring", description: "Install new carpet or hardwood flooring. Bedroom flooring affects comfort perception and stained or worn floor covering immediately signals neglect to buyers.", estimatedCost: { low: 1500, high: 4000 }, potentialROI: 130, costBasis: "New carpet at $3-$6/sqft or hardwood at $6-$12/sqft for 150-250 sqft bedroom, carpet padding ($0.50-$1/sqft), installation labor ($1-$3/sqft).", valueRationale: "Bedroom flooring has a moderate 130% ROI. While not as impactful as kitchen or bath updates, fresh flooring removes a significant buyer objection and supports the home's overall condition narrative.", priority: "low", timeframe: "1-2 days" },
    ],
    estimatedValueImpact: 8000,
  },
  "default": {
    overallScore: 65,
    condition: "fair",
    issues: ["General wear and tear", "Dated finishes", "Deferred maintenance"],
    improvements: [
      { title: "Deep Cleaning & Staging", description: "Professional deep cleaning and staging to present the space at its best. Staging helps buyers envision themselves living in the property and is proven to increase offers.", estimatedCost: { low: 200, high: 500 }, potentialROI: 300, costBasis: "Professional deep cleaning ($150-$300), basic staging consultation ($50-$200). Costs are minimal relative to impact.", valueRationale: "NAR reports staged homes sell for 1-5% more than unstaged homes. The 300% ROI reflects the extremely low cost base with meaningful impact on buyer perception and offer amounts.", priority: "high", timeframe: "1 day" },
      { title: "Fresh Paint", description: "Apply fresh paint in modern neutral tones throughout. This is the single highest-ROI improvement available, transforming the look and feel of any space at minimal cost.", estimatedCost: { low: 500, high: 1500 }, potentialROI: 250, costBasis: "Interior paint at $30-$50/gallon (4-8 gallons depending on area), primer, supplies, and labor at $35-$50/hr. Total includes prep, two coats, and cleanup.", valueRationale: "Painting consistently delivers 250%+ ROI per industry studies. Fresh neutral paint appeals to the broadest buyer pool, photographs better for listings, and signals a well-maintained property.", priority: "high", timeframe: "1-2 days" },
      { title: "Update Fixtures", description: "Replace dated light fixtures and hardware with modern alternatives. Small hardware updates create a cohesive, contemporary look throughout the space.", estimatedCost: { low: 300, high: 800 }, potentialROI: 200, costBasis: "Modern light fixtures ($50-$150 each, 2-4 units), cabinet/door hardware ($5-$15 each), installation labor ($100-$300).", valueRationale: "Fixture updates deliver 200% ROI because the very low cost produces a visible modernization. Updated hardware photographs well and eliminates the dated look buyers penalize.", priority: "medium", timeframe: "1 day" },
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
