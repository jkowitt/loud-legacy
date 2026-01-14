import Link from "next/link";
import { AskBusinessNow } from "../components/AskBusinessNow";

const navLinks = [
  { label: "Overview", href: "#overview" },
  { label: "Modules", href: "#modules" },
  { label: "AI Advisor", href: "#ai" },
  { label: "Templates & Tools", href: "#templates" },
  { label: "Pricing", href: "#pricing" },
  { label: "Experience", href: "#design" },
  { label: "Tech Stack", href: "#stack" },
  { label: "Future", href: "#future" }
];

const valueProps = [
  {
    title: "Launch with confidence",
    description: "Step-by-step launch guides cover idea validation, entity setup, and go-to-market execution."
  },
  {
    title: "Operate like a pro",
    description: "Operator-tested templates keep finance, marketing, HR, and operations accountable."
  },
  {
    title: "AI co-pilot",
    description: "Ask Business Now surfaces strategy, draft assets, and forecasts cash flow using your inputs."
  }
];

const modules = [
  {
    title: "Dashboard",
    role: "Command center",
    summary: "A personalized workspace that tracks every sprint, deliverable, and coaching touchpoint.",
    features: [
      "Milestone tracker with gamified completion bar",
      "Quick access to saved templates, courses, and AI chats",
      "Workspace switching for founders juggling multiple ideas"
    ]
  },
  {
    title: "AI Advisor",
    role: "Always-on consulting",
    summary: "GPT-5 tuned on operator playbooks to answer growth, finance, and branding questions instantly.",
    features: [
      "Conversational strategy reviews and pitch feedback",
      "Context-awareness pulls in your company profile and metrics",
      "Exports decisions as meeting notes or next-step checklists"
    ]
  },
  {
    title: "Course Library",
    role: "Self-paced programs",
    summary: "Modular curriculum that moves from validation to scale with assessments and action labs.",
    features: [
      "Tracks for marketing, finance, legal, HR, and operations",
      "Video, worksheets, and peer prompts in each module",
      "Progress syncs with dashboard missions automatically"
    ]
  },
  {
    title: "Templates Vault",
    role: "Plug-and-play assets",
    summary: "Downloadable decks, spreadsheets, contracts, and brand kits ready to customize.",
    features: [
      "Pitch decks, investor updates, and OKR scorecards",
      "Budget, cashflow, and runway calculators",
      "Contracts, onboarding flows, and SOP templates"
    ]
  },
  {
    title: "Finance Tools",
    role: "Intelligent calculators",
    summary: "Built-in models for forecasting profit, break-even, and scenario planning.",
    features: [
      "Automated profit margin and pricing recommendations",
      "Cashflow runway projections tied to Stripe or QuickBooks",
      "Exports to spreadsheet or Notion with live assumptions"
    ]
  },
  {
    title: "Marketing Hub",
    role: "Growth engine",
    summary: "AI-assisted content, campaign scheduling, and brand management in one space.",
    features: [
      "Social media planner with AI copywriter",
      "Landing page copy generator aligned to your ICP",
      "Editorial calendar that syncs with Google Workspace"
    ]
  },
  {
    title: "Launch Checklist",
    role: "Guided roadmap",
    summary: "A completion tracker from ideation to first sale with unlockable bonuses each step.",
    features: [
      "Tracks legal setup, product build, and go-to-market sprints",
      "Founders earn badges and unlock expert Q&A sessions",
      "Auto-assign tasks to collaborators with due dates"
    ]
  },
  {
    title: "Community Forum",
    role: "Peer network",
    summary: "Share case studies, swap best practices, and celebrate wins with operators who get it.",
    features: [
      "Post case studies with real numbers and lessons learned",
      "Contribute best practices and get feedback from the community",
      "Ask questions and get answers from operators who've been there",
      "Celebrate wins and milestones with people who understand the grind"
    ]
  }
];

const aiFeatures = [
  {
    title: "Ask Business Now",
    summary: "A 24/7 AI consultant that remembers your goals and traction.",
    highlights: [
      "Strategic coaching on pricing, fundraising, and hiring",
      "Understands uploaded docs, CRM exports, and financials",
      "One-click export to Notion, Google Docs, or PDF"
    ]
  },
  {
    title: "Auto Template Filler",
    summary: "AI drafts business plans, pitch decks, and SOPs using your saved data.",
    highlights: [
      "Drag-and-drop context collecting across forms and docs",
      "Smart sections flag missing information before you export",
      "Version history logs guidance from mentors or teammates"
    ]
  },
  {
    title: "Profit Predictor",
    summary: "Scenario planning that models revenue, costs, and break-even for each product.",
    highlights: [
      "Connects to Stripe, QuickBooks, or manual CSV uploads",
      "Runs multiple pricing and volume forecasts in seconds",
      "Spits out investor-ready charts for updates and decks"
    ]
  }
];

