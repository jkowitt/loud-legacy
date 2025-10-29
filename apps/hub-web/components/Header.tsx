import Link from "next/link";
import { brands } from "../lib/brands";

const navLinks = [
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Brands", href: "#brands" },
  { label: "Story", href: "/story" },
  { label: "Press", href: "/press" },
  { label: "Careers", href: "/careers" },
  { label: "Investor Room", href: "/investors" }
];

export function Header() {
  return (
    <header>
      <div className="navbar">
        <Link href="/" className="badge" aria-label="Loud Legacy home">
          Loud Legacy
        </Link>
        <nav className="navbar__links" aria-label="Primary">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href={`/${brands[0].slug}`} className="button button--primary">
          Launch App
        </Link>
      </div>
    </header>
  );
}
