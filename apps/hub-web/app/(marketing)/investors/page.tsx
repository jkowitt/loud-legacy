import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Investor room — Loud Legacy"
};

const stats = [
  { label: "Annual recurring revenue", value: "$4.2M", hint: "FY24 exit run rate" },
  { label: "Brands", value: "5", hint: "VALORA, VenueVR, Business Now, Sportify, Legacy CRM" },
  { label: "Net revenue retention", value: "128%", hint: "Rolling 12 months" }
];

export default function InvestorsPage() {
  return (
    <main>
      <Header />
      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <h1 style={{ fontSize: "var(--font-size-3xl)", marginBottom: "var(--space-4)" }}>Investor room</h1>
          <p style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-6)" }}>
            Snapshot of Loud Legacy performance. Reach out to investor@loudlegacy.com for the full deck, data
            room access, and diligence materials.
          </p>
          <div className="grid grid--cols-2">
            {stats.map((stat) => (
              <div key={stat.label} className="card">
                <h3 style={{ fontSize: "var(--font-size-xl)", marginBottom: "var(--space-2)" }}>{stat.label}</h3>
                <strong style={{ fontSize: "var(--font-size-2xl)" }}>{stat.value}</strong>
                <p style={{ color: "var(--color-text-secondary)", marginTop: "var(--space-2)" }}>{stat.hint}</p>
              </div>
            ))}
          </div>
          <div className="card" style={{ marginTop: "var(--space-6)" }}>
            <strong>Latest updates</strong>
            <ul style={{ color: "var(--color-text-secondary)" }}>
              <li>VALORA private beta 2 launched with portfolio management features.</li>
              <li>VenueVR completed first venue ingest with 8K cameras and volumetric depth.</li>
              <li>Business Now released Builder Accelerator curriculum (cohort #3).</li>
              <li>Sportify beta launched with 12 sports organizations onboarded.</li>
              <li>Legacy CRM now included free with all platform subscriptions.</li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
