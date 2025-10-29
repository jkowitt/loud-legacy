export const AboutPage = () => {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent/70">About Valora</p>
        <h1 className="text-3xl font-semibold text-neutral-100">AI-powered valuations at enterprise scale</h1>
      </header>

      <section className="rounded-2xl border border-brand-800 bg-surface/70 p-6 text-sm text-neutral-300 shadow-hard">
        <p className="leading-relaxed text-neutral-200">
          Valora is an AI-powered platform that delivers instant, accurate, and adaptive asset valuations across
          industries. By combining real-time data, machine learning, and market intelligence, Valora simplifies how
          people understand and manage value—whether for real estate, vehicles, or investments.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-brand-800/60 bg-brand-900/30 p-5">
          <h2 className="text-lg font-semibold text-neutral-100">Mission</h2>
          <p className="mt-3 text-sm text-neutral-400">
            Equip investors, lenders, and operators with defensible valuations and explainability in seconds—not days.
          </p>
        </div>
        <div className="rounded-xl border border-brand-800/60 bg-brand-900/30 p-5">
          <h2 className="text-lg font-semibold text-neutral-100">How we deliver</h2>
          <p className="mt-3 text-sm text-neutral-400">
            Streaming data ingestion, champion/challenger model orchestration, comparable intelligence, and compliance
            tooling built into every release.
          </p>
        </div>
      </section>
    </div>
  );
};
