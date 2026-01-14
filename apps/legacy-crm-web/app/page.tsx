import { ProspectPlanner } from "../components/ProspectPlanner";
import { ProspectSuggester } from "../components/ProspectSuggester";

const navLinks = [
  { label: "Overview", href: "#overview" },
  { label: "Core Records", href: "#records" },
  { label: "Pipeline", href: "#pipeline" },
  { label: "Activities", href: "#activities" },
  { label: "Automation", href: "#automation" },
  { label: "Business Now", href: "#business-now" },
  { label: "Prospecting", href: "#prospecting" },
  { label: "Analytics", href: "#analytics" },
  { label: "Expansion", href: "#expansion" }
];

const coreComponents = [
  {
    title: "Contacts",
    meta: "People at the heart of every deal",
    highlights: [
      "Segment by sponsor, investor, partner, or client",
      "Auto-link to companies and active opportunities",
      "Click-to-call, log email, and add follow-up tasks in one modal"
    ],
    example: {
      name: "John Doe",
      company: "SolarWave Energy",
      email: "john@solarwave.com",
      type: "Sponsor lead",
      note: "Interested in naming rights for the main arena."
    }
  },
  {
    title: "Companies",
    meta: "Organize every organization in your ecosystem",
    highlights: [
      "Track industry, location, and territory assignment",
      "Auto-calculated contact count and pipeline value",
      "Roll-up views by venture (VALORA, Business Now, Legacy Real Estate)"
    ],
    example: {
      name: "SolarWave Energy",
      industry: "Renewable energy",
      location: "Chicago, IL",
      contacts: "3 linked contacts",
      pipeline: "$175,000 open"
    }
  },
  {
    title: "Opportunities",
    meta: "Your revenue engine",
    highlights: [
      "Stages from lead to closed won/lost with customizable Kanban",
      "Expected revenue automatically calculated via probability",
      "Attach documents, proposals, and ROI snapshots from VALORA"
    ],
    example: {
      name: "SolarWave Stadium Package",
      stage: "Proposal sent",
      value: "$70,000",
      probability: "80% probability • $56,000 expected",
      nextStep: "Follow-up on LED placements"
    }
  },
  {
    title: "Activities",
    meta: "Momentum captured across every touchpoint",
    highlights: [
      "Log calls, meetings, tasks, and emails",
      "Sync with Google Calendar and Gmail for zero-lift capture",
      "Automated reminders when no contact is made for 14 days"
    ],
    example: {
      type: "Meeting",
      summary: "Tour at stadium • 10/15 follow-up",
      owner: "Assigned to Jordan Carter",
      status: "Recap email scheduled via automation"
    }
  }
];

const pipelineStages = [
  {
    stage: "Qualified",
    deals: [
      {
        name: "Legacy Real Estate Vendor Summit",
        value: "$25,000",
        note: "Needs updated attendee list"
      },
      {
        name: "VALORA Analytics pilot",
        value: "$18,500",
        note: "Waiting on security review"
      }
    ]
  },
  {
    stage: "Proposal",
    deals: [
      {
        name: "Business Now Enterprise License",
        value: "$40,000",
        note: "Proposal sent • follow-up 10/31"
      },
      {
        name: "SolarWave Stadium Package",
        value: "$70,000",
        note: "Review LED placements • exec sponsor looped"
      }
    ]
  },
  {
    stage: "Negotiation",
    deals: [
      {
        name: "VenueVR Training Pods",
        value: "$56,000",
        note: "Discount requested • evaluating ROI report"
      }
    ]
  }
];

const activitiesTimeline = [
  {
    type: "Call",
    owner: "Jordan",
    date: "Oct 15",
    summary: "Followed up with SolarWave about bundle pricing."
  },
  {
    type: "Meeting",
    owner: "Taylor",
    date: "Oct 17",
    summary: "Legacy Real Estate site visit • notes synced from iPad."
  },
  {
    type: "Task",
    owner: "Riley",
    date: "Due Oct 20",
    summary: "Send revised sponsorship deck with ROI snapshots."
  }
];

const automationIdeas = [
  "Email parsing: turn starred Gmail threads into contacts + opportunities.",
  "AI-assisted entry: summarize calls and auto-tag next steps with probability adjustments.",
  "VALORA integration: pull asset valuations directly into deal ROI tabs.",
  "Business Now sync: surface coaching plans linked to consulting opportunities."
];

