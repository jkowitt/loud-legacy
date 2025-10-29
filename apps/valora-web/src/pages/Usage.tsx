import { AreaChart, CreditCard, GaugeCircle } from "lucide-react";

import { DataPanel } from "../components/DataPanel";
import { MetricCard } from "../components/MetricCard";
import { TrendPill } from "../components/TrendPill";

const usageRows = [
  { feature: "valuation.single", included: 3000, consumed: 1896, overage: 0, cost: "$0" },
  { feature: "valuation.bulk", included: 1000, consumed: 742, overage: 0, cost: "$0" },
  { feature: "comps.search", included: 8000, consumed: 6112, overage: 0, cost: "$0" }
];

export const UsagePage = () => {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-3">
        <MetricCard
          title="Quota"
          value="63%"
          description="Current month usage across all billable features."
          icon={<GaugeCircle className="h-4 w-4 text-accent" />}
          highlight={<TrendPill trend="neutral" value="Resets in 04d" />}
        />
        <MetricCard
          title="Overage"
          value="$0"
          description="Pro plan includes 3k valuations / month."
          icon={<CreditCard className="h-4 w-4 text-accent" />}
          highlight={<TrendPill trend="up" value="Auto top-up ready" />}
        />
        <MetricCard
          title="Webhooks"
          value="12"
          description="Active tenant endpoints receiving usage events."
          icon={<AreaChart className="h-4 w-4 text-accent" />}
          highlight={<TrendPill trend="up" value="+3 this week" />}
        />
      </div>

      <div className="rounded-2xl border border-brand-800 bg-surface/70 shadow-hard">
        <table className="w-full text-left text-sm text-neutral-300">
          <thead className="font-mono text-[11px] uppercase tracking-[0.35em] text-neutral-500">
            <tr className="border-b border-brand-800/60">
              <th className="px-6 py-4">Feature</th>
              <th className="px-6 py-4">Included</th>
              <th className="px-6 py-4">Consumed</th>
              <th className="px-6 py-4">Overage</th>
              <th className="px-6 py-4">Cost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-800/40">
            {usageRows.map((row) => (
              <tr key={row.feature} className="transition hover:bg-brand-900/30">
                <td className="px-6 py-4 text-neutral-100">{row.feature}</td>
                <td className="px-6 py-4">{row.included}</td>
                <td className="px-6 py-4 text-accent">{row.consumed}</td>
                <td className="px-6 py-4 text-warning">{row.overage}</td>
                <td className="px-6 py-4">{row.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DataPanel title="Cost controls" subtitle="billing">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-brand-800/60 bg-brand-900/40 p-4">
            <p className="text-sm font-semibold text-neutral-100">Auto top-up</p>
            <p className="mt-1 text-xs text-neutral-400">Notify at 80% quota, auto-purchase 500 valuation blocks.</p>
          </div>
          <div className="rounded-lg border border-brand-800/60 bg-brand-900/40 p-4">
            <p className="text-sm font-semibold text-neutral-100">Usage webhooks</p>
            <p className="mt-1 text-xs text-neutral-400">Send to finance.billing@atlas with daily rollups.</p>
          </div>
        </div>
      </DataPanel>
    </div>
  );
};
