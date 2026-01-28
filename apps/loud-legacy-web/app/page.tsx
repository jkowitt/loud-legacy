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
              <div className="philosophy-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9.663 17h4.673M12 3v1M6.343 7.75L5.64 7.05M17.658 7.75l.702-.701M4 12H3M21 12h-1" />
                  <path d="M12 6a6 6 0 016 6c0 2.22-1.21 4.16-3 5.197V19a1 1 0 01-1 1h-4a1 1 0 01-1-1v-1.803A5.985 5.985 0 016 12a6 6 0 016-6z" />
                </svg>
              </div>
              <h3>Scratch our own itch</h3>
              <p>Everything here started because we needed it ourselves.</p>
            </div>
            <div className="philosophy-card">
              <div className="philosophy-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3>Simple beats clever</h3>
              <p>No fancy tricks. Just tools that do what they say.</p>
            </div>
            <div className="philosophy-card">
              <div className="philosophy-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3>Built to last</h3>
              <p>We&apos;re not chasing trends. These products get better over time.</p>
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
