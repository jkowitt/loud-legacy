import Link from "next/link";
import { projectCategories } from "@/data/categories";

const ProjectLibraryPage = () => (
  <div className="bg-light-gray py-16">
    <div className="mx-auto max-w-6xl px-4">
      <header className="mb-12 space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-orange">DIY Guides</p>
        <h1 className="text-4xl font-bold text-navy">Project Library</h1>
        <p className="max-w-3xl text-base text-slate-600">
          Step-by-step instructions, material checklists, and embedded tutorials that walk you through
          the most common home repairs. Choose a category to get started.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {projectCategories.map((category) => (
          <section key={category.slug} className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-3 border-b border-light-gray pb-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-orange">Category</p>
              <h2 className="text-2xl font-semibold text-navy">{category.name}</h2>
              <p className="text-sm text-slate-600">{category.description}</p>
            </div>
            <div className="mt-6 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Featured Guides
              </p>
              <ul className="space-y-3">
                {category.featuredGuides.map((guide) => (
                  <li
                    key={guide}
                    className="flex items-start gap-3 rounded-2xl border border-light-gray px-4 py-3 text-sm text-slate-700"
                  >
                    <span className="mt-1 text-orange">✔</span>
                    <div>
                      <p className="font-semibold text-navy">{guide}</p>
                      <p className="text-xs text-slate-500">
                        Difficulty: Moderate · Time: 45–90 minutes · Tools: View checklist
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="#"
                className="rounded-full bg-orange px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Browse All {category.name} Guides
              </Link>
              <Link
                href="/videos"
                className="rounded-full border border-navy px-5 py-2 text-sm font-semibold text-navy transition hover:bg-light-gray"
              >
                Watch Tutorials
              </Link>
            </div>
          </section>
        ))}
      </div>
    </div>
  </div>
);

export default ProjectLibraryPage;
