import { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { EventCard } from "../components/EventCard";
import { mockEvents } from "../data/mockData";

export function EventsPage() {
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed">("all");
  const [search, setSearch] = useState("");

  const filteredEvents = mockEvents.filter((event) => {
    const matchesFilter = filter === "all" || event.status === filter;
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.opponent.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Events</h1>
          <p className="mt-1 text-sm text-neutral-400">Manage your event portfolio</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700">
          <Plus className="h-4 w-4" />
          Create Event
        </button>
      </header>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          {(["all", "upcoming", "completed"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                filter === status
                  ? "bg-brand-600 text-white"
                  : "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white placeholder-neutral-500 focus:border-brand-500 focus:outline-none sm:w-64"
          />
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid gap-4 lg:grid-cols-2">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
          <Filter className="mx-auto h-12 w-12 text-neutral-600" />
          <h3 className="mt-4 text-lg font-medium text-white">No events found</h3>
          <p className="mt-2 text-sm text-neutral-400">
            Try adjusting your filters or create a new event
          </p>
        </div>
      )}
    </div>
  );
}
