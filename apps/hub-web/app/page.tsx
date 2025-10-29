import Link from "next/link";
import { brands } from "../lib/brands";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { BrandCard } from "../components/BrandCard";
import { RelationshipMap } from "../components/RelationshipMap";

export default function HomePage() {
  return (
    <main>
      <Header />
      <section className="section">
        <div className="container hero">
          <div className="badge">Unified product family</div>
          <h1>Build louder with VALORA, VenueVR, Business Now, and DIY Mr Fix It</h1>
          <p>
            Loud Legacy is the umbrella that pulls every product line together so operators, creators, and
            fans can work from one playbook. Single sign on, brand-native experiences, and a shared design
            system make the ecosystem feel seamless.
          </p>
          <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="#brands" className="button button--primary">
              Explore the brands
            </Link>
            <Link href="/story" className="button button--ghost">
              Read our story
            </Link>
          </div>
        </div>
      </section>

      <RelationshipMap />

      <section className="section" id="brands">
        <div className="container">
          <h2 style={{ fontSize: "var(--font-size-2xl)", marginBottom: "var(--space-4)" }}>
            Every brand, one design language
          </h2>
          <div className="grid grid--cols-2">
            {brands.map((brand) => (
              <BrandCard key={brand.key} brand={brand} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <h2 style={{ fontSize: "var(--font-size-2xl)", marginBottom: "var(--space-4)" }}>Unified account</h2>
          <div className="grid grid--cols-2">
            <div className="card">
              <h3>One identity</h3>
              <p style={{ color: "var(--color-text-secondary)" }}>
                Auth0 or Clerk powers a single session. Users choose the products they need without extra logins.
              </p>
            </div>
            <div className="card">
              <h3>Billing across brands</h3>
              <p style={{ color: "var(--color-text-secondary)" }}>
                Stripe subscriptions live at the organization level. Assign seats and add-ons across VALORA,
                VenueVR, Business Now, and DIY.
              </p>
            </div>
            <div className="card">
              <h3>Unified analytics</h3>
              <p style={{ color: "var(--color-text-secondary)" }}>
                Product teams leverage the shared analytics schema to understand adoption across the portfolio.
              </p>
            </div>
            <div className="card">
              <h3>Design system</h3>
              <p style={{ color: "var(--color-text-secondary)" }}>
                Shared components keep accessibility and performance consistent while allowing each brand to
                dial up its personality.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
