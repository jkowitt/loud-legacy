import { CreditCard, Lock, ShieldCheck } from "lucide-react";

import { PlanCard } from "../components/PlanCard";

const plans = [
  {
    name: "Starter",
    price: "$99",
    cadence: "monthly" as const,
    description: "For solo brokers validating deals on demand.",
    features: ["100 valuations/mo", "Bulk CSV uploads", "US IL coverage"],
    highlight: false
  },
  {
    name: "Pro",
    price: "$399",
    cadence: "monthly" as const,
    description: "For lenders and capital partners running daily volume.",
    features: ["3000 valuations/mo", "Priority support", "Dedicated webhook lanes"],
    highlight: true
  },
  {
    name: "Enterprise",
    price: "Talk to us",
    cadence: "custom" as const,
    description: "Custom SOW, SLAs, and data ingestion support for scaled teams.",
    features: ["Unlimited valuations", "On-prem connectors", "White-glove onboarding"],
    highlight: false
  }
];

export const PlansPage = () => {
  return (
    <div className="space-y-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-neutral-500">pricing & billing</p>
          <h1 className="mt-2 text-3xl font-semibold text-neutral-100">Choose a plan, unlock instant valuations</h1>
          <p className="mt-3 max-w-2xl text-sm text-neutral-400">
            Activate usage metering, CSV workflows, and API keys with the subscription tier that matches your
            pipeline. Stripe handles payments; cancel or upgrade any time.
          </p>
        </div>
        <div className="rounded-xl border border-brand-800 bg-brand-900/40 p-5 text-xs text-neutral-400">
          <p className="flex items-center gap-2 text-neutral-200"><ShieldCheck className="h-4 w-4 text-accent" /> SOC2-ready controls</p>
          <p className="mt-2">All payment data is tokenised. We never store card numbers. Audit logs available per tenant.</p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard
            key={plan.name}
            name={plan.name}
            price={plan.price}
            cadence={plan.cadence}
            description={plan.description}
            features={plan.features}
            highlight={plan.highlight}
            cta={
              <button className="w-full rounded-lg border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/20">
                Start {plan.name.toLowerCase()} plan
              </button>
            }
          />
        ))}
      </div>

      <section className="grid gap-8 lg:grid-cols-[2fr_3fr]">
        <div className="rounded-2xl border border-brand-800 bg-surface/70 p-6 shadow-hard">
          <h2 className="text-lg font-semibold text-neutral-100">Billing details</h2>
          <form className="mt-5 space-y-4 text-sm text-neutral-200">
            <div>
              <label className="text-xs uppercase tracking-[0.35em] text-neutral-500">Company</label>
              <input className="mt-2 w-full rounded-lg border border-brand-800 bg-brand-900/30 px-4 py-2" placeholder="Atlas Capital" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs uppercase tracking-[0.35em] text-neutral-500">Primary contact</label>
                <input className="mt-2 w-full rounded-lg border border-brand-800 bg-brand-900/30 px-4 py-2" placeholder="Maya Chen" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.35em] text-neutral-500">Email</label>
                <input className="mt-2 w-full rounded-lg border border-brand-800 bg-brand-900/30 px-4 py-2" placeholder="ops@atlas.cap" />
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.35em] text-neutral-500">Billing cycle</label>
              <select className="mt-2 w-full rounded-lg border border-brand-800 bg-brand-900/30 px-4 py-2">
                <option>Monthly</option>
                <option>Annual (2 months free)</option>
              </select>
            </div>
          </form>
        </div>

        <div className="rounded-2xl border border-brand-800 bg-surface/70 p-6 shadow-hard">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-neutral-100">
            <CreditCard className="h-5 w-5 text-accent" /> Payment method
          </h2>
          <form className="mt-5 space-y-4 text-sm text-neutral-200">
            <div>
              <label className="text-xs uppercase tracking-[0.35em] text-neutral-500">Card holder</label>
              <input className="mt-2 w-full rounded-lg border border-brand-800 bg-brand-900/30 px-4 py-2" placeholder="Jason Diaz" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.35em] text-neutral-500">Card number</label>
              <div className="mt-2 flex items-center gap-3 rounded-lg border border-brand-800 bg-brand-900/30 px-4 py-2">
                <Lock className="h-4 w-4 text-accent" />
                <input className="w-full bg-transparent text-neutral-200 outline-none" placeholder="4242 4242 4242 4242" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="text-xs uppercase tracking-[0.35em] text-neutral-500">Expiry</label>
                <input className="mt-2 w-full rounded-lg border border-brand-800 bg-brand-900/30 px-4 py-2" placeholder="MM/YY" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.35em] text-neutral-500">CVC</label>
                <input className="mt-2 w-full rounded-lg border border-brand-800 bg-brand-900/30 px-4 py-2" placeholder="123" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.35em] text-neutral-500">Zip</label>
                <input className="mt-2 w-full rounded-lg border border-brand-800 bg-brand-900/30 px-4 py-2" placeholder="60115" />
              </div>
            </div>
            <button className="w-full rounded-lg border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-semibold text-accent hover:bg-accent/20">
              Confirm subscription
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
