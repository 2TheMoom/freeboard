import Link from "next/link";
import { Mark, RuleDivider } from "./Mark";
import { ScoreBadge, PillarChip } from "./ScoreBadge";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { SearchBox } from "./SearchBox";
import { entities } from "../data/entities";
import { entityComposite, sortByComposite, pillarScore, PILLAR_LABELS } from "../lib/scoring";
import type { PillarKey } from "../lib/types";

const PILLAR_ORDER: PillarKey[] = ["audit", "incident", "bounty", "transparency"];

export function Registry({ onGoLanding }: { onGoLanding: () => void }) {
  const ranked = sortByComposite(entities);

  return (
    <>
      <SiteHeader onLogoClick={onGoLanding} />
      <div className="container" style={{ padding: "48px clamp(18px, 4vw, 32px) 64px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
          <Mark size={48} />
          <div>
            <p className="eyebrow" style={{ marginBottom: 4 }}>Bridge / protocol health registry</p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 38px)", letterSpacing: "-0.01em" }}>
              Freeboard
            </h1>
          </div>
        </div>
        <p style={{ maxWidth: "62ch", color: "var(--text-dim)", fontSize: 15, lineHeight: 1.6 }}>
          Every score below is computed from confirmed facts — audit counts, incident dollars, bounty ceilings,
          governance disclosures — through a documented formula, not a gut call. Search reaches any bridge or
          protocol; only what&apos;s below has been independently reviewed.
        </p>

        <div style={{ margin: "28px 0" }}>
          <p className="section-label" style={{ marginBottom: 10 }}>Search any bridge or protocol</p>
          <SearchBox />
          <p style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 8, maxWidth: "58ch" }}>
            Live-searches ~8,000 protocols via DefiLlama. Anything outside the reviewed list below shows real data —
            TVL, chains, audit links — but no composite score until it&apos;s been independently reviewed.
          </p>
        </div>

        <RuleDivider />

        <p className="section-label" style={{ marginBottom: 18 }}>Reviewed bridges &amp; protocols</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {ranked.map((entity) => {
            const composite = entityComposite(entity);
            return (
              <Link key={entity.slug} href={`/entities/${entity.slug}`} className="card" style={{ display: "block" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
                  <div style={{ flex: "1 1 260px" }}>
                    <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: 6 }}>{entity.name}</h2>
                    <p style={{ color: "var(--text-dim)", fontSize: 13.5, lineHeight: 1.5, maxWidth: "52ch" }}>
                      {entity.description}
                    </p>
                  </div>
                  <ScoreBadge score={composite} size="lg" />
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                    gap: 8,
                    marginTop: 16,
                  }}
                >
                  {PILLAR_ORDER.map((key) => (
                    <PillarChip key={key} label={PILLAR_LABELS[key]} score={pillarScore(entity.pillars, key)} />
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
