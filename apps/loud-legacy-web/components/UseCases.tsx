"use client";

const useCases = [
  {
    title: "Commercial Real Estate",
    audience: "Investors, Analysts, Underwriters",
    description: "Underwrite deals faster with AI-powered valuations, automated comps, and sophisticated financial modeling.",
    products: ["Legacy RE"],
    example: "A regional firm reduced their underwriting time from 3 days to 4 hours per property.",
    color: "#1B2A4A"
  },
  {
    title: "Brokerage & Advisory",
    audience: "Brokers, Advisors, Appraisers",
    description: "Create professional valuations for client pitches, support pricing recommendations, and win more listings.",
    products: ["Legacy RE"],
    example: "A brokerage team increased listing presentations by 40% using AI-powered market intelligence.",
    color: "#D4A843"
  },
  {
    title: "Lending & Capital Markets",
    audience: "Lenders, Credit Analysts, Portfolio Managers",
    description: "Standardize underwriting, assess borrower assumptions, and make confident lending decisions backed by data.",
    products: ["Legacy RE"],
    example: "A lending team standardized underwriting across 200+ annual loan applications with consistent analysis.",
    color: "#1B2A4A"
  }
];

export function UseCases() {
  return (
    <section className="use-cases-section">
      <div className="container">
        <div className="section-header">
          <h2>Built for how you actually work</h2>
          <p>Different industries. Same need: structure over chaos.</p>
        </div>

        <div className="use-cases-grid">
          {useCases.map((useCase) => (
            <div key={useCase.title} className="use-case-card">
              <div className="use-case-header" style={{ borderLeftColor: useCase.color }}>
                <h3>{useCase.title}</h3>
                <span className="audience">{useCase.audience}</span>
              </div>
              <p className="use-case-description">{useCase.description}</p>
              <div className="products-used">
                {useCase.products.map((product) => (
                  <span key={product} className="product-tag">{product}</span>
                ))}
              </div>
              <div className="use-case-example">
                <span className="example-label">Real example:</span>
                <p>{useCase.example}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
