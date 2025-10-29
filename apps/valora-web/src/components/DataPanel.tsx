import { ReactNode } from "react";

interface DataPanelProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  toolbar?: ReactNode;
}

export const DataPanel = ({ title, subtitle, children, toolbar }: DataPanelProps) => {
  return (
    <section className="rounded-2xl border border-brand-800 bg-surface/70 p-6 shadow-hard">
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.38em] text-neutral-500">{subtitle}</p>
          <h2 className="mt-2 text-xl font-semibold text-neutral-50">{title}</h2>
        </div>
        {toolbar}
      </header>
      <div className="space-y-4 text-sm text-neutral-300">{children}</div>
    </section>
  );
};
