import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { changelog } from "../../data/changelog";
import { getEntity } from "../../data/entities";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Every score change on Freeboard, in order, with a reason.",
};

function entityName(slug: string): string {
  return getEntity(slug)?.name ?? slug;
}

export default function ChangelogPage() {
  const sorted = [...changelog].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
    <SiteHeader />
    <div className="container" style={{ padding: "40px clamp(18px, 4vw, 32px) 64px", maxWidth: 720 }}>
      <p className="eyebrow" style={{ marginBottom: 10 }}>Changelog</p>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 38px)", marginBottom: 18 }}>
        Score history
      </h1>
      <p style={{ color: "var(--text-dim)", fontSize: 14.5, lineHeight: 1.6, marginBottom: 32 }}>
        Every rating change, in order. Nothing on Freeboard changes silently.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {sorted.map((entry, i) => (
          <div key={i} style={{ borderLeft: "2px solid var(--line)", paddingLeft: 16 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-dim)", marginBottom: 4 }}>
              {entry.date}
            </div>
            <Link href={`/entities/${entry.entitySlug}`} style={{ fontFamily: "var(--font-display)", fontSize: 18 }}>
              {entityName(entry.entitySlug)}
            </Link>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--accent)", margin: "4px 0" }}>
              {entry.pillar}: {String(entry.from ?? "—")} → {String(entry.to ?? "—")}
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--text-dim)" }}>{entry.reason}</p>
          </div>
        ))}
      </div>
    </div>
    <SiteFooter />
    </>
  );
}
