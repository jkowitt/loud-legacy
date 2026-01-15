import Link from "next/link";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Blog - Loud Legacy",
  description: "Insights for operators. Guides, case studies, and thoughts on building better businesses.",
};

const featuredPost = {
  slug: "why-we-built-loud-legacy",
  title: "Why we built Loud Legacy",
  excerpt: "The story behind our decision to build five products instead of one—and why it matters for operators.",
  category: "Company",
  date: "January 15, 2026",
  readTime: "5 min read",
};

const posts = [
  {
    slug: "game-day-operations-checklist",
    title: "The complete game day operations checklist",
    excerpt: "Everything you need to execute a flawless game day, from doors open to final buzzer.",
    category: "Sportify",
    date: "January 12, 2026",
    readTime: "8 min read",
  },
  {
    slug: "underwriting-multifamily-deals",
    title: "How to underwrite multifamily deals in 2026",
    excerpt: "A practical guide to evaluating multifamily properties in the current market.",
    category: "VALORA",
    date: "January 10, 2026",
    readTime: "12 min read",
  },
  {
    slug: "weekly-business-review-template",
    title: "The weekly business review template that changed everything",
    excerpt: "A simple 15-minute ritual that keeps founders focused and accountable.",
    category: "Business Now",
    date: "January 8, 2026",
    readTime: "6 min read",
  },
  {
    slug: "crm-for-operators",
    title: "Why most CRMs fail operators (and what to do about it)",
    excerpt: "The problem with enterprise CRMs and how relationship management should actually work.",
    category: "Legacy CRM",
    date: "January 5, 2026",
    readTime: "7 min read",
  },
  {
    slug: "sponsor-activation-tracking",
    title: "How D1 programs track sponsor activations",
    excerpt: "Best practices from athletic departments that never miss a sponsor deliverable.",
    category: "Sportify",
    date: "January 3, 2026",
    readTime: "9 min read",
  },
  {
    slug: "pricing-consulting-services",
    title: "How to price consulting services in 2026",
    excerpt: "Moving from hourly to value-based pricing without losing clients.",
    category: "Business Now",
    date: "December 28, 2025",
    readTime: "10 min read",
  },
];

const categories = ["All", "Company", "VALORA", "Sportify", "Business Now", "Legacy CRM"];

export default function BlogPage() {
  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="blog-hero">
        <div className="container">
          <h1>Insights for operators</h1>
          <p>Guides, case studies, and thoughts on building better businesses.</p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="blog-featured">
        <div className="container">
          <Link href={`/blog/${featuredPost.slug}`} className="featured-post">
            <span className="featured-badge">Featured</span>
            <div className="featured-content">
              <span className="post-category">{featuredPost.category}</span>
              <h2>{featuredPost.title}</h2>
              <p>{featuredPost.excerpt}</p>
              <div className="post-meta">
                <span>{featuredPost.date}</span>
                <span>•</span>
                <span>{featuredPost.readTime}</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="blog-categories">
        <div className="container">
          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-button ${category === "All" ? "category-button--active" : ""}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="blog-posts">
        <div className="container">
          <div className="posts-grid">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="post-card">
                <span className="post-category">{post.category}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="post-meta">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="blog-newsletter">
        <div className="container">
          <div className="newsletter-card">
            <h2>Get insights in your inbox</h2>
            <p>Weekly insights for operators. No spam, unsubscribe anytime.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="you@company.com" required />
              <button type="submit" className="button button--primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
