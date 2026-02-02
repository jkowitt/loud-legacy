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
          <div className="badge">Legacy RE. Built to Last.</div>
          <h1>Real estate intelligence<br/>built for operators.</h1>
          <p className="tagline">
            Analyze any property. Run the numbers. Find what adds value.
            One platform for valuations, underwriting, and portfolio management.
          </p>
          <div className="hero-actions">
            <Link href="/valora" className="button button--primary">
              Explore Legacy RE
            </Link>
            <Link href="/contact" className="button button--secondary">
              Request Demo
            </Link>
          </div>
          <p className="hero-subtext">Trusted by brokers, investors, and lenders</p>
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
            We built Legacy RE because we were tired of clunky software that tries to do everything
            but does nothing well. This platform does one thing really well — helps you understand
            real estate deals.
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
              <p>We built the tools we needed ourselves. If it&apos;s in here, it&apos;s because we use it too.</p>
            </div>
            <div className="philosophy-card">
              <div className="philosophy-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3>Simple beats clever</h3>
              <p>No gimmicks. The tools work the way you&apos;d expect them to.</p>
            </div>
            <div className="philosophy-card">
              <div className="philosophy-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3>Built to last</h3>
              <p>We&apos;re not chasing hype. The platform just gets better over time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to transform your real estate analysis?</h2>
          <p>Join operators who trust Legacy RE for smarter decisions, faster.</p>
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
