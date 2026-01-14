import { Plus, Search, TrendingUp, Calendar, MoreVertical } from "lucide-react";
import { mockSponsors } from "../data/mockData";

export function SponsorsPage() {
  const tierOrder = { platinum: 0, gold: 1, silver: 2, bronze: 3 };
  const sortedSponsors = [...mockSponsors].sort((a, b) => tierOrder[a.tier] - tierOrder[b.tier]);

  const tierColors = {
    platinum: "bg-neutral-300/20 text-neutral-200 border-neutral-400/30",
    gold: "bg-amber-400/20 text-amber-300 border-amber-400/30",
    silver: "bg-neutral-400/20 text-neutral-300 border-neutral-400/30",
    bronze: "bg-orange-600/20 text-orange-300 border-orange-500/30",
  };

  const totalActivations = mockSponsors.reduce((acc, s) => acc + s.activationsTarget, 0);
  const completedActivations = mockSponsors.reduce((acc, s) => acc + s.activationsCompleted, 0);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Sponsors</h1>
          <p className="mt-1 text-sm text-neutral-400">Track partner activations and fulfillment</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700">
          <Plus className="h-4 w-4" />
          Add Sponsor
        </button>
      </header>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-neutral-400">Total Sponsors</p>
          <p className="mt-2 text-3xl font-semibold text-white">{mockSponsors.length}</p>
          <p className="mt-1 text-xs text-neutral-500">Active partnerships</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-neutral-400">Activations Completed</p>
          <p className="mt-2 text-3xl font-semibold text-white">
            {completedActivations}/{totalActivations}
          </p>
          <div className="mt-2 h-2 w-full rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-green-500"
              style={{ width: `${(completedActivations / totalActivations) * 100}%` }}
            />
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-neutral-400">Fulfillment Rate</p>
          <p className="mt-2 text-3xl font-semibold text-green-400">
            {Math.round((completedActivations / totalActivations) * 100)}%
          </p>
          <div className="mt-1 flex items-center gap-1 text-xs text-green-400">
            <TrendingUp className="h-3 w-3" />
            On track for season goals
          </div>
        </div>
      </div>

      {/* Sponsor Cards */}
      <div className="grid gap-4 lg:grid-cols-2">
        {sortedSponsors.map((sponsor) => (
          <div
            key={sponsor.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-brand-500/30"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 text-lg font-bold text-white">
                  {sponsor.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{sponsor.name}</h3>
                  <span
                    className={`mt-1 inline-block rounded-full border px-3 py-0.5 text-xs font-medium ${tierColors[sponsor.tier]}`}
                  >
                    {sponsor.tier.toUpperCase()}
                  </span>
                </div>
              </div>
              <button className="rounded p-2 text-neutral-500 transition hover:bg-white/10 hover:text-white">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-400">Activation Progress</span>
                <span className="font-medium text-white">
                  {sponsor.activationsCompleted} / {sponsor.activationsTarget}
                </span>
              </div>
              <div className="mt-2 h-3 w-full rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full transition-all ${
                    sponsor.activationsCompleted / sponsor.activationsTarget >= 0.8
                      ? "bg-green-500"
                      : sponsor.activationsCompleted / sponsor.activationsTarget >= 0.5
                      ? "bg-amber-500"
                      : "bg-red-500"
                  }`}
                  style={{
                    width: `${(sponsor.activationsCompleted / sponsor.activationsTarget) * 100}%`,
                  }}
                />
              </div>
              <p className="mt-2 text-xs text-neutral-500">
                {sponsor.activationsTarget - sponsor.activationsCompleted} activations remaining
              </p>
            </div>

            <div className="mt-4 flex items-center gap-4 border-t border-white/10 pt-4">
              <button className="flex items-center gap-1 text-xs text-accent hover:text-accent/80">
                <Calendar className="h-3 w-3" />
                View Schedule
              </button>
              <button className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white">
                Edit Contract
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
