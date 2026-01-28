"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

// Tier type definition
interface PlatformTier {
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
  free?: boolean;
}

interface Platform {
  name: string;
  tagline: string;
  color: string;
  tiers: PlatformTier[];
}

// Platform-specific plans
const platformPlans: Record<string, Platform> = {
  valora: {
    name: "VALORA",
    tagline: "Real Estate Intelligence",
    color: "#3B82F6",
    tiers: [
      { name: "Starter", price: 29, features: ["10 valuations/month", "Basic analytics", "Email support"] },
      { name: "Professional", price: 79, features: ["50 valuations/month", "Advanced analytics", "API access", "Priority support"], popular: true },
      { name: "Enterprise", price: 199, features: ["Unlimited valuations", "Custom integrations", "Dedicated support", "SLA guarantee"] },
    ],
  },
  sportify: {
    name: "Sportify",
    tagline: "Event Operations",
    color: "#8B5CF6",
    tiers: [
      { name: "Starter", price: 19, features: ["5 events/month", "Basic run of show", "Email support"] },
      { name: "Professional", price: 49, features: ["20 events/month", "Full asset management", "Sponsor tracking", "Priority support"], popular: true },
      { name: "Enterprise", price: 129, features: ["Unlimited events", "Multi-venue support", "Custom workflows", "Dedicated support"] },
    ],
  },
  businessNow: {
    name: "Business Now",
    tagline: "Business Operations",
    color: "#2D9CDB",
    tiers: [
      { name: "Starter", price: 0, features: ["Invoice generator", "Basic expense tracking", "5 team members"], free: true },
      { name: "Professional", price: 39, features: ["All tools", "Financial reports", "25 team members", "Tax calculations"], popular: true },
      { name: "Enterprise", price: 99, features: ["Unlimited everything", "Custom reports", "API access", "Dedicated support"] },
    ],
  },
  legacyCRM: {
    name: "Legacy CRM",
    tagline: "Relationship Management",
    color: "#D4AF37",
    tiers: [
      { name: "Free Forever", price: 0, features: ["Unlimited contacts", "Basic pipeline", "Activity tracking", "Email support"], free: true },
      { name: "Professional", price: 29, features: ["Everything free", "Advanced automation", "Custom fields", "Integrations"], popular: true },
      { name: "Enterprise", price: 79, features: ["Unlimited everything", "Custom workflows", "API access", "Dedicated support"] },
    ],
  },
  loudWorks: {
    name: "Loud Works",
    tagline: "Workforce Management",
    color: "#F97316",
    tiers: [
      { name: "Starter", price: 19, features: ["10 team members", "Basic scheduling", "Time tracking"] },
      { name: "Professional", price: 49, features: ["50 team members", "Training modules", "Recruiting tools", "Analytics"], popular: true },
      { name: "Enterprise", price: 129, features: ["Unlimited team", "Custom training", "Full recruiting suite", "Dedicated support"] },
    ],
  },
};

// Bundle plans
const bundlePlans = [
  {
    id: "STARTER_BUNDLE",
    name: "Starter Bundle",
    price: 0,
    description: "Get started with core tools",
    highlight: false,
    includes: ["Legacy CRM (Free)", "Business Now Basics"],
    features: [
      "Unlimited CRM contacts",
      "Basic invoicing",
      "5 team members",
      "Community support",
    ],
    cta: "Start Free",
    trial: false,
  },
  {
    id: "PROFESSIONAL_BUNDLE",
    name: "Professional",
    price: 99,
    originalPrice: 147,
    description: "Everything you need to grow",
    highlight: true,
    popular: true,
    includes: ["VALORA Pro", "Sportify Pro", "Business Now Pro", "Legacy CRM Pro"],
    features: [
      "50 valuations/month",
      "20 events/month",
      "Full business suite",
      "Advanced CRM",
      "Priority support",
      "API access",
    ],
    cta: "Start 7-Day Free Trial",
    trial: true,
  },
  {
    id: "ALL_ACCESS",
    name: "All-Access",
    price: 199,
    originalPrice: 347,
    description: "Complete platform access",
    highlight: false,
    includes: ["All 5 Platforms", "Unlimited Usage"],
    features: [
      "Unlimited valuations",
      "Unlimited events",
      "Full workforce tools",
      "All CRM features",
      "Cross-platform sync",
      "White-label options",
    ],
    cta: "Start 7-Day Free Trial",
    trial: true,
  },
  {
    id: "ENTERPRISE",
    name: "Enterprise",
    price: null,
    description: "Custom solutions for large teams",
    highlight: false,
    includes: ["Custom Configuration", "Dedicated Support"],
    features: [
      "Everything in All-Access",
      "Unlimited team members",
      "Custom integrations",
      "On-premise option",
      "SLA guarantee",
      "Dedicated success manager",
    ],
    cta: "Contact Sales",
    contactSales: true,
  },
];

