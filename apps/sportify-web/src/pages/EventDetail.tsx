import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Radio, Calendar, MapPin, Clock, Plus, Download, Users } from "lucide-react";
import { TimelineItem } from "../components/TimelineItem";
import { mockEvents, mockMoments, mockTeam } from "../data/mockData";

export function EventDetailPage() {
  const { eventId } = useParams();
  const event = mockEvents.find((e) => e.id === eventId);
  const moments = mockMoments.filter((m) => m.eventId === eventId);

  if (!event) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white">Event not found</h2>
          <Link to="/events" className="mt-4 text-accent hover:underline">
            Back to events
          </Link>
        </div>
      </div>
    );
  }

  const scheduledMoments = moments.filter((m) => m.type === "scheduled");
  const triggerMoments = moments.filter((m) => m.type === "trigger");

  return (
    <div className="space-y-6">
      {/* Header */}
      <header>
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Events
        </Link>

        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-white">{event.title}</h1>
              {event.theme && (
                <span className="rounded-lg bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                  {event.theme}
                </span>
              )}
            </div>
            <p className="mt-2 text-neutral-400">vs {event.opponent}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-neutral-500">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {event.time}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {event.venue}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20">
              <Download className="h-4 w-4" />
              Export
            </button>
            <Link
              to={`/live/${event.id}`}
              className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
            >
              <Radio className="h-4 w-4" />
              Go Live
            </Link>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl bg-white/5 p-4 text-center">
          <p className="text-2xl font-semibold text-white">{moments.length}</p>
          <p className="text-xs text-neutral-500">Total Moments</p>
        </div>
        <div className="rounded-xl bg-white/5 p-4 text-center">
          <p className="text-2xl font-semibold text-white">{scheduledMoments.length}</p>
          <p className="text-xs text-neutral-500">Scheduled</p>
        </div>
        <div className="rounded-xl bg-white/5 p-4 text-center">
          <p className="text-2xl font-semibold text-white">{triggerMoments.length}</p>
          <p className="text-xs text-neutral-500">Trigger-Based</p>
        </div>
        <div className="rounded-xl bg-white/5 p-4 text-center">
          <p className="text-2xl font-semibold text-white">
            {new Set(moments.map((m) => m.owner)).size}
          </p>
          <p className="text-xs text-neutral-500">Owners</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Timeline */}
        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Run of Show</h2>
            <button className="inline-flex items-center gap-2 rounded-lg bg-brand-600/20 px-3 py-2 text-xs font-medium text-brand-400 transition hover:bg-brand-600/30">
              <Plus className="h-3 w-3" />
              Add Moment
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {moments.map((moment) => (
              <TimelineItem key={moment.id} moment={moment} />
            ))}
          </div>
        </section>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Team */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">Team</h3>
              <Users className="h-4 w-4 text-neutral-500" />
            </div>
            <div className="mt-4 space-y-3">
              {mockTeam.slice(0, 4).map((member) => (
                <div key={member.id} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-xs font-semibold text-white">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{member.name}</p>
                    <p className="text-xs text-neutral-500">{member.role}</p>
                  </div>
                  <span className="rounded bg-white/10 px-2 py-0.5 text-xs text-neutral-400">
                    {member.assignedMoments}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Notes */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-semibold text-white">Event Notes</h3>
            <textarea
              placeholder="Add notes for game day..."
              className="mt-4 h-32 w-full resize-none rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white placeholder-neutral-500 focus:border-brand-500 focus:outline-none"
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
