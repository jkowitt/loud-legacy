import Link from "next/link";
import { blogPosts } from "@/data/blogPosts";

const BlogPage = () => (
  <div className="bg-white py-16">
    <div className="mx-auto max-w-6xl px-4">
      <header className="mb-12 space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-orange">Blog & Inspiration</p>
        <h1 className="text-4xl font-bold text-navy">Fresh fixes every week</h1>
        <p className="max-w-3xl text-base text-slate-600">
          Actionable DIY advice, seasonal maintenance reminders, and tutorials that help you handle
          repairs with confidence.
        </p>
      </header>

      <div className="grid gap-10 md:grid-cols-2">
        {blogPosts.map((post) => (
          <article key={post.slug} className="flex flex-col justify-between rounded-3xl bg-light-gray p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-orange">{post.category}</p>
              <h2 className="mt-3 text-2xl font-semibold text-navy">{post.title}</h2>
              <p className="mt-3 text-sm text-slate-600">{post.excerpt}</p>
            </div>
            <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
              <span>{post.published}</span>
              <Link href="#" className="font-semibold text-navy underline-offset-4 hover:underline">
                Read guide →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  </div>
);

export default BlogPage;
