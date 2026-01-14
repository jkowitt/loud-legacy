import type { ReactNode } from "react";

type MetricCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
};

export function MetricCard({ title, value, subtitle, icon, trend, trendValue }: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-neutral-400">{title}</p>
        {icon && <div className="text-accent">{icon}</div>}
      </div>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
      <div className="mt-2 flex items-center gap-2">
        {trend && trendValue && (
          <span
            className={`text-xs font-medium ${
              trend === "up" ? "text-green-400" : trend === "down" ? "text-red-400" : "text-neutral-400"
            }`}
          >
            {trend === "up" ? "+" : trend === "down" ? "-" : ""}
            {trendValue}
          </span>
        )}
        {subtitle && <span className="text-xs text-neutral-500">{subtitle}</span>}
      </div>
    </div>
  );
}
