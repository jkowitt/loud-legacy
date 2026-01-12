import Link from "next/link";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "VALORA - Real Estate Decision Intelligence | Loud Legacy",
  description: "Real estate valuation, underwriting, and decision intelligence platform. Built to help serious investors understand risk, opportunity, and confidence in every deal.",
};

export default function ValoraPage() {
  return (
    <main>
      <Header />

      <section className="product-hero" style={{ background: "linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)" }}>
        <div className="container">
          <div className="product-badge">Enterprise Intelligence</div>
          <h1>VALORA</h1>
          <p className="product-tagline">
            Real estate valuation, underwriting, and decision intelligence platform.
            VALORA is where serious real estate decisions are validated.
          </p>
          <div className="hero-actions">
            <Link href="#features" className="button button--primary">
              Explore Platform
            </Link>
            <Link href="#audience" className="button button--secondary-white">
              Who Uses VALORA
            </Link>
          </div>
        </div>
      </section>

      <section className="product-intro">
        <div className="container">
          <h2>Trust, Transparency, and Confidence in Every Deal</h2>
          <p className="intro-text">
            VALORA is not just a property valuation tool—it's a decision intelligence platform
            designed to help you understand risk, opportunity, and confidence. No black box
            numbers. No spreadsheet guesswork. Just transparent, defensible valuations.
          </p>
        </div>
      </section>

      <section id="features" className="product-section">
        <div className="container">
          <h2>Core Capabilities</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>📊 Property Valuation Engine</h3>
              <p>Combines income approach, sales comparison logic, and scenario modeling to produce transparent valuations.</p>
            </div>
            <div className="feature-card">
              <h3>📝 Underwriting Workflows</h3>
              <p>Input assumptions for rents, expenses, vacancy, cap rates, and financing with clear visibility into outputs.</p>
            </div>
            <div className="feature-card">
              <h3>🗺️ Market Intelligence</h3>
              <p>Aggregates market data, comparable sales, and neighborhood context to ground assumptions in reality.</p>
            </div>
            <div className="feature-card">
              <h3>🔬 Scenario Analysis</h3>
              <p>Stress test assumptions to see how small changes impact returns and risk profiles.</p>
            </div>
            <div className="feature-card">
              <h3>📈 Sensitivity Testing</h3>
              <p>Understand which variables have the most impact on deal performance.</p>
            </div>
            <div className="feature-card">
              <h3>🏢 Portfolio View</h3>
              <p>Multiple assets roll up into a portfolio view showing exposure, performance trends, and concentration risk.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="audience" className="product-section gray-bg">
        <div className="container">
          <h2>Who VALORA Is For</h2>
          <div className="audience-grid">
            <div className="audience-card">
              <h4>Real Estate Investors</h4>
              <p>Make confident acquisition decisions backed by transparent underwriting.</p>
            </div>
            <div className="audience-card">
              <h4>Analysts & Underwriters</h4>
              <p>Build defensible valuations with clear assumption tracking and scenario modeling.</p>
            </div>
            <div className="audience-card">
              <h4>Developers & Operators</h4>
              <p>Evaluate opportunities with portfolio-level visibility and risk analysis.</p>
            </div>
            <div className="audience-card">
              <h4>Portfolio Owners</h4>
              <p>Track performance, concentration risk, and exposure across multiple assets.</p>
            </div>
            <div className="audience-card">
              <h4>Institutions</h4>
              <p>Scale underwriting processes with consistency, auditability, and transparency.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="product-section">
        <div className="container">
          <h2>Problems VALORA Solves</h2>
          <div className="problem-solution-grid">
            <div className="problem-card">
              <div className="problem-icon">❌</div>
              <h4>Inconsistent Valuations</h4>
              <p>Different tools and analysts produce wildly different numbers for the same property.</p>
              <div className="solution-arrow">→</div>
              <div className="solution-text">Standardized methodology with transparent assumptions</div>
            </div>
            <div className="problem-card">
              <div className="problem-icon">❌</div>
              <h4>Spreadsheet Dependency</h4>
              <p>Overreliance on spreadsheets leads to errors and lack of auditability.</p>
              <div className="solution-arrow">→</div>
              <div className="solution-text">Purpose-built platform with version control and validation</div>
            </div>
            <div className="problem-card">
              <div className="problem-icon">❌</div>
              <h4>Fragmented Data</h4>
              <p>Market data, comps, and property info scattered across multiple sources.</p>
              <div className="solution-arrow">→</div>
              <div className="solution-text">Integrated market intelligence and comp database</div>
            </div>
            <div className="problem-card">
              <div className="problem-icon">❌</div>
              <h4>Hidden Risk</h4>
              <p>Can't see how changes in assumptions impact deal performance.</p>
              <div className="solution-arrow">→</div>
              <div className="solution-text">Scenario and sensitivity analysis built-in</div>
            </div>
          </div>
        </div>
      </section>

      <section className="product-cta">
        <div className="container">
          <h2>Enterprise-Grade Real Estate Intelligence</h2>
          <p>VALORA represents authority and trust. Built to scale institutionally with transparency and confidence.</p>
          <Link href="mailto:hello@loud-legacy.com" className="button button--primary">
            Request Demo
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
