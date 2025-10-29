const QuickSearch = () => (
  <section className="bg-navy py-10">
    <div className="mx-auto max-w-6xl px-4 text-white">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-orange">Quick search</p>
          <h2 className="text-2xl font-bold">What are you trying to fix?</h2>
        </div>
        <form className="flex w-full max-w-xl overflow-hidden rounded-full bg-white p-1">
          <input
            type="search"
            placeholder="e.g. Leaky faucet, GFCI outlet, sticky door"
            className="flex-1 rounded-full px-4 py-3 text-sm text-navy focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-full bg-orange px-6 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  </section>
);

export default QuickSearch;
