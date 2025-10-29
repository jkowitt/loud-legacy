import { ReactNode } from "react";
import { clsx } from "clsx";

interface MetricCardProps {
  title: string;
  value: string;
  description?: string;
  icon?: ReactNode;
  highlight?: ReactNode;
}

export const MetricCard = ({ title, value, description, icon, highlight }: MetricCardProps) => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-brand-800 bg-surface-elevated/80 p-6 shadow-hard">
      <div className="absolute inset-0 -z-10 bg-grain-overlay opacity-80" aria-hidden />
      <div className="flex items-center gap-3 text-neutral-400">
        {icon}
        <p className="font-mono text-xs uppercase tracking-[0.4em]">{title}</p>
      </div>
      <div className="mt-5 flex items-baseline gap-4">
        <p className="text-3xl font-semibold text-neutral-50">{value}</p>
        {highlight}
      </div>
      {description && <p className="mt-4 text-sm text-neutral-400">{description}</p>}
    </div>
  );
};
