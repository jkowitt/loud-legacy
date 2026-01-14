import { useState } from "react";
import { Search, Upload, FileVideo, FileAudio, Image, FileText, FolderOpen, MoreVertical } from "lucide-react";

type Asset = {
  id: string;
  name: string;
  type: "video" | "audio" | "graphic" | "script";
  size: string;
  uploadedAt: string;
  usedIn: number;
};

const mockAssets: Asset[] = [
  { id: "a1", name: "Intro Video 2026.mp4", type: "video", size: "245 MB", uploadedAt: "Jan 10", usedIn: 8 },
  { id: "a2", name: "Halftime Show Audio.mp3", type: "audio", size: "18 MB", uploadedAt: "Jan 8", usedIn: 4 },
  { id: "a3", name: "Player Cards Template.psd", type: "graphic", size: "12 MB", uploadedAt: "Jan 5", usedIn: 12 },
  { id: "a4", name: "Sponsor Read Scripts.docx", type: "script", size: "1.2 MB", uploadedAt: "Jan 3", usedIn: 6 },
  { id: "a5", name: "AutoMax Promo.mp4", type: "video", size: "89 MB", uploadedAt: "Dec 28", usedIn: 3 },
  { id: "a6", name: "Crowd Hype Track.mp3", type: "audio", size: "8 MB", uploadedAt: "Dec 20", usedIn: 15 },
  { id: "a7", name: "Jumbotron Graphics Pack.zip", type: "graphic", size: "156 MB", uploadedAt: "Dec 15", usedIn: 20 },
  { id: "a8", name: "PA Announcer Script.pdf", type: "script", size: "890 KB", uploadedAt: "Dec 10", usedIn: 10 },
];

const typeIcons = {
  video: FileVideo,
  audio: FileAudio,
  graphic: Image,
  script: FileText,
};

const typeColors = {
  video: "bg-red-500/20 text-red-400",
  audio: "bg-green-500/20 text-green-400",
  graphic: "bg-blue-500/20 text-blue-400",
  script: "bg-amber-500/20 text-amber-400",
};

export function AssetsPage() {
  const [filter, setFilter] = useState<"all" | "video" | "audio" | "graphic" | "script">("all");
  const [search, setSearch] = useState("");

  const filteredAssets = mockAssets.filter((asset) => {
    const matchesFilter = filter === "all" || asset.type === filter;
    const matchesSearch = asset.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Assets</h1>
          <p className="mt-1 text-sm text-neutral-400">Manage your media library</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700">
          <Upload className="h-4 w-4" />
          Upload Asset
        </button>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl bg-white/5 p-4">
          <div className="flex items-center gap-2">
            <FileVideo className="h-5 w-5 text-red-400" />
            <span className="text-sm text-neutral-400">Videos</span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-white">
            {mockAssets.filter((a) => a.type === "video").length}
          </p>
        </div>
        <div className="rounded-xl bg-white/5 p-4">
          <div className="flex items-center gap-2">
            <FileAudio className="h-5 w-5 text-green-400" />
            <span className="text-sm text-neutral-400">Audio</span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-white">
            {mockAssets.filter((a) => a.type === "audio").length}
          </p>
        </div>
        <div className="rounded-xl bg-white/5 p-4">
          <div className="flex items-center gap-2">
            <Image className="h-5 w-5 text-blue-400" />
            <span className="text-sm text-neutral-400">Graphics</span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-white">
            {mockAssets.filter((a) => a.type === "graphic").length}
          </p>
        </div>
        <div className="rounded-xl bg-white/5 p-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-amber-400" />
            <span className="text-sm text-neutral-400">Scripts</span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-white">
            {mockAssets.filter((a) => a.type === "script").length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {(["all", "video", "audio", "graphic", "script"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                filter === type
                  ? "bg-brand-600 text-white"
                  : "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            placeholder="Search assets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white placeholder-neutral-500 focus:border-brand-500 focus:outline-none sm:w-64"
          />
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredAssets.map((asset) => {
          const Icon = typeIcons[asset.type];
          return (
            <div
              key={asset.id}
              className="group rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-brand-500/50"
            >
              <div className="flex items-start justify-between">
                <div className={`rounded-lg p-3 ${typeColors[asset.type]}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <button className="rounded p-1 text-neutral-500 opacity-0 transition hover:bg-white/10 hover:text-white group-hover:opacity-100">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
              <h3 className="mt-4 truncate font-medium text-white" title={asset.name}>
                {asset.name}
              </h3>
              <div className="mt-2 flex items-center justify-between text-xs text-neutral-500">
                <span>{asset.size}</span>
                <span>{asset.uploadedAt}</span>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs text-neutral-400">
                <FolderOpen className="h-3 w-3" />
                Used in {asset.usedIn} moments
              </div>
            </div>
          );
        })}
      </div>

      {filteredAssets.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
          <FolderOpen className="mx-auto h-12 w-12 text-neutral-600" />
          <h3 className="mt-4 text-lg font-medium text-white">No assets found</h3>
          <p className="mt-2 text-sm text-neutral-400">
            Upload your first asset or adjust filters
          </p>
        </div>
      )}
    </div>
  );
}
