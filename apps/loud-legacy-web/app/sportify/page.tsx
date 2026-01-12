import Link from "next/link";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Sportify - Live Event Planning & Execution | Loud Legacy",
  description: "Live event planning and execution platform for sports and entertainment. One operational record per event, zero missed cues.",
};

export default function SportifyPage() {
  return (
    <main>
      <Header />

      <section className="product-hero" style={{ background: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)" }}>
        <div className="container">
          <div className="product-badge">Operational Excellence</div>
          <h1>Sportify</h1>
          <p className="product-tagline">
            Live event planning and execution built specifically for sports and live entertainment environments.
          </p>
          <div className="hero-actions">
            <Link href="#features" className="button button--primary">
              Explore Features
            </Link>
            <Link href="#use-cases" className="button button--secondary-white">
              See Use Cases
            </Link>
          </div>
        </div>
      </section>

      <section className="product-intro">
        <div className="container">
          <h2>One Operational Record. Zero Missed Cues.</h2>
          <p className="intro-text">
            Sportify treats each event as a single operational record rather than a collection of
            documents and emails. No more run of show confusion. No more missed cues. No more
            last-minute coordination stress.
          </p>
        </div>
      </section>

      <section id="features" className="product-section">
        <div className="container">
          <h2>Core Capabilities</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>📋 Event Records</h3>
              <p>Each event includes opponent, venue, date, theme, and notes as a single source of truth.</p>
            </div>
            <div className="feature-card">
              <h3>⏱️ Run of Show Timeline</h3>
              <p>Time-based or trigger-based moments that show exactly what happens and when.</p>
            </div>
            <div className="feature-card">
              <h3>👤 Moment Ownership</h3>
              <p>Each moment has a clear owner so responsibility is visible and execution is not assumed.</p>
            </div>
            <div className="feature-card">
              <h3>🎨 Asset Management</h3>
              <p>Graphics, video, audio, scripts, and sponsor copy live directly inside the moment they support.</p>
            </div>
            <div className="feature-card">
              <h3>🤝 Sponsor Mapping</h3>
              <p>Sponsors are assigned to moments with visibility into frequency and fulfillment.</p>
            </div>
            <div className="feature-card">
              <h3>📡 Live View Mode</h3>
              <p>A simplified real-time timeline view used on game day to reduce confusion.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="product-section gray-bg">
        <div className="container">
          <h2>Who Sportify Is For</h2>
          <div className="audience-grid">
            <div className="audience-card">
              <h4>Game Experience Directors</h4>
              <p>Coordinate every aspect of game day execution with confidence.</p>
            </div>
            <div className="audience-card">
              <h4>Marketing & Sponsorship Teams</h4>
              <p>Ensure sponsor deliverables are executed flawlessly every time.</p>
            </div>
            <div className="audience-card">
              <h4>Athletic Departments</h4>
              <p>Bring consistency and professionalism to every home event.</p>
            </div>
            <div className="audience-card">
              <h4>Event Production Teams</h4>
              <p>Eliminate miscommunication and last-minute scrambles.</p>
            </div>
            <div className="audience-card">
              <h4>Operations Staff</h4>
              <p>Have clear accountability and visibility into what needs to happen.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="use-cases" className="product-section">
        <div className="container">
          <h2>Problems Sportify Solves</h2>
          <div className="problem-solution-grid">
            <div className="problem-card">
              <div className="problem-icon">❌</div>
              <h4>Run of Show Confusion</h4>
              <p>Multiple documents, spreadsheets, and email threads lead to miscommunication.</p>
              <div className="solution-arrow">→</div>
              <div className="solution-text">Single operational record with clear timelines</div>
            </div>
            <div className="problem-card">
              <div className="problem-icon">❌</div>
              <h4>Missed Cues</h4>
              <p>Without clear ownership, critical moments fall through the cracks.</p>
              <div className="solution-arrow">→</div>
              <div className="solution-text">Every moment has a clear owner and reminder system</div>
            </div>
            <div className="problem-card">
              <div className="problem-icon">❌</div>
              <h4>Asset Chaos</h4>
              <p>Graphics, videos, and sponsor materials scattered across drives and folders.</p>
              <div className="solution-arrow">→</div>
              <div className="solution-text">Assets live inside the moments that use them</div>
            </div>
            <div className="problem-card">
              <div className="problem-icon">❌</div>
              <h4>Sponsor Fulfillment Errors</h4>
              <p>Lost track of which sponsors were activated and when.</p>
              <div className="solution-arrow">→</div>
              <div className="solution-text">Clear sponsor mapping with fulfillment tracking</div>
            </div>
          </div>
        </div>
      </section>

      <section className="product-cta">
        <div className="container">
          <h2>Prove Your Operational Excellence</h2>
          <p>Sportify is built from real-world experience in live entertainment environments.</p>
          <Link href="mailto:hello@loud-legacy.com" className="button button--primary">
            Request Access
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
