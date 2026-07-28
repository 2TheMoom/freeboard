"use client";

import { useState } from "react";
import Link from "next/link";
import { Mark, RuleDivider } from "./Mark";
import { SiteFooter } from "./SiteFooter";
import { entities } from "../data/entities";
import { entityComposite, sortByComposite } from "../lib/scoring";

const PROBLEMS = [
  {
    title: "No track record, no red flags",
    body: "Bridging blind means you don't know what's been audited, or what's already gone wrong and to whom.",
  },
  {
    title: "Bug bounties nobody checks",
    body: "A program page can look reassuring while capping critical payouts at $5,000 — far below what peers offer.",
  },
  {
    title: "Keys nobody discloses",
    body: "A protocol can be one inactive multisig signer away from a silent takeover, with no public record of it.",
  },
];

const PILLARS = [
  { label: "Audit history", weight: "30%", body: "How many audits, how recent, and how reputable the auditors are." },
  { label: "Incident record", weight: "30%", body: "What's actually gone wrong, and who ended up bearing the loss." },
  { label: "Bug bounty", weight: "20%", body: "What a critical finding actually pays, not just the advertised ceiling." },
  { label: "Transparency", weight: "20%", body: "Multisig thresholds, timelocks, and disclosed upgrade authority." },
];

const FAQ = [
  {
    q: "How do you decide what gets reviewed next?",
    a: "Manual research takes real time per entity — sourcing audits, confirming incident dollar amounts, checking bounty payout history. Coverage grows deliberately rather than all at once; search reaches anything, but only reviewed entities get a composite score.",
  },
  {
    q: "Why do some entities show \"Rating pending\" on just one pillar?",
    a: "Because a fact couldn't be confirmed, not because it doesn't exist. Across, for instance, is fully reviewed on audits, incidents, and bounty — but its specific multisig/timelock configuration wasn't publicly confirmable, so transparency stays pending and no composite score is shown, rather than guessing.",
  },
  {
    q: "How often do ratings change?",
    a: "Entities are re-reviewed when something material happens — a new audit, an incident, a bounty program change — and otherwise on an ongoing basis. Every change is dated and reasoned on the changelog.",
  },
  {
    q: "What if a rating is wrong?",
    a: "Email corrections@freeboard.xyz with the entity name and a source. Corrections get reflected in the changelog, never made silently.",
  },
];

