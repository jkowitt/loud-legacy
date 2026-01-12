"use client";

import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (path: string) => pathname === path;
  const userRole = (session?.user as any)?.role;
  const userName = session?.user?.name || 'Demo User';
  const userEmail = session?.user?.email || 'demo@valora.com';

  return (
    <div className="dashboard-layout">
      <aside className={`dashboard-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <Link href="/dashboard" className="sidebar-logo">
            <span>{isCollapsed ? 'V' : 'VALORA'}</span>
          </Link>
          <button
            className="sidebar-toggle"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <span>{isCollapsed ? '→' : '←'}</span>
          </button>
        </div>

        <nav className="sidebar-nav">
          <Link
            href="/dashboard"
            className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}
            title="Dashboard"
          >
            <span className="nav-icon">📊</span>
            {!isCollapsed && <span className="nav-text">Dashboard</span>}
          </Link>

          <Link
            href="/dashboard/valuations"
            className={`nav-item ${isActive('/dashboard/valuations') ? 'active' : ''}`}
            title="Valuations"
          >
            <span className="nav-icon">💰</span>
            {!isCollapsed && <span className="nav-text">Valuations</span>}
          </Link>

          <Link
            href="/dashboard/properties"
            className={`nav-item ${isActive('/dashboard/properties') ? 'active' : ''}`}
            title="Properties"
          >
            <span className="nav-icon">🏢</span>
            {!isCollapsed && <span className="nav-text">Properties</span>}
          </Link>

          <Link
            href="/dashboard/ai-tools"
            className={`nav-item ${isActive('/dashboard/ai-tools') ? 'active' : ''}`}
            title="AI Tools"
          >
            <span className="nav-icon">🤖</span>
            {!isCollapsed && <span className="nav-text">AI Tools</span>}
          </Link>

          <div className="nav-divider"></div>
          <Link
            href="/dashboard/admin"
            className={`nav-item ${isActive('/dashboard/admin') ? 'active' : ''}`}
            title="Admin"
          >
            <span className="nav-icon">⚙️</span>
            {!isCollapsed && <span className="nav-text">Admin</span>}
          </Link>
        </nav>

        <div className="sidebar-footer">
          {!isCollapsed ? (
            <>
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
            </>
          ) : (
            <div className="user-info-collapsed">
              <div className="user-avatar" title={userName}>
                {userName[0]?.toUpperCase()}
              </div>
            </div>
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