const analyticsHighlights = [
  {
    label: "Pipeline total",
    value: "$289K",
    context: "Across sponsorship, real estate, and consulting ventures."
  },
  {
    label: "Average deal size",
    value: "$36K",
    context: "Driven by bundled cross-venture packages."
  },
  {
    label: "Win rate (90 days)",
    value: "32%",
    context: "Up 8% after implementing follow-up automations."
  },
  {
    label: "Top industries",
    value: "Renewable energy, fintech, universities",
    context: "AI surfaces commanding segments for Q4 focus."
  }
];

const expansionIdeas = [
  {
    title: "Mobile companion",
    description: "React Native experience for logging calls and scanning business cards on the go."
  },
  {
    title: "AI deal brief",
    description:
      "GPT-powered summaries with probability, blockers, and recommended assets for every pipeline review."
  },
  {
    title: "Automation triggers",
    description: "Reminder rules when no contact is logged in 14 days or when deals stall in stage."
  },
  {
    title: "Global venture dashboard",
    description:
      "Unified roll-up of sponsorship, real estate, Business Now coaching, and VALORA analytics in one glance."
  }
];

const integrations = ["Google Sheets", "Gmail", "Calendar", "VALORA", "Business Now", "Slack", "Zapier", "Notion"];

const businessNowHighlights = [
  {
    title: "Template vault sync",
    description:
      "Push Business Now templates straight into Legacy CRM playbooks. Track adoption and completion for every client or sponsor."
  },
  {
    title: "Coaching pipeline bridge",
    description:
      "Convert Business Now coaching cohorts into CRM opportunities with automated tasks, next steps, and AI-written recaps."
  },
  {
    title: "Launch checklist insight",
    description:
      "See Launch Checklist progress alongside deal stages so operators know which customers are primed for upsells."
  }
];

const businessNowMetrics = [
  { label: "Templates connected", value: "65+", context: "CRM-ready playbooks mapped from Business Now modules." },
  { label: "Coaching sequences", value: "12", context: "Automations that trigger tasks and follow-ups inside CRM." },
  {
    label: "Cross-venture wins",
    value: "18%",
    context: "Lift in close rate when Business Now cohorts graduate into CRM opportunities."
  }
];

