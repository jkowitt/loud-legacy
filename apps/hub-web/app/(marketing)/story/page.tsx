import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Our story — Loud Legacy"
};

export default function StoryPage() {
  return (
    <main>
      <Header />
      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <h1 style={{ fontSize: "var(--font-size-3xl)", marginBottom: "var(--space-4)" }}>Our story</h1>
          <p style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-4)" }}>
            Loud Legacy began as a joint effort between product operators designing valuation software,
            venue technology, and DIY communities. We discovered the same customers needed connected workflows,
            so the portfolio became a single ecosystem with shared identity, billing, and analytics.
          </p>
          <p style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-4)" }}>
            Today we ship VALORA for asset intelligence, VenueVR for immersive sports, Business Now for SMB
            growth, and DIY Mr Fix It for household projects. The hub coordinates the product roadmap,
            storytelling, and go-to-market motions.
          </p>
          <p style={{ color: "var(--color-text-secondary)" }}>
            The next chapters focus on unified customer data, cross-brand entitlements, and expanded content
            partnerships so builders, venues, and creators can move faster together.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
