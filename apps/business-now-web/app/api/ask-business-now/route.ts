import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const SYSTEM_PROMPT = `
You are Business Now, a generative AI advisor embedded inside the Loud Legacy ecosystem.
Provide practical, step-by-step guidance that references Business Now modules: Dashboard, AI Advisor, Course Library,
Templates Vault, Finance Tools, Marketing Hub, Launch Checklist, and Community Forum.
Return clear recommendations, highlight relevant templates or metrics, and keep the tone actionable and encouraging.
If calculations are requested, explain assumptions. Encourage the user to log updates in the Dashboard and Launch Checklist.
`;

const FALLBACK_REPLY =
  "Here’s a quick plan to keep you moving: review your metrics in the Dashboard, pick the next Launch Checklist milestone, and open the Templates Vault for the recommended assets. Once you capture results, Ask Business Now again with any updates so I can adapt the next steps.";

const MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { messages?: ChatMessage[] };
    const messages = body.messages ?? [];

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages array required" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ reply: FALLBACK_REPLY, mocked: true }, { status: 200 });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT
          },
          ...messages
        ],
        temperature: 0.4
      })
    });

    if (!response.ok) {
      const errorPayload = await response.text();
      console.error("OpenAI API error", response.status, errorPayload);
      return NextResponse.json(
        { error: "Advisor service unavailable", details: errorPayload },
        { status: 502 }
      );
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
      usage?: { prompt_tokens?: number; completion_tokens?: number; total_tokens?: number };
    };

    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json(
        { error: "Advisor returned an empty response" },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply, usage: data.usage });
  } catch (error) {
    console.error("Advisor route error", error);
    return NextResponse.json({ error: "Unexpected advisor error" }, { status: 500 });
  }
}
