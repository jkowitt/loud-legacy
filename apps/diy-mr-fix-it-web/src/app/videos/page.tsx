import { videoTutorials } from "@/data/videos";

const getVideoUrl = (videoId: string, platform: "YouTube" | "TikTok") => {
  if (platform === "YouTube") {
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return `https://www.tiktok.com/embed/${videoId}`;
};

const VideosPage = () => (
  <div className="bg-light-gray py-16">
    <div className="mx-auto max-w-6xl px-4">
      <header className="mb-12 space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-orange">Video Tutorials</p>
        <h1 className="text-4xl font-bold text-navy">Watch and fix along</h1>
        <p className="max-w-3xl text-base text-slate-600">
          Open the checklist, press play, and fix it in real-time with guided videos from the Mr. Fix It
          workshop.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {videoTutorials.map((video) => (
          <article key={video.title} className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between text-xs uppercase tracking-wide text-orange">
              <span>{video.category}</span>
              <span>{video.platform} · {video.duration}</span>
            </div>
            <h2 className="mt-3 text-2xl font-semibold text-navy">{video.title}</h2>
            <div className="mt-4 aspect-video overflow-hidden rounded-2xl bg-black">
              <iframe
                src={getVideoUrl(video.videoId, video.platform)}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
            <div className="mt-4 rounded-2xl bg-light-gray p-4">
              <p className="text-sm font-semibold text-navy">Checklist</p>
              <ul className="mt-2 space-y-1 text-xs text-slate-600">
                <li>✔ Watch on the left, follow steps on the right</li>
                <li>✔ Pause after each chapter to check your work</li>
                <li>✔ Snap a photo of the finished repair for the community</li>
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  </div>
);

export default VideosPage;
