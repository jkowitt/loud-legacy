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
          <div className="badge">Unified Ecosystem</div>
          <h1>Build Louder with Loud Legacy</h1>
          <p className="tagline">
            One unified platform connecting VALORA, VenueVR, Business Now, and DIY Mr Fix It.
            Everything you need to succeed, all in one place.
          </p>
          <div className="hero-actions">
            <Link href="#brands" className="button button--primary">
              Explore Brands
            </Link>
            <Link href="/(hub)/story" className="button button--secondary">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <BrandShowcase />

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to build?</h2>
          <p>Choose a platform and start growing today.</p>
          <div className="cta-grid">
            <Link href="/valora" className="cta-card">
              <h3>🏢 VALORA</h3>
              <p>Real Estate Platform</p>
            </Link>
            <Link href="/venuevr" className="cta-card">
              <h3>🎉 VenueVR</h3>
              <p>Events & Entertainment</p>
            </Link>
            <Link href="/business-now" className="cta-card">
              <h3>📈 Business Now</h3>
              <p>Growth & Coaching</p>
            </Link>
            <Link href="/diy" className="cta-card">
              <h3>🔧 DIY Mr Fix It</h3>
              <p>Tools & Tutorials</p>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
