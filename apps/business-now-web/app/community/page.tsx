"use client";

import { useState } from "react";
import Link from "next/link";

const categories = [
  { id: "all", label: "All Posts" },
  { id: "best-practices", label: "Best Practices" },
  { id: "case-studies", label: "Case Studies" },
  { id: "questions", label: "Questions" },
  { id: "wins", label: "Wins & Milestones" },
];

const mockPosts = [
  {
    id: "1",
    type: "case-study",
    title: "How I landed my first 10 clients in 60 days",
    author: { name: "Sarah Chen", avatar: "SC", role: "Founder, GreenLeaf Marketing" },
    preview: "After completing the Launch Foundations course, I implemented the cold outreach template and refined my offer positioning. Here's the exact process...",
    likes: 47,
    comments: 12,
    timeAgo: "2 hours ago",
    tags: ["Client Acquisition", "Cold Outreach"],
  },
  {
    id: "2",
    type: "best-practice",
    title: "The weekly review template that changed everything",
    author: { name: "Mike Torres", avatar: "MT", role: "CEO, ToolStack.io" },
    preview: "Every Friday at 4pm, I run through this 15-minute review process. It keeps me accountable and surfaces problems before they become crises...",
    likes: 89,
    comments: 23,
    timeAgo: "5 hours ago",
    tags: ["Operations", "Templates"],
  },
  {
    id: "3",
    type: "case-study",
    title: "From $0 to $50k MRR: A 12-month retrospective",
    author: { name: "Alex Rivera", avatar: "AR", role: "Founder, DataPulse" },
    preview: "One year ago I joined Business Now with just an idea. This post breaks down every major decision, mistake, and breakthrough along the way...",
    likes: 156,
    comments: 45,
    timeAgo: "1 day ago",
    tags: ["Growth", "Revenue"],
  },
  {
    id: "4",
    type: "question",
    title: "Best practices for pricing consulting services?",
    author: { name: "Jordan Kim", avatar: "JK", role: "Independent Consultant" },
    preview: "I'm transitioning from hourly to value-based pricing but struggling to communicate the change to existing clients. How have others handled this?",
    likes: 23,
    comments: 31,
    timeAgo: "3 hours ago",
    tags: ["Pricing", "Consulting"],
  },
  {
    id: "5",
    type: "win",
    title: "Just closed my biggest deal ever - $120k contract!",
    author: { name: "Lisa Park", avatar: "LP", role: "Founder, Summit Strategy" },
    preview: "After 6 months of nurturing this lead through the CRM and following the enterprise sales playbook, it finally closed. Huge thanks to this community!",
    likes: 234,
    comments: 67,
    timeAgo: "6 hours ago",
    tags: ["Sales", "Enterprise"],
  },
  {
    id: "6",
    type: "best-practice",
    title: "How to run effective 1:1s with your first employees",
    author: { name: "David Wright", avatar: "DW", role: "CEO, BuildRight Labs" },
    preview: "When I hired my first two employees, I had no idea how to manage them. Here's the 1:1 framework I developed after lots of trial and error...",
    likes: 67,
    comments: 19,
    timeAgo: "2 days ago",
    tags: ["Management", "Hiring"],
  },
];

const typeColors: Record<string, string> = {
  "case-study": "bg-blue-500/20 text-blue-400",
  "best-practice": "bg-green-500/20 text-green-400",
  question: "bg-amber-500/20 text-amber-400",
  win: "bg-purple-500/20 text-purple-400",
};

const typeLabels: Record<string, string> = {
  "case-study": "Case Study",
  "best-practice": "Best Practice",
  question: "Question",
  win: "Win",
};

export default function CommunityPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"recent" | "popular">("recent");

  const filteredPosts = mockPosts.filter(
    (post) => activeCategory === "all" || post.type === activeCategory.replace("s", "").replace("case-studie", "case-study").replace("question", "question").replace("win", "win") ||
    (activeCategory === "best-practices" && post.type === "best-practice") ||
    (activeCategory === "case-studies" && post.type === "case-study") ||
    (activeCategory === "questions" && post.type === "question") ||
    (activeCategory === "wins" && post.type === "win")
  );

  return (
    <div className="min-h-screen bg-[#0a0b0d]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0a0b0d]/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold text-white">
            Business Now
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/courses" className="text-sm text-neutral-400 hover:text-white">Courses</Link>
            <Link href="/templates" className="text-sm text-neutral-400 hover:text-white">Templates</Link>
            <Link href="/coaching" className="text-sm text-neutral-400 hover:text-white">Coaching</Link>
            <Link href="/community" className="text-sm text-white font-medium">Community</Link>
          </nav>
          <Link href="/dashboard" className="text-sm bg-amber-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-amber-400">
            Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Operator Community
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Share your wins, learn from others' experiences, and get answers from operators who've been there.
            Real stories, real strategies, real results.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-white">2,847</p>
            <p className="text-xs text-neutral-500">Active Members</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-white">156</p>
            <p className="text-xs text-neutral-500">Case Studies</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-white">89</p>
            <p className="text-xs text-neutral-500">Best Practices</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-white">$4.2M</p>
            <p className="text-xs text-neutral-500">Revenue Shared</p>
          </div>
        </div>

        {/* Create Post */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-semibold">
              You
            </div>
            <input
              type="text"
              placeholder="Share a best practice, case study, or ask a question..."
              className="flex-1 bg-transparent text-white placeholder-neutral-500 outline-none"
            />
            <button className="bg-amber-500 text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-400">
              Post
            </button>
          </div>
          <div className="flex gap-2 mt-4 ml-14">
            <button className="text-xs bg-white/5 px-3 py-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10">
              + Case Study
            </button>
            <button className="text-xs bg-white/5 px-3 py-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10">
              + Best Practice
            </button>
            <button className="text-xs bg-white/5 px-3 py-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10">
              + Question
            </button>
            <button className="text-xs bg-white/5 px-3 py-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10">
              + Win
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                  activeCategory === cat.id
                    ? "bg-amber-500 text-black"
                    : "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500">Sort by:</span>
            <button
              onClick={() => setSortBy("recent")}
              className={`text-sm ${sortBy === "recent" ? "text-white" : "text-neutral-500"}`}
            >
              Recent
            </button>
            <span className="text-neutral-600">|</span>
            <button
              onClick={() => setSortBy("popular")}
              className={`text-sm ${sortBy === "popular" ? "text-white" : "text-neutral-500"}`}
            >
              Popular
            </button>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-amber-500/30 transition cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-semibold shrink-0">
                  {post.author.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-white">{post.author.name}</span>
                    <span className="text-xs text-neutral-500">{post.author.role}</span>
                    <span className="text-xs text-neutral-600">•</span>
                    <span className="text-xs text-neutral-500">{post.timeAgo}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[post.type]}`}>
                      {typeLabels[post.type]}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{post.title}</h3>
                  <p className="text-sm text-neutral-400 line-clamp-2 mb-4">{post.preview}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-amber-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {post.likes}
                      </button>
                      <button className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-white">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        {post.comments}
                      </button>
                      <button className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-white">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        Save
                      </button>
                    </div>
                    <div className="flex gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 bg-white/5 rounded text-neutral-500">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="bg-white/5 px-6 py-3 rounded-lg text-sm text-neutral-400 hover:bg-white/10 hover:text-white">
            Load more posts
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-16 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-neutral-500">
          <p>Business Now Community - A part of the Loud Legacy ecosystem</p>
        </div>
      </footer>
    </div>
  );
}
