import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "../../../components/SiteHeader";
import { SiteFooter } from "../../../components/SiteFooter";
import { getProtocolBySlug } from "../../../lib/defillama";

export const dynamic = "force-dynamic";

function formatTvl(tvl: number | null | undefined): string {
  if (!tvl) return "Not reported";
  if (tvl >= 1_000_000_000) return `$${(tvl / 1_000_000_000).toFixed(2)}B`;
  if (tvl >= 1_000_000) return `$${(tvl / 1_000_000).toFixed(1)}M`;
  if (tvl >= 1_000) return `$${(tvl / 1_000).toFixed(0)}K`;
  return `$${tvl.toFixed(0)}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const protocol = await getProtocolBySlug(slug);
  if (!protocol) return {};
  return {
    title: `${protocol.name} (not yet reviewed)`,
    description: `${protocol.name} — discovered via search, not yet independently reviewed by Freeboard.`,
  };
}

const PENDING_PILLARS = [
  { label: "Incident record", note: "DefiLlama's hack database exists but uses inconsistent naming for the same protocol across time — Freeboard doesn't auto-attribute incidents without a human confirming the match." },
  { label: "Bug bounty", note: "No official bounty API exists to auto-populate this reliably yet." },
  { label: "Transparency", note: "Multisig thresholds and upgrade-key disclosure require reading a protocol's own docs — not something any live data source reports today." },
];

export default async function DiscoverPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const protocol = await getProtocolBySlug(slug);
  if (!protocol) notFound();

  const auditCount = Number(protocol.audits) || 0;
  const hasNoLiveSignal = !protocol.tvl && (protocol.chains?.length ?? 0) === 0 && auditCount === 0;

  return (
    <>
      <SiteHeader />
      <div className="container" style={{ padding: "40px clamp(18px, 4vw, 32px) 64px" }}>
        <Link href="/?view=registry" className="section-label" style={{ display: "inline-block", marginBottom: 24 }}>
          ← Registry
        </Link>

        <div
          className="card"
          style={{ marginBottom: 24, borderColor: "var(--score-mid)", display: "flex", alignItems: "center", gap: 10 }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--score-mid)" }}>
            Not yet independently reviewed
          </span>
          <span style={{ fontSize: 12.5, color: "var(--text-dim)" }}>
            Found via search, not on Freeboard&apos;s hand-researched list — see what&apos;s real below.
          </span>
        </div>

        {hasNoLiveSignal && (
          <p style={{ fontSize: 12.5, lineHeight: 1.6, color: "var(--text-dim)", marginBottom: 24, maxWidth: "62ch" }}>
            DefiLlama has no TVL, chain, or audit data on file for this one — common for routers and aggregators
            that don&apos;t hold funds themselves, but it can also just mean DefiLlama&apos;s listing is thin. Every
            &quot;not reported&quot; below reflects that gap, not a problem with this page.
          </p>
        )}

        <p className="eyebrow" style={{ marginBottom: 6 }}>{protocol.category}</p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(30px, 5vw, 44px)", marginBottom: 10 }}>
          {protocol.name}
        </h1>
        {protocol.description && (
          <p style={{ color: "var(--text-dim)", fontSize: 15, lineHeight: 1.6, maxWidth: "58ch", marginBottom: 10 }}>
            {protocol.description}
          </p>
        )}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-dim)" }}>
          {protocol.url && (
            <a href={protocol.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
              {protocol.url.replace(/^https?:\/\//, "")} →
            </a>
          )}
          {protocol.chains?.length > 0 && <span>Chains: {protocol.chains.join(", ")}</span>}
          <span>TVL: {formatTvl(protocol.tvl)}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 32 }}>
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 19 }}>Audit signal</h2>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 18 }}>
                {auditCount > 0 ? `${auditCount} linked` : "None linked"}
              </span>
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--text-dim)", marginBottom: protocol.audit_links?.length ? 12 : 0 }}>
              {auditCount > 0
                ? `DefiLlama lists ${auditCount} audit report${auditCount === 1 ? "" : "s"} for this protocol. This is raw source data, not a Freeboard-reviewed judgment of audit quality or recency.`
                : "DefiLlama doesn't have an audit report linked for this protocol. That may mean none exist publicly, or simply that DefiLlama's listing is incomplete — not a confirmed absence."}
            </p>
            {protocol.audit_links?.length > 0 && (
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                {protocol.audit_links.map((url, i) => (
                  <li key={i}>
                    <a href={url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--accent)" }}>
                      Audit report {i + 1} ↗
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {PENDING_PILLARS.map((p) => (
            <div key={p.label} className="card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 19 }}>{p.label}</h2>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-dim)" }}>Rating pending</span>
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--text-dim)" }}>{p.note}</p>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--text-dim)", marginTop: 28 }}>
          Want {protocol.name} fully reviewed? Email{" "}
          <a href={`mailto:corrections@freeboard.xyz?subject=Review request: ${protocol.name}`} style={{ color: "var(--accent)" }}>
            corrections@freeboard.xyz
          </a>{" "}
          — see the <Link href="/methodology" style={{ color: "var(--accent)" }}>methodology</Link> for what a full review involves.
        </p>
      </div>
      <SiteFooter />
    </>
  );
}
