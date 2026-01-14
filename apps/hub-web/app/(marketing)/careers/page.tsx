import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const roles = [
  { title: "Senior Product Designer", brand: "VALORA", location: "Remote (US)", url: "#" },
  { title: "Computer Vision Engineer", brand: "VenueVR", location: "Chicago, IL", url: "#" },
  { title: "Curriculum Lead", brand: "Business Now", location: "Remote", url: "#" },
  { title: "Sports Event Product Manager", brand: "Sportify", location: "Remote", url: "#" }
];

export const metadata = {
  title: "Careers — Loud Legacy"
};

export default function CareersPage() {
  return (
    <main>
      <Header />
      <section className="section">
        <div className="container" style={{ maxWidth: 840 }}>
          <h1 style={{ fontSize: "var(--font-size-3xl)", marginBottom: "var(--space-4)" }}>Careers</h1>
          <p style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-4)" }}>
            Join multi-disciplinary teams building products at the intersection of valuation, immersive media,
            operator education, and live event execution.
          </p>
          <div className="grid" style={{ gap: "var(--space-4)" }}>
            {roles.map((role) => (
              <a key={role.title} href={role.url} className="card" rel="noreferrer">
                <strong>{role.title}</strong>
                <p style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-2)" }}>{role.brand}</p>
                <span style={{ color: "var(--color-text-secondary)" }}>{role.location}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
