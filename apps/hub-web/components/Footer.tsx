export function Footer() {
  return (
    <footer className="footer">
      <div className="container" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "var(--space-4)" }}>
        <div>
          <strong>Loud Legacy</strong>
          <p style={{ margin: 0, color: "var(--color-text-secondary)" }}>
            United product family for operators, venues, and makers.
          </p>
        </div>
        <div style={{ display: "flex", gap: "var(--space-4)", alignItems: "center" }}>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/status">Status</a>
          <a href="mailto:press@loudlegacy.com">press@loudlegacy.com</a>
        </div>
      </div>
    </footer>
  );
}
