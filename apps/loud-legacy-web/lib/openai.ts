import OpenAI from 'openai';

// Lazy initialization - only create client when needed
let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  return openaiClient;
}

/**
 * Analyze property image for condition, wear and tear
 */
export async function analyzePropertyImage(imageUrl: string) {
  try {
    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this property image and provide:
1. Overall condition score (0-100)
2. Identified issues (wear and tear, damage, maintenance needs)
3. Recommendations for improvements
4. Estimated severity of any issues (low, medium, high)

Format the response as JSON with keys: conditionScore, issues, recommendations, tags`,
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    // Parse JSON response
    const analysis = JSON.parse(content);
    return analysis;
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
}

/**
 * Generate property improvement recommendations
 */
export async function generatePropertyRecommendations(propertyData: {
  propertyType: string;
  condition: number;
  yearBuilt?: number;
  squareFeet?: number;
  issues?: string[];
}) {
  try {
    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a real estate expert specializing in property improvements and value enhancement.",
        },
        {
          role: "user",
          content: `Given a ${propertyData.propertyType} property with:
- Condition Score: ${propertyData.condition}/100
- Year Built: ${propertyData.yearBuilt || 'Unknown'}
- Square Feet: ${propertyData.squareFeet || 'Unknown'}
- Known Issues: ${propertyData.issues?.join(', ') || 'None reported'}

Provide 5-7 actionable recommendations to increase property value. For each recommendation include:
1. Priority (High/Medium/Low)
2. Estimated cost (dollar amount)
3. Potential value increase (dollar amount)
4. Timeline
5. costBasis: Explain how the cost estimate was calculated (e.g., material costs, labor rates, scope of work)
6. valueRationale: Explain how the value increase was determined (e.g., industry data, comparable sales impact, buyer demand factors)

Format as JSON array with keys: priority, recommendation, estimatedCost, valueIncrease, timeline, costBasis, valueRationale`,
        },
      ],
      max_tokens: 1500,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    return JSON.parse(content);
  } catch (error) {
    console.error('Error generating recommendations:', error);
    throw error;
  }
}

/**
 * Extract property information from image using geocoding
 */
export async function geocodePropertyFromImage(imageUrl: string) {
  try {
    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this image and identify:
1. Any visible address numbers or street signs
2. Property type (commercial, residential, etc.)
3. Architectural style
4. Visible landmarks or identifying features
5. Approximate location indicators

Format as JSON with keys: visibleAddress, propertyType, features, locationClues`,
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
      max_tokens: 800,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    return JSON.parse(content);
  } catch (error) {
    console.error('Error geocoding image:', error);
    throw error;
  }
}

/**
 * Analyze property image and return specific improvement recommendations
 * Uses GPT-4 Vision to examine the actual photo
 */
export async function analyzeImprovementsFromImage(imageUrl: string, area: string) {
  try {
    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert property inspector and real estate renovation consultant. You analyze property photos to identify specific issues and recommend improvements with accurate cost estimates and ROI projections. Always provide actionable, specific recommendations based on what you can actually see in the image.`,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this property photo of the "${area}" area. Examine the image carefully and provide:

1. An overall condition score from 0-100
2. A condition rating: "excellent" (80-100), "good" (60-79), "fair" (40-59), or "poor" (0-39)
3. A list of specific issues you can see (be specific about what you observe)
4. A list of recommended improvements based on what you see

For each improvement provide:
- title: Short name of the improvement
- description: Detailed written explanation of what should be done and WHY this improvement increases property value. Reference what you see in the image. Explain the value proposition clearly.
- estimatedCost: Object with "low" and "high" dollar amounts
- costBasis: Explain HOW the cost estimate was calculated (e.g., "Based on average exterior painting costs of $2-4 per square foot for a typical 1,500 sqft facade, plus prep work and materials")
- potentialROI: Percentage ROI (e.g., 150 means 150% return)
- valueRationale: Explain HOW the ROI/value increase was determined (e.g., "National Association of Realtors data shows fresh exterior paint recovers 150% of cost at resale. Curb appeal improvements are the #1 driver of first impressions for buyers.")
- priority: "high", "medium", or "low"
- timeframe: Estimated completion time (e.g., "2-3 days")

Also estimate the total potential value impact of all improvements combined.

Return ONLY valid JSON with this structure:
{
  "overallScore": number,
  "condition": "excellent" | "good" | "fair" | "poor",
  "issues": ["string"],
  "improvements": [{ "title": "", "description": "", "estimatedCost": { "low": 0, "high": 0 }, "costBasis": "", "potentialROI": 0, "valueRationale": "", "priority": "", "timeframe": "" }],
  "estimatedValueImpact": number
}`,
            },
            {
              type: "image_url",
              image_url: { url: imageUrl },
            },
          ],
        },
      ],
      max_tokens: 2000,
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error('No response from OpenAI');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error analyzing improvements from image:', error);
    throw error;
  }
}

