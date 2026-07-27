import Link from "next/link";
import { Mark } from "./Mark";

const NAV = [
  { href: "/", label: "Registry" },
  { href: "/methodology", label: "Methodology" },
  { href: "/changelog", label: "Changelog" },
];

export function SiteHeader() {
  return (
    <header
      style={{
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "18px clamp(18px, 4vw, 32px)",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Mark size={28} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: 20, letterSpacing: "-0.01em" }}>
            Freeboard
          </span>
        </Link>
        <nav style={{ display: "flex", gap: 22 }}>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--text-dim)",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
