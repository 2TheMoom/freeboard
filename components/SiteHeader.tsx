import Link from "next/link";
import { Mark } from "./Mark";

const NAV = [
  { href: "/?view=registry", label: "Registry" },
  { href: "/methodology", label: "Methodology" },
  { href: "/changelog", label: "Changelog" },
];

export function SiteHeader({ onLogoClick }: { onLogoClick?: () => void }) {
  const logo = (
    <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <Mark size={28} />
      <span style={{ fontFamily: "var(--font-display)", fontSize: 20, letterSpacing: "-0.01em" }}>
        Freeboard
      </span>
    </span>
  );

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
          flexWrap: "wrap",
          rowGap: 10,
          columnGap: 16,
          padding: "18px clamp(18px, 4vw, 32px)",
        }}
      >
        {onLogoClick ? (
          <button
            type="button"
            onClick={onLogoClick}
            style={{ background: "none", border: 0, padding: 0, cursor: "pointer", color: "inherit" }}
          >
            {logo}
          </button>
        ) : (
          <Link href="/">{logo}</Link>
        )}
        <nav style={{ display: "flex", gap: "10px clamp(12px, 4vw, 22px)", flexWrap: "wrap" }}>
          {(onLogoClick ? NAV.filter((item) => item.label !== "Registry") : NAV).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--text-dim)",
                whiteSpace: "nowrap",
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
