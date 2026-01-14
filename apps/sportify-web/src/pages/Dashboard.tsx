import { Link } from "react-router-dom";
import { Calendar, Radio, Users, Handshake, ChevronRight, Plus } from "lucide-react";
import { MetricCard } from "../components/MetricCard";
import { EventCard } from "../components/EventCard";
import { mockEvents, mockSponsors, mockTeam } from "../data/mockData";

export function DashboardPage() {
  const upcomingEvents = mockEvents.filter((e) => e.status === "upcoming");
  const nextEvent = upcomingEvents[0];

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-neutral-400">Your event command center</p>
        </div>
        <Link
          to="/events"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" />
          New Event
        </Link>
      </header>

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Upcoming Events"
          value={upcomingEvents.length}
          subtitle="this month"
          icon={<Calendar className="h-5 w-5" />}
        />
        <MetricCard
          title="Total Moments"
          value={mockEvents.reduce((acc, e) => acc + e.momentsCount, 0)}
          subtitle="across all events"
          icon={<Radio className="h-5 w-5" />}
        />
        <MetricCard
          title="Team Members"
          value={mockTeam.length}
          subtitle="active"
          icon={<Users className="h-5 w-5" />}
        />
        <MetricCard
          title="Sponsors"
          value={mockSponsors.length}
          subtitle="active partners"
          icon={<Handshake className="h-5 w-5" />}
        />
      </div>

      {/* Next Event Highlight */}
      {nextEvent && (
        <section className="rounded-2xl border border-brand-500/30 bg-gradient-to-r from-brand-900/50 to-brand-800/30 p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="text-xs font-medium uppercase tracking-wider text-brand-400">
                Next Event
              </span>
              <h2 className="mt-2 text-xl font-semibold text-white">{nextEvent.title}</h2>
              <p className="mt-1 text-neutral-400">
                {new Date(nextEvent.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}{" "}
                at {nextEvent.time}
              </p>
              <p className="mt-2 text-sm text-neutral-500">
                {nextEvent.momentsCount} moments planned | {nextEvent.venue}
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                to={`/events/${nextEvent.id}`}
                className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
              >
                View Run of Show
              </Link>
              <Link
                to={`/live/${nextEvent.id}`}
                className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
              >
                <Radio className="h-4 w-4" />
                Go Live
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Recent Events */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Upcoming Events</h2>
          <Link
            to="/events"
            className="flex items-center gap-1 text-sm text-accent hover:text-accent/80"
          >
            View all
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {upcomingEvents.slice(0, 2).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Sponsor Fulfillment */}
      <section>
        <h2 className="text-lg font-semibold text-white">Sponsor Fulfillment</h2>
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mockSponsors.map((sponsor) => (
              <div key={sponsor.id} className="rounded-xl bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white">{sponsor.name}</span>
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-medium ${
                      sponsor.tier === "platinum"
                        ? "bg-neutral-300/20 text-neutral-300"
                        : sponsor.tier === "gold"
                        ? "bg-amber-400/20 text-amber-400"
                        : sponsor.tier === "silver"
                        ? "bg-neutral-400/20 text-neutral-400"
                        : "bg-orange-600/20 text-orange-400"
                    }`}
                  >
                    {sponsor.tier}
                  </span>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-neutral-500">
                    <span>Activations</span>
                    <span>
                      {sponsor.activationsCompleted}/{sponsor.activationsTarget}
                    </span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-brand-500"
                      style={{
                        width: `${(sponsor.activationsCompleted / sponsor.activationsTarget) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
