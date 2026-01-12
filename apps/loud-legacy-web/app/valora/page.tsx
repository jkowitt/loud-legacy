import Link from "next/link";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { CollapsibleSection } from "@/components/CollapsibleSection";

export const metadata = {
  title: "VALORA - AI-Powered Real Estate Intelligence Platform | Loud Legacy",
  description: "Complete real estate valuation and underwriting platform with AI image recognition, sophisticated financial modeling, and portfolio management. Built for brokers, investors, lenders, and property owners.",
};

export default function ValoraPage() {
  return (
    <main className="product-page">
      <Header />

      <section className="product-hero" style={{ background: "linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)" }}>
        <div className="container">
          <div className="badge">Enterprise Intelligence</div>
          <h1>VALORA</h1>
          <p className="tagline">
            AI-powered real estate intelligence platform combining computer vision,
            sophisticated underwriting, and portfolio management in one comprehensive system.
          </p>
          <div className="hero-actions">
            <Link href="/dashboard" className="button button--primary" style={{ background: 'white', color: '#1E40AF' }}>
              Try Demo
            </Link>
            <Link href="#features" className="button button--secondary" style={{ borderColor: 'white', color: 'white' }}>
              Explore Features
            </Link>
          </div>
        </div>
      </section>

      {/* Property Types Supported */}
      <section className="product-section" style={{ background: 'var(--bg-secondary)', paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Supporting All Property Types
            </h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 500 }}>🏢 Commercial</span>
              <span style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 500 }}>🏠 Residential</span>
              <span style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 500 }}>🏘️ Multifamily</span>
              <span style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 500 }}>🏭 Industrial</span>
            </div>
          </div>
        </div>
      </section>

      {/* Collapsible Feature Sections */}
      <section id="features" className="product-section">
        <div className="container">
          <h2 style={{ marginBottom: '2rem' }}>Comprehensive Feature Set</h2>

          <CollapsibleSection title="AI-Powered Property Intelligence" icon="🤖" defaultOpen={true}>
            <p style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>
              Advanced computer vision and machine learning to accelerate valuations and identify property insights.
            </p>
            <div className="features-grid">
              <div className="feature-card">
                <h3>📸 AI Image Recognition</h3>
                <p>Upload property photos and let AI automatically identify wear and tear, structural issues, and condition ratings.</p>
              </div>
              <div className="feature-card">
                <h3>📍 Smart Geocoding</h3>
                <p>Take a photo with your phone and VALORA automatically identifies the property location and initiates valuation workflow.</p>
              </div>
              <div className="feature-card">
                <h3>🎯 Address Input & Validation</h3>
                <p>Enter any property address and instantly access property data, tax records, and comparable sales.</p>
              </div>
              <div className="feature-card">
                <h3>💡 AI Recommendations</h3>
                <p>Get intelligent suggestions on how to improve property value based on property type and market conditions.</p>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Sophisticated Underwriting Engine" icon="📊">
            <p style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>
              Build comprehensive financial models with full customization and real-time scenario analysis.
            </p>
            <div className="features-grid">
              <div className="feature-card">
                <h3>📊 Customizable P&L Models</h3>
                <p>Add, remove, or toggle any line item. Create templates for different property types or customize for each deal.</p>
              </div>
              <div className="feature-card">
                <h3>💰 Dynamic Financial Modeling</h3>
                <p>Model rent growth, expense escalation, refinancing scenarios, and exit strategies with instant updates.</p>
              </div>
              <div className="feature-card">
                <h3>🔬 Scenario Analysis</h3>
                <p>Create multiple scenarios (base, best, worst case) and compare side-by-side to understand risk profiles.</p>
              </div>
              <div className="feature-card">
                <h3>📈 Sensitivity Testing</h3>
                <p>Identify which variables have the greatest impact on deal performance with automated analysis.</p>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Market Intelligence & Comparables" icon="🏘️">
            <p style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>
              Access real-time market data and comparable sales to ground your valuations in reality.
            </p>
            <div className="features-grid">
              <div className="feature-card">
                <h3>🏘️ On-Market Valuations</h3>
                <p>View properties currently for sale with asking prices, days on market, and seller information.</p>
              </div>
              <div className="feature-card">
                <h3>📋 Comparable Sales Database</h3>
                <p>Search recent sales by property type, location, size, and sale date to support your assumptions.</p>
              </div>
              <div className="feature-card">
                <h3>🗺️ Market Reports</h3>
                <p>Automated reports showing trends in cap rates, rent growth, vacancy rates, and absorption.</p>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Portfolio & Valuation Management" icon="📚">
            <p style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>
              Organize, track, and analyze all your property valuations in one centralized system.
            </p>
            <div className="features-grid">
              <div className="feature-card">
                <h3>📚 Valuation History Database</h3>
                <p>Every valuation you create is automatically saved with full version history and supporting documentation.</p>
              </div>
              <div className="feature-card">
                <h3>🔒 Private Valuations</h3>
                <p>Save valuations as drafts or private entries that are only visible to you and your team.</p>
              </div>
              <div className="feature-card">
                <h3>📊 Portfolio Dashboard</h3>
                <p>Roll up all your valuations showing total value, IRR, cash-on-cash returns, and concentration risk.</p>
              </div>
              <div className="feature-card">
                <h3>🔍 Search & Filter</h3>
                <p>Quickly find past valuations by property address, date, property type, or custom tags.</p>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Team Collaboration & Admin Controls" icon="👥">
            <p style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>
              Built for teams with enterprise-grade security, permissions, and workflow management.
            </p>
            <div className="features-grid">
              <div className="feature-card">
                <h3>👥 Team Management</h3>
                <p>Invite team members, assign roles (Admin, Analyst, Viewer), and control access to valuations.</p>
              </div>
              <div className="feature-card">
                <h3>🔐 Account Signup & SSO</h3>
                <p>Secure account creation with email verification, 2FA, and SSO integration for enterprises.</p>
              </div>
              <div className="feature-card">
                <h3>⚙️ Admin Dashboard</h3>
                <p>Manage team members, monitor activity, set permissions from one central dashboard.</p>
              </div>
              <div className="feature-card">
                <h3>📋 Workflow Approval</h3>
                <p>Set up approval workflows so junior analysts can create valuations that require senior review.</p>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Developer & Content Management" icon="⚙️">
            <p style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>
              Technical capabilities for power users and enterprise deployments.
            </p>
            <div className="features-grid">
              <div className="feature-card">
                <h3>💻 Backend Database Access</h3>
                <p>Direct database access for owners to run custom queries, create reports, and integrate with other systems.</p>
              </div>
              <div className="feature-card">
                <h3>📝 Admin CMS</h3>
                <p>Content management system to edit text, update assumptions, and modify platform content without code.</p>
              </div>
              <div className="feature-card">
                <h3>🔌 API Access</h3>
                <p>RESTful API for integrating VALORA data with your existing tools and workflows.</p>
              </div>
              <div className="feature-card">
                <h3>📤 Bulk Operations</h3>
                <p>Import/export multiple valuations, batch update properties, and automated data syncing.</p>
              </div>
            </div>
          </CollapsibleSection>
        </div>
      </section>

      {/* User Types */}
      <section className="product-section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Built For Real Estate Professionals</h2>
          <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            <div className="feature-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏢</div>
              <h3>Brokers</h3>
              <p>Create professional valuations for client pitches, support pricing recommendations, and win more listings.</p>
            </div>
            <div className="feature-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏠</div>
              <h3>Property Owners</h3>
              <p>Track property performance, understand market value changes, and make data-driven decisions about your assets.</p>
            </div>
            <div className="feature-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💼</div>
              <h3>Investors</h3>
              <p>Underwrite deals faster, model multiple scenarios, and identify the best opportunities in your pipeline.</p>
            </div>
            <div className="feature-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏦</div>
              <h3>Lenders</h3>
              <p>Standardize underwriting, assess borrower assumptions, and make confident lending decisions backed by data.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="product-section">
        <div className="container" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
            Ready to Transform Your Real Estate Analysis?
          </h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
            Join forward-thinking brokers, investors, and lenders using VALORA to make better decisions faster.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/dashboard" className="button button--primary" style={{ fontSize: '1.125rem', padding: '0.875rem 2rem' }}>
              Try Demo Dashboard
            </Link>
            <Link href="/auth/signup" className="button button--secondary" style={{ fontSize: '1.125rem', padding: '0.875rem 2rem' }}>
              Create Account
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