export function Landing({ onOpenRegistry }: { onOpenRegistry: () => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const ranked = sortByComposite(entities);
  const evidenceCount = entities.reduce(
    (sum, e) => sum + Object.values(e.pillars).reduce((s, p) => s + p.evidence.length, 0),
    0
  );

  return (
    <>
      <header style={{ borderBottom: "1px solid var(--line)" }}>
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
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Mark size={28} />
            <span style={{ fontFamily: "var(--font-display)", fontSize: 20, letterSpacing: "-0.01em" }}>
              Freeboard
            </span>
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "10px clamp(12px, 4vw, 22px)", flexWrap: "wrap" }}>
            <Link
              href="/methodology"
              style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-dim)" }}
            >
              Methodology
            </Link>
            <button
              type="button"
              onClick={onOpenRegistry}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--bg)",
                background: "var(--accent)",
                border: 0,
                padding: "8px 14px",
                cursor: "pointer",
              }}
            >
              View Registry
            </button>
          </div>
        </div>
      </header>

      <div className="container" style={{ padding: "clamp(48px, 8vw, 88px) clamp(18px, 4vw, 32px) 0" }}>
        <p className="eyebrow" style={{ marginBottom: 14 }}>Bridge / protocol health registry</p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(34px, 6vw, 56px)",
            lineHeight: 1.08,
            letterSpacing: "-0.01em",
            maxWidth: "16ch",
            marginBottom: 20,
          }}
        >
          Know what you&apos;re trusting before you bridge.
        </h1>
        <p style={{ maxWidth: "56ch", color: "var(--text-dim)", fontSize: 16, lineHeight: 1.65, marginBottom: 28 }}>
          Freeboard scores bridges and protocols across crypto on audit history, incident record, bug bounty, and
          transparency — every score computed from confirmed facts through a documented formula, never a guess.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
          <button
            type="button"
            onClick={onOpenRegistry}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "var(--bg)",
              background: "var(--accent)",
              border: 0,
              padding: "13px 22px",
              cursor: "pointer",
            }}
          >
            View the Registry →
          </button>
          <Link
            href="/methodology"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "var(--text)",
              border: "1px solid var(--line)",
              padding: "13px 22px",
            }}
          >
            Read the methodology
          </Link>
        </div>

        <button
          type="button"
          onClick={onOpenRegistry}
          className="card"
          style={{ display: "block", width: "100%", textAlign: "left", cursor: "pointer", maxWidth: 420 }}
        >
          <p className="section-label" style={{ marginBottom: 12 }}>Live preview</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {ranked.map((e) => (
              <div key={e.slug} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 16 }}>{e.name}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--accent)" }}>
                  {entityComposite(e)?.toFixed(1) ?? "—"}/10
                </span>
              </div>
            ))}
          </div>
        </button>
      </div>

      <div className="container" style={{ padding: "clamp(56px, 8vw, 88px) clamp(18px, 4vw, 32px) 0" }}>
        <RuleDivider />
        <p className="section-label" style={{ marginBottom: 18 }}>What bridging blind looks like</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginBottom: 24 }}>
          {PROBLEMS.map((p) => (
            <div key={p.title} className="card">
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 17, marginBottom: 8 }}>{p.title}</h3>
              <p style={{ color: "var(--text-dim)", fontSize: 13.5, lineHeight: 1.55 }}>{p.body}</p>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={onOpenRegistry}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12.5,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "var(--accent)",
            background: "none",
            border: 0,
            padding: 0,
            cursor: "pointer",
          }}
        >
          See who scores well →
        </button>
      </div>

      <div className="container" style={{ padding: "clamp(56px, 8vw, 88px) clamp(18px, 4vw, 32px) 0" }}>
        <RuleDivider />
        <p className="section-label" style={{ marginBottom: 18 }}>How a score gets made</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {PILLARS.map((p) => (
            <div key={p.label} className="card">
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16 }}>{p.label}</h3>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)" }}>{p.weight}</span>
              </div>
              <p style={{ color: "var(--text-dim)", fontSize: 13, lineHeight: 1.55 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="container" style={{ padding: "clamp(56px, 8vw, 88px) clamp(18px, 4vw, 32px) 0" }}>
        <RuleDivider />
        <p className="section-label" style={{ marginBottom: 10 }}>Proof, not promises</p>
        <p style={{ color: "var(--text-dim)", fontSize: 14.5, lineHeight: 1.6, maxWidth: "58ch" }}>
          {entities.length} entities rated so far, backed by {evidenceCount} cited public sources — audit reports,
          incident writeups, bounty program pages. No live counter, no invented statistic: that number is just how
          many evidence links are attached to today&apos;s scores, and it grows only when a real source does.
        </p>
      </div>

      <div className="container" style={{ padding: "clamp(56px, 8vw, 88px) clamp(18px, 4vw, 32px) 0" }}>
        <RuleDivider />
        <p className="section-label" style={{ marginBottom: 18 }}>Questions</p>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {FAQ.map((item, i) => {
            const open = openFaq === i;
            return (
              <div key={item.q} style={{ borderTop: "1px solid var(--line)" }}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(open ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                    padding: "16px 0",
                    background: "none",
                    border: 0,
                    textAlign: "left",
                    cursor: "pointer",
                    color: "var(--text)",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 16 }}>{item.q}</span>
                  <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)", flexShrink: 0 }}>
                    {open ? "−" : "+"}
                  </span>
                </button>
                {open && (
                  <p style={{ color: "var(--text-dim)", fontSize: 13.5, lineHeight: 1.6, paddingBottom: 18, maxWidth: "60ch" }}>
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="container" style={{ padding: "clamp(56px, 8vw, 88px) clamp(18px, 4vw, 32px) 0" }}>
        <RuleDivider />
        <div
          className="card"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, flexWrap: "wrap" }}
        >
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: 4 }}>Ready to look before you bridge?</h2>
            <p style={{ color: "var(--text-dim)", fontSize: 13.5 }}>Four bridges, four pillars, every score sourced.</p>
          </div>
          <button
            type="button"
            onClick={onOpenRegistry}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "var(--bg)",
              background: "var(--accent)",
              border: 0,
              padding: "13px 22px",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            View the Registry →
          </button>
        </div>
      </div>

      <SiteFooter />
    </>
  );
}
