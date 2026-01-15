import Link from "next/link";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { BrandShowcase } from "@/components/BrandShowcase";
import { SocialProof } from "@/components/SocialProof";
import { UseCases } from "@/components/UseCases";

export default function HomePage() {
  return (
    <main className="loud-legacy-home">
      <Header />

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="badge">One account. Five tools. Zero friction.</div>
          <h1>Your business runs on<br/>too many apps.</h1>
          <p className="tagline">
            VALORA for deals. Sportify for events. Business Now for ops. Legacy CRM for relationships.
            All connected. All yours. Stop duct-taping—start building.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="button button--primary">
              Request Demo
            </Link>
            <Link href="/pricing" className="button button--secondary">
              View Pricing
            </Link>
          </div>
          <p className="hero-subtext">Free CRM included with every plan</p>
        </div>
      </section>

      {/* Social Proof */}
      <SocialProof />

      {/* Brands Section */}
      <BrandShowcase />

      {/* Use Cases */}
      <UseCases />

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

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to consolidate your stack?</h2>
          <p>Join operators who've simplified their workflows with Loud Legacy.</p>
          <div className="cta-actions">
            <Link href="/contact" className="button button--primary button--large">
              Request a Demo
            </Link>
            <Link href="/auth/signup" className="button button--secondary button--large">
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
