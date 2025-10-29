import Link from "next/link";
import styles from "./Layout.module.css";

type LayoutProps = {
  children: React.ReactNode;
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/sponsors", label: "Sponsor Zones" },
  { href: "/account", label: "Account" },
  { href: "/health", label: "Operations" }
];

export function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.wrapper}>
      <aside className={styles.nav}>
        <div className={styles.brand}>
          <span className={styles.logoDot} />
          <span>SportsVR</span>
        </div>
        <nav className={styles.navList}>
          <ul className={styles.navItems}>
            {navLinks.map((link) => (
              <li key={link.href} className={styles.navItem}>
                <Link href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.footer}>
          <span className="badge">Beta</span>
          <p>Glass-to-glass under 1s. Check ops panel before go-live.</p>
        </div>
      </aside>
      <main className={styles.content}>{children}</main>
    </div>
  );
}
