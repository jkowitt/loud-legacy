"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

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
        <Link href="/" className="logo">
          Loud Legacy
        </Link>

        <nav className={`nav ${isOpen ? 'open' : ''}`}>
          <Link href="/valora" className="nav-link">VALORA</Link>
          <Link href="/sportify" className="nav-link">Sportify</Link>
          <Link href="/business-now" className="nav-link">Business Now</Link>
          <Link href="/legacy-crm" className="nav-link">Legacy CRM</Link>
        </nav>

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
