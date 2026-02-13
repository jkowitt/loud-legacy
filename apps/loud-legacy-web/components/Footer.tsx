import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="footer rally-footer">
      <div className="container footer-content">
        <div className="footer-grid">
          <div className="footer-section footer-brand">
            <Image
              src="/logos/rally-white.png"
              alt="Rally"
              width={100}
              height={30}
              className="footer-rally-logo"
            />
            <p className="footer-tagline">
              The gameday experience platform built for collegiate athletics.
            </p>
            <p className="footer-vw">
              Built by Van Wagner Sports & Entertainment
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Platform</h4>
            <ul className="footer-links">
              <li><Link href="/#features">Features</Link></li>
              <li><Link href="/#schools">Schools</Link></li>
              <li><Link href="/#how-it-works">How It Works</Link></li>
              <li><Link href="/dashboard">Dashboard</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Legal</h4>
            <ul className="footer-links">
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Rally by Van Wagner. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
