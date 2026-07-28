import type { ChangelogEntry } from "../lib/types";

export const changelog: ChangelogEntry[] = [
  {
    date: "2026-07-27",
    entitySlug: "wormhole",
    pillar: "composite",
    from: null,
    to: 6.9,
    reason:
      "Initial rating published at Freeboard v1 launch. Strong audit trail (29 audits) and proven bounty payout history offset by the 2022 $326M exploit, which is still weighing on the incident pillar despite a clean record since.",
  },
  {
    date: "2026-07-27",
    entitySlug: "stargate",
    pillar: "composite",
    from: null,
    to: 6.3,
    reason:
      "Initial rating published at Freeboard v1 launch. Solid audit and bounty posture, but the transparency pillar is held down by documented multisig/timelock weaknesses and LayerZero Foundation's takeover of Stargate's governance.",
  },
  {
    date: "2026-07-27",
    entitySlug: "across",
    pillar: "composite",
    from: null,
    to: 6.7,
    reason:
      "Initial rating published at Freeboard v1 launch, nine days after the July 17, 2026 relayer incident. Scored with that incident factored in — the intents architecture meant the loss landed on the protocol's own capital, not users, which is reflected in the incident score.",
  },
  {
    date: "2026-07-27",
    entitySlug: "cctp",
    pillar: "composite",
    from: null,
    to: 5.8,
    reason:
      "Initial rating published at Freeboard v1 launch. Strongest audit trail in this cohort and a structurally sound burn-and-mint design, but pulled down significantly by a bug bounty program capped at $5,000 for critical severity — an outlier low versus every other entity rated here.",
  },
  {
    date: "2026-07-28",
    entitySlug: "wormhole",
    pillar: "composite",
    from: 6.9,
    to: 7.5,
    reason:
      "Switched from a holistic judgment call per pillar to a documented formula computed from confirmed facts (audit count/recency, incident $ loss vs. TVL at the time, bounty tier, governance disclosures). The incident pillar now permanently caps at a low ceiling for any single loss over $100M, regardless of time decay — the Feb 2022 $326M exploit (about 20% of TVL that day, confirmed via DefiLlama's historical chart) keeps weighing on the score for that reason, not despite it.",
  },
  {
    date: "2026-07-28",
    entitySlug: "stargate",
    pillar: "composite",
    from: 6.3,
    to: 6.6,
    reason: "Same formula switch as Wormhole. Facts confirmed and reused from the original review; no new findings.",
  },
  {
    date: "2026-07-28",
    entitySlug: "cctp",
    pillar: "composite",
    from: 5.8,
    to: 5.3,
    reason: "Same formula switch as Wormhole. Facts confirmed and reused from the original review; no new findings.",
  },
  {
    date: "2026-07-28",
    entitySlug: "across",
    pillar: "composite",
    from: 6.7,
    to: null,
    reason:
      "Same formula switch as Wormhole. Across's audit, incident, and bounty pillars all recompute cleanly, but its specific multisig signer count and timelock length could not be confirmed after a real attempt (its own docs and a general search didn't surface them) — the transparency pillar is now marked Rating pending rather than carrying forward a number that was never backed by a confirmed fact, which means the composite is withheld too. This is a direct, intended consequence of the stricter methodology, not a data-quality regression.",
  },
  {
    date: "2026-07-28",
    entitySlug: "wormhole",
    pillar: "metadata",
    from: "Arc-scoped registry",
    to: "general crypto/web3 registry",
    reason:
      "Freeboard dropped its Arc-only framing across the whole site (this entry marks the change; it applies to all four reviewed entities, not just Wormhole). The 4 reviewed bridges don't change — they were never Arc-exclusive — only the reason they're being shown stops being \"these are the bridges into Arc.\" The removed \"Ecosystem infrastructure\" section (Elliptic, TRM Labs) is not replaced in this pass since its whole rationale was Arc-testnet participation.",
  },
];
