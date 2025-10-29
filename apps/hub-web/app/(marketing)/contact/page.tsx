import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Contact — Loud Legacy"
};

export default function ContactPage() {
  return (
    <main>
      <Header />
      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          <h1 style={{ fontSize: "var(--font-size-3xl)", marginBottom: "var(--space-4)" }}>Contact</h1>
          <p style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-4)" }}>
            Route your note and the right team will follow up within one business day.
          </p>
          <form className="card" style={{ display: "grid", gap: "var(--space-4)" }}>
            <label style={{ display: "grid", gap: "var(--space-2)" }}>
              <span>Name</span>
              <input required type="text" style={{ padding: "var(--space-3)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-subtle)", background: "transparent", color: "inherit" }} />
            </label>
            <label style={{ display: "grid", gap: "var(--space-2)" }}>
              <span>Email</span>
              <input required type="email" style={{ padding: "var(--space-3)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-subtle)", background: "transparent", color: "inherit" }} />
            </label>
            <label style={{ display: "grid", gap: "var(--space-2)" }}>
              <span>Topic</span>
              <select style={{ padding: "var(--space-3)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-subtle)", background: "transparent", color: "inherit" }}>
                <option>Press</option>
                <option>Partnership</option>
                <option>Sales</option>
                <option>Support</option>
              </select>
            </label>
            <label style={{ display: "grid", gap: "var(--space-2)" }}>
              <span>Message</span>
              <textarea rows={4} style={{ padding: "var(--space-3)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-subtle)", background: "transparent", color: "inherit" }} />
            </label>
            <button type="submit" className="button button--primary">
              Send
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}
