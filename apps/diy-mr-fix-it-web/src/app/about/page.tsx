const AboutPage = () => (
  <div className="bg-white py-16">
    <div className="mx-auto max-w-4xl px-4">
      <p className="text-sm font-semibold uppercase tracking-wide text-orange">About</p>
      <h1 className="mt-4 text-4xl font-bold text-navy">Meet Mr. Fix It</h1>
      <p className="mt-6 text-base text-slate-600">
        I&apos;m Jason, the voice behind Mr. Fix It and the founder of Loud Legacy. After 15+ years of
        rehabbing homes, leading commercial maintenance teams, and teaching weekend workshops, I wanted
        to build a friendly space where everyday people could learn the fundamentals of home upkeep.
      </p>
      <p className="mt-4 text-base text-slate-600">
        Mr. Fix It combines the straightforward advice you find in big box stores with the energy of
        creator-led tutorials. Every guide is tested in real homes, every tool recommendation is
        something I would hand to a friend, and every video is shot with a checklist so you can follow
        along without pausing every 10 seconds.
      </p>

      <section className="mt-12 rounded-3xl bg-light-gray p-8">
        <h2 className="text-2xl font-semibold text-navy">What we&apos;re building</h2>
        <ul className="mt-4 space-y-3 text-sm text-slate-600">
          <li>✔ A comprehensive DIY curriculum that saves you money on service calls</li>
          <li>✔ A toolbox builder that recommends smart upgrades based on what you already own</li>
          <li>✔ A community of DIYers who cheer each other on and swap tips</li>
          <li>✔ Partnerships with brands that elevate the home repair journey</li>
        </ul>
        <p className="mt-6 text-xs text-slate-500">
          Media or partnership inquiry? Submit the form below and our team will coordinate brand assets
          directly—no public downloads are available to keep the mark protected.
        </p>
      </section>

      <section id="contact" className="mt-12 rounded-3xl bg-navy p-8 text-white">
        <h2 className="text-2xl font-semibold">Contact &amp; partnerships</h2>
        <p className="mt-4 text-sm text-white/80">
          Let&apos;s collaborate on content, sponsorships, or media features. Fill out the form below and the
          Loud Legacy team will be in touch within two business days.
        </p>
        <form className="mt-6 grid gap-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full rounded-full border border-white/30 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-orange focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-full border border-white/30 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-orange focus:outline-none"
          />
          <textarea
            rows={4}
            placeholder="Tell us about your project or pitch"
            className="w-full rounded-3xl border border-white/30 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-orange focus:outline-none"
          />
          <button className="w-full rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90">
            Send message
          </button>
        </form>
        <p className="mt-6 text-xs text-white/60">
          Prefer email? Reach the team at hello@loudlegacy.com
        </p>
      </section>
    </div>
  </div>
);

export default AboutPage;
