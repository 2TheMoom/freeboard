import type { ScoredEntity } from "../../lib/types";

export const across: ScoredEntity = {
  slug: "across",
  name: "Across",
  category: "bridge",
  status: "live",
  website: "https://across.to",
  description:
    "Intents-based bridge where independent relayers front capital to fill transfers instantly, secured after the fact by UMA's optimistic oracle rather than by locking user funds in a pooled contract.",
  chains: ["Ethereum", "Arbitrum", "Base", "Solana"],
  lastReviewed: "2026-07-28",
  defillamaSlug: "across",
  pillars: {
    audit: {
      facts: { count: 2, mostRecentDate: "2025-01-01", hasTopTierFirm: true },
      summary:
        "Continuously audited by OpenZeppelin — a running series of diff audits for nearly every material change (V3 upgrades, USDC bridging support, OFT integration, periphery contracts), which is a stronger practice than a single point-in-time review, though only two individual reports are directly cited here.",
      evidence: [
        { label: "OpenZeppelin — Across V3 Incremental Audit", url: "https://www.openzeppelin.com/news/across-v3-incremental-audit", date: "2024-01-01", type: "audit-report" },
        { label: "OpenZeppelin — Bridged USDC Support Audit", url: "https://www.openzeppelin.com/news/bridged-usdc-support-audit", date: "2025-01-01", type: "audit-report" },
      ],
    },
    incident: {
      facts: {
        events: [
          { date: "2026-07-17", usdLost: 4_500_000, tvlAtTimeUsd: 20_980_024, usersAffected: false, remediated: true },
        ],
      },
      summary:
        "First-ever security incident on July 17, 2026: an attacker exploited a missing signature-verification check in Across's off-chain Solana relayer software (not the audited core contracts) to forge deposit events, draining roughly $4.5M gross — about 21% of Across's own TVL at the time — from Risk Labs' relayer capital. Because Across's intents design has relayers front capital rather than pool user funds, every user transfer was completed or refunded the same day; the loss landed entirely on the protocol's foundation, not users.",
      evidence: [
        { label: "crypto.news: Across relayer loses under $4M in Solana attack", url: "https://crypto.news/across-protocol-relayer-lose-under-4m-in-solana-attack/", date: "2026-07-17", type: "incident-writeup" },
        { label: "Crypto Times: Across reports first attack on Solana after $34B in volume", url: "https://www.cryptotimes.io/2026/07/17/across-protocol-reports-first-attack-on-solana-after-34b-in-bridge-volume/", date: "2026-07-17", type: "incident-writeup" },
        { label: "DefiLlama: Across historical TVL", url: "https://defillama.com/protocol/across", date: "2026-07-28", type: "other" },
      ],
    },
    bounty: {
      facts: { maxPayoutUsd: 1_000_000, hasConfirmedPayout: false },
      summary:
        "Runs a direct-submission bug bounty (not hosted on a major platform like Immunefi) with a tiered structure topping out at $1,000,000 for critical severity — a real program, but Freeboard found no public record of an actual historical payout, and it's less independently visible without a third-party platform listing.",
      evidence: [
        { label: "Across Docs — Bug Bounty", url: "https://docs.across.to/introduction/bug-bounty", date: "2026-01-01", type: "bounty-program" },
      ],
    },
    transparency: {
      facts: null,
      summary:
        "Disputes over relayer fills are settled by UMA's optimistic oracle — assertions are accepted unless challenged, and challenges go to a token-holder vote via UMA's public Data Verification Mechanism, which is a transparent, auditable process. But Freeboard could not confirm Across's own specific admin multisig signer count or timelock length after a real attempt (its own docs and a general search didn't surface it), so this pillar is marked Rating pending rather than guessed at — that's a direct, deliberate consequence of scoring only what's actually confirmed.",
      evidence: [
        { label: "UMA Docs", url: "https://docs.uma.xyz/", date: "2026-01-01", type: "disclosure" },
        { label: "UMA's optimistic oracle unpacked: an Across case study", url: "https://medium.com/uma-project/umas-optimistic-oracle-unpacked-an-across-protocol-case-study-0f203285efce", date: "2023-01-01", type: "disclosure" },
      ],
    },
  },
};
