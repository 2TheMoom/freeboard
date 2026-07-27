import Link from "next/link";

export function SiteFooter() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--line)",
        marginTop: "auto",
      }}
    >
      <div
        className="container"
        style={{
          padding: "20px clamp(18px, 4vw, 32px)",
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          justifyContent: "space-between",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--text-dim)",
        }}
      >
        <span>Freeboard is not financial advice. See the <Link href="/methodology" style={{ color: "var(--accent)" }}>methodology</Link>.</span>
        <a href="mailto:corrections@freeboard.xyz" style={{ color: "var(--accent)" }}>
          Report an inaccuracy
        </a>
      </div>
    </footer>
  );
}
