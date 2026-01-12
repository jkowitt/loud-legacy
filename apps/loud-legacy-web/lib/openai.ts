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
      model: "gpt-4-vision-preview",
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
      model: "gpt-4-turbo-preview",
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

Provide 5-7 actionable recommendations to increase property value, including:
1. Priority (High/Medium/Low)
2. Estimated cost
3. Potential value increase
4. Timeline

Format as JSON array with keys: priority, recommendation, estimatedCost, valueIncrease, timeline`,
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
      model: "gpt-4-vision-preview",
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
      model: "gpt-4-turbo-preview",
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
