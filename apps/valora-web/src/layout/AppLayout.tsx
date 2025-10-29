import { useMemo } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  AppShell,
  type AppShellNavItem
} from "@loud-legacy/shared-design-system";
import {
  BarChart3,
  Building2,
  CloudUpload,
  CreditCard,
  GaugeCircle,
  Info,
  Settings,
  Store,
  Wallet
} from "lucide-react";

import { AppTopBar } from "../components/AppTopBar";

const NAVIGATION = [
  { label: "Dashboard", path: "/", icon: GaugeCircle },
  { label: "Valuations", path: "/valuations", icon: Building2 },
  { label: "Marketplace", path: "/marketplace", icon: Store },
  { label: "Bulk Tools", path: "/bulk", icon: CloudUpload },
  { label: "Usage", path: "/usage", icon: BarChart3 },
  { label: "Plans", path: "/plans", icon: CreditCard },
  { label: "About", path: "/about", icon: Info },
  { label: "Admin", path: "/admin", icon: Settings }
];

const statusCard = (
  <div className="rounded-xl border border-brand-800 bg-brand-900/40 p-5 shadow-hard">
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
);

export const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = useMemo<AppShellNavItem[]>(
    () =>
      NAVIGATION.map(({ label, path, icon: Icon }) => ({
        label,
        onSelect: () => navigate(path),
        active: path === "/" ? location.pathname === "/" : location.pathname.startsWith(path),
        icon: <Icon className="h-5 w-5" />
      })),
    [location.pathname, navigate]
  );

  return (
    <AppShell
      brandName="VALORA"
      navItems={navItems}
      user={{ name: "Jordan Diaz", email: "ops@valora.ai" }}
      topActions={<AppTopBar />}
      sidebarFooter={statusCard}
    >
      <Outlet />
    </AppShell>
  );
};
