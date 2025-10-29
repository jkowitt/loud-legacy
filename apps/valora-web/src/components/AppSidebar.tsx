import { NavLink } from "react-router-dom";
import {
  BarChart3,
  Building2,
  CloudUpload,
  Settings,
  Wallet,
  GaugeCircle,
  Store,
  CreditCard,
  Info
} from "lucide-react";
import { clsx } from "clsx";

import { ValoraLogo } from "./ValoraLogo";

interface AppSidebarProps {
  currentPath: string;
}

const navItems = [
  { label: "Dashboard", path: "/", icon: GaugeCircle },
  { label: "Valuations", path: "/valuations", icon: Building2 },
  { label: "Marketplace", path: "/marketplace", icon: Store },
  { label: "Bulk Tools", path: "/bulk", icon: CloudUpload },
  { label: "Usage", path: "/usage", icon: BarChart3 },
  { label: "Plans", path: "/plans", icon: CreditCard },
  { label: "About", path: "/about", icon: Info },
  { label: "Admin", path: "/admin", icon: Settings }
];

export const AppSidebar = ({ currentPath }: AppSidebarProps) => {
  return (
    <aside className="relative hidden w-72 flex-col border-r border-brand-800 bg-surface px-6 py-8 shadow-xl shadow-brand-900/40 lg:flex">
      <div className="mb-12">
        <ValoraLogo />
        <p className="mt-3 pl-1 font-mono text-[11px] uppercase tracking-[0.38em] text-neutral-500">
          Command Console
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {navItems.map(({ label, path, icon: Icon }) => {
          const isActive = currentPath === path || (path !== "/" && currentPath.startsWith(path));
          return (
            <NavLink
              key={path}
              to={path}
              className={clsx(
                "group flex items-center gap-3 rounded-lg border border-transparent px-4 py-3 transition-all",
                "hover:border-brand-700 hover:bg-brand-900/30 hover:text-accent",
                isActive ? "border-brand-600 bg-brand-900/60 text-accent" : "text-neutral-300"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium tracking-wide">{label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-10 rounded-xl border border-brand-800 bg-brand-900/40 p-5 shadow-hard">
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-accent/60">status</p>
        <div className="mt-4 flex items-baseline justify-between">
          <span className="text-sm text-neutral-400">Realtime Valuations</span>
          <span className="text-lg font-semibold text-accent">156/min</span>
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-sm text-neutral-400">Model</span>
          <span className="text-base font-medium text-neutral-100">gbr_v2.4</span>
        </div>
        <div className="mt-6 flex items-center gap-2 text-xs text-neutral-500">
          <Wallet className="h-4 w-4" />
          <span>Usage at 63% of Pro quota</span>
        </div>
      </div>
    </aside>
  );
};
