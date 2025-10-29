import { Key, Layers, Shield, Users } from "lucide-react";

import { DataPanel } from "../components/DataPanel";

const team = [
  { name: "Jason Diaz", role: "Enterprise Admin", lastActive: "Online", access: "Full" },
  { name: "Maya Chen", role: "Analyst", lastActive: "4m ago", access: "Valuations" },
  { name: "Dev Patel", role: "Data Engineer", lastActive: "9m ago", access: "Pipelines" }
];

export const AdminPage = () => {
  return (
    <div className="space-y-8">
      <header>
        <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-neutral-500">tenant admin</p>
        <h1 className="mt-2 text-2xl font-semibold text-neutral-100">Users & plan management</h1>
        <p className="mt-2 max-w-2xl text-sm text-neutral-400">
          Control access, manage API keys, and adjust plan tiers. All actions are logged to the compliance ledger.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-brand-800 bg-surface/70 p-6 shadow-hard">
          <header className="flex items-center gap-3 text-neutral-400">
            <Users className="h-5 w-5 text-accent" />
            <p className="font-mono text-[11px] uppercase tracking-[0.38em]">team</p>
          </header>
          <ul className="mt-4 divide-y divide-brand-800/40 text-sm text-neutral-300">
            {team.map((member) => (
              <li key={member.name} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-neutral-100">{member.name}</p>
                  <p className="text-xs text-neutral-500">{member.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-accent/70">{member.access}</p>
                  <p className="text-[11px] text-neutral-500">{member.lastActive}</p>
                </div>
              </li>
            ))}
          </ul>
          <button className="mt-4 inline-flex items-center gap-2 text-xs text-accent hover:text-accent/80">
            <Users className="h-4 w-4" /> Invite member
          </button>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-brand-800 bg-brand-900/40 p-5 shadow-hard">
            <div className="flex items-center gap-3 text-neutral-400">
              <Key className="h-5 w-5 text-accent" />
              <p className="font-mono text-[11px] uppercase tracking-[0.38em]">api keys</p>
            </div>
            <p className="mt-4 text-sm text-neutral-300">Active keys: 4 • Last rotation 9d ago • Next required rotation in 21d.</p>
            <button className="mt-4 inline-flex items-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-4 py-2 text-xs font-medium text-accent hover:bg-accent/20">
              Rotate keys
            </button>
          </div>

          <div className="rounded-xl border border-brand-800 bg-brand-900/40 p-5 shadow-hard">
            <div className="flex items-center gap-3 text-neutral-400">
              <Layers className="h-5 w-5 text-accent" />
              <p className="font-mono text-[11px] uppercase tracking-[0.38em]">plan</p>
            </div>
            <p className="mt-4 text-sm text-neutral-300">Current tier: <span className="text-accent">Pro</span> • Renewal 01 Dec 2025 • Eligible for enterprise pricing.</p>
            <button className="mt-4 inline-flex items-center gap-2 text-xs text-accent hover:text-accent/80">
              Upgrade options
            </button>
          </div>

          <div className="rounded-xl border border-brand-800 bg-brand-900/40 p-5 shadow-hard">
            <div className="flex items-center gap-3 text-neutral-400">
              <Shield className="h-5 w-5 text-accent" />
              <p className="font-mono text-[11px] uppercase tracking-[0.38em]">compliance</p>
            </div>
            <p className="mt-4 text-sm text-neutral-300">Audit log exported nightly to S3://valora-audit/us-east-1. SOC2 readiness tracking at 78%.</p>
          </div>
        </div>
      </div>

      <DataPanel title="Access policies" subtitle="security">
        <p className="text-sm text-neutral-400">
          Enforce role-based scopes across valuation API, data exports, and webhook management. Field-level encryption for PII is applied at ingress.
        </p>
      </DataPanel>
    </div>
  );
};
