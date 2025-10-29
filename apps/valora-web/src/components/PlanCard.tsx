import { ReactNode } from "react";
import { clsx } from "clsx";

interface PlanCardProps {
  name: string;
  price: string;
  cadence: "monthly" | "annual" | "custom";
  description: string;
  features: string[];
  highlight?: boolean;
  cta?: ReactNode;
}

export const PlanCard = ({
  name,
  price,
  cadence,
  description,
  features,
  highlight = false,
  cta
}: PlanCardProps) => {
  return (
    <div
      className={clsx(
        "flex h-full flex-col gap-6 rounded-2xl border px-6 py-7 shadow-hard transition",
        highlight
          ? "border-accent/50 bg-accent/10 text-neutral-50"
          : "border-brand-800 bg-surface/70 hover:border-accent/30"
      )}
    >
      <div>
        <p className="text-lg font-semibold tracking-wide text-neutral-100">{name}</p>
        <p className="mt-2 text-sm text-neutral-400">{description}</p>
        <div className="mt-5 flex items-baseline gap-2">
          <span className="text-3xl font-semibold text-accent">{price}</span>
          <span className="text-xs uppercase tracking-[0.35em] text-neutral-500">{cadence}</span>
        </div>
      </div>
      <ul className="space-y-2 text-sm text-neutral-300">
        {features.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {cta && <div className="mt-auto">{cta}</div>}
    </div>
  );
};