/**
 * Generate comparable property sales using AI analysis
 * Provides realistic comps based on property details and location
 */
export async function analyzeComparables(propertyData: {
  address: string;
  city: string;
  state: string;
  propertyType: string;
  sqft?: number;
  beds?: number;
  baths?: number;
  yearBuilt?: number;
  units?: number;
  purchasePrice?: number;
}) {
  try {
    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a real estate comparable sales analyst. Given a subject property, generate realistic comparable sales that would be used in a professional appraisal. Comps should be nearby properties with similar characteristics that sold recently. Use realistic addresses, prices, and metrics for the given market area. Base your analysis on typical market data for the location and property type.`,
        },
        {
          role: "user",
          content: `Generate 5-7 comparable sales for this subject property:

Address: ${propertyData.address}, ${propertyData.city}, ${propertyData.state}
Property Type: ${propertyData.propertyType}
Square Feet: ${propertyData.sqft || 'Unknown'}
Beds: ${propertyData.beds || 'N/A'}
Baths: ${propertyData.baths || 'N/A'}
Year Built: ${propertyData.yearBuilt || 'Unknown'}
Units: ${propertyData.units || '1'}
${propertyData.purchasePrice ? `Listed/Purchase Price: $${propertyData.purchasePrice.toLocaleString()}` : ''}

For each comp provide:
- address: A realistic nearby street address (use real street name patterns for ${propertyData.city}, ${propertyData.state})
- distance: Distance from subject (e.g., "0.3 mi")
- salePrice: Recent sale price in dollars
- saleDate: Recent sale date (within last 6 months, format YYYY-MM-DD)
- sqft: Square footage
- pricePerSqft: Price per square foot (calculated)
- propertyType: Same as subject
- yearBuilt: Year built
- beds: Number of bedrooms (if residential)
- baths: Number of bathrooms (if residential)
- units: Number of units (if multifamily)
- capRate: Cap rate percentage (if income property)
- adjustments: Brief note on how this comp compares to subject (e.g., "Superior location, inferior condition")

Also provide a market summary with:
- avgPricePerSqft: Average price per sqft across comps
- medianSalePrice: Median sale price
- suggestedValue: Your estimated fair market value for the subject
- valueRange: { low: number, high: number }
- confidence: Confidence level 0-100
- marketTrend: "appreciating", "stable", or "declining"
- keyInsights: Array of 3-5 market insight strings

Return ONLY valid JSON:
{
  "comps": [{ ... }],
  "marketSummary": { "avgPricePerSqft": 0, "medianSalePrice": 0, "suggestedValue": 0, "valueRange": { "low": 0, "high": 0 }, "confidence": 0, "marketTrend": "", "keyInsights": [""] }
}`,
        },
      ],
      max_tokens: 3000,
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error('No response from OpenAI');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error analyzing comparables:', error);
    throw error;
  }
}

/**
 * Analyze market trends and provide insights
 */
export async function analyzeMarketTrends(marketData: {
  city: string;
  state: string;
  propertyType: string;
  recentSales: Array<{ price: number; date: string; sqft: number }>;
}) {
  try {
    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a real estate market analyst with expertise in property valuation and market trends.",
        },
        {
          role: "user",
          content: `Analyze the ${marketData.propertyType} market in ${marketData.city}, ${marketData.state}.

Recent sales data:
${JSON.stringify(marketData.recentSales, null, 2)}

Provide:
1. Market trend direction (appreciating, stable, declining)
2. Average price per square foot
3. Market velocity (fast, moderate, slow)
4. Key factors driving the market
5. 12-month outlook

Format as JSON with keys: trend, avgPricePerSF, velocity, keyFactors, outlook`,
        },
      ],
      max_tokens: 1200,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    return JSON.parse(content);
  } catch (error) {
    console.error('Error analyzing market trends:', error);
    throw error;
  }
}
