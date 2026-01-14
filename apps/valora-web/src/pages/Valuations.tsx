import { Download, Map, RefreshCw } from "lucide-react";

import { DataPanel } from "../components/DataPanel";
import { TrendPill } from "../components/TrendPill";

const rows = [
  {
    id: "val_01H7X",
    address: "123 Main St, DeKalb, IL",
    est: "$245,000",
    conf: "0.82",
    model: "gbr_v2.4",
    updated: "2m ago"
  },
  {
    id: "val_01H7Y",
    address: "56 Birch Ln, Naperville, IL",
    est: "$612,500",
    conf: "0.88",
    model: "gbr_v2.4",
    updated: "5m ago"
  },
  {
    id: "val_01H7Z",
    address: "87 Aspen Ct, Aurora, IL",
    est: "$410,200",
    conf: "0.79",
    model: "gbr_v2.5",
    updated: "7m ago"
  }
];

export const ValuationsPage = () => {
  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-neutral-500">single valuation</p>
          <h1 className="mt-2 text-2xl font-semibold text-neutral-100">Residential pipeline</h1>
          <p className="mt-2 max-w-xl text-sm text-neutral-400">
            Run instant valuations, view model explainability, and export reports. Cache hits display in <span className="text-accent">accent</span>.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-brand-800 bg-brand-900/40 px-4 py-2 text-sm text-neutral-200 hover:text-accent">
            <RefreshCw className="h-4 w-4" />
            Sync MLS feed
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/20">
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>
      </header>

      <div className="overflow-x-auto rounded-2xl border border-brand-800 bg-surface/60 shadow-hard">
        <table className="w-full min-w-[640px] text-left text-sm text-neutral-300">
          <thead className="font-mono text-[11px] uppercase tracking-[0.35em] text-neutral-500">
            <tr className="border-b border-brand-800/60">
              <th className="px-6 py-4">Valuation ID</th>
              <th className="px-6 py-4">Address</th>
              <th className="px-6 py-4">Estimate</th>
              <th className="px-6 py-4">Confidence</th>
              <th className="px-6 py-4">Model</th>
              <th className="px-6 py-4">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-800/40">
            {rows.map((row) => (
              <tr key={row.id} className="transition hover:bg-brand-900/30">
                <td className="px-6 py-4 font-mono text-xs text-accent/80">{row.id}</td>
                <td className="px-6 py-4">
                  <div className="text-sm text-neutral-100">{row.address}</div>
                  <div className="text-xs text-neutral-500">3 comps | cap rate 5.8%</div>
                </td>
                <td className="px-6 py-4 text-neutral-100">{row.est}</td>
                <td className="px-6 py-4">
                  <TrendPill trend={parseFloat(row.conf) > 0.85 ? "up" : "neutral"} value={row.conf} />
                </td>
                <td className="px-6 py-4 text-neutral-400">{row.model}</td>
                <td className="px-6 py-4 text-neutral-500">{row.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DataPanel title="Explainability Snapshot" subtitle="comparable" toolbar={<button className="text-xs text-accent">Open map <Map className="ml-2 inline h-3 w-3" /></button>}>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg border border-brand-800/60 bg-brand-900/40 p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-500">Features</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center justify-between">
                <span>Living area sqft</span>
                <span className="text-accent">+0.31</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Year built</span>
                <span className="text-accent">+0.12</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Condition score</span>
                <span className="text-warning">+0.07</span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg border border-brand-800/60 bg-brand-900/40 p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-500">Top comps</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center justify-between text-neutral-200">
                <span>129 Main St</span>
                <span>$240,000</span>
              </li>
              <li className="flex items-center justify-between text-neutral-200">
                <span>98 Pine Ave</span>
                <span>$251,000</span>
              </li>
            </ul>
          </div>
        </div>
      </DataPanel>
    </div>
  );
};
