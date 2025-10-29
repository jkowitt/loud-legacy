import Link from "next/link";
import { projectCategories } from "@/data/categories";

const FeaturedProjects = () => (
  <section className="bg-light-gray py-16">
    <div className="mx-auto max-w-6xl px-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-orange">Seasonal fixes</p>
          <h2 className="text-3xl font-bold text-navy">Top projects to tackle right now</h2>
        </div>
        <Link
          href="/project-library"
          className="inline-flex items-center gap-2 text-sm font-semibold text-navy underline-offset-4 hover:underline"
        >
          Explore all repairs →
        </Link>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {projectCategories.slice(0, 3).map((category) => (
          <article key={category.slug} className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-navy">{category.name}</h3>
            <p className="mt-2 text-sm text-slate-600">{category.description}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {category.featuredGuides.slice(0, 3).map((guide) => (
                <li key={guide} className="flex items-start gap-2">
                  <span className="mt-1 text-orange">•</span>
                  <span>{guide}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedProjects;
