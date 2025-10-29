import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const pressAssets = [
  { label: "Press kit", href: "/press-kit.zip" },
  { label: "Brand guidelines", href: "/brand-guide.pdf" },
  { label: "Leadership bios", href: "/press/bios" }
];

export const metadata = {
  title: "Press — Loud Legacy"
};

export default function PressPage() {
  return (
    <main>
      <Header />
      <section className="section">
        <div className="container" style={{ maxWidth: 880 }}>
          <h1 style={{ fontSize: "var(--font-size-3xl)", marginBottom: "var(--space-4)" }}>Press & media</h1>
          <p style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-6)" }}>
            Download assets or connect with the Loud Legacy communications team for interviews, product demos,
            and speaking opportunities.
          </p>
          <div className="grid grid--cols-2">
            {pressAssets.map((asset) => (
              <a key={asset.href} className="card" href={asset.href} target="_blank" rel="noreferrer">
                <strong>{asset.label}</strong>
                <span style={{ color: "var(--color-link-default)", marginTop: "var(--space-2)" }}>Download</span>
              </a>
            ))}
          </div>
          <div className="card" style={{ marginTop: "var(--space-6)" }}>
            <strong>Media contact</strong>
            <p style={{ color: "var(--color-text-secondary)", marginTop: "var(--space-2)" }}>
              press@loudlegacy.com · +1 (312) 555-2044
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
