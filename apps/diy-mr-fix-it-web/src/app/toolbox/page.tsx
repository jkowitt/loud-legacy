import { tools } from "@/data/tools";

const ToolboxPage = () => (
  <div className="bg-white py-16">
    <div className="mx-auto max-w-6xl px-4">
      <header className="mb-12 space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-orange">Toolbox</p>
        <h1 className="text-4xl font-bold text-navy">Find the right tool for the job</h1>
        <p className="max-w-3xl text-base text-slate-600">
          Search the Mr. Fix It tool glossary to understand what each tool does, when you need it, and
          which version the pros trust. Keep track of the tools you own and build your next shopping list.
        </p>
      </header>

      <div className="rounded-3xl bg-light-gray p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-navy">Build your toolbox</p>
        <p className="mt-2 text-sm text-slate-600">
          Check off the tools you already own below. We&apos;ll recommend the next essentials to add to your
          kit in a future release.
        </p>
        <form className="mt-4 grid gap-4 md:grid-cols-2">
          {tools.map((tool) => (
            <label key={tool.name} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm">
              <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-orange focus:ring-orange" />
              <div>
                <p className="font-semibold text-navy">{tool.name}</p>
                <p className="text-xs uppercase tracking-wide text-orange">{tool.category}</p>
                <p className="mt-1 text-sm text-slate-600">{tool.description}</p>
              </div>
            </label>
          ))}
        </form>
      </div>

      <section className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold text-navy">Tool insights</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {tools.map((tool) => (
            <article key={tool.name} className="rounded-3xl border border-light-gray bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-navy">{tool.name}</h3>
                <span className="rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold text-orange">
                  {tool.category}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{tool.description}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {tool.useCases.map((useCase) => (
                  <li key={useCase} className="flex items-start gap-2">
                    <span className="mt-1 text-orange">•</span>
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 rounded-2xl bg-light-gray p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Jason&apos;s pick</p>
                <a
                  href={tool.recommendation.link}
                  className="mt-1 inline-flex text-sm font-semibold text-navy underline-offset-4 hover:underline"
                >
                  {tool.recommendation.name}
                </a>
                <p className="mt-2 text-xs text-slate-500">{tool.proTip}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  </div>
);

export default ToolboxPage;
