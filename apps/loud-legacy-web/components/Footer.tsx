"use client";

import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <div>
          <h4>Loud Legacy</h4>
          <Link href="/">Home</Link>
          <Link href="/(hub)/story">Story</Link>
          <Link href="/(hub)/careers">Careers</Link>
        </div>
        
        <div>
          <h4>Products</h4>
          <Link href="/valora">VALORA</Link>
          <Link href="/venuevr">VenueVR</Link>
          <Link href="/business-now">Business Now</Link>
          <Link href="/diy">DIY Mr Fix It</Link>
        </div>
        
        <div>
          <h4>Resources</h4>
          <Link href="/(hub)/contact">Contact</Link>
          <Link href="/(hub)/investors">Investors</Link>
          <a href="https://github.com/jkowitt/loud-legacy" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>

        <div>
          <h4>Legal</h4>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/sitemap">Sitemap</a>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} Loud Legacy. All rights reserved.</p>
      </div>
    </footer>
  );
}
