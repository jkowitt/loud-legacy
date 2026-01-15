import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Radio, ChevronUp, ChevronDown, Check, Clock, Zap } from "lucide-react";
import { mockEvents, mockMoments, type Moment } from "../data/mockData";

export function LiveViewPage() {
  const { eventId } = useParams();
  const event = mockEvents.find((e) => e.id === eventId);
  const [moments, setMoments] = useState<Moment[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const eventMoments = mockMoments.filter((m) => m.eventId === eventId);
    setMoments(eventMoments);
  }, [eventId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((t) => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const markComplete = (momentId: string) => {
    setMoments((prev) =>
      prev.map((m) => (m.id === momentId ? { ...m, status: "completed" as const } : m))
    );
    if (currentIndex < moments.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  const currentMoment = moments[currentIndex];
  const previousMoment = moments[currentIndex - 1];
  const nextMoment = moments[currentIndex + 1];

  if (!event) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white">Event not found</h2>
          <Link to="/events" className="mt-4 text-accent hover:underline">
            Back to events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Top Bar */}
      <header className="flex items-center justify-between border-b border-white/10 bg-black/90 px-4 py-3 backdrop-blur">
        <Link
          to={`/events/${eventId}`}
          className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Exit Live View
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 animate-pulse rounded-full bg-red-500" />
            <span className="text-sm font-medium text-red-400">LIVE</span>
          </div>
          <div className="rounded bg-white/10 px-3 py-1 font-mono text-lg">{formatTime(elapsedTime)}</div>
        </div>

        <div className="text-right">
          <p className="text-sm font-medium">{event.title}</p>
          <p className="text-xs text-neutral-500">{event.venue}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center p-8">
        {/* Previous Moment */}
        {previousMoment && (
          <div className="mb-4 w-full max-w-2xl opacity-40">
            <div className="flex items-center gap-3 rounded-xl bg-green-500/10 p-4">
              <Check className="h-6 w-6 text-green-500" />
              <div className="flex-1">
                <p className="text-sm text-neutral-500">{previousMoment.time}</p>
                <p className="font-medium">{previousMoment.title}</p>
              </div>
              <span className="rounded bg-green-500/20 px-2 py-1 text-xs text-green-400">Done</span>
            </div>
          </div>
        )}

        {/* Current Moment */}
        {currentMoment && (
          <div className="w-full max-w-2xl">
            <div className="rounded-2xl border-2 border-brand-500 bg-brand-500/10 p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {currentMoment.type === "trigger" ? (
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20">
                      <Zap className="h-6 w-6 text-amber-400" />
                    </div>
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/20">
                      <Clock className="h-6 w-6 text-brand-400" />
                    </div>
                  )}
                  <div>
                    <p className="font-mono text-lg text-brand-400">{currentMoment.time}</p>
                    {currentMoment.type === "trigger" && (
                      <p className="text-xs text-amber-400">{currentMoment.triggerCondition}</p>
                    )}
                  </div>
                </div>
                <span className="text-xs text-neutral-500">{currentMoment.owner}</span>
              </div>

              <h2 className="mt-6 text-3xl font-bold">{currentMoment.title}</h2>
              <p className="mt-3 text-lg text-neutral-400">{currentMoment.description}</p>

              {currentMoment.sponsor && (
                <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent/10 px-4 py-2">
                  <span className="text-sm text-accent">Sponsor: {currentMoment.sponsor}</span>
                </div>
              )}

              {currentMoment.assets.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {currentMoment.assets.map((asset) => (
                    <span
                      key={asset.id}
                      className="rounded bg-white/10 px-3 py-1 text-sm text-neutral-300"
                    >
                      {asset.name} {asset.duration && `(${asset.duration})`}
                    </span>
                  ))}
                </div>
              )}

              <button
                onClick={() => markComplete(currentMoment.id)}
                className="mt-8 w-full rounded-xl bg-green-500 py-4 text-lg font-semibold text-white transition hover:bg-green-600"
              >
                Mark Complete
              </button>
            </div>
          </div>
        )}

        {/* Next Moment */}
        {nextMoment && (
          <div className="mt-4 w-full max-w-2xl opacity-40">
            <div className="flex items-center gap-3 rounded-xl bg-white/5 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                {nextMoment.type === "trigger" ? (
                  <Zap className="h-5 w-5 text-amber-400" />
                ) : (
                  <Clock className="h-5 w-5 text-neutral-400" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm text-neutral-500">{nextMoment.time}</p>
                <p className="font-medium">{nextMoment.title}</p>
              </div>
              <span className="text-xs text-neutral-500">Up Next</span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            disabled={currentIndex === 0}
            className="rounded-lg bg-white/10 p-3 text-white transition hover:bg-white/20 disabled:opacity-30"
          >
            <ChevronUp className="h-6 w-6" />
          </button>
          <button
            onClick={() => setCurrentIndex((i) => Math.min(moments.length - 1, i + 1))}
            disabled={currentIndex === moments.length - 1}
            className="rounded-lg bg-white/10 p-3 text-white transition hover:bg-white/20 disabled:opacity-30"
          >
            <ChevronDown className="h-6 w-6" />
          </button>
        </div>
      </main>

      {/* Progress Bar */}
      <footer className="border-t border-white/10 bg-black/90 p-4">
        <div className="mx-auto max-w-4xl">
          <div className="flex justify-between text-xs text-neutral-500">
            <span>
              {moments.filter((m) => m.status === "completed").length} of {moments.length} completed
            </span>
            <span>
              {Math.round((moments.filter((m) => m.status === "completed").length / moments.length) * 100)}%
            </span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-brand-500 transition-all"
              style={{
                width: `${(moments.filter((m) => m.status === "completed").length / moments.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
