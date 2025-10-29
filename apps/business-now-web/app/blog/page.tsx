import Link from "next/link";

const featuredPosts = [
  {
    title: "From idea to first invoice in 45 days",
    summary: "How three founders used Business Now to launch their first offers with automated onboarding.",
    category: "Founder stories",
    readingTime: "8 min read"
  },
  {
    title: "The modern operator’s financial dashboard",
    summary: "A practical walkthrough of our cashflow, runway, and scenario planning tools.",
    category: "Playbooks",
    readingTime: "6 min read"
  },
  {
    title: "Designing AI guardrails for business advisory",
    summary: "Behind the scenes on tuning Ask Business Now for trustworthy, actionable insights.",
    category: "Product",
    readingTime: "10 min read"
  }
];

const contentSeries = [
  {
    title: "Launch Diaries",
    description: "Weekly progress reports from founders in the Launch Checklist beta cohorts.",
    cadence: "Every Monday"
  },
  {
    title: "Operator Office Hours",
    description: "Recorded AMAs with operators covering growth, fundraising, and retention.",
    cadence: "Twice monthly"
  },
  {
    title: "Template Tuesdays",
    description: "Spotlights of the latest templates and automation recipes added to the vault.",
    cadence: "Weekly"
  }
];

const newsletterBenefits = [
  "Monthly drop of new templates, automations, and course release notes",
  "Early invites to Business+ cohorts and partner workshops",
  "Highlights from the community forum and marketplace opportunities"
];

export default function BlogPage() {
  return (
    <main className="page-shell">
      <div className="breadcrumbs">
        <Link href="/">Business Now</Link>
        <span>•</span>
        <span>Blog</span>
      </div>

      <section className="page-hero">
        <h1>Business Now journal</h1>
        <p>
          Stories, playbooks, and updates for builders shipping companies the independent way. Subscribe to
          stay in the loop.
        </p>
      </section>

      <section className="panel">
        <div className="panel__headline">
          <h2>Featured articles</h2>
          <p>Curated reads that showcase how founders ship with the Business Now operating system.</p>
        </div>
        <div className="grid grid--three">
          {featuredPosts.map((post) => (
            <article key={post.title} className="card">
              <span className="tag">{post.category}</span>
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
              <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)" }}>
                {post.readingTime}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel__headline">
          <h2>Series you can follow</h2>
          <p>Each series maps to a core module so you can learn by example as new features roll out.</p>
        </div>
        <div className="grid grid--three">
          {contentSeries.map((series) => (
            <article key={series.title} className="card">
              <h3>{series.title}</h3>
              <p>{series.description}</p>
              <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)" }}>
                {series.cadence}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel__headline">
          <h2>Operator signals newsletter</h2>
          <p>Join the newsletter to receive insights, new templates, and cohort invitations.</p>
        </div>
        <ul className="list-reset">
          {newsletterBenefits.map((benefit) => (
            <li key={benefit}>
              <p>{benefit}</p>
            </li>
          ))}
        </ul>
        <form
          style={{
            display: "flex",
            gap: "var(--space-3)",
            flexWrap: "wrap",
            alignItems: "center"
          }}
        >
          <input
            type="email"
            required
            placeholder="you@example.com"
            style={{
              flex: "1",
              minWidth: "240px",
              padding: "var(--space-3)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border-subtle)",
              background: "transparent",
              color: "inherit"
            }}
          />
          <button type="submit" className="button">
            Subscribe
          </button>
        </form>
      </section>
    </main>
  );
}
