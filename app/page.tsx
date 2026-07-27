import Link from "next/link";
import { Mark, RuleDivider } from "../components/Mark";
import { ScoreBadge, PillarChip } from "../components/ScoreBadge";
import { entities } from "../data/entities";
import { infraPartners } from "../data/infra-partners";
import { entityComposite, sortByComposite, PILLAR_LABELS } from "../lib/scoring";
import type { PillarKey } from "../lib/types";

const PILLAR_ORDER: PillarKey[] = ["audit", "incident", "bounty", "transparency"];

export default function HomePage() {
  const ranked = sortByComposite(entities);

  return (
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
        Arc mainnet hasn&apos;t launched yet, so there&apos;s nothing native to score. What&apos;s real today are the
        bridges that will carry funds onto Arc once it does — so that&apos;s where this registry starts. Native Arc
        protocols get added the moment they deploy.
      </p>

      <RuleDivider />

      <p className="section-label" style={{ marginBottom: 18 }}>Bridges into Arc</p>
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
                  <PillarChip key={key} label={PILLAR_LABELS[key]} score={entity.pillars[key].score} />
                ))}
              </div>
            </Link>
          );
        })}
      </div>

      <RuleDivider />

      <p className="section-label" style={{ marginBottom: 8 }}>Ecosystem infrastructure</p>
      <p style={{ color: "var(--text-dim)", fontSize: 13, marginBottom: 18, maxWidth: "62ch" }}>
        Compliance and analytics infrastructure confirmed on Arc&apos;s testnet. Not scored under the same rubric as
        bridges — a KYT vendor doesn&apos;t have a &quot;bug bounty&quot; posture the way a bridge does — listed here
        for context.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
        {infraPartners.map((partner) => (
          <div key={partner.slug} className="card">
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, marginBottom: 6 }}>{partner.name}</h3>
            <p style={{ color: "var(--text-dim)", fontSize: 13, lineHeight: 1.5, marginBottom: 8 }}>
              {partner.description}
            </p>
            <p style={{ fontSize: 12.5, lineHeight: 1.5 }}>{partner.role}</p>
            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)", display: "inline-block", marginTop: 10 }}
            >
              {partner.website.replace("https://", "")} →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
