const Footer = () => (
  <footer className="bg-navy py-10 text-light-gray">
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 sm:grid-cols-3">
      <div>
        <p className="text-lg font-semibold text-white">Mr. Fix It</p>
        <p className="mt-2 text-sm">
          DIY guides, tool know-how, and pro tips that help you fix it right the first time.
        </p>
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-white">Stay Connected</p>
        <p className="mt-2 text-sm">
          Join the weekly fix tips newsletter for seasonal maintenance reminders, tool deals, and new
          tutorials.
        </p>
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-white">Follow</p>
        <ul className="mt-2 space-y-1 text-sm">
          <li>YouTube: @MrFixItDIY</li>
          <li>Instagram: @MrFixItHome</li>
          <li>TikTok: @MrFixItDIY</li>
        </ul>
      </div>
    </div>
    <div className="mt-8 border-t border-white/10 pt-4 text-center text-xs text-light-gray">
      © {new Date().getFullYear()} Loud Legacy. All rights reserved.
    </div>
  </footer>
);

export default Footer;
