import type { ReactNode, CSSProperties } from "react";
import { useState, useEffect } from "react";

export type AppShellNavItem = {
  label: string;
  href?: string;
  icon?: ReactNode;
  badge?: string;
  active?: boolean;
  onSelect?: () => void;
};

export type AppShellProps = {
  brandName: string;
  navItems: AppShellNavItem[];
  children: ReactNode;
  user?: {
    name: string;
    email?: string;
    avatarUrl?: string;
  };
  topActions?: ReactNode;
  sidebarFooter?: ReactNode;
  onSignOut?: () => void;
};

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

const baseContainer: CSSProperties = {
  display: "grid",
  minHeight: "100vh",
  backgroundColor: "var(--color-surface-base)",
  color: "var(--color-text-primary)",
  fontFamily: "var(--font-family-sans)"
};

const sidebarStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  borderRight: "1px solid var(--color-border-subtle)",
  padding: "var(--space-6)",
  gap: "var(--space-6)",
  background: "var(--color-surface-raised)"
};

const navListStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-2)"
};

const navButtonStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "var(--space-3)",
  padding: "var(--space-3) var(--space-4)",
  borderRadius: "var(--radius-md)",
  border: "1px solid transparent",
  fontWeight: 500,
  background: "transparent",
  color: "inherit",
  cursor: "pointer",
  textDecoration: "none",
  transition: "background var(--motion-duration-fast) var(--motion-curve-standard), border var(--motion-duration-fast) var(--motion-curve-standard)"
};

const navButtonActive: CSSProperties = {
  background: "rgba(136, 255, 199, 0.1)",
  borderColor: "var(--color-brand-primary-600)",
  color: "var(--color-brand-accent-500)"
};

const mainStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh"
};

const topBarStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "var(--space-4) var(--space-6)",
  borderBottom: "1px solid var(--color-border-subtle)",
  background: "var(--color-surface-raised)",
  position: "sticky",
  top: 0,
  zIndex: 10
};

const userChipStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "var(--space-3)",
  padding: "var(--space-2) var(--space-3)",
  borderRadius: "var(--radius-pill)",
  background: "var(--color-surface-overlay)",
  border: "1px solid var(--color-border-subtle)"
};

const avatarStyle: CSSProperties = {
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  background: "var(--color-brand-primary-600)",
  color: "#fff",
  display: "grid",
  placeItems: "center",
  fontSize: "0.875rem",
  fontWeight: 600
};

const contentStyle: CSSProperties = {
  flex: 1,
  padding: "var(--space-8)",
  background: "var(--color-surface-base)"
};

const menuIconStyle: CSSProperties = {
  background: "transparent",
  border: "none",
  color: "var(--color-text-primary)",
  cursor: "pointer",
  padding: "var(--space-2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const overlayStyle: CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  zIndex: 40
};

const mobileSidebarStyle: CSSProperties = {
  ...sidebarStyle,
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  width: "280px",
  zIndex: 50,
  transform: "translateX(0)"
};

export function AppShell({
  brandName,
  navItems,
  children,
  user,
  topActions,
  sidebarFooter,
  onSignOut
}: AppShellProps) {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderNavItem = (item: AppShellNavItem) => {
    const commonProps = {
      style: {
        ...navButtonStyle,
        ...(item.active ? navButtonActive : null)
      },
      onClick: () => {
        if (isMobile) setSidebarOpen(false);
        item.onSelect?.();
      }
    } as const;

    const content = (
      <>
        {item.icon ? <span style={{ display: "inline-flex" }}>{item.icon}</span> : null}
        <span>{item.label}</span>
        {item.badge ? (
          <span
            style={{
              marginLeft: "auto",
              fontSize: "0.75rem",
              padding: "0 var(--space-2)",
              borderRadius: "var(--radius-pill)",
              background: "rgba(136, 255, 199, 0.2)",
              color: "var(--color-brand-accent-500)"
            }}
          >
            {item.badge}
          </span>
        ) : null}
      </>
    );

    if (item.href) {
      return (
        <a key={item.label} href={item.href} {...commonProps}>
          {content}
        </a>
      );
    }

    return (
      <button key={item.label} type="button" {...commonProps}>
        {content}
      </button>
    );
  };

  const sidebarContent = (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <strong style={{ fontSize: "1.1rem", letterSpacing: "0.04em" }}>{brandName}</strong>
        {isMobile && (
          <button type="button" onClick={() => setSidebarOpen(false)} style={menuIconStyle} aria-label="Close menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      <nav aria-label="Primary navigation" style={navListStyle}>
        {navItems.map(renderNavItem)}
      </nav>
      <div style={{ marginTop: "auto", display: "grid", gap: "var(--space-4)" }}>
        {sidebarFooter}
      </div>
    </>
  );

  return (
    <div style={{ ...baseContainer, gridTemplateColumns: isMobile ? "1fr" : "260px 1fr" }}>
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div style={overlayStyle} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar - fixed on mobile, static on desktop */}
      {isMobile ? (
        sidebarOpen && <aside style={mobileSidebarStyle}>{sidebarContent}</aside>
      ) : (
        <aside style={sidebarStyle}>{sidebarContent}</aside>
      )}

      <div style={mainStyle}>
        <header style={topBarStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
            {isMobile && (
              <button type="button" onClick={() => setSidebarOpen(true)} style={menuIconStyle} aria-label="Open menu">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              </button>
            )}
            {topActions}
          </div>
          {user ? (
            <div style={userChipStyle}>
              <div style={avatarStyle}>{user.avatarUrl ? <img src={user.avatarUrl} alt={user.name} style={{ width: "100%", height: "100%", borderRadius: "50%" }} /> : user.name.slice(0, 2).toUpperCase()}</div>
              {!isMobile && (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontWeight: 600 }}>{user.name}</span>
                  {user.email ? (
                    <span style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>{user.email}</span>
                  ) : null}
                </div>
              )}
              {onSignOut ? (
                <button
                  type="button"
                  onClick={onSignOut}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--color-text-secondary)",
                    cursor: "pointer",
                    fontSize: "0.75rem"
                  }}
                >
                  Sign out
                </button>
              ) : null}
            </div>
          ) : null}
        </header>
        <main style={{ ...contentStyle, padding: isMobile ? "var(--space-4)" : "var(--space-8)" }}>{children}</main>
      </div>
    </div>
  );
}
