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
          <div className="badge">A family of products that actually work together</div>
          <h1>Software for people<br/>who run things</h1>
          <p className="tagline">
            We build tools for operators, founders, and anyone tired of duct-taping
            ten different apps together. Real estate, CRM, live events, business ops —
            all under one roof.
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
          <h2>Why we build this way</h2>
          <p className="philosophy-intro">
            We got tired of bloated software that tries to do everything and ends up doing nothing well.
            Each product here solves one problem really well. They share logins and play nice together,
            but you can use just the one you need.
          </p>
          <div className="philosophy-grid">
            <div className="philosophy-card">
              <h3>Scratch our own itch</h3>
              <p>Everything here started because we needed it ourselves.</p>
            </div>
            <div className="philosophy-card">
              <h3>Simple beats clever</h3>
              <p>No fancy tricks. Just tools that do what they say.</p>
            </div>
            <div className="philosophy-card">
              <h3>Built to last</h3>
              <p>We're not chasing trends. These products get better over time.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
