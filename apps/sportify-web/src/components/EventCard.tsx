import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, Radio, ChevronRight } from "lucide-react";
import type { Event } from "../data/mockData";

type EventCardProps = {
  event: Event;
};

export function EventCard({ event }: EventCardProps) {
  const statusColors = {
    upcoming: "bg-brand-600/20 text-brand-400",
    live: "bg-red-500/20 text-red-400",
    completed: "bg-green-500/20 text-green-400",
  };

  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-brand-600/50">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusColors[event.status]}`}>
              {event.status === "live" && <Radio className="mr-1 inline h-3 w-3 animate-pulse" />}
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </span>
            <span className="text-xs text-neutral-500">{event.sport}</span>
          </div>
          <h3 className="mt-3 text-lg font-semibold text-white">{event.title}</h3>
          <p className="mt-1 text-sm text-neutral-400">vs {event.opponent}</p>
        </div>
        {event.theme && (
          <span className="rounded-lg bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            {event.theme}
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-sm text-neutral-400">
        <span className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
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

      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="text-sm text-neutral-500">{event.momentsCount} moments planned</span>
        <div className="flex gap-2">
          {event.status === "upcoming" && (
            <Link
              to={`/live/${event.id}`}
              className="flex items-center gap-1 rounded-lg bg-red-500/20 px-3 py-2 text-xs font-medium text-red-400 transition hover:bg-red-500/30"
            >
              <Radio className="h-3 w-3" />
              Go Live
            </Link>
          )}
          <Link
            to={`/events/${event.id}`}
            className="flex items-center gap-1 rounded-lg bg-white/10 px-3 py-2 text-xs font-medium text-white transition hover:bg-white/20"
          >
            View Details
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
