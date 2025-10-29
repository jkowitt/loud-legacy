import Link from "next/link";

const Hero = () => (
  <section className="bg-white">
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:flex-row md:items-center">
      <div className="space-y-6 md:w-1/2">
        <span className="inline-flex items-center rounded-full bg-orange/10 px-4 py-1 text-sm font-semibold text-orange">
          Home Depot meets YouTube
        </span>
        <h1 className="text-4xl font-bold text-navy md:text-5xl">
          Fix it yourself — the right way, the first time.
        </h1>
        <p className="text-lg text-slate-600">
          Guides, videos, and tool picks that help you tackle everyday home repairs with confidence.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/project-library"
            className="rounded-full bg-orange px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            Browse Repairs
          </Link>
          <Link
            href="/shop"
            className="rounded-full border border-navy px-6 py-3 font-semibold text-navy transition hover:bg-light-gray"
          >
            Shop Tools
          </Link>
          <Link
            href="/videos"
            className="rounded-full px-6 py-3 font-semibold text-navy underline-offset-4 transition hover:underline"
          >
            Watch Tutorials
          </Link>
        </div>
        <form className="flex flex-col gap-2 sm:flex-row">
          <input
            type="email"
            className="w-full rounded-full border border-slate-200 px-4 py-3 text-sm focus:border-orange focus:outline-none"
            placeholder="Enter your email for Weekly Fix Tips"
          />
          <button
            type="submit"
            className="rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Join the List
          </button>
        </form>
      </div>
      <div className="md:w-1/2">
        <div className="relative overflow-hidden rounded-3xl bg-navy p-6 text-white shadow-lg">
          <p className="text-sm uppercase tracking-widest text-orange">Seasonal spotlight</p>
          <h2 className="mt-3 text-2xl font-semibold">Ready your home for summer storms</h2>
          <p className="mt-2 text-sm text-white/80">
            Learn how to seal windows, test sump pumps, and protect outdoor outlets before the next
            rainfall.
          </p>
          <div className="mt-6 flex flex-col gap-3 text-sm">
            <span>✔ Check gutters & downspouts</span>
            <span>✔ Inspect weather stripping</span>
            <span>✔ Surge-protect your appliances</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