const templateCollections = [
  {
    title: "Launch playbooks",
    description: "Guided paths bundled with videos, worksheets, and accountability prompts.",
    assets: ["Idea validation blueprint", "Entity formation checklists", "Go-to-market sprint plans"]
  },
  {
    title: "Template vault",
    description: "A searchable library of 150+ editable assets ready to duplicate.",
    assets: ["Financial model starter", "Brand identity kit", "Sales pipeline tracker"]
  },
  {
    title: "Marketing hub",
    description: "Keep content, campaigns, and channels aligned with AI assistance.",
    assets: ["Social calendar with AI copy", "Paid ads creative brief", "Newsletter repurposing workflow"]
  }
];

const financeTools = [
  "Profit margin, cashflow, and break-even calculators",
  "Scenario planning for new products or pricing tiers",
  "Funding runway dashboard with alerts and what-if toggles"
];

const integrations = ["Google Workspace", "Notion", "Stripe", "QuickBooks", "Zapier", "Calendly"];

const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    cadence: "/forever",
    tagline: "Starter toolkit",
    perks: [
      "Launch checklist core milestones",
      "Starter guides and 10 templates",
      "Limited Ask Business Now queries each month"
    ]
  },
  {
    name: "Pro",
    price: "$19",
    cadence: "/mo",
    tagline: "Solo founder favorite",
    perks: [
      "Full course library with quizzes and labs",
      "Unlimited templates and AI document drafting",
      "Ask Business Now with advanced context memory"
    ]
  },
  {
    name: "Business+",
    price: "$49",
    cadence: "/mo",
    tagline: "Growth teams",
    perks: [
      "Advanced finance + marketing tools",
      "Community cohorts and live workshops",
      "Exportable reports with white-label branding"
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    tagline: "Accelerators & universities",
    perks: [
      "Team dashboards and seat management",
      "Dedicated success manager and onboarding",
      "White-label option with curriculum licensing"
    ]
  }
];

const designHighlights = [
  {
    title: "Sidebar-first navigation",
    description: "Left sidebar keeps missions, courses, and templates a single click away for desktop operators."
  },
  {
    title: "Motivational progress",
    description: "Badges, streaks, and the roadmap bar reinforce completion and make progress visible to teams."
  },
  {
    title: "Adaptive modules",
    description: "Dynamic cards surface the most relevant templates and automations based on business stage."
  }
];

const techStack = [
  { component: "Front end", tech: "React + Next.js with static export support" },
  { component: "Backend", tech: "FastAPI services or Firebase for realtime workloads" },
  { component: "Database", tech: "PostgreSQL for relational data or Firestore for rapid iteration" },
  { component: "AI", tech: "OpenAI GPT-5 with Business Now fine-tuning and retrieval" },
  { component: "Payments", tech: "Stripe subscriptions mapped to workspace tiers" },
  { component: "Auth", tech: "Firebase Auth with Google, Apple, and email magic links" },
  { component: "Hosting", tech: "Vercel deployment with GoDaddy static export compatibility" }
];

const futureAddOns = [
  {
    title: "VALORA valuation integration",
    description: "Pipe Business Now financials into VALORA to generate business valuations on demand."
  },
  {
    title: "Hire an expert marketplace",
    description: "Graduate to verified consultants and coaches, with scopes scoped inside Business Now."
  },
  {
    title: "Mobile companion app",
    description: "React Native experience for courses, templates, and accountability nudges on the go."
  },
  {
    title: "Education partner API",
    description: "Universities and incubators can license the system with cohort-level analytics."
  }
];

