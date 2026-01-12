"use client";

import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const userRole = (session?.user as any)?.role;
  const userName = session?.user?.name || 'Demo User';
  const userEmail = session?.user?.email || 'demo@valora.com';

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <Link href="/dashboard" className="sidebar-logo">
            <span>VALORA</span>
          </Link>
        </div>

        <nav className="sidebar-nav">
          <Link
            href="/dashboard"
            className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}
          >
            <span>📊</span>
            <span>Dashboard</span>
          </Link>

          <Link
            href="/dashboard/valuations"
            className={`nav-item ${isActive('/dashboard/valuations') ? 'active' : ''}`}
          >
            <span>💰</span>
            <span>Valuations</span>
          </Link>

          <Link
            href="/dashboard/properties"
            className={`nav-item ${isActive('/dashboard/properties') ? 'active' : ''}`}
          >
            <span>🏢</span>
            <span>Properties</span>
          </Link>

          <Link
            href="/dashboard/ai-tools"
            className={`nav-item ${isActive('/dashboard/ai-tools') ? 'active' : ''}`}
          >
            <span>🤖</span>
            <span>AI Tools</span>
          </Link>

          <div className="nav-divider"></div>
          <Link
            href="/dashboard/admin"
            className={`nav-item ${isActive('/dashboard/admin') ? 'active' : ''}`}
          >
            <span>⚙️</span>
            <span>Admin</span>
          </Link>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              {userName[0]?.toUpperCase()}
            </div>
            <div className="user-details">
              <div className="user-name">{userName}</div>
              <div className="user-email">{userEmail}</div>
            </div>
          </div>
          {session ? (
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="sign-out-btn"
            >
              Sign Out
            </button>
          ) : (
            <Link href="/auth/signin" className="sign-out-btn" style={{ textAlign: 'center', display: 'block', textDecoration: 'none' }}>
              Sign In
            </Link>
          )}
        </div>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-content">
          {children}
        </div>
      </main>
    </div>
  );
}
