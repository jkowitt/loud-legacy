const CommunityPage = () => (
  <div className="bg-light-gray py-16">
    <div className="mx-auto max-w-4xl px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-orange">Coming soon</p>
      <h1 className="mt-4 text-4xl font-bold text-navy">Mr. Fix It Community</h1>
      <p className="mt-6 text-base text-slate-600">
        Ask questions, share before-and-after photos, and help fellow DIYers tackle projects with
        confidence. The community forum is a Phase 2 launch—sign up below to get notified when it opens.
      </p>
      <div className="mt-8 inline-flex flex-col gap-3 rounded-3xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-center">
        <input
          type="email"
          placeholder="Email address"
          className="w-72 rounded-full border border-slate-200 px-4 py-3 text-sm focus:border-orange focus:outline-none"
        />
        <button className="rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90">
          Notify me
        </button>
      </div>
      <div className="mt-10 grid gap-6 text-left sm:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-navy">Project journals</p>
          <p className="mt-2 text-sm text-slate-600">
            Upload photos, jot progress notes, and track the materials you used.
          </p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-navy">Ask the crew</p>
          <p className="mt-2 text-sm text-slate-600">
            Crowdsource advice from experienced DIYers and the Mr. Fix It team.
          </p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-navy">Skill badges</p>
          <p className="mt-2 text-sm text-slate-600">
            Earn recognition for the projects you complete and the help you provide.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default CommunityPage;
