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
          <Link href="/venuevr">VenueVR</Link>
          <Link href="/business-now">Business Now</Link>
          <Link href="/diy">DIY</Link>
          <Link href="/(hub)/contact">Contact</Link>
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
