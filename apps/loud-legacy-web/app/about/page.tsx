import Link from "next/link";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About Us - Loud Legacy",
  description: "Built by operators, for operators. Learn about the team behind VALORA, Sportify, Business Now, and Legacy CRM.",
};

const team = [
  {
    name: "Jason Kowitt",
    role: "Founder & CEO",
    bio: "15+ years in real estate, sports operations, and building software. Started Loud Legacy after seeing how many tools operators were forced to juggle.",
    background: "Former D1 athletic operations, real estate investor, bootstrapped founder."
  }
];

const timeline = [
  { year: "2023", event: "VALORA beta launched for real estate underwriting" },
  { year: "2024", event: "Business Now and Legacy CRM added to the ecosystem" },
  { year: "2025", event: "Sportify launched with 12 athletic departments in beta" },
  { year: "2026", event: "Unified platform launch with single sign-on across all products" },
];

const values = [
  {
    title: "Operators first",
    description: "We build for people who run things. Not for feature checklists or analyst reports."
  },
  {
    title: "Simple over clever",
    description: "We'd rather ship something that works than something that impresses engineers."
  },
  {
    title: "Long-term thinking",
    description: "We're building a company that lasts, not one that exits. Our incentives align with yours."
  },
  {
    title: "Honest pricing",
    description: "No hidden fees, no gotchas, no 'call for pricing' games. You know what you're paying."
  }
];

export default function AboutPage() {
  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="about-hero">
        <div className="container">
          <h1>Built by operators, for operators</h1>
          <p className="hero-subtitle">
            We got tired of duct-taping our businesses together with tools that didn't talk to each other.
            So we built something better.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="about-story">
        <div className="container">
          <div className="story-content">
            <h2>Our story</h2>
            <p>
              Loud Legacy started with a simple frustration: why do operators need 10 different apps
              to run their businesses? One for CRM, one for project management, one for analytics,
              one for event planning—the list goes on.
            </p>
            <p>
              We weren't looking to build "the next Salesforce" or compete with enterprise giants.
              We just wanted tools that work the way we work. Simple. Connected. Built to last.
            </p>
            <p>
              Today, Loud Legacy is a family of five products that share a single account, a single
              design language, and a single philosophy: solve real problems for people who run things.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-team">
        <div className="container">
          <h2>The team</h2>
          <div className="team-grid">
            {team.map((member) => (
              <div key={member.name} className="team-card">
                <div className="team-avatar">
                  {member.name.split(" ").map(n => n[0]).join("")}
                </div>
                <h3>{member.name}</h3>
                <span className="team-role">{member.role}</span>
                <p className="team-bio">{member.bio}</p>
                <p className="team-background">{member.background}</p>
              </div>
            ))}
          </div>
          <p className="hiring-note">
            We're a small, focused team. If you're interested in joining, <Link href="/contact">reach out</Link>.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="about-timeline">
        <div className="container">
          <h2>Our journey</h2>
          <div className="timeline">
            {timeline.map((item) => (
              <div key={item.year} className="timeline-item">
                <span className="timeline-year">{item.year}</span>
                <span className="timeline-event">{item.event}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="container">
          <h2>What we believe</h2>
          <div className="values-grid">
            {values.map((value) => (
              <div key={value.title} className="value-card">
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container">
          <h2>Ready to simplify your stack?</h2>
          <p>Join operators who've consolidated their tools with Loud Legacy.</p>
          <div className="cta-actions">
            <Link href="/contact" className="button button--primary">
              Request a Demo
            </Link>
            <Link href="/pricing" className="button button--secondary">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
