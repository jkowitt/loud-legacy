import { Activity, BarChart3, Cog, Zap } from "lucide-react";

import { DataPanel } from "../components/DataPanel";
import { MetricCard } from "../components/MetricCard";
import { TrendPill } from "../components/TrendPill";
import { useCommercialSales, useInterestRates, useResidentialSales } from "../hooks/useDataFeeds";

const mockAlerts = [
  {
    id: "alert-1",
    title: "Cook County parcel feed",
    detail: "Latency recovered after 6m backlog. Auto backfill complete.",
    timestamp: "12:41Z",
    severity: "info"
  },
  {
    id: "alert-2",
    title: "Model challenger",
    detail: "gbr_v2.5 shadowing at 15% traffic. Drift < 1.2%",
    timestamp: "12:16Z",
    severity: "success"
  }
];

const mockActivity = [
  {
    tenant: "Atlas Capital",
    action: "Bulk valuation job completed",
    count: "245 assets",
    time: "11:58Z"
  },
  {
    tenant: "Northwind Lending",
    action: "New webhook registered",
    count: "valuation.completed",
    time: "11:32Z"
  },
  {
    tenant: "Hilo Bank",
    action: "Plan upgraded",
    count: "Starter → Pro",
    time: "10:51Z"
  }
];

export const DashboardPage = () => {
  const { data: rateData } = useInterestRates();
  const { data: residentialSales } = useResidentialSales();
  const { data: commercialSales } = useCommercialSales();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Valuations"
          value="312"
          description="Last 60 minutes across active tenants."
          icon={<Zap className="h-4 w-4 text-accent" />}
          highlight={<TrendPill trend="up" value="+18% vs yesterday" />}
        />
        <MetricCard
          title="Median Error"
          value="3.8%"
          description="Validated against MLS test set (P50)."
          icon={<BarChart3 className="h-4 w-4 text-accent" />}
          highlight={<TrendPill trend="down" value="-0.4 pts" />}
        />
        <MetricCard
          title="Cache Hit"
          value="72%"
          description="Responses < 800ms from edge cache."
          icon={<Activity className="h-4 w-4 text-accent" />}
          highlight={<TrendPill trend="up" value="+6 pts" />}
        />
        <MetricCard
          title="Data Freshness"
          value="19h"
          description="Oldest public record ingested across active states."
          icon={<Cog className="h-4 w-4 text-accent" />}
          highlight={<TrendPill trend="neutral" value="On target" />}
        />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        <DataPanel title="Live Alerts" subtitle="systems" toolbar={<span className="text-xs text-accent/70">Auto-resolve ON</span>}>
          <div className="space-y-4">
            {mockAlerts.map((alert) => (
              <div key={alert.id} className="rounded-lg border border-brand-800/60 bg-brand-900/40 p-4">
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span>{alert.timestamp}</span>
                  <span className="font-mono uppercase tracking-[0.3em] text-accent/70">{alert.severity}</span>
                </div>
                <p className="mt-2 text-sm font-semibold text-neutral-100">{alert.title}</p>
                <p className="mt-1 text-sm text-neutral-400">{alert.detail}</p>
              </div>
            ))}
          </div>
        </DataPanel>

        <DataPanel
          title="Recent Activity"
          subtitle="tenants"
          toolbar={<button className="text-xs text-accent hover:text-accent/80">View all</button>}
        >
          <ul className="divide-y divide-brand-800/60">
            {mockActivity.map((item) => (
              <li key={item.tenant} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-neutral-200">{item.tenant}</p>
                  <p className="text-xs text-neutral-500">{item.action}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-accent/80">{item.count}</p>
                  <p className="text-[11px] text-neutral-500">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </DataPanel>

        <DataPanel title="Model Rollout" subtitle="ml ops">
          <div className="rounded-xl border border-brand-800/70 bg-brand-900/30 p-4">
            <div className="flex items-center justify-between text-xs text-neutral-500">
              <span>Champion</span>
              <span>gbr_v2.4</span>
            </div>
            <div className="mt-3 h-2 w-full rounded-full bg-brand-800">
              <div className="h-full w-[85%] rounded-full bg-accent" />
            </div>
            <p className="mt-4 text-xs text-neutral-400">Shadow challenger gbr_v2.5 currently at 15% traffic, uplift +1.3% MAPe.</p>
          </div>
        </DataPanel>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_3fr]">
        <DataPanel title="Market pulse" subtitle="rates">
          <div className="grid gap-3 text-sm text-neutral-300">
            <div className="flex items-center justify-between">
              <span>Fed Funds Target</span>
              <span className="text-accent">{rateData?.rates?.fed_funds_target ?? "--"}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>30yr Mortgage</span>
              <span className="text-accent">{rateData?.rates?.thirty_year_mortgage ?? "--"}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Prime Rate</span>
              <span className="text-accent">{rateData?.rates?.prime_rate ?? "--"}%</span>
            </div>
          </div>
          <p className="mt-4 text-xs text-neutral-500">Last updated {rateData?.timestamp ?? "N/A"}</p>
        </DataPanel>
        <DataPanel title="Sales snapshot" subtitle="res & commercial">
          <div className="grid gap-4 md:grid-cols-2 text-sm text-neutral-300">
            <div className="rounded-lg border border-brand-800/60 bg-brand-900/30 p-4">
              <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">Residential ({residentialSales?.period ?? "--"})</p>
              <p className="mt-3 text-neutral-100">Median price {residentialSales ? `$${residentialSales.median_price.toLocaleString()}` : "--"}</p>
              <p className="text-xs text-neutral-500">Median days on market {residentialSales?.median_days_on_market ?? "--"}</p>
            </div>
            <div className="rounded-lg border border-brand-800/60 bg-brand-900/30 p-4">
              <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">Commercial ({commercialSales?.period ?? "--"})</p>
              <p className="mt-3 text-neutral-100">Volume {commercialSales ? `$${(commercialSales.total_volume / 1_000_000_000).toFixed(1)}B` : "--"}</p>
              <p className="text-xs text-neutral-500">Median cap rate {commercialSales?.median_cap_rate ?? "--"}%</p>
            </div>
          </div>
        </DataPanel>
      </div>
    </div>
  );
};
