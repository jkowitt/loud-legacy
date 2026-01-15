import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Business Now - Structured Execution | Loud Legacy",
  description: "Practical business operating toolkit. Move from reaction to intention with structure for execution. Not education for education's sake—structure for results.",
};

export default function BusinessNowPage() {
  return (
    <main>
      <Header />

      <section className="product-hero" style={{ background: "linear-gradient(135deg, #10B981 0%, #059669 100%)" }}>
        <div className="container">
          <Link href="/business-now" className="product-hero-logo" aria-label="Business Now Home">
            <Image
              src="/logos/business-now.svg"
              alt="Business Now"
              width={180}
              height={60}
              priority
            />
          </Link>
          <div className="product-badge">Structured Execution</div>
          <p className="product-tagline">
            Practical business operating toolkit that helps individuals and small businesses
            move from reaction to intention. Not education for education's sake—structure for execution.
          </p>
          <div className="hero-actions">
            <Link href="#features" className="button button--primary">
              See Features
            </Link>
            <Link href="#audience" className="button button--secondary-white">
              Who It's For
            </Link>
          </div>
        </div>
      </section>

      <section className="product-intro">
        <div className="container">
          <h2>From Chaos to Clarity</h2>
          <p className="intro-text">
            Business Now is the entry point to the Loud Legacy ecosystem. It teaches the operating
            philosophy of structure over chaos, consistency over intensity. It's designed to create
            early revenue, wide reach, and practical value for operators at any stage.
          </p>
        </div>
      </section>

      <section id="features" className="product-section">
        <div className="container">
          <h2>Core Capabilities</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>🎯 Business Overview Framework</h3>
              <p>A clear snapshot of what the business is, who it serves, and how it makes money.</p>
            </div>
            <div className="feature-card">
              <h3>📋 Goal & Priority Tracking</h3>
              <p>Short and medium-term goals with defined actions rather than vague ambition.</p>
            </div>
            <div className="feature-card">
              <h3>💰 Income & Expense Visibility</h3>
              <p>Simple financial tracking to understand cash flow without accounting complexity.</p>
            </div>
            <div className="feature-card">
              <h3>📅 Weekly Planning System</h3>
              <p>A structured way to plan time, priorities, and execution consistently.</p>
            </div>
            <div className="feature-card">
              <h3>📊 Basic KPI Tracking</h3>
              <p>Focus on a small number of meaningful metrics rather than vanity data.</p>
            </div>
            <div className="feature-card">
              <h3>✅ Execution Discipline</h3>
              <p>Systems that reinforce consistent action over sporadic intensity.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="audience" className="product-section gray-bg">
        <div className="container">
          <h2>Who Business Now Is For</h2>
          <div className="audience-grid">
            <div className="audience-card">
              <h4>Small Business Owners</h4>
              <p>Get structure for operations, finances, and planning without complexity.</p>
            </div>
            <div className="audience-card">
              <h4>Solo Operators</h4>
              <p>Build discipline and consistency into your solo business.</p>
            </div>
            <div className="audience-card">
              <h4>Early-Stage Founders</h4>
              <p>Establish operational fundamentals before you scale.</p>
            </div>
            <div className="audience-card">
              <h4>Side Venture Builders</h4>
              <p>Structure your side business for sustainable growth alongside your full-time work.</p>
            </div>
            <div className="audience-card">
              <h4>Professionals in Transition</h4>
              <p>Build the foundation for your next chapter with clarity and intention.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="product-section">
        <div className="container">
          <h2>Problems Business Now Solves</h2>
          <div className="problem-solution-grid">
            <div className="problem-card">
              <div className="problem-icon">❌</div>
              <h4>Lack of Planning Discipline</h4>
              <p>Operating reactively without clear goals or priorities.</p>
              <div className="solution-arrow">→</div>
              <div className="solution-text">Structured planning system with weekly execution rhythm</div>
            </div>
            <div className="problem-card">
              <div className="problem-icon">❌</div>
              <h4>No Visibility Into Numbers</h4>
              <p>Can't answer basic questions about cash flow or profitability.</p>
              <div className="solution-arrow">→</div>
              <div className="solution-text">Simple financial tracking without accounting complexity</div>
            </div>
            <div className="problem-card">
              <div className="problem-icon">❌</div>
              <h4>Overwhelm From Too Many Ideas</h4>
              <p>Chasing every opportunity without focus or completion.</p>
              <div className="solution-arrow">→</div>
              <div className="solution-text">Priority framework that forces focus and follow-through</div>
            </div>
            <div className="problem-card">
              <div className="problem-icon">❌</div>
              <h4>Inconsistent Follow-Through</h4>
              <p>Start strong but fade when motivation dips.</p>
              <div className="solution-arrow">→</div>
              <div className="solution-text">Systems that build consistency over intensity</div>
            </div>
          </div>
        </div>
      </section>

      <section className="product-cta">
        <div className="container">
          <h2>Build With Structure, Not Shortcuts</h2>
          <p>Business Now is your entry point to operational excellence. Start with structure, scale with systems.</p>
          <Link href="mailto:hello@loud-legacy.com" className="button button--primary">
            Get Started
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
