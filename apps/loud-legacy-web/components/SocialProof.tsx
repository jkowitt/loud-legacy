"use client";

const stats = [
  { value: "4,200+", label: "Valuations Run", description: "Properties analyzed through VALORA" },
  { value: "156", label: "Events Executed", description: "Game days managed with Sportify" },
  { value: "89%", label: "Time Saved", description: "Average reduction in manual work" },
  { value: "12", label: "Organizations", description: "Athletic departments in beta" },
];

const testimonials = [
  {
    quote: "We went from 6 different spreadsheets to one dashboard. Game day is actually enjoyable now.",
    author: "Athletic Director",
    org: "D1 University",
    product: "Sportify"
  },
  {
    quote: "The underwriting process that used to take our team 3 days now takes 4 hours.",
    author: "Managing Partner",
    org: "Regional CRE Firm",
    product: "VALORA"
  },
  {
    quote: "Finally, a CRM that doesn't try to be everything. It just works.",
    author: "Founder",
    org: "Consulting Agency",
    product: "Legacy CRM"
  }
];

export function SocialProof() {
  return (
    <section className="social-proof-section">
      <div className="container">
        {/* Stats */}
        <div className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-description">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="testimonials-section">
          <h3>What operators are saying</h3>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <blockquote>"{testimonial.quote}"</blockquote>
                <div className="testimonial-author">
                  <div className="author-info">
                    <span className="author-title">{testimonial.author}</span>
                    <span className="author-org">{testimonial.org}</span>
                  </div>
                  <span className="testimonial-product">{testimonial.product}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="trust-badges">
          <span>SOC 2 Compliant</span>
          <span>256-bit Encryption</span>
          <span>99.9% Uptime SLA</span>
          <span>GDPR Ready</span>
        </div>
      </div>
    </section>
  );
}