export default function BusinessNowHome() {
  const roadmapCompletion = 65;

  return (
    <main className="layout">
      <aside className="sidebar">
        <div className="sidebar__header">
          <span className="badge">Business Now</span>
          <h1>DIY online business consulting platform</h1>
          <p>
            Build, structure, and scale without traditional consultants. The Loud Legacy operating system
            tuned for founders who want to move fast with expert-grade tools.
          </p>
        </div>
        <nav className="sidebar__nav">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="sidebar__footer">
          <p>
            Ready to go deeper? Unlock AI advisor sessions, advanced tools, and the Business+ community for
            growth teams.
          </p>
          <Link className="sidebar__cta" href="/coaching">
            Join the waitlist
          </Link>
          <Link className="sidebar__cta" href="/courses">
            Preview curriculum
          </Link>
        </div>
      </aside>

      <div className="content">
        <div className="progress-banner">
          <div className="progress-banner__meta">
            <div className="stat-badge">Launch track in beta</div>
            <strong>Eight guided sprints from idea to first sale</strong>
            <span>
              Every sprint delivers playbooks, templates, and AI nudges so founders can execute independently.
            </span>
          </div>
          <div>
            <div className="progress-banner__bar">
              <div className="progress-banner__fill" style={{ width: `${roadmapCompletion}%` }} />
            </div>
            <div className="progress-banner__status">
              <span>{roadmapCompletion}% of roadmap available today</span>
              <span>New cohorts onboard weekly</span>
            </div>
          </div>
        </div>

        <section id="overview" className="panel">
          <div className="panel__headline">
            <h2>Operator-grade tools, zero consulting fees</h2>
            <p>
              Business Now combines education, automation, and community to help entrepreneurs launch and grow
              without hiring expensive consultants. It is the digital toolkit that powers every stage of the
              journey.
            </p>
          </div>
          <div className="grid grid--three">
            {valueProps.map((value) => (
              <div key={value.title} className="card">
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="modules" className="panel">
          <div className="panel__headline">
            <h2>Core modules that run your business</h2>
            <p>
              The platform is organized into intuitive modules so founders can plug in wherever they need the
              most leverage.
            </p>
          </div>
          <div className="grid grid--modules">
            {modules.map((module) => (
              <article key={module.title} className="card">
                <span className="tag">{module.role}</span>
                <h3>{module.title}</h3>
                <p>{module.summary}</p>
                <ul>
                  {module.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="ai" className="panel">
          <div className="panel__headline">
            <h2>AI advisor tuned for builders</h2>
            <p>
              Business Now’s AI layer covers strategy, execution, and forecasting. It remembers your context,
              drafts assets, and projects outcomes so you can stay focused on customers.
            </p>
          </div>
          <div className="grid grid--two">
            {aiFeatures.map((feature) => (
              <article key={feature.title} className="card">
                <h3>{feature.title}</h3>
                <p>{feature.summary}</p>
                <ul>
                  {feature.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <AskBusinessNow />
        </section>

        <section id="templates" className="panel">
          <div className="panel__headline">
            <h2>Templates, tools, and integrations</h2>
            <p>
              A growing resource hub that ships with smart templates and native integrations. Duplicate,
              customize, and sync everything back to your existing stack.
            </p>
          </div>
          <div className="grid grid--three">
            {templateCollections.map((collection) => (
              <article key={collection.title} className="card">
                <h3>{collection.title}</h3>
                <p>{collection.description}</p>
                <ul>
                  {collection.assets.map((asset) => (
                    <li key={asset}>{asset}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="card">
            <h3>Finance tools</h3>
            <p>Operator-friendly calculators that keep your runway and margins on track.</p>
            <ul>
              {financeTools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Built to slot into your workflow</h4>
            <div className="integrations">
              {integrations.map((integration) => (
                <span key={integration}>{integration}</span>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="panel">
          <div className="panel__headline">
            <h2>Monetization built for every stage</h2>
            <p>Start for free and graduate into plans that match your momentum, from solo builders to teams.</p>
          </div>
          <div className="pricing-grid">
            {pricingTiers.map((tier) => (
              <article key={tier.name} className="pricing-card">
                <div className="pricing-card__header">
                  <h3>{tier.name}</h3>
                  <p>{tier.tagline}</p>
                </div>
                <div className="pricing-card__price">
                  {tier.price}
                  <span style={{ fontSize: "var(--font-size-sm)", marginLeft: "4px" }}>{tier.cadence}</span>
                </div>
                <ul>
                  {tier.perks.map((perk) => (
                    <li key={perk}>{perk}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <Link className="button button--ghost" href="/templates">
            Compare plan inclusions
          </Link>
        </section>

        <section id="design" className="panel">
          <div className="panel__headline">
            <h2>Experience principles</h2>
            <p>
              The product inherits VALORA’s bold, modern aesthetic while prioritizing clarity and momentum for
              busy founders.
            </p>
          </div>
          <ul className="list-reset">
            {designHighlights.map((highlight) => (
              <li key={highlight.title}>
                <h3>{highlight.title}</h3>
                <p>{highlight.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="stack" className="panel">
          <div className="panel__headline">
            <h2>Developer-ready architecture</h2>
            <p>
              Built to run inside the Loud Legacy ecosystem with shared auth, analytics, and design tokens.
            </p>
          </div>
          <table>
            <tbody>
              {techStack.map((row) => (
                <tr key={row.component}>
                  <td>{row.component}</td>
                  <td>{row.tech}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section id="future" className="panel">
          <div className="panel__headline">
            <h2>Future roadmap</h2>
            <p>
              Business Now evolves with the Loud Legacy portfolio. These roadmap items extend the value for
              founders, educators, and partners.
            </p>
          </div>
          <ul className="future-list">
            {futureAddOns.map((item) => (
              <li key={item.title}>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="cta-panel" id="cta">
          <h2>Be first in line for the beta</h2>
          <p>
            Business Now is onboarding builders into Business+ cohorts now. Secure your workspace, invite
            collaborators, and start structuring your company in hours, not months.
          </p>
          <Link className="button" href="/coaching">
            Reserve your spot
          </Link>
        </section>
      </div>
    </main>
  );
}
