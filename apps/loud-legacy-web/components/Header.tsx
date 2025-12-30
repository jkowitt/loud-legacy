"use client";

import Link from "next/link";
import { brandUrl } from "@/lib/brandLinks";
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
          <a href={brandUrl("valora")} target="_blank" rel="noopener noreferrer">VALORA</a>
          <a href={brandUrl("venuevr")} target="_blank" rel="noopener noreferrer">VenueVR</a>
          <a href={brandUrl("business")} target="_blank" rel="noopener noreferrer">Business Now</a>
          <a href={brandUrl("diy")} target="_blank" rel="noopener noreferrer">DIY</a>
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
