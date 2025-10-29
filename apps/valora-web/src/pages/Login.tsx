import { useState } from "react";
import { Link } from "react-router-dom";

import { ValoraLogo } from "../components/ValoraLogo";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: wire to auth service
    console.info("Attempt login", { email, password: "[redacted]" });
  };

  return (
    <div className="grid min-h-screen bg-background text-neutral-100 lg:grid-cols-[1.2fr_1fr]">
      <section className="relative hidden overflow-hidden border-r border-brand-800 bg-surface/80 px-12 py-16 shadow-hard lg:flex lg:flex-col">
        <div className="absolute inset-0 bg-grain-overlay opacity-60" aria-hidden />
        <div className="relative z-10">
          <ValoraLogo />
          <div className="mt-14 max-w-md space-y-6">
            <h1 className="text-4xl font-semibold text-neutral-50">Accelerate every valuation decision.</h1>
            <p className="text-sm text-neutral-300">
              Centralise your residential deals, monitor live comps, and sync instant valuations straight into
              underwriting workflows.
            </p>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li>• Champion/challenger model monitoring with explainability</li>
              <li>• Bulk CSV runs, webhooks, and API metering out of the box</li>
              <li>• SOC2-ready controls with audit trails per tenant</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-2xl border border-brand-800 bg-surface/80 p-8 shadow-hard">
          <div className="mb-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent/70">Welcome back</p>
            <h2 className="mt-3 text-2xl font-semibold text-neutral-50">Log into VALORA</h2>
            <p className="mt-2 text-sm text-neutral-400">
              Don’t have an account? <Link className="text-accent" to="/plans">Choose a plan</Link> or
              <Link className="text-accent" to="/explore"> browse the marketplace</Link> first.
            </p>
          </div>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="text-xs uppercase tracking-[0.35em] text-neutral-500">Email</label>
              <input
                className="mt-2 w-full rounded-lg border border-brand-800 bg-brand-900/30 px-4 py-3 text-sm text-neutral-100"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@company.com"
                required
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.35em] text-neutral-500">Password</label>
              <input
                className="mt-2 w-full rounded-lg border border-brand-800 bg-brand-900/30 px-4 py-3 text-sm text-neutral-100"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <div className="flex items-center justify-between text-xs text-neutral-500">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border-brand-700 bg-brand-900" />
                Remember me
              </label>
              <Link to="#" className="text-accent">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-semibold text-accent hover:bg-accent/20"
            >
              Sign in
            </button>
          </form>
          <div className="mt-8 rounded-lg border border-brand-800 bg-brand-900/30 p-4 text-xs text-neutral-400">
            <p className="font-semibold text-neutral-100">Need sandbox access?</p>
            <p className="mt-1">
              Contact <a className="text-accent" href="mailto:sales@valora.app">sales@valora.app</a> for a guided tour
              and partner integrations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
