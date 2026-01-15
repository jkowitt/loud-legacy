import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Legacy CRM - Relationship Discipline | Loud Legacy",
  description: "Relationship and opportunity management focused on discipline, not volume. Built for success through follow-up and trust.",
};

export default function LegacyCRMPage() {
  return (
    <main>
      <Header />

      <section className="product-hero" style={{ background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)" }}>
        <div className="container">
          <Link href="/legacy-crm" className="product-hero-logo" aria-label="Legacy CRM Home">
            <Image
              src="/logos/legacy-crm.svg"
              alt="Legacy CRM"
              width={200}
              height={60}
              priority
            />
          </Link>
          <div className="product-badge">Relationship Discipline</div>
          <p className="product-tagline">
            Relationship and opportunity management system focused on discipline, not volume.
            Designed for people whose success depends on follow-up, trust, and long-term relationships.
          </p>
          <div className="hero-actions">
            <Link href="#features" className="button button--primary">
              Explore Features
            </Link>
            <Link href="#audience" className="button button--secondary-white">
              Who It's For
            </Link>
          </div>
        </div>
      </section>

      <section className="product-intro">
        <div className="container">
          <h2>Success Through Consistent Relationship Management</h2>
          <p className="intro-text">
            Legacy CRM reinforces the belief that success is built through consistent, structured
            relationship management over time. It's not about tracking thousands of contacts—it's
            about managing the relationships that matter with discipline and intention.
          </p>
        </div>
      </section>

      <section id="features" className="product-section">
        <div className="container">
          <h2>Core Capabilities</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>📇 Relationship Records</h3>
              <p>Each contact includes notes, history, context, and next actions—everything you need to stay connected.</p>
            </div>
            <div className="feature-card">
              <h3>⏰ Follow-Up Discipline</h3>
              <p>Clear reminders and accountability for staying in touch. Never let a relationship go cold.</p>
            </div>
            <div className="feature-card">
              <h3>💼 Opportunity Tracking</h3>
              <p>Deals, conversations, and potential partnerships are visible and organized.</p>
            </div>
            <div className="feature-card">
              <h3>📊 Simple Pipeline View</h3>
              <p>Visibility into what is active, warm, cold, or stalled at a glance.</p>
            </div>
            <div className="feature-card">
              <h3>✅ Personal Accountability</h3>
              <p>Designed to reflect effort and consistency, not just outcomes.</p>
            </div>
            <div className="feature-card">
              <h3>📝 Context Preservation</h3>
              <p>Capture the why behind every interaction so context is never lost.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="audience" className="product-section gray-bg">
        <div className="container">
          <h2>Who Legacy CRM Is For</h2>
          <div className="audience-grid">
            <div className="audience-card">
              <h4>Sales Professionals</h4>
              <p>Manage your pipeline with discipline and never miss a follow-up.</p>
            </div>
            <div className="audience-card">
              <h4>Partnership Leaders</h4>
              <p>Track sponsorships, collaborations, and strategic relationships.</p>
            </div>
            <div className="audience-card">
              <h4>Consultants</h4>
              <p>Maintain client relationships and track project opportunities.</p>
            </div>
            <div className="audience-card">
              <h4>Network Operators</h4>
              <p>Organize and nurture your professional network systematically.</p>
            </div>
            <div className="audience-card">
              <h4>Founders</h4>
              <p>Manage inbound and outbound relationships with clarity and structure.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="product-section">
        <div className="container">
          <h2>Problems Legacy CRM Solves</h2>
          <div className="problem-solution-grid">
            <div className="problem-card">
              <div className="problem-icon">❌</div>
              <h4>Forgotten Follow-Ups</h4>
              <p>Relationships fade because you lost track of when to reach back out.</p>
              <div className="solution-arrow">→</div>
              <div className="solution-text">Automated reminders keep you accountable</div>
            </div>
            <div className="problem-card">
              <div className="problem-icon">❌</div>
              <h4>Unclear Relationship History</h4>
              <p>You can't remember what you last discussed or promised.</p>
              <div className="solution-arrow">→</div>
              <div className="solution-text">Complete interaction history with context</div>
            </div>
            <div className="problem-card">
              <div className="problem-icon">❌</div>
              <h4>Missed Opportunities</h4>
              <p>Deals slip away because you didn't follow up at the right time.</p>
              <div className="solution-arrow">→</div>
              <div className="solution-text">Pipeline tracking shows what needs attention</div>
            </div>
            <div className="problem-card">
              <div className="problem-icon">❌</div>
              <h4>Reactive Outreach</h4>
              <p>You only reach out when you need something, not when you should.</p>
              <div className="solution-arrow">→</div>
              <div className="solution-text">Proactive system for consistent touchpoints</div>
            </div>
          </div>
        </div>
      </section>

      <section className="product-cta">
        <div className="container">
          <h2>Build Success Through Relationships</h2>
          <p>Legacy CRM helps you manage the relationships that matter with discipline and intention.</p>
          <Link href="mailto:hello@loud-legacy.com" className="button button--primary">
            Request Access
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
