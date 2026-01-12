import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-grid">
          <div className="footer-section footer-brand">
            <h3 className="footer-logo">Loud Legacy</h3>
            <p className="footer-tagline">
              Systems-driven business software that solves real operational problems.
            </p>
            <div className="footer-social">
              <a href="https://github.com/jkowitt" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Products</h4>
            <ul className="footer-links">
              <li><Link href="/valora">VALORA</Link></li>
              <li><Link href="/sportify">Sportify</Link></li>
              <li><Link href="/business-now">Business Now</Link></li>
              <li><Link href="/legacy-crm">Legacy CRM</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links">
              <li><Link href="/#philosophy">Philosophy</Link></li>
              <li><Link href="/#products">Our Products</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Resources</h4>
            <ul className="footer-links">
              <li><a href="https://github.com/jkowitt/loud-legacy" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Loud Legacy. All rights reserved.
          </p>
          <p className="footer-built">
            Built on systems, not shortcuts.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;