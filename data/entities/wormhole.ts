import type { ScoredEntity } from "../../lib/types";

export const wormhole: ScoredEntity = {
  slug: "wormhole",
  name: "Wormhole",
  category: "bridge",
  status: "live",
  website: "https://wormhole.com",
  description:
    "General message-passing bridge secured by a 19-node Guardian network, connecting 30+ chains including Solana, Ethereum, and most major L2s.",
  chains: ["Ethereum", "Solana", "Arc (via CCTP integration)"],
  lastReviewed: "2026-07-28",
  defillamaSlug: "portal",
  pillars: {
    audit: {
      facts: { count: 29, mostRecentDate: "2026-02-10", hasTopTierFirm: true },
      summary:
        "29 third-party audits by Wormhole's own count, with continuous coverage as new components ship (e.g. a Cyfrin audit of the Executor v2.0 in Feb 2026). Wormhole was the only cross-chain protocol Uniswap's Bridge Assessment Committee approved unconditionally.",
      evidence: [
        { label: "Wormhole security overview", url: "https://wormhole.com/platform/security", date: "2026-01-01", type: "disclosure" },
        { label: "Cyfrin audit — Wormhole Executor v2.0", url: "https://github.com/Cyfrin/cyfrin-audit-reports/blob/main/reports/2026-02-10-cyfrin-securitize-bridge-wormhole-executor-v2.0.pdf", date: "2026-02-10", type: "audit-report" },
      ],
    },
    incident: {
      facts: {
        events: [
          { date: "2022-02-02", usdLost: 326_000_000, tvlAtTimeUsd: 1_600_006_087, usersAffected: false, remediated: true },
        ],
      },
      summary:
        "Exploited for $326M on Feb 2, 2022 — about 20% of the bridge's ~$1.6B TVL that day, and the second-largest DeFi hack at the time — after an attacker bypassed guardian signature verification via a deprecated Solana function. Jump Crypto (Wormhole's backer) made every user whole within 24 hours by depositing 120,000 ETH, so no end user actually lost funds, and the underlying vulnerability class was patched. An incident this large keeps a real, permanent floor on this pillar's score regardless of how much time has passed since.",
      evidence: [
        { label: "Halborn: Explained — The Wormhole Hack (Feb 2022)", url: "https://www.halborn.com/blog/post/explained-the-wormhole-hack-february-2022", date: "2022-02-02", type: "incident-writeup" },
        { label: "CoinDesk: Wormhole suffers exploit worth over $326M", url: "https://www.coindesk.com/tech/2022/02/02/blockchain-bridge-wormhole-suffers-possible-exploit-worth-over-250m", date: "2022-02-02", type: "incident-writeup" },
        { label: "DefiLlama: Portal (Wormhole) historical TVL", url: "https://defillama.com/protocol/portal", date: "2026-07-28", type: "other" },
      ],
    },
    bounty: {
      facts: { maxPayoutUsd: 1_000_000, hasConfirmedPayout: true },
      summary:
        "Live Immunefi program paying up to $1,000,000 for a Tier-1 critical finding (redeemable in USDC), with a proven payout record — Wormhole paid $10M for a responsibly disclosed critical vulnerability in 2022, above and outside the standard tiers, showing the program pays out for real rather than just advertising a ceiling.",
      evidence: [
        { label: "Wormhole Bug Bounties — Immunefi", url: "https://immunefi.com/bug-bounty/wormhole/information/", date: "2026-07-01", type: "bounty-program" },
        { label: "The Block: Wormhole announces $10M bug bounty payout", url: "https://www.theblock.co/post/148085/wormhole-announces-10-million-bug-bounty-payout", date: "2022-03-24", type: "bounty-program" },
      ],
    },
    transparency: {
      facts: { signerCount: 19, thresholdRatio: 13 / 19, timelockHours: null, documentedConcerns: 0 },
      summary:
        "19 Guardians (independent validator operators) must reach a 13-of-19 supermajority to attest a message; the Guardian set is publicly listed on Wormhole's dashboard. There's no traditional smart-contract upgrade timelock, but a separate on-chain \"Governor\" rate-limits and delays unusually large transfers as a circuit breaker, and a public \"Spy\" tool exposes network activity in real time — that alternate safeguard isn't captured by this pillar's timelock field, which is why it's called out here explicitly.",
      evidence: [
        { label: "Wormhole Docs — Security", url: "https://wormhole.com/docs/protocol/security/", date: "2026-01-01", type: "disclosure" },
        { label: "Wormhole Docs — Guardians", url: "https://wormhole.com/docs/protocol/infrastructure/guardians/", date: "2026-01-01", type: "disclosure" },
      ],
    },
  },
};