export default function LegacyCrmHome() {
  return (
    <main className="crm-layout">
      <aside className="crm-sidebar">
        <div className="crm-bundled-banner">
          Included free with VALORA, Business Now, and Sportify subscriptions
        </div>
        <div className="crm-sidebar__logo">
          <span>Legacy CRM</span>
          <h1>Unified relationship command center</h1>
        </div>
        <p className="crm-sidebar__description">
          Track contacts, companies, deals, and activities across every Loud Legacy venture. Forecast revenue,
          automate follow-ups, and keep relationships warm without bloated enterprise tools.
        </p>
        <nav className="crm-nav">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="crm-sidebar__footer">
          <p>
            Want to see it in motion? Join the beta cohort to connect Legacy CRM with VALORA, Business Now, and
            your Gmail in minutes.
          </p>
          <a className="crm-button" href="#expansion">
            Join beta waitlist
          </a>
          <a className="crm-button" href="mailto:legacycrm@loudlegacy.com">
            Talk to our team
          </a>
        </div>
      </aside>

      <div className="crm-content">
        <section id="overview" className="crm-section">
          <div className="crm-section__header">
            <div className="crm-badge">Deal intelligence</div>
            <h2>Control the entire revenue lifecycle</h2>
            <p>
              Legacy CRM keeps sponsorships, consulting engagements, and real estate ventures aligned in one
              operating system. We blend clean data models with Loud Legacy automations so every relationship is
              nurtured, every deal is forecast, and every venture shares insight.
            </p>
          </div>
          <div className="crm-grid crm-grid--three">
            {["Contacts", "Companies", "Opportunities"].map((pillar) => (
              <div key={pillar} className="crm-card">
                <h3>{pillar}</h3>
                <p>
                  Manage {pillar.toLowerCase()} with structured fields, AI summaries, and ecosystem-aware links
                  so every team stays in sync.
                </p>
              </div>
            ))}
          </div>
          <div className="crm-meta">
            <span>Left nav: Contacts • Companies • Deals • Tasks • Analytics</span>
            <span>Top bar: Global search & quick add</span>
            <span>Design: VALORA palette • Poppins type</span>
          </div>
        </section>

        <section id="records" className="crm-section">
          <div className="crm-section__header">
            <div className="crm-badge">Core records</div>
            <h2>Every relationship in one place</h2>
            <p>
              The schema is simple but powerful: contacts, companies, opportunities, and activities stitched
              together automatically. Each card below includes real examples from the product concept.
            </p>
          </div>
          <div className="crm-grid crm-grid--two">
            {coreComponents.map((component) => (
              <article key={component.title} className="crm-card">
                <h3>{component.title}</h3>
                <p>{component.meta}</p>
                <ul>
                  {component.highlights.map((highlight) => (
                    <li key={highlight} style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)" }}>
                      {highlight}
                    </li>
                  ))}
                </ul>
                <div className="crm-card" style={{ borderStyle: "dashed" }}>
                  {Object.entries(component.example).map(([key, value]) => (
                    <div key={key} style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-secondary)" }}>
                      <strong style={{ color: "var(--color-text-primary)" }}>{key}:</strong> {value}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="pipeline" className="crm-section">
          <div className="crm-section__header">
            <div className="crm-badge">Real-time pipeline</div>
            <h2>Kanban + list views for every venture</h2>
            <p>
              Drag deals through stages, overlay probability, and see expected revenue update instantly. Swap to
              table mode for quick filtering by industry, owner, or close date.
            </p>
          </div>
          <div className="crm-kanban">
            {pipelineStages.map((column) => (
              <div key={column.stage} className="crm-kanban__column">
                <h3>{column.stage}</h3>
                {column.deals.map((deal) => (
                  <div key={deal.name} className="crm-kanban__card">
                    <strong>{deal.name}</strong>
                    <span style={{ color: "rgba(255, 215, 0, 0.8)" }}>{deal.value}</span>
                    <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)" }}>
                      {deal.note}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <table className="crm-table">
            <thead>
              <tr>
                <th>Deal</th>
                <th>Stage</th>
                <th>Owner</th>
                <th>Expected</th>
                <th>Close date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Legacy Real Estate Vendor Summit</td>
                <td>Qualified</td>
                <td>Jordan</td>
                <td>$17,500</td>
                <td>10/29/25</td>
              </tr>
              <tr>
                <td>SolarWave Stadium Package</td>
                <td>Proposal</td>
                <td>Taylor</td>
                <td>$56,000</td>
                <td>10/31/25</td>
              </tr>
              <tr>
                <td>Business Now Enterprise License</td>
                <td>Proposal</td>
                <td>Riley</td>
                <td>$28,000</td>
                <td>11/12/25</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section id="activities" className="crm-section">
          <div className="crm-section__header">
            <div className="crm-badge">Activity intelligence</div>
            <h2>Log every touchpoint without the busywork</h2>
            <p>
              Calls, meetings, tasks, and emails roll into the activity timeline. The AI assistant writes call
              recaps and nudges owners when outreach stalls.
            </p>
          </div>
          <div className="crm-timeline">
            {activitiesTimeline.map((activity) => (
              <div key={`${activity.type}-${activity.date}`} className="crm-timeline__item">
                <div className="crm-timeline__meta">
                  <span>{activity.type}</span>
                  <span>{activity.date}</span>
                </div>
                <strong>{activity.owner}</strong>
                <p style={{ margin: 0, color: "var(--color-text-secondary)" }}>{activity.summary}</p>
              </div>
            ))}
          </div>
          <div className="crm-quick-actions">
            {["Log call", "Schedule meeting", "Create task", "Sync email"].map((action) => (
              <button key={action} type="button" className="crm-pill-button">
                {action}
              </button>
            ))}
          </div>
        </section>

        <section id="automation" className="crm-section">
          <div className="crm-section__header">
            <div className="crm-badge">Automation ideas</div>
            <h2>Low-code start, high-impact workflows</h2>
            <p>
              Launch fast with Google Sheets and App Script, or layer on Retool/Glide for rich interfaces. The
              roadmap unlocks deep AI assistance and cross-venture integrations.
            </p>
          </div>
          <div className="crm-grid crm-grid--two">
            {automationIdeas.map((idea) => (
              <div key={idea} className="crm-card">
                <h3>Automation</h3>
                <p>{idea}</p>
              </div>
            ))}
          </div>
          <div>
            <h3>Connect your ecosystem</h3>
            <div className="crm-tag-list">
              {integrations.map((integration) => (
                <span key={integration}>{integration}</span>
              ))}
            </div>
          </div>
        </section>

        <section id="business-now" className="crm-section">
          <div className="crm-section__header">
            <div className="crm-badge">Business Now integration</div>
            <h2>Layer Business Now playbooks directly into CRM execution</h2>
            <p>
              Legacy CRM was designed to partner with Business Now. Templates, coaching cohorts, and Launch
              Checklist milestones flow into the same workspace so you can see how education drives pipeline.
            </p>
          </div>
          <div className="crm-grid crm-grid--three">
            {businessNowHighlights.map((highlight) => (
              <article key={highlight.title} className="crm-card">
                <h3>{highlight.title}</h3>
                <p>{highlight.description}</p>
              </article>
            ))}
          </div>
          <div className="crm-stats">
            {businessNowMetrics.map((metric) => (
              <div key={metric.label} className="crm-stats__card">
                <span className="crm-stats__value">{metric.value}</span>
                <span style={{ color: "rgba(255, 215, 0, 0.7)", fontSize: "var(--font-size-sm)" }}>
                  {metric.label}
                </span>
                <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)" }}>
                  {metric.context}
                </p>
              </div>
            ))}
          </div>
          <div className="crm-meta">
            <span>Templates sync on every cohort completion</span>
            <span>AI coach writes CRM follow-up sequences</span>
            <span>Shared analytics connect Business Now and Legacy CRM</span>
          </div>
        </section>

        <section id="prospecting" className="crm-section">
          <div className="crm-section__header">
            <div className="crm-badge">Prospecting coverage</div>
            <h2>Find the prospects to close your sales goal</h2>
            <p>
              Use the coverage planner to translate revenue targets into the number of opportunities and
              prospects you need. Sync results into the Activities board to auto-generate tasks and cadences.
            </p>
          </div>
          <ProspectPlanner />
        </section>

        <section className="crm-section" aria-labelledby="prospect-ai">
          <div className="crm-section__header">
            <div className="crm-badge">AI prospect scout</div>
            <h2 id="prospect-ai">AI-suggested prospects ready to engage</h2>
            <p>
              The generative scout combs through public data, VALORA ROI profiles, and past deal outcomes to
              recommend the next best people to reach. Drop the prospects straight into Contacts or open
              Opportunities.
            </p>
          </div>
          <ProspectSuggester />
        </section>

        <section id="analytics" className="crm-section">
          <div className="crm-section__header">
            <div className="crm-badge">Forecast ready</div>
            <h2>Analytics tab built for operators</h2>
            <p>
              Pipeline totals, velocity, and industry trends live next to your deals. Pair it with VALORA
              analytics for ROI modeling and pipeline health scoring.
            </p>
          </div>
          <div className="crm-stats">
            {analyticsHighlights.map((highlight) => (
              <div key={highlight.label} className="crm-stats__card">
                <span className="crm-stats__value">{highlight.value}</span>
                <span style={{ color: "rgba(255, 215, 0, 0.7)", fontSize: "var(--font-size-sm)" }}>
                  {highlight.label}
                </span>
                <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)" }}>
                  {highlight.context}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="expansion" className="crm-section">
          <div className="crm-section__header">
            <div className="crm-badge">Expansion roadmap</div>
            <h2>Where Legacy CRM goes next</h2>
            <p>
              Designed to grow with the Loud Legacy portfolio. From mobile to AI deal briefs, everything keeps
              founders shipping faster.
            </p>
          </div>
          <div className="crm-grid crm-grid--two">
            {expansionIdeas.map((idea) => (
              <article key={idea.title} className="crm-card">
                <h3>{idea.title}</h3>
                <p>{idea.description}</p>
              </article>
            ))}
          </div>
          <div className="crm-meta">
            <span>Future: Flutter/React Native companion</span>
            <span>AI auto-briefs for leadership reviews</span>
            <span>Automation triggers for every pipeline stage</span>
          </div>
        </section>

        <footer className="crm-footer">
          Ready to pilot Legacy CRM with your ventures? Join the beta cohort and help shape the operating system
          for relationships across Loud Legacy.
        </footer>
      </div>
    </main>
  );
}
