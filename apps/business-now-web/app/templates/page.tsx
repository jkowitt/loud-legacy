import Link from "next/link";

const templateCategories = [
  {
    title: "Finance & operations",
    description: "Master your numbers with ready-to-use financial templates and operating cadences.",
    items: ["Cashflow dashboard", "Contribution margin tracker", "Quarterly operating review deck"]
  },
  {
    title: "Sales & marketing",
    description: "Campaign assets that keep messaging consistent while moving fast.",
    items: ["ICP briefing canvas", "Paid ads creative board", "Social media calendar with AI copy prompts"]
  },
  {
    title: "People & culture",
    description: "Hire, onboard, and scale teams with clarity from day one.",
    items: ["Hiring scorecard library", "Onboarding journey map", "Performance & feedback ritual"]
  },
  {
    title: "Legal & admin",
    description: "Stay compliant with templates that work across industries.",
    items: ["Operating agreement starter", "Independent contractor contract", "Data privacy & security policy"]
  }
];

const automationRecipes = [
  {
    title: "Funnel health scoreboard",
    description: "Pipe Stripe, Google Analytics, and CRM data into a live dashboard to track acquisition health."
  },
  {
    title: "Deal desk automation",
    description: "Trigger onboarding tasks, invoices, and welcome emails when a deal moves to closed-won."
  },
  {
    title: "Retention pulse",
    description: "Collect NPS, support signals, and product usage in one Notion HQ with alerting."
  }
];

const downloadStats = [
  {
    title: "150+",
    description: "Editable templates covering every business discipline"
  },
  {
    title: "40+",
    description: "Automation recipes connecting Business Now to the tools you already use"
  },
  {
    title: "Weekly",
    description: "New drops shipped from operator feedback"
  }
];

const integrations = [
  "Google Workspace",
  "Notion",
  "Airtable",
  "Trello",
  "Zapier",
  "ClickUp",
  "Slack",
  "Asana"
];

export default function TemplatesPage() {
  return (
    <main className="page-shell">
      <div className="breadcrumbs">
        <Link href="/">Business Now</Link>
        <span>•</span>
        <span>Templates</span>
      </div>

      <section className="page-hero">
        <h1>Template vault</h1>
        <p>
          Access plug-and-play decks, spreadsheets, automations, and SOPs. Everything is customizable and
          built to sync with your stack.
        </p>
        <div style={{ display: "flex", gap: "var(--space-3)", justifyContent: "center", flexWrap: "wrap" }}>
          <Link className="button" href="/coaching">
            Request full access
          </Link>
          <Link className="button button--ghost" href="/">
            Back to overview
          </Link>
        </div>
      </section>

      <section className="panel">
        <div className="panel__headline">
          <h2>Curated collections</h2>
          <p>Everything is organized by business function so you can duplicate the assets you need instantly.</p>
        </div>
        <div className="grid grid--two">
          {templateCategories.map((category) => (
            <article key={category.title} className="card">
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <ul>
                {category.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel__headline">
          <h2>Automation recipes</h2>
          <p>
            Pre-built Zapier and Make blueprints help wire Business Now data into your existing tools without
            extra engineering lift.
          </p>
        </div>
        <div className="grid grid--three">
          {automationRecipes.map((recipe) => (
            <article key={recipe.title} className="card">
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel__headline">
          <h2>Quantified library</h2>
          <p>Fresh drops every week keep the vault aligned with what founders are shipping.</p>
        </div>
        <div className="grid grid--three">
          {downloadStats.map((stat) => (
            <article key={stat.title} className="card">
              <h3>{stat.title}</h3>
              <p>{stat.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel__headline">
          <h2>Works with your toolkit</h2>
          <p>Deep integrations keep everything synced while letting you keep the tools you already know.</p>
        </div>
        <div className="integrations">
          {integrations.map((integration) => (
            <span key={integration}>{integration}</span>
          ))}
        </div>
      </section>
    </main>
  );
}
