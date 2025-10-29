import Link from "next/link";

const coachingTracks = [
  {
    title: "AI-first advisory",
    description: "Unlimited Ask Business Now sessions tuned to your industry, revenue model, and goals.",
    bullets: ["Context-aware answers with document recall", "Scenario planning and decision logs", "Export transcripts to share with investors or teams"]
  },
  {
    title: "Operator coaching pods",
    description: "Weekly live sessions with operators who have scaled across finance, marketing, and ops.",
    bullets: [
      "Small-group accountability with goal tracking",
      "Deep dives on pricing, fundraising, hiring, and retention",
      "Warm intros to partner perks and capital resources"
    ]
  },
  {
    title: "Enterprise enablement",
    description: "White-label and team dashboards for incubators, accelerators, and universities.",
    bullets: [
      "Curriculum mapping and onboarding playbooks",
      "Seat management and progress analytics per cohort",
      "Custom AI guardrails to match your compliance needs"
    ]
  }
];

const advisoryMoments = [
  {
    title: "Strategy review",
    description: "Upload your pitch, business plan, or forecasts for annotated feedback in minutes."
  },
  {
    title: "Financial clarity",
    description: "Align leadership with cashflow reports, margin alerts, and what-if analysis generated on demand."
  },
  {
    title: "Launch readiness",
    description: "Run go-to-market simulations, compare channel ROI, and build your first 100-day plan."
  }
];

const perks = [
  "Priority support with 24-hour response time",
  "Quarterly business health audit powered by AI + operators",
  "Partner offers from Stripe, Google Cloud, Notion, and more",
  "Ability to invite mentors, investors, or advisors as read-only guests"
];

export default function CoachingPage() {
  return (
    <main className="page-shell">
      <div className="breadcrumbs">
        <Link href="/">Business Now</Link>
        <span>•</span>
        <span>Coaching</span>
      </div>

      <section className="page-hero">
        <h1>Coaching & advisory</h1>
        <p>
          Pair the Business Now operating system with AI-guided advisory and operator-led coaching pods.
          Designed for founders, teams, and enterprise programs that want accountability.
        </p>
        <div style={{ display: "flex", gap: "var(--space-3)", justifyContent: "center", flexWrap: "wrap" }}>
          <Link className="button" href="#interest">
            Book intro call
          </Link>
          <Link className="button button--ghost" href="/">
            Back to overview
          </Link>
        </div>
      </section>

      <section className="panel">
        <div className="panel__headline">
          <h2>Choose your coaching lane</h2>
          <p>Mix AI guidance with live operator sessions to match the level of support your team needs.</p>
        </div>
        <div className="grid grid--two">
          {coachingTracks.map((track) => (
            <article key={track.title} className="card">
              <h3>{track.title}</h3>
              <p>{track.description}</p>
              <ul>
                {track.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel__headline">
          <h2>Moments where the advisor shines</h2>
          <p>The blended AI + operator model keeps you supported during the highest stakes moves.</p>
        </div>
        <div className="grid grid--three">
          {advisoryMoments.map((moment) => (
            <article key={moment.title} className="card">
              <h3>{moment.title}</h3>
              <p>{moment.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel" id="interest">
        <div className="panel__headline">
          <h2>Included with Business+ coaching</h2>
          <p>Every engagement layers operator insight on top of the Business Now platform.</p>
        </div>
        <ul className="list-reset">
          {perks.map((perk) => (
            <li key={perk}>
              <p>{perk}</p>
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
          <Link className="button" href="mailto:hello@businessnow.com">
            Email the team
          </Link>
          <Link className="button button--ghost" href="/courses">
            Explore curriculum
          </Link>
        </div>
      </section>
    </main>
  );
}
