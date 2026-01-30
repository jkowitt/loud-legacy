import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-grid">
          <div className="footer-section footer-brand">
            <h3 className="footer-logo">Legacy RE</h3>
            <p className="footer-tagline">
              AI-powered real estate intelligence. Built to Last.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Platform</h4>
            <ul className="footer-links">
              <li><Link href="/valora">Legacy RE</Link></li>
              <li><Link href="/valora/dashboard">Dashboard</Link></li>
              <li><Link href="/valora/marketplace">Marketplace</Link></li>
              <li><Link href="/valora/brokers">Broker Portal</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Legal</h4>
            <ul className="footer-links">
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/payments">Payments & Billing</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Loud Legacy. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/payments">Billing</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
