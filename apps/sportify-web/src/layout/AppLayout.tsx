import { Outlet, NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Radio,
  FolderOpen,
  Users,
  Handshake,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/events", icon: Calendar, label: "Events" },
  { to: "/assets", icon: FolderOpen, label: "Assets" },
  { to: "/sponsors", icon: Handshake, label: "Sponsors" },
  { to: "/team", icon: Users, label: "Team" },
];

export function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isLiveView = location.pathname.startsWith("/live/");

  if (isLiveView) {
    return <Outlet />;
  }

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-[#1a1625] transition-transform md:relative md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600">
                <Radio className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold tracking-wide">Sportify</span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-neutral-400 md:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-8 flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-brand-600/20 text-accent"
                      : "text-neutral-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto">
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-neutral-500 transition hover:bg-white/5 hover:text-white">
              <LogOut className="h-5 w-5" />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-surface/95 px-4 py-4 backdrop-blur md:px-8">
          <button
            onClick={() => setMobileOpen(true)}
            className="text-neutral-400 md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="hidden md:block" />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 rounded-full bg-white/5 px-4 py-2">
              <div className="h-8 w-8 rounded-full bg-brand-600 text-center text-sm font-semibold leading-8 text-white">
                JK
              </div>
              <span className="hidden text-sm font-medium md:block">Jason K.</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
