import Link from "next/link";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Pricing - Loud Legacy",
  description: "Simple, transparent pricing for operators. Start free, scale as you grow. Legacy CRM included with every plan.",
};

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "Perfect for getting started",
    highlight: false,
    features: [
      "Legacy CRM (unlimited contacts)",
      "Business Now basics",
      "5 team members",
      "Community support",
      "Basic analytics",
    ],
    cta: "Start Free",
    ctaLink: "/auth/signup",
  },
  {
    name: "Professional",
    price: "$49",
    period: "/user/month",
    description: "For growing teams",
    highlight: true,
    features: [
      "Everything in Starter",
      "VALORA (50 valuations/mo)",
      "Sportify (10 events/mo)",
      "Business Now full suite",
      "Priority support",
      "Advanced analytics",
      "API access",
    ],
    cta: "Start Trial",
    ctaLink: "/auth/signup?plan=pro",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations",
    highlight: false,
    features: [
      "Everything in Professional",
      "Unlimited valuations",
      "Unlimited events",
      "Custom integrations",
      "Dedicated success manager",
      "SLA guarantee",
      "On-premise option",
      "Custom training",
    ],
    cta: "Contact Sales",
    ctaLink: "/contact",
  },
];

const faqs = [
  {
    q: "Is the CRM really free?",
    a: "Yes. Legacy CRM is included at no extra cost with every plan, including Starter. We believe relationship management should be accessible to everyone."
  },
  {
    q: "Can I switch plans later?",
    a: "Absolutely. Upgrade or downgrade anytime. When you upgrade, you get immediate access to new features. When you downgrade, you keep access until your current billing period ends."
  },
  {
    q: "What counts as a 'valuation' in VALORA?",
    a: "Each property analysis counts as one valuation. Bulk uploads count as one valuation per property. Re-running an analysis on the same property within 30 days doesn't count against your limit."
  },
  {
    q: "Do you offer discounts for nonprofits or education?",
    a: "Yes! We offer 50% off Professional plans for verified nonprofits and educational institutions. Contact us to learn more."
  },
  {
    q: "What happens if I exceed my limits?",
    a: "We'll notify you when you're approaching your limits. You can upgrade anytime, or we'll work with you on a custom solution. We never cut off access without warning."
  },
];

export default function PricingPage() {
  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="pricing-hero">
        <div className="container">
          <h1>Simple pricing for operators</h1>
          <p>Start free. Scale as you grow. No surprises.</p>
        </div>
      </section>

      {/* Plans */}
      <section className="pricing-plans">
        <div className="container">
          <div className="plans-grid">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`plan-card ${plan.highlight ? "plan-card--highlighted" : ""}`}
              >
                {plan.highlight && <div className="plan-badge">Most Popular</div>}
                <h3>{plan.name}</h3>
                <div className="plan-price">
                  <span className="price">{plan.price}</span>
                  <span className="period">{plan.period}</span>
                </div>
                <p className="plan-description">{plan.description}</p>
                <ul className="plan-features">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.ctaLink}
                  className={`plan-cta ${plan.highlight ? "plan-cta--primary" : "plan-cta--secondary"}`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Add-ons */}
      <section className="pricing-addons">
        <div className="container">
          <h2>Need more?</h2>
          <p>Add capacity to any Professional or Enterprise plan.</p>
          <div className="addons-grid">
            <div className="addon-card">
              <h4>VALORA Extra</h4>
              <p>+100 valuations/month</p>
              <span className="addon-price">$29/mo</span>
            </div>
            <div className="addon-card">
              <h4>Sportify Extra</h4>
              <p>+25 events/month</p>
              <span className="addon-price">$19/mo</span>
            </div>
            <div className="addon-card">
              <h4>Team Seats</h4>
              <p>+10 team members</p>
              <span className="addon-price">$99/mo</span>
            </div>
            <div className="addon-card">
              <h4>Priority Support</h4>
              <p>4-hour response SLA</p>
              <span className="addon-price">$49/mo</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pricing-faq">
        <div className="container">
          <h2>Frequently asked questions</h2>
          <div className="faq-grid">
            {faqs.map((faq) => (
              <div key={faq.q} className="faq-item">
                <h4>{faq.q}</h4>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pricing-cta">
        <div className="container">
          <h2>Still have questions?</h2>
          <p>Talk to our team. We'll help you find the right plan.</p>
          <Link href="/contact" className="button button--primary">
            Contact Sales
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
