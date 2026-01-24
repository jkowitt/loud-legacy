"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const productLogos = [
  { href: "/valora", src: "/logos/valora.svg", name: "VALORA", alt: "VALORA - Real Estate Intelligence" },
  { href: "/sportify", src: "/logos/sportify.svg", name: "Sportify", alt: "Sportify - Event Management" },
  { href: "/business-now", src: "/logos/business-now.svg", name: "Business Now", alt: "Business Now - Operations" },
  { href: "/legacy-crm", src: "/logos/legacy-crm.svg", name: "Legacy CRM", alt: "Legacy CRM - Relationship Management" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-content">
        <Link href="/" className="logo" aria-label="Loud Legacy Home">
          <Image
            src="/logos/loud-legacy.svg"
            alt="Loud Legacy"
            width={140}
            height={40}
            className="logo-image"
            priority
          />
        </Link>

        <nav className={`nav ${isOpen ? 'open' : ''}`}>
          <a href="https://loud-legacy.com" className="nav-link nav-link--home">
            Home
          </a>
          <div className="nav-group">
            <span className="nav-label">Products</span>
            <div className="nav-dropdown nav-dropdown--logos">
              {productLogos.map((product) => (
                <Link
                  key={product.href}
                  href={product.href}
                  className="nav-link nav-link--logo"
                  aria-label={product.alt}
                >
                  <Image
                    src={product.src}
                    alt={product.alt}
                    width={120}
                    height={40}
                    className="nav-logo-image"
                  />
                </Link>
              ))}
            </div>
          </div>
          <Link href="/pricing" className="nav-link">Pricing</Link>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/blog" className="nav-link">Blog</Link>
        </nav>

        <div className="header-actions">
          <Link href="/auth/signin" className="nav-link">Sign In</Link>
          <Link href="/contact" className="button button--primary button--small">
            Request Demo
          </Link>
        </div>

        <button
          className="menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isOpen ? 'open' : ''}`}></span>
        </button>
      </div>
    </header>
  );
}
