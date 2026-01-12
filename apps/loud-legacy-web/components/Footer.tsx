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
              <li><Link href="mailto:hello@loud-legacy.com">Contact</Link></li>
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