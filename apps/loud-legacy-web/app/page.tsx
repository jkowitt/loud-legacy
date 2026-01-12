import Link from "next/link";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { BrandShowcase } from "@/components/BrandShowcase";

export default function HomePage() {
  return (
    <main className="loud-legacy-home">
      <Header />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="badge">Systems-Driven Business Ecosystem</div>
          <h1>Operational Excellence<br/>Through Intelligent Systems</h1>
          <p className="tagline">
            Loud Legacy builds software that solves real operational problems.
            From real estate intelligence to relationship management, our products deliver
            structure, clarity, and long-term leverage.
          </p>
          <div className="hero-actions">
            <Link href="#products" className="button button--primary">
              Explore Products
            </Link>
            <Link href="#philosophy" className="button button--secondary">
              Our Philosophy
            </Link>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <BrandShowcase />

      {/* Philosophy Section */}
      <section id="philosophy" className="philosophy-section">
        <div className="container">
          <h2>Built on Systems, Not Shortcuts</h2>
          <p className="philosophy-intro">
            Each product is intentionally designed to solve a specific operational problem,
            serve a clear user, and create long-term leverage. They stand on their own,
            but work together through shared philosophy: structure beats chaos, consistency beats intensity.
          </p>
          <div className="philosophy-grid">
            <div className="philosophy-card">
              <h3>Problem-Focused</h3>
              <p>We build for real operational pain, not hypothetical features.</p>
            </div>
            <div className="philosophy-card">
              <h3>User-Specific</h3>
              <p>Each product serves a clear user with defined needs.</p>
            </div>
            <div className="philosophy-card">
              <h3>Long-Term Leverage</h3>
              <p>Our systems compound value over time through consistent execution.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
