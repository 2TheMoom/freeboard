import type { Metadata } from "next";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { PILLAR_LABELS, PILLAR_WEIGHTS } from "../../lib/scoring";
import type { PillarKey } from "../../lib/types";

export const metadata: Metadata = {
  title: "Methodology",
  description: "How Freeboard scores bridges and protocols, and how to dispute a rating.",
};

const PILLAR_ORDER: PillarKey[] = ["audit", "incident", "bounty", "transparency"];

const PILLAR_COPY: Record<PillarKey, string> = {
  audit: "How many independent audits an entity has had, how recent they are, and whether the auditors are reputable, established firms. A single audit from three years ago scores lower than an ongoing series of audits covering recent changes.",
  incident: "What's actually gone wrong, and how badly. A large loss scores low; a loss where the architecture protected end users (rather than the protocol's own capital) scores better than one where users were the ones who lost funds. Old, fully-remediated incidents recover over time — but a catastrophic-tier loss keeps a real, permanent floor on this pillar; it never fully decays away.",
  bounty: "Whether a live bug bounty program exists, what it actually pays for a critical finding (not just the advertised ceiling), and whether it has a track record of real payouts rather than just a page nobody reads.",
  transparency: "Multisig thresholds, timelocks on upgrades, and whether admin/upgrade key holders are disclosed. A protocol that can be silently upgraded by a small group with no delay scores lower than one with public, time-delayed governance — including a protocol whose safeguards come from a different, non-multisig source, since this pillar specifically measures decentralized-governance signals.",
};

const PILLAR_FORMULA: Record<PillarKey, string> = {
  audit: "computed from confirmed audit count, how recently the latest one shipped, and whether any auditor is a well-known firm",
  incident: "computed from each incident's dollar loss (both absolute and as a share of TVL at the time), how long ago it happened, whether users or the protocol absorbed it, and whether it was fixed — capped low for any single catastrophic-scale loss regardless of the other factors",
  bounty: "computed from the maximum advertised payout tier, plus a bonus if a real payout is confirmed",
  transparency: "computed from disclosed multisig signer count and threshold, timelock length, minus a point per specific documented governance concern",
};

export default function MethodologyPage() {
  return (
    <>
    <SiteHeader />
    <div className="container" style={{ padding: "40px clamp(18px, 4vw, 32px) 64px", maxWidth: 720 }}>
      <p className="eyebrow" style={{ marginBottom: 10 }}>Methodology</p>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 38px)", marginBottom: 18 }}>
        How scores get made
      </h1>
      <p style={{ color: "var(--text-dim)", fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>
        Every score on Freeboard comes from confirmed facts — audit counts, incident dollar amounts, bounty
        ceilings, governance disclosures — run through a documented, mechanical formula, not a subjective call.
        A human still confirms which real-world facts actually belong to which entity before they count for
        anything: automated matching is a real risk here, not a hypothetical one — DefiLlama tracks Wormhole&apos;s
        2022 hack under &quot;Portal,&quot; its old product name, so an unsupervised auto-match would have shown it
        as incident-free. If a pillar&apos;s facts can&apos;t be confirmed, it&apos;s marked &quot;Rating pending,&quot;
        not guessed at — that applies even to entities otherwise fully reviewed.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 36 }}>
        {PILLAR_ORDER.map((key) => (
          <div key={key} className="card">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 19 }}>{PILLAR_LABELS[key]}</h2>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)" }}>
                {Math.round(PILLAR_WEIGHTS[key] * 100)}% weight
              </span>
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--text-dim)", marginBottom: 10 }}>{PILLAR_COPY[key]}</p>
            <p style={{ fontSize: 12, lineHeight: 1.6, color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
              Formula: {PILLAR_FORMULA[key]}
            </p>
          </div>
        ))}
      </div>

      <p className="section-label" style={{ marginBottom: 10 }}>The composite</p>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-dim)", marginBottom: 32 }}>
        Track record — what&apos;s been audited and what&apos;s gone wrong — makes up 60% of the score (30% audit,
        30% incidents), weighted equally because both are direct evidence. Structural safeguards — bug bounty
        programs and custody/upgrade transparency — make up the other 40% (20% each), weighted lower because
        they&apos;re leading indicators rather than proof of outcomes. If any one pillar is unrated, the composite
        score is withheld entirely rather than averaged from the remaining three — a partial score would
        misrepresent how confident the rating actually is.
      </p>

      <p className="section-label" style={{ marginBottom: 10 }}>Review cadence &amp; disputes</p>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-dim)", marginBottom: 8 }}>
        Entities are re-reviewed when a material event occurs (a new audit, an incident, a bounty program change) and
        otherwise on an ongoing basis. Every score change is recorded on the <a href="/changelog" style={{ color: "var(--accent)" }}>changelog</a> with
        a dated reason — nothing changes silently.
      </p>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-dim)" }}>
        If you believe a rating is inaccurate or out of date, email{" "}
        <a href="mailto:corrections@freeboard.xyz" style={{ color: "var(--accent)" }}>
          corrections@freeboard.xyz
        </a>{" "}
        with the entity name and what you believe is wrong, ideally with a source. Corrections are reflected in the
        changelog, not made silently.
      </p>
    </div>
    <SiteFooter />
    </>
  );
}
