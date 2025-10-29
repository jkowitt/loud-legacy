import { products } from "@/data/products";

const ShopPage = () => (
  <div className="bg-white py-16">
    <div className="mx-auto max-w-6xl px-4">
      <header className="mb-12 space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-orange">Shop</p>
        <h1 className="text-4xl font-bold text-navy">Curated tool picks & kits</h1>
        <p className="max-w-3xl text-base text-slate-600">
          Trusted tools and smart upgrades sourced from Amazon, Lowe&apos;s, and Home Depot. Every pick is
          field-tested and affiliate-supported to keep Mr. Fix It tutorials free.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {products.map((product) => (
          <article key={product.name} className="flex flex-col justify-between rounded-3xl bg-light-gray p-8 shadow-sm">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-navy">{product.name}</h2>
                {product.badge ? (
                  <span className="rounded-full bg-orange px-3 py-1 text-xs font-semibold text-white">
                    {product.badge}
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-xs uppercase tracking-wide text-orange">
                {product.category} · {product.room}
              </p>
              <p className="mt-4 text-sm text-slate-600">{product.description}</p>
            </div>
            <div className="mt-6 flex items-center justify-between text-sm">
              <span className="font-semibold text-navy">{product.price}</span>
              <a
                href={product.link}
                className="rounded-full bg-navy px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:opacity-90"
              >
                Shop now
              </a>
            </div>
          </article>
        ))}
      </div>

      <section className="mt-16 rounded-3xl bg-navy p-10 text-white">
        <h2 className="text-3xl font-bold">Partner with Mr. Fix It</h2>
        <p className="mt-3 max-w-2xl text-sm text-white/80">
          Tool brands and service providers can collaborate on sponsored guides, giveaway campaigns, and
          product placements. Reach an audience of motivated DIYers ready to invest in quality gear.
        </p>
        <a
          href="/about#contact"
          className="mt-6 inline-flex rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Start a conversation
        </a>
      </section>
    </div>
  </div>
);

export default ShopPage;
