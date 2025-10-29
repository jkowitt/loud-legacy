import Link from "next/link";

const courseTracks = [
  {
    title: "Launch Foundations",
    duration: "4 weeks • Cohort + self-paced",
    focus: "Validate, incorporate, and build your first offer with confidence.",
    takeaways: ["Idea validation sprint", "Entity setup & compliance", "Early adopter interview kit"]
  },
  {
    title: "Revenue Engine",
    duration: "5 weeks • Cohort",
    focus: "Ship a repeatable go-to-market engine with pricing experiments baked in.",
    takeaways: ["ICP and positioning playbook", "Marketing funnel instrumentation", "Sales pipeline & outreach workflow"]
  },
  {
    title: "Financial Command",
    duration: "3 weeks • Self-paced",
    focus: "Understand runway, margins, and cashflow so you can make confident bets.",
    takeaways: ["Profit margin calculator", "Scenario planning templates", "Investor update rhythm"]
  },
  {
    title: "Team Ops",
    duration: "4 weeks • Cohort",
    focus: "Build hiring, onboarding, and SOP systems that scale beyond the founder.",
    takeaways: ["Hiring scorecards & rubric", "Onboarding journeys", "Accountability cadences"]
  }
];

const learningFormats = [
  {
    title: "Self-paced modules",
    description: "Video + worksheet experiences that can be completed independently or shared with a team."
  },
  {
    title: "Cohort programs",
    description:
      "Live weekly sessions with founders, accountability circles, and expert feedback on deliverables."
  },
  {
    title: "Operator labs",
    description:
      "Hands-on build sessions to wire templates into your existing tools (Notion, Google Workspace, Airtable)."
  }
];

const upcomingCohorts = [
  {
    title: "Launch Foundations",
    start: "Next cohort starts June 17",
    seats: "25 seats remaining",
    link: "/coaching"
  },
  {
    title: "Revenue Engine",
    start: "Next cohort starts July 8",
    seats: "18 seats remaining",
    link: "/coaching"
  }
];

const supportResources = [
  "Weekly AMA with operators who scaled to $1M+ ARR",
  "Private community channels per course with template swaps",
  "Course completion certificates for investors or accelerators",
  "Progress syncs to the main dashboard and Launch Checklist"
];

export default function CoursesPage() {
  return (
    <main className="page-shell">
      <div className="breadcrumbs">
        <Link href="/">Business Now</Link>
        <span>•</span>
        <span>Courses</span>
      </div>

      <section className="page-hero">
        <h1>Course library</h1>
        <p>
          Level up every business function with operator-built curriculum. Mix self-paced modules with live
          cohort labs to keep momentum high.
        </p>
        <div style={{ display: "flex", gap: "var(--space-3)", justifyContent: "center", flexWrap: "wrap" }}>
          <Link className="button" href="/coaching">
            Join upcoming cohort
          </Link>
          <Link className="button button--ghost" href="/">
            Back to overview
          </Link>
        </div>
      </section>

      <section className="panel">
        <div className="panel__headline">
          <h2>Tracks built for each stage</h2>
          <p>Pick the missions that match your current focus or follow the end-to-end launch path.</p>
        </div>
        <div className="grid grid--two">
          {courseTracks.map((track) => (
            <article key={track.title} className="card">
              <span className="tag">{track.duration}</span>
              <h3>{track.title}</h3>
              <p>{track.focus}</p>
              <ul>
                {track.takeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel__headline">
          <h2>Choose the learning format that fits</h2>
          <p>Each program offers the flexibility to learn solo, with a team, or alongside a cohort.</p>
        </div>
        <div className="grid grid--three">
          {learningFormats.map((format) => (
            <article key={format.title} className="card">
              <h3>{format.title}</h3>
              <p>{format.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel__headline">
          <h2>Upcoming live cohorts</h2>
          <p>Secure your seat to receive pre-work, accountability partners, and facilitator office hours.</p>
        </div>
        <div className="grid grid--two">
          {upcomingCohorts.map((cohort) => (
            <article key={cohort.title} className="card">
              <h3>{cohort.title}</h3>
              <p>{cohort.start}</p>
              <p style={{ color: "var(--color-brand-accent-500)" }}>{cohort.seats}</p>
              <Link className="button" href={cohort.link}>
                Reserve seat
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel__headline">
          <h2>Support ecosystem</h2>
          <p>Everything is built to keep you accountable even after the videos end.</p>
        </div>
        <ul className="list-reset">
          {supportResources.map((resource) => (
            <li key={resource}>
              <p>{resource}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
