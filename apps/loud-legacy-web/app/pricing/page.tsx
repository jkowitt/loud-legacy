"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

const plans = [
  {
    id: "STARTER",
    name: "Starter",
    prices: { monthly: 0, yearly: 0 },
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
  },
  {
    id: "PROFESSIONAL",
    name: "Professional",
    prices: { monthly: 49, yearly: 470 },
    description: "For growing teams",
    highlight: true,
    popular: true,
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
  },
  {
    id: "ALL_ACCESS",
    name: "All-Access",
    prices: { monthly: 79, yearly: 790 },
    description: "Full platform access",
    highlight: false,
    features: [
      "All products included",
      "Unlimited valuations",
      "Unlimited events",
      "Cross-platform sync",
      "Team collaboration",
      "Priority support",
      "Custom workflows",
    ],
    cta: "Get All-Access",
  },
  {
    id: "ENTERPRISE",
    name: "Enterprise",
    prices: { monthly: null, yearly: null },
    description: "For large organizations",
    highlight: false,
    features: [
      "Everything in All-Access",
      "Unlimited team members",
      "Custom integrations",
      "Dedicated success manager",
      "SLA guarantee",
      "On-premise option",
      "Custom training",
    ],
    cta: "Contact Sales",
    contactSales: true,
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
    q: "What's included in All-Access?",
    a: "All-Access gives you complete access to every Loud Legacy product: VALORA for real estate, Sportify for events, Business Now for operations, and Legacy CRM for relationships—all with unlimited usage."
  },
  {
    q: "Do you offer discounts for nonprofits or education?",
    a: "Yes! We offer 50% off Professional and All-Access plans for verified nonprofits and educational institutions. Contact us to learn more."
  },
  {
    q: "What happens if I cancel?",
    a: "You keep access until your current billing period ends. Your data is retained for 30 days after cancellation. You can export everything before then."
  },
];

export default function PricingPage() {
  const [billingInterval, setBillingInterval] = useState<"monthly" | "yearly">("monthly");
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubscribe = async (planId: string, contactSales?: boolean) => {
    if (contactSales) {
      router.push("/contact?inquiry=enterprise");
      return;
    }

    if (!session) {
      router.push(`/auth/signup?plan=${planId.toLowerCase()}&interval=${billingInterval}`);
      return;
    }

    setIsLoading(planId);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: planId,
          interval: billingInterval,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else if (data.redirect) {
        router.push(data.redirect);
      } else if (data.error) {
        alert(data.error);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(null);
    }
  };

  const formatPrice = (price: number | null) => {
    if (price === null) return "Custom";
    if (price === 0) return "Free";
    return `$${price}`;
  };

  const yearlyDiscount = (monthly: number | null, yearly: number | null) => {
    if (monthly === null || yearly === null || monthly === 0) return null;
    const monthlyTotal = monthly * 12;
    const savings = monthlyTotal - yearly;
    if (savings > 0) {
      return Math.round((savings / monthlyTotal) * 100);
    }
    return null;
  };

  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="pricing-hero">
        <div className="container">
          <h1>Simple pricing for operators</h1>
          <p>Start free. Scale as you grow. No surprises.</p>

          {/* Billing Toggle */}
          <div className="billing-toggle" role="radiogroup" aria-label="Billing interval">
            <button
              className={`toggle-option ${billingInterval === "monthly" ? "active" : ""}`}
              onClick={() => setBillingInterval("monthly")}
              role="radio"
              aria-checked={billingInterval === "monthly"}
            >
              Monthly
            </button>
            <button
              className={`toggle-option ${billingInterval === "yearly" ? "active" : ""}`}
              onClick={() => setBillingInterval("yearly")}
              role="radio"
              aria-checked={billingInterval === "yearly"}
            >
              Yearly
              <span className="save-badge">Save 17%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="pricing-plans">
        <div className="container">
          <div className="plans-grid plans-grid--four">
            {plans.map((plan) => {
              const price = plan.prices[billingInterval];
              const discount = yearlyDiscount(plan.prices.monthly, plan.prices.yearly);

              return (
                <div
                  key={plan.id}
                  className={`plan-card ${plan.highlight ? "plan-card--highlighted" : ""}`}
                  role="article"
                  aria-labelledby={`plan-${plan.id}-title`}
                >
                  {plan.popular && <div className="plan-badge">Most Popular</div>}
                  <h3 id={`plan-${plan.id}-title`}>{plan.name}</h3>
                  <div className="plan-price">
                    <span className="price">{formatPrice(price)}</span>
                    {price !== null && price > 0 && (
                      <span className="period">
                        /{billingInterval === "yearly" ? "year" : "month"}
                      </span>
                    )}
                  </div>
                  {billingInterval === "yearly" && discount && (
                    <div className="plan-savings">Save {discount}% vs monthly</div>
                  )}
                  <p className="plan-description">{plan.description}</p>
                  <ul className="plan-features" role="list">
                    {plan.features.map((feature) => (
                      <li key={feature} role="listitem">
                        <svg
                          className="check-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleSubscribe(plan.id, plan.contactSales)}
                    disabled={isLoading === plan.id}
                    className={`plan-cta ${plan.highlight ? "plan-cta--primary" : "plan-cta--secondary"}`}
                    aria-busy={isLoading === plan.id}
                  >
                    {isLoading === plan.id ? "Loading..." : plan.cta}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compare Plans */}
      <section className="pricing-compare">
        <div className="container">
          <h2>Compare plans</h2>
          <div className="compare-table-wrapper">
            <table className="compare-table" role="table">
              <thead>
                <tr>
                  <th scope="col">Feature</th>
                  <th scope="col">Starter</th>
                  <th scope="col">Professional</th>
                  <th scope="col">All-Access</th>
                  <th scope="col">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Legacy CRM</td>
                  <td>✓</td>
                  <td>✓</td>
                  <td>✓</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <td>Business Now</td>
                  <td>Basic</td>
                  <td>Full</td>
                  <td>Full</td>
                  <td>Full + Custom</td>
                </tr>
                <tr>
                  <td>VALORA</td>
                  <td>—</td>
                  <td>50/mo</td>
                  <td>Unlimited</td>
                  <td>Unlimited</td>
                </tr>
                <tr>
                  <td>Sportify</td>
                  <td>—</td>
                  <td>10 events/mo</td>
                  <td>Unlimited</td>
                  <td>Unlimited</td>
                </tr>
                <tr>
                  <td>Team members</td>
                  <td>5</td>
                  <td>25</td>
                  <td>50</td>
                  <td>Unlimited</td>
                </tr>
                <tr>
                  <td>API access</td>
                  <td>—</td>
                  <td>✓</td>
                  <td>✓</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <td>Support</td>
                  <td>Community</td>
                  <td>Priority</td>
                  <td>Priority</td>
                  <td>Dedicated</td>
                </tr>
                <tr>
                  <td>Custom integrations</td>
                  <td>—</td>
                  <td>—</td>
                  <td>—</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <td>SLA</td>
                  <td>—</td>
                  <td>—</td>
                  <td>99.9%</td>
                  <td>Custom</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pricing-faq">
        <div className="container">
          <h2>Frequently asked questions</h2>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <details key={index} className="faq-item">
                <summary>
                  <h4>{faq.q}</h4>
                </summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pricing-cta">
        <div className="container">
          <h2>Still have questions?</h2>
          <p>Talk to our team. We'll help you find the right plan.</p>
          <div className="cta-actions">
            <Link href="/contact" className="button button--primary">
              Contact Sales
            </Link>
            <Link href="/about" className="button button--secondary">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
