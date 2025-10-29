import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `
You are the sales prospecting agent for Legacy CRM within the Loud Legacy ecosystem.
Given a short business brief, return 3 high-potential prospects that match the profile.
Include:
- name
- company
- title
- contact information (email and phone when publicly available or reasonable to infer)
- a short note tying them to the request and suggesting next steps.
Favor leads relevant to sponsorships, consulting, or real estate opportunities connected to Loud Legacy brands.
`;

type Prospect = {
  name: string;
  company: string;
  title: string;
  email?: string;
  phone?: string;
  note: string;
};

const FALLBACK_PROSPECTS: Prospect[] = [
  {
    name: "Amelia Rivera",
    title: "VP Partnerships",
    company: "Midwest Green Energy",
    email: "amelia.rivera@midwestgreen.com",
    phone: "(312) 555-7710",
    note: "Leading sustainability sponsorships in Chicago. Interested in venues with strong community programming—relay VALORA analytics for ROI."
  },
  {
    name: "Marcus Patel",
    title: "Director of Corporate Giving",
    company: "Great Lakes University",
    email: "marcus.patel@greatlakes.edu",
    phone: "(773) 555-4432",
    note: "Exploring naming rights for sports facilities to support alumni fundraising. Suggest Business Now consulting tie-in."
  },
  {
    name: "Sophia Chen",
    title: "Head of Marketing",
    company: "EcoGrid Lighting",
    email: "sophia.chen@ecogrid.io",
    phone: "(219) 555-9024",
    note: "Launching smart lighting solutions for arenas. Open to bundled VenueVR demos to showcase immersive fan engagement."
  }
];

const MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

export async function POST(request: Request) {
  try {
    const { brief } = (await request.json()) as { brief?: string };
    if (!brief || typeof brief !== "string" || !brief.trim()) {
      return NextResponse.json({ error: "Brief is required" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          suggestions: FALLBACK_PROSPECTS,
          mocked: true
        },
        { status: 200 }
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.5,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: `Brief: ${brief}\nReturn JSON array with objects containing name, company, title, email, phone, and note.`
          }
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "prospect_suggestions",
            schema: {
              type: "object",
              properties: {
                suggestions: {
                  type: "array",
                  items: {
                    type: "object",
                    required: ["name", "company", "title", "note"],
                    properties: {
                      name: { type: "string" },
                      company: { type: "string" },
                      title: { type: "string" },
                      email: { type: "string" },
                      phone: { type: "string" },
                      note: { type: "string" }
                    }
                  }
                }
              },
              required: ["suggestions"]
            }
          }
        }
      })
    });

    if (!response.ok) {
      const errorPayload = await response.text();
      console.error("OpenAI prospect agent error", response.status, errorPayload);
      return NextResponse.json(
        { error: "Prospect agent unavailable", details: errorPayload },
        { status: 502 }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json({ error: "Empty response from prospect agent" }, { status: 500 });
    }

    const parsed = JSON.parse(content) as { suggestions?: Prospect[] };
    const suggestions = parsed.suggestions ?? [];

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("Prospect agent route error", error);
    return NextResponse.json({ error: "Unexpected prospect agent error" }, { status: 500 });
  }
}
