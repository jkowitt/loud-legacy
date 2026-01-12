"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header-content">
        <Link href="/" className="logo">
          <span>🔥 Loud Legacy</span>
        </Link>
        
        <nav className={`nav ${isOpen ? 'open' : ''}`}>
          <Link href="/">Home</Link>
          <Link href="/valora">VALORA</Link>
          <Link href="/sportify">Sportify</Link>
          <Link href="/business-now">Business Now</Link>
          <Link href="/legacy-crm">Legacy CRM</Link>
        </nav>

        <button 
          className="menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>
    </header>
  );
}
