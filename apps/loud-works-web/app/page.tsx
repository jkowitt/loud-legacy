import Link from "next/link";

const navLinks = [
  { label: "Loud Legacy Home", href: "https://loud-legacy.com" },
  { label: "Overview", href: "#overview" },
  { label: "For Talent", href: "#talent" },
  { label: "For Partners", href: "#partners" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
];

const stats = [
  { value: "$2.4M+", label: "Paid to Talent", context: "Real earnings for real work" },
  { value: "850+", label: "Projects Completed", context: "Across all partner organizations" },
  { value: "94%", label: "Completion Rate", context: "Quality-verified deliverables" },
  { value: "12", label: "Partner Organizations", context: "Growing network of employers" },
];

const talentBenefits = [
  {
    title: "Real Paid Work",
    description: "No unpaid internships. Every project pays competitively based on scope and skills required.",
  },
  {
    title: "Build Your Proof Vault",
    description: "Every completed project adds verified proof to your portfolio. Show don't tell.",
  },
  {
    title: "Skill Growth Tracking",
    description: "See which skills you're developing and get recommendations for what to learn next.",
  },
  {
    title: "References That Matter",
    description: "Partner feedback becomes part of your professional profile. Real endorsements from real work.",
  },
];

const partnerBenefits = [
  {
    title: "Pre-Vetted Talent Pool",
    description: "Access students, athletes, and local professionals with verified skills and availability.",
  },
  {
    title: "AI-Powered Matching",
    description: "Our matching engine recommends candidates based on skills, proof, ratings, and project fit.",
  },
  {
    title: "Structured Deliverables",
    description: "Clear milestones, quality checks, and approval workflows ensure work meets your standards.",
  },
  {
    title: "Impact Reporting",
    description: "Generate sponsor-ready reports showing economic outcomes and community impact.",
  },
];

const projectCategories = [
  { name: "Marketing Support", count: 24, icon: "megaphone" },
  { name: "Event Operations", count: 18, icon: "calendar" },
  { name: "Data & Analytics", count: 15, icon: "chart" },
  { name: "Video Production", count: 12, icon: "video" },
  { name: "Research", count: 21, icon: "search" },
  { name: "Community Outreach", count: 9, icon: "users" },
];

const howItWorks = {
  talent: [
    { step: 1, title: "Build Your Profile", description: "Add skills, availability, goals, and work samples to your portfolio." },
    { step: 2, title: "Browse & Apply", description: "Find projects that match your skills. Apply with a quick intent note." },
    { step: 3, title: "Get Matched", description: "Our AI ranks you against other applicants. Partners see top candidates first." },
    { step: 4, title: "Complete & Earn", description: "Deliver milestones, get approved, receive payment, and grow your proof vault." },
  ],
  partner: [
    { step: 1, title: "Create a Project", description: "Describe the work, set deliverables, timeline, and pay. AI helps structure it." },
    { step: 2, title: "Review Candidates", description: "See AI-ranked applicants with match scores, skills, and proof of past work." },
    { step: 3, title: "Manage Engagement", description: "Track milestones, review submissions, provide feedback in one workspace." },
    { step: 4, title: "Report Outcomes", description: "Generate impact reports for stakeholders, sponsors, and university partners." },
  ],
};

const aiFeatures = [
  {
    title: "AI Project Builder",
    description: "Describe your work needs in plain language. AI structures it into deliverables, milestones, required skills, and suggested pay.",
  },
  {
    title: "Smart Matching",
    description: "Candidates ranked by skills overlap, proof relevance, past performance, and availability. See reasons for every recommendation.",
  },
  {
    title: "Quality Checker",
    description: "AI reviews submissions against requirements. Flags missing items, suggests improvements, detects low-effort work.",
  },
  {
    title: "Report Writer",
    description: "Generate sponsor-ready recaps, university outcome narratives, and partner operations summaries automatically.",
  },
];

export default function LoudWorksHome() {
  return (
    <main className="works-layout">
      <aside className="works-sidebar">
        <div className="works-sidebar__logo">
          <div className="works-logo">
            <span className="works-logo-icon">W</span>
            <span>Loud Works</span>
          </div>
          <p className="works-tagline">Real work. Real pay. Real proof.</p>
        </div>

        <nav className="works-nav">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="works-sidebar__cta">
          <Link href="/talent" className="btn btn-primary">
            Find Work
          </Link>
          <Link href="/partner" className="btn btn-outline">
            Post a Project
          </Link>
        </div>

        <div className="works-sidebar__footer">
          <p>Part of the Loud Legacy ecosystem</p>
          <div className="works-integrations">
            <span>Business Now</span>
            <span>Legacy CRM</span>
            <span>VALORA</span>
          </div>
        </div>
      </aside>

      <div className="works-content">
        <section id="overview" className="works-section">
          <div className="works-hero">
            <div className="works-badge">Workforce Platform</div>
            <h1>Turn partnerships into economic mobility</h1>
            <p className="works-hero__subtitle">
              Loud Works routes real paid projects from partner organizations to students, athletes, and local talent.
              Track deliverables, skills growth, and outcomes with verifiable proof.
            </p>
          </div>

          <div className="works-stats">
            {stats.map((stat) => (
              <div key={stat.label} className="works-stat">
                <span className="works-stat__value">{stat.value}</span>
                <span className="works-stat__label">{stat.label}</span>
                <span className="works-stat__context">{stat.context}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="talent" className="works-section">
          <div className="works-section__header">
            <div className="works-badge">For Talent</div>
            <h2>Build your career through real work</h2>
            <p>
              Stop chasing unpaid internships. Loud Works connects you with paid projects that build
              skills, create proof, and establish professional references.
            </p>
          </div>

          <div className="works-grid works-grid--two">
            {talentBenefits.map((benefit) => (
              <article key={benefit.title} className="works-card">
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </article>
            ))}
          </div>

          <div className="works-cta-banner">
            <h3>Ready to start earning?</h3>
            <p>Create your profile and start applying to projects today.</p>
            <Link href="/talent" className="btn btn-primary">
              Join as Talent
            </Link>
          </div>
        </section>

        <section id="partners" className="works-section">
          <div className="works-section__header">
            <div className="works-badge">For Partners</div>
            <h2>Get work done with reliable talent</h2>
            <p>
              Access a pre-vetted pool of motivated talent. Post projects, review AI-ranked candidates,
              and track deliverables in one platform.
            </p>
          </div>

          <div className="works-grid works-grid--two">
            {partnerBenefits.map((benefit) => (
              <article key={benefit.title} className="works-card">
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </article>
            ))}
          </div>

          <div className="works-categories">
            <h3>Project Categories</h3>
            <div className="works-category-grid">
              {projectCategories.map((cat) => (
                <div key={cat.name} className="works-category">
                  <span className="works-category__name">{cat.name}</span>
                  <span className="works-category__count">{cat.count} projects</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="works-section">
          <div className="works-section__header">
            <div className="works-badge">How It Works</div>
            <h2>Simple process, real results</h2>
          </div>

          <div className="works-flow">
            <div className="works-flow__column">
              <h3>For Talent</h3>
              {howItWorks.talent.map((item) => (
                <div key={item.step} className="works-flow__step">
                  <span className="works-flow__number">{item.step}</span>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="works-flow__column">
              <h3>For Partners</h3>
              {howItWorks.partner.map((item) => (
                <div key={item.step} className="works-flow__step">
                  <span className="works-flow__number">{item.step}</span>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="works-section">
          <div className="works-section__header">
            <div className="works-badge">AI-Powered</div>
            <h2>Intelligence built into every step</h2>
            <p>
              From project creation to matching to quality assurance, AI helps ensure
              the right talent finds the right work and delivers quality results.
            </p>
          </div>

          <div className="works-grid works-grid--two">
            {aiFeatures.map((feature) => (
              <article key={feature.title} className="works-card works-card--highlight">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="works-section">
          <div className="works-final-cta">
            <h2>Ready to transform how work gets done?</h2>
            <p>
              Whether you're talent looking to build your career or an organization
              looking to get work done, Loud Works is the platform for measurable outcomes.
            </p>
            <div className="works-cta-buttons">
              <Link href="/talent" className="btn btn-primary btn-lg">
                Find Work
              </Link>
              <Link href="/partner" className="btn btn-secondary btn-lg">
                Post a Project
              </Link>
            </div>
          </div>
        </section>

        <footer className="works-footer">
          <p>Loud Works is part of the Loud Legacy ecosystem.</p>
          <p>Building economic mobility through real work, one project at a time.</p>
        </footer>
      </div>

      <style jsx>{`
        .works-layout {
          display: flex;
          min-height: 100vh;
        }

        .works-sidebar {
          width: 280px;
          background: var(--color-surface);
          border-right: 1px solid var(--color-border);
          padding: var(--spacing-xl);
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
        }

        .works-sidebar__logo {
          margin-bottom: var(--spacing-xl);
        }

        .works-logo {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-size: var(--font-size-xl);
          font-weight: 700;
          color: var(--color-text-primary);
        }

        .works-logo-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: var(--font-size-lg);
        }

        .works-tagline {
          margin-top: var(--spacing-sm);
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
        }

        .works-nav {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
          margin-bottom: var(--spacing-xl);
        }

        .works-nav a {
          padding: var(--spacing-sm) var(--spacing-md);
          border-radius: var(--radius-md);
          color: var(--color-text-secondary);
          transition: all 0.2s;
        }

        .works-nav a:hover {
          background: var(--color-surface-elevated);
          color: var(--color-text-primary);
        }

        .works-sidebar__cta {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-xl);
        }

        .works-sidebar__footer {
          margin-top: auto;
          padding-top: var(--spacing-lg);
          border-top: 1px solid var(--color-border);
          font-size: var(--font-size-sm);
          color: var(--color-text-muted);
        }

        .works-integrations {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-xs);
          margin-top: var(--spacing-sm);
        }

        .works-integrations span {
          padding: 2px 8px;
          background: var(--color-surface-elevated);
          border-radius: var(--radius-sm);
          font-size: var(--font-size-xs);
        }

        .works-content {
          flex: 1;
          padding: var(--spacing-2xl);
          overflow-y: auto;
        }

        .works-section {
          margin-bottom: var(--spacing-2xl);
          padding-bottom: var(--spacing-2xl);
          border-bottom: 1px solid var(--color-border);
        }

        .works-section:last-of-type {
          border-bottom: none;
        }

        .works-section__header {
          margin-bottom: var(--spacing-xl);
        }

        .works-section__header h2 {
          font-size: var(--font-size-3xl);
          margin: var(--spacing-md) 0;
        }

        .works-section__header p {
          color: var(--color-text-secondary);
          max-width: 600px;
        }

        .works-badge {
          display: inline-block;
          padding: var(--spacing-xs) var(--spacing-md);
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(16, 185, 129, 0.2));
          border: 1px solid var(--color-primary);
          border-radius: var(--radius-full);
          font-size: var(--font-size-sm);
          font-weight: 500;
          color: var(--color-primary-light);
        }

        .works-hero {
          text-align: center;
          margin-bottom: var(--spacing-2xl);
        }

        .works-hero h1 {
          font-size: var(--font-size-4xl);
          margin: var(--spacing-lg) 0;
          background: linear-gradient(135deg, var(--color-text-primary), var(--color-primary-light));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .works-hero__subtitle {
          font-size: var(--font-size-lg);
          color: var(--color-text-secondary);
          max-width: 700px;
          margin: 0 auto;
        }

        .works-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--spacing-lg);
        }

        .works-stat {
          text-align: center;
          padding: var(--spacing-lg);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
        }

        .works-stat__value {
          display: block;
          font-size: var(--font-size-3xl);
          font-weight: 700;
          color: var(--color-primary-light);
        }

        .works-stat__label {
          display: block;
          font-weight: 600;
          margin-top: var(--spacing-xs);
        }

        .works-stat__context {
          display: block;
          font-size: var(--font-size-sm);
          color: var(--color-text-muted);
          margin-top: var(--spacing-xs);
        }

        .works-grid {
          display: grid;
          gap: var(--spacing-lg);
        }

        .works-grid--two {
          grid-template-columns: repeat(2, 1fr);
        }

        .works-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: var(--spacing-lg);
        }

        .works-card h3 {
          font-size: var(--font-size-lg);
          margin-bottom: var(--spacing-sm);
        }

        .works-card p {
          color: var(--color-text-secondary);
          font-size: var(--font-size-sm);
        }

        .works-card--highlight {
          border-color: var(--color-primary);
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), transparent);
        }

        .works-cta-banner {
          margin-top: var(--spacing-xl);
          padding: var(--spacing-xl);
          background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
          border-radius: var(--radius-lg);
          text-align: center;
        }

        .works-cta-banner h3 {
          margin-bottom: var(--spacing-sm);
        }

        .works-cta-banner p {
          margin-bottom: var(--spacing-lg);
          opacity: 0.9;
        }

        .works-categories {
          margin-top: var(--spacing-xl);
        }

        .works-categories h3 {
          margin-bottom: var(--spacing-lg);
        }

        .works-category-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-md);
        }

        .works-category {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-md);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
        }

        .works-category__name {
          font-weight: 500;
        }

        .works-category__count {
          font-size: var(--font-size-sm);
          color: var(--color-text-muted);
        }

        .works-flow {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-2xl);
        }

        .works-flow__column h3 {
          margin-bottom: var(--spacing-lg);
          padding-bottom: var(--spacing-sm);
          border-bottom: 2px solid var(--color-primary);
        }

        .works-flow__step {
          display: flex;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-lg);
        }

        .works-flow__number {
          width: 32px;
          height: 32px;
          background: var(--color-primary);
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          flex-shrink: 0;
        }

        .works-flow__step h4 {
          font-size: var(--font-size-base);
          margin-bottom: var(--spacing-xs);
        }

        .works-flow__step p {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
        }

        .works-final-cta {
          text-align: center;
          padding: var(--spacing-2xl);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
        }

        .works-final-cta h2 {
          font-size: var(--font-size-2xl);
          margin-bottom: var(--spacing-md);
        }

        .works-final-cta p {
          color: var(--color-text-secondary);
          max-width: 500px;
          margin: 0 auto var(--spacing-xl);
        }

        .works-cta-buttons {
          display: flex;
          gap: var(--spacing-md);
          justify-content: center;
        }

        .btn-lg {
          padding: var(--spacing-md) var(--spacing-xl);
          font-size: var(--font-size-base);
        }

        .works-footer {
          text-align: center;
          padding: var(--spacing-xl);
          color: var(--color-text-muted);
          font-size: var(--font-size-sm);
        }

        @media (max-width: 1024px) {
          .works-layout {
            flex-direction: column;
          }

          .works-sidebar {
            width: 100%;
            height: auto;
            position: static;
          }

          .works-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .works-grid--two,
          .works-flow,
          .works-category-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
