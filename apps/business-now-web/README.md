# Business Now Web

Marketing and app shell for the Business Now brand within Loud Legacy. Uses the shared design system tokens to preserve the VALORA look and feel while focusing on operator education.

## Running locally
```bash
npm install
npm run dev:business
```

The current experience includes:
- Full marketing story covering the feature set, AI advisor, pricing, and roadmap
- Sidebar navigation with guided anchors and CTA entries
- Dedicated pages for:
  - `/courses` – curriculum tracks, formats, and cohort details
  - `/templates` – template vault highlights and automation recipes
  - `/coaching` – blended AI + operator advisory programs
  - `/blog` – featured content and newsletter signup
- Shared button and layout styles pulled from `@loud-legacy/shared-design-system`
- Placeholder waitlist/blog forms ready to wire into Auth0/Clerk and Stripe flows
- Generative AI demo (`Ask Business Now`) powered by `/api/ask-business-now`

### Generative AI setup

The advisor endpoint proxies to OpenAI. Provide credentials in `.env.local`:

```bash
cp .env.example .env.local
```

```dotenv
OPENAI_API_KEY=sk-***
# Optional: override the default `gpt-4o-mini`
# OPENAI_MODEL=gpt-4.1-mini
```

Without an API key the endpoint returns a fallback message so the UI still renders for demos.
