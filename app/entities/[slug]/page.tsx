import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { entities, getEntity } from "../../../data/entities";
import { changelog } from "../../../data/changelog";
import { entityComposite, PILLAR_LABELS, PILLAR_WEIGHTS } from "../../../lib/scoring";
import { ScoreBadge } from "../../../components/ScoreBadge";
import type { PillarKey } from "../../../lib/types";

const PILLAR_ORDER: PillarKey[] = ["audit", "incident", "bounty", "transparency"];

export function generateStaticParams() {
  return entities.map((entity) => ({ slug: entity.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entity = getEntity(slug);
  if (!entity) return {};
  return {
    title: entity.name,
    description: entity.description,
  };
}

export default async function EntityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entity = getEntity(slug);
  if (!entity) notFound();

  const composite = entityComposite(entity);
  const entries = changelog.filter((entry) => entry.entitySlug === entity.slug);

  return (
    <div className="container" style={{ padding: "40px clamp(18px, 4vw, 32px) 64px" }}>
      <Link href="/" className="section-label" style={{ display: "inline-block", marginBottom: 24 }}>
        ← Registry
      </Link>

      <div style={{ display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap", alignItems: "flex-start" }}>
        <div>
          <p className="eyebrow" style={{ marginBottom: 6 }}>
            {entity.category === "bridge" ? "Bridge" : entity.category} · {entity.status}
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(30px, 5vw, 44px)", marginBottom: 10 }}>
            {entity.name}
          </h1>
          <p style={{ color: "var(--text-dim)", fontSize: 15, lineHeight: 1.6, maxWidth: "58ch", marginBottom: 10 }}>
            {entity.description}
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-dim)" }}>
            <a href={entity.website} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
              {entity.website.replace("https://", "")} →
            </a>
            {entity.chains && <span>Chains: {entity.chains.join(", ")}</span>}
            <span>Last reviewed {entity.lastReviewed}</span>
          </div>
        </div>
        <ScoreBadge score={composite} size="lg" />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 32 }}>
        {PILLAR_ORDER.map((key) => {
          const pillar = entity.pillars[key];
          return (
            <div key={key} className="card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8, gap: 12, flexWrap: "wrap" }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 19 }}>
                  {PILLAR_LABELS[key]}
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)", marginLeft: 10 }}>
                    weight {Math.round(PILLAR_WEIGHTS[key] * 100)}%
                  </span>
                </h2>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--text)" }}>
                  {pillar.score === null ? "—" : `${pillar.score.toFixed(1)}/10`}
                </span>
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--text-dim)", marginBottom: pillar.evidence.length ? 12 : 0 }}>
                {pillar.summary}
              </p>
              {pillar.evidence.length > 0 && (
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                  {pillar.evidence.map((ev, i) => (
                    <li key={i}>
                      <a
                        href={ev.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--accent)" }}
                      >
                        {ev.label} — {ev.date} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      {entries.length > 0 && (
        <>
          <p className="section-label" style={{ margin: "36px 0 14px" }}>Score history</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {entries.map((entry, i) => (
              <div key={i} style={{ fontSize: 13, lineHeight: 1.6, borderLeft: "2px solid var(--line)", paddingLeft: 12 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--text-dim)" }}>
                  {entry.date} · {entry.pillar} · {String(entry.from ?? "—")} → {String(entry.to ?? "—")}
                </span>
                <p style={{ color: "var(--text-dim)" }}>{entry.reason}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
