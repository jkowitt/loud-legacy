import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { brands } from "@/lib/brands";

export function generateStaticParams() {
  return brands.map((brand) => ({ slug: brand.slug }));
}

export default function BrandDetail({ params }: { params: { slug: string } }) {
  const brand = brands.find((entry) => entry.slug === params.slug);
  if (!brand) {
    notFound();
  }

  return (
    <main>
      <Header />
      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          <span className="badge">{brand.name}</span>
          <h1 style={{ fontSize: "var(--font-size-3xl)", margin: "var(--space-4) 0" }}>{brand.tagline}</h1>
          <p style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-4)" }}>{brand.description}</p>
          <div className="grid" style={{ gap: "var(--space-4)" }}>
            <div className="card">
              <strong>Primary CTA</strong>
              <p style={{ color: "var(--color-text-secondary)", marginTop: "var(--space-2)" }}>{brand.primaryCta.label}</p>
            </div>
            {brand.secondaryCta ? (
              <div className="card">
                <strong>Secondary CTA</strong>
                <p style={{ color: "var(--color-text-secondary)", marginTop: "var(--space-2)" }}>{brand.secondaryCta.label}</p>
              </div>
            ) : null}
            <div className="card">
              <strong>Status</strong>
              <p style={{ color: "var(--color-text-secondary)", marginTop: "var(--space-2)" }}>{brand.status}</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
