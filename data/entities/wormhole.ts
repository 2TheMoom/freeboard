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
  lastReviewed: "2026-07-27",
  defillamaSlug: "portal",
  pillars: {
    audit: {
      score: 8,
      summary:
        "29 third-party audits completed by Wormhole's own count, with continuous coverage as new components ship (e.g. a Cyfrin audit of the Executor v2.0 in Feb 2026). Wormhole was the only cross-chain protocol Uniswap's Bridge Assessment Committee approved unconditionally.",
      evidence: [
        { label: "Wormhole security overview", url: "https://wormhole.com/platform/security", date: "2026-01-01", type: "disclosure" },
        { label: "Cyfrin audit — Wormhole Executor v2.0", url: "https://github.com/Cyfrin/cyfrin-audit-reports/blob/main/reports/2026-02-10-cyfrin-securitize-bridge-wormhole-executor-v2.0.pdf", date: "2026-02-10", type: "audit-report" },
      ],
    },
    incident: {
      score: 5,
      summary:
        "Exploited for ~$326M on Feb 2, 2022 — the second-largest DeFi hack at the time — after an attacker bypassed guardian signature verification via a deprecated Solana function. Jump Crypto (Wormhole's backer) made all users whole within 24 hours by depositing 120,000 ETH. No further incidents have been disclosed since; the underlying vulnerability class was patched.",
      evidence: [
        { label: "Halborn: Explained — The Wormhole Hack (Feb 2022)", url: "https://www.halborn.com/blog/post/explained-the-wormhole-hack-february-2022", date: "2022-02-02", type: "incident-writeup" },
        { label: "CoinDesk: Wormhole suffers exploit worth over $326M", url: "https://www.coindesk.com/tech/2022/02/02/blockchain-bridge-wormhole-suffers-possible-exploit-worth-over-250m", date: "2022-02-02", type: "incident-writeup" },
      ],
    },
    bounty: {
      score: 8,
      summary:
        "Live Immunefi program with a proven payout record — Wormhole paid $10M for a responsibly disclosed critical vulnerability in 2022 — plus an ongoing tiered structure (up to 20M W tokens for full-TVL-extraction-class bugs, capped at 10% of extractable value per 24h).",
      evidence: [
        { label: "Wormhole Bug Bounties — Immunefi", url: "https://immunefi.com/bug-bounty/wormhole/information/", date: "2026-07-01", type: "bounty-program" },
        { label: "The Block: Wormhole announces $10M bug bounty payout", url: "https://www.theblock.co/post/148085/wormhole-announces-10-million-bug-bounty-payout", date: "2022-03-24", type: "bounty-program" },
      ],
    },
    transparency: {
      score: 7,
      summary:
        "19 Guardians (independent validator operators) must reach a 13/19 supermajority to attest a message; the Guardian set is publicly listed on Wormhole's dashboard. A separate on-chain \"Governor\" rate-limits and delays unusually large transfers as a circuit breaker, and a public \"Spy\" tool exposes network activity in real time.",
      evidence: [
        { label: "Wormhole Docs — Security", url: "https://wormhole.com/docs/protocol/security/", date: "2026-01-01", type: "disclosure" },
        { label: "Wormhole Docs — Guardians", url: "https://wormhole.com/docs/protocol/infrastructure/guardians/", date: "2026-01-01", type: "disclosure" },
      ],
    },
  },
};
