const relationships = [
  { from: "Hub", to: "VALORA", label: "Shared identity" },
  { from: "Hub", to: "VenueVR", label: "Unified analytics" },
  { from: "Hub", to: "Business Now", label: "Billing & SSO" },
  { from: "Hub", to: "Sportify", label: "Event coordination" },
  { from: "Hub", to: "Legacy CRM", label: "Cross-platform CRM" }
];

export function RelationshipMap() {
  return (
    <section className="section section--alt" id="ecosystem">
      <div className="container">
        <h2 style={{ fontSize: "var(--font-size-2xl)", marginBottom: "var(--space-4)" }}>
          One platform, many ways to build
        </h2>
        <p style={{ color: "var(--color-text-secondary)", maxWidth: 720 }}>
          Loud Legacy orchestrates identity, billing, content, and analytics across every brand. The hub
          connects the dots so builders can move between products without friction.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "var(--space-4)",
            marginTop: "var(--space-6)"
          }}
        >
          {relationships.map((connection) => (
            <div key={`${connection.from}-${connection.to}`} className="card" style={{ position: "relative" }}>
              <strong>{connection.from} → {connection.to}</strong>
              <p style={{ color: "var(--color-text-secondary)", marginTop: "var(--space-2)" }}>{connection.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
