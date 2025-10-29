import { ValoraLogo } from "./ValoraLogo";

export const AppTopBar = () => {
  return (
    <div className="flex w-full flex-wrap items-center gap-4">
      <div className="flex items-center gap-4">
        <ValoraLogo compact />
        <div className="hidden items-center gap-3 rounded-lg border border-brand-800 bg-brand-900/40 px-4 py-2 shadow-hard md:flex">
          <span className="font-mono text-xs uppercase tracking-[0.38em] text-neutral-400">Realtime Ops</span>
        </div>
      </div>
      <div className="ml-auto flex max-w-lg flex-1 items-center gap-4">
        <div className="relative flex flex-1 items-center">
          <input
            placeholder="Search valuations, assets, tenants"
            className="h-11 w-full rounded-lg border border-brand-800 bg-surface-subtle pl-4 pr-4 text-sm text-neutral-100 placeholder:text-neutral-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>
        <button className="relative flex h-11 w-11 items-center justify-center rounded-lg border border-brand-800 bg-brand-900/30 text-neutral-300 transition hover:text-accent">
          <span className="sr-only">Notifications</span>
        </button>
      </div>
    </div>
  );
};