const faqs = [
  {
    q: "What happens after the 7-day free trial?",
    a: "After your trial, you'll be automatically upgraded to your selected plan. You can cancel anytime during the trial with no charge. We'll remind you 2 days before the trial ends."
  },
  {
    q: "Can I switch between individual products and bundles?",
    a: "Yes! You can switch anytime. If you're on individual plans and switch to a bundle, you'll get credit for any unused time. Bundles save you 30-40% compared to individual products."
  },
  {
    q: "Is Legacy CRM really free?",
    a: "Yes, Legacy CRM is free forever for unlimited contacts. The Professional tier adds automation and integrations, but the core CRM is always free."
  },
  {
    q: "What's included in the BETA program?",
    a: "BETA testers get free access to all features while we're in development. Your feedback helps shape the platform. BETA testers will receive special pricing when we fully launch."
  },
  {
    q: "Do you offer discounts for nonprofits or education?",
    a: "Yes! We offer 50% off all paid plans for verified nonprofits and educational institutions. Contact us with proof of status."
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. No long-term contracts. Cancel anytime and keep access until your billing period ends. Your data is retained for 30 days."
  },
];

export default function PricingPage() {
  const [billingInterval, setBillingInterval] = useState<"monthly" | "yearly">("monthly");
  const [viewMode, setViewMode] = useState<"bundles" | "individual">("bundles");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("valora");
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubscribe = async (planId: string, contactSales?: boolean, isTrial?: boolean) => {
    if (contactSales) {
      router.push("/contact?inquiry=enterprise");
      return;
    }

    // For trials and free plans, go directly to signup
    if (!session) {
      const trialParam = isTrial ? "&trial=7" : "";
      router.push(`/auth/signup?plan=${planId.toLowerCase()}&interval=${billingInterval}${trialParam}`);
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
          trial: isTrial ? 7 : 0,
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
    return `$${billingInterval === "yearly" ? Math.round(price * 10) : price}`;
  };

  const getYearlyPrice = (monthlyPrice: number) => {
    return Math.round(monthlyPrice * 10); // ~17% discount
  };

  return (
    <main className="pricing-page-new">
      <Header />

      {/* Hero */}
      <section className="pricing-hero-new">
        <div className="container">
          <div className="pricing-beta-badge">
            <span className="beta-dot"></span>
            Currently in BETA - Sign up free, no payment required
          </div>
          <h1>Simple, transparent pricing</h1>
          <p className="pricing-subtitle">Start with a 7-day free trial. No credit card required during BETA.</p>

          {/* View Toggle */}
          <div className="pricing-view-toggle">
            <button
              className={`view-toggle-btn ${viewMode === "bundles" ? "active" : ""}`}
              onClick={() => setViewMode("bundles")}
            >
              Bundles
              <span className="save-tag">Save 30%+</span>
            </button>
            <button
              className={`view-toggle-btn ${viewMode === "individual" ? "active" : ""}`}
              onClick={() => setViewMode("individual")}
            >
              Individual Products
            </button>
          </div>

          {/* Billing Toggle */}
          <div className="billing-toggle-new">
            <button
              className={`billing-btn ${billingInterval === "monthly" ? "active" : ""}`}
              onClick={() => setBillingInterval("monthly")}
            >
              Monthly
            </button>
            <button
              className={`billing-btn ${billingInterval === "yearly" ? "active" : ""}`}
              onClick={() => setBillingInterval("yearly")}
            >
              Yearly
              <span className="yearly-save">Save 17%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Bundle Plans */}
      {viewMode === "bundles" && (
        <section className="pricing-plans-new">
          <div className="container">
            <div className="plans-grid-new">
              {bundlePlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`plan-card-new ${plan.highlight ? "plan-card-highlighted" : ""}`}
                >
                  {plan.popular && <div className="popular-badge">Most Popular</div>}
                  {plan.trial && <div className="trial-badge">7-Day Free Trial</div>}

                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-description">{plan.description}</p>

                  <div className="plan-price-new">
                    {plan.originalPrice && (
                      <span className="original-price">${billingInterval === "yearly" ? getYearlyPrice(plan.originalPrice) : plan.originalPrice}</span>
                    )}
                    <span className="current-price">{formatPrice(plan.price)}</span>
                    {plan.price !== null && plan.price > 0 && (
                      <span className="price-period">/{billingInterval === "yearly" ? "year" : "month"}</span>
                    )}
                  </div>

                  {plan.originalPrice && (
                    <div className="savings-badge">
                      Save ${billingInterval === "yearly" ? getYearlyPrice(plan.originalPrice - plan.price!) : plan.originalPrice - plan.price!}/mo
                    </div>
                  )}

                  <div className="plan-includes">
                    <span className="includes-label">Includes:</span>
                    {plan.includes.map((item, i) => (
                      <span key={i} className="includes-item">{item}</span>
                    ))}
                  </div>

                  <ul className="plan-features-new">
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSubscribe(plan.id, plan.contactSales, plan.trial)}
                    disabled={isLoading === plan.id}
                    className={`plan-cta-new ${plan.highlight ? "plan-cta-primary" : "plan-cta-secondary"}`}
                  >
                    {isLoading === plan.id ? "Loading..." : plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Individual Product Pricing */}
      {viewMode === "individual" && (
        <section className="pricing-individual">
          <div className="container">
            {/* Platform Selector */}
            <div className="platform-tabs">
              {Object.entries(platformPlans).map(([key, platform]) => (
                <button
                  key={key}
                  className={`platform-tab ${selectedPlatform === key ? "active" : ""}`}
                  onClick={() => setSelectedPlatform(key)}
                  style={{ "--platform-color": platform.color } as React.CSSProperties}
                >
                  {platform.name}
                </button>
              ))}
            </div>

            {/* Selected Platform Pricing */}
            <div className="platform-pricing">
              <div className="platform-header" style={{ "--platform-color": platformPlans[selectedPlatform].color } as React.CSSProperties}>
                <h2>{platformPlans[selectedPlatform].name}</h2>
                <p>{platformPlans[selectedPlatform].tagline}</p>
              </div>

              <div className="platform-tiers">
                {platformPlans[selectedPlatform].tiers.map((tier, index) => (
                  <div key={index} className={`tier-card ${tier.popular ? "tier-popular" : ""}`}>
                    {tier.popular && <div className="popular-badge">Recommended</div>}
                    <h4>{tier.name}</h4>
                    <div className="tier-price">
                      <span className="price">{tier.free ? "Free" : `$${billingInterval === "yearly" ? getYearlyPrice(tier.price) : tier.price}`}</span>
                      {!tier.free && <span className="period">/{billingInterval === "yearly" ? "year" : "month"}</span>}
                    </div>
                    <ul className="tier-features">
                      {tier.features.map((feature, i) => (
                        <li key={i}>
                          <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button
                      className={`tier-cta ${tier.popular ? "tier-cta-primary" : "tier-cta-secondary"}`}
                      onClick={() => handleSubscribe(`${selectedPlatform.toUpperCase()}_${tier.name.toUpperCase().replace(" ", "_")}`, false, !tier.free)}
                    >
                      {tier.free ? "Start Free" : "Start 7-Day Trial"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* BETA Program Banner */}
      <section className="beta-banner">
        <div className="container">
          <div className="beta-content">
            <div className="beta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="beta-text">
              <h3>Join Our BETA Program</h3>
              <p>Get free access to all platforms while we're in development. Your feedback shapes the future of Loud Legacy.</p>
            </div>
            <Link href="/auth/signup?beta=true" className="beta-cta">
              Join BETA Free
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pricing-faq-new">
        <div className="container">
          <h2>Frequently asked questions</h2>
          <div className="faq-grid-new">
            {faqs.map((faq, index) => (
              <details key={index} className="faq-item-new">
                <summary>
                  <h4>{faq.q}</h4>
                  <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pricing-cta-new">
        <div className="container">
          <h2>Ready to get started?</h2>
          <p>Join thousands of operators building better businesses with Loud Legacy.</p>
          <div className="cta-actions">
            <Link href="/auth/signup?beta=true" className="button button--primary">
              Start Free BETA Access
            </Link>
            <Link href="/contact" className="button button--secondary">
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
