"use client";

const useCases = [
  {
    title: "Sports & Entertainment",
    audience: "Athletic Directors, Event Managers",
    description: "Run game days without the chaos. Coordinate sponsors, execute moments, track everything.",
    products: ["Sportify", "Legacy CRM", "Business Now"],
    example: "A D1 athletic department manages 40+ home events per year with zero missed sponsor activations.",
    color: "#8B5CF6"
  },
  {
    title: "Real Estate Investment",
    audience: "Investors, Analysts, Underwriters",
    description: "Underwrite deals faster. Model valuations. Track relationships through the pipeline.",
    products: ["VALORA", "Legacy CRM"],
    example: "A regional firm reduced their underwriting time from 3 days to 4 hours per property.",
    color: "#3B82F6"
  },
  {
    title: "Agencies & Consultants",
    audience: "Founders, Solo Operators",
    description: "Structure your chaos. Track clients. Run your business like a business.",
    products: ["Business Now", "Legacy CRM"],
    example: "A consulting agency scaled from 5 to 25 clients without adding administrative overhead.",
    color: "#10B981"
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
