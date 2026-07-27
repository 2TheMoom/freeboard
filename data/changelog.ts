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
];
