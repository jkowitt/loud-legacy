import { Clock, User, Zap, FileVideo, FileAudio, Image, FileText, Handshake } from "lucide-react";
import type { Moment } from "../data/mockData";

type TimelineItemProps = {
  moment: Moment;
  isActive?: boolean;
  onMarkComplete?: () => void;
};

const assetIcons = {
  video: FileVideo,
  audio: FileAudio,
  graphic: Image,
  script: FileText,
};

export function TimelineItem({ moment, isActive, onMarkComplete }: TimelineItemProps) {
  const statusColors = {
    pending: "border-white/20 bg-white/5",
    active: "border-brand-500 bg-brand-500/20",
    completed: "border-green-500 bg-green-500/20",
  };

  return (
    <div
      className={`relative rounded-xl border p-4 transition ${statusColors[moment.status]} ${
        isActive ? "ring-2 ring-brand-500" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg ${
              moment.type === "trigger" ? "bg-amber-500/20 text-amber-400" : "bg-brand-500/20 text-brand-400"
            }`}
          >
            {moment.type === "trigger" ? <Zap className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-neutral-500">{moment.time}</span>
              {moment.type === "trigger" && (
                <span className="rounded bg-amber-500/20 px-2 py-0.5 text-xs text-amber-400">Trigger</span>
              )}
            </div>
            <h4 className="mt-1 font-semibold text-white">{moment.title}</h4>
          </div>
        </div>

        {moment.status === "pending" && onMarkComplete && (
          <button
            onClick={onMarkComplete}
            className="rounded-lg bg-green-500/20 px-3 py-1.5 text-xs font-medium text-green-400 transition hover:bg-green-500/30"
          >
            Mark Done
          </button>
        )}
        {moment.status === "completed" && (
          <span className="rounded-lg bg-green-500/20 px-3 py-1.5 text-xs font-medium text-green-400">
            Completed
          </span>
        )}
      </div>

      <p className="mt-3 text-sm text-neutral-400">{moment.description}</p>

      {moment.triggerCondition && (
        <p className="mt-2 text-xs text-amber-400/80">Trigger: {moment.triggerCondition}</p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="flex items-center gap-1 text-xs text-neutral-500">
          <User className="h-3 w-3" />
          {moment.owner}
        </span>

        {moment.sponsor && (
          <span className="flex items-center gap-1 rounded bg-accent/10 px-2 py-1 text-xs text-accent">
            <Handshake className="h-3 w-3" />
            {moment.sponsor}
          </span>
        )}

        {moment.assets.length > 0 && (
          <div className="flex items-center gap-1">
            {moment.assets.map((asset) => {
              const Icon = assetIcons[asset.type];
              return (
                <span
                  key={asset.id}
                  className="flex items-center gap-1 rounded bg-white/10 px-2 py-1 text-xs text-neutral-400"
                  title={asset.name}
                >
                  <Icon className="h-3 w-3" />
                  {asset.duration && <span>{asset.duration}</span>}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
