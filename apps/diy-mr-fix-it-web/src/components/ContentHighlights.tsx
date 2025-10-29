import Link from "next/link";
import { blogPosts } from "@/data/blogPosts";
import { videoTutorials } from "@/data/videos";

const ContentHighlights = () => (
  <section className="bg-white py-16">
    <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-2">
      <div>
        <header className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-orange">Latest from the blog</p>
            <h2 className="text-2xl font-bold text-navy">DIY ideas & inspiration</h2>
          </div>
          <Link
            href="/blog"
            className="text-sm font-semibold text-navy underline-offset-4 hover:underline"
          >
            View all
          </Link>
        </header>
        <div className="mt-6 space-y-6">
          {blogPosts.map((post) => (
            <article key={post.slug} className="rounded-2xl border border-slate-100 p-6 transition hover:shadow-md">
              <p className="text-xs font-semibold uppercase tracking-widest text-orange">{post.category}</p>
              <h3 className="mt-2 text-xl font-semibold text-navy">{post.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
              <p className="mt-4 text-xs font-medium text-slate-500">{post.published}</p>
            </article>
          ))}
        </div>
      </div>
      <div>
        <header className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-orange">Watch & fix</p>
            <h2 className="text-2xl font-bold text-navy">Video tutorials</h2>
          </div>
          <Link
            href="/videos"
            className="text-sm font-semibold text-navy underline-offset-4 hover:underline"
          >
            View all
          </Link>
        </header>
        <div className="mt-6 space-y-6">
          {videoTutorials.map((video) => (
            <article
              key={video.title}
              className="rounded-2xl bg-navy p-6 text-white shadow-sm transition hover:shadow-lg"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-wide text-orange">
                <span>{video.category}</span>
                <span>{video.platform} · {video.duration}</span>
              </div>
              <h3 className="mt-3 text-xl font-semibold">{video.title}</h3>
              <p className="mt-4 text-sm text-white/80">
                Watch on {video.platform} — keep the checklist open to follow along step by step.
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ContentHighlights;
