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
  lastReviewed: "2026-07-27",
  defillamaSlug: "across",
  pillars: {
    audit: {
      score: 8,
      summary:
        "Continuously audited by OpenZeppelin — not a one-time review but a running series of diff audits for nearly every material change (V3 upgrades, USDC bridging support, OFT integration, periphery contracts), which is a stronger practice than a single point-in-time audit.",
      evidence: [
        { label: "OpenZeppelin — Across V3 Incremental Audit", url: "https://www.openzeppelin.com/news/across-v3-incremental-audit", date: "2024-01-01", type: "audit-report" },
        { label: "OpenZeppelin — Bridged USDC Support Audit", url: "https://www.openzeppelin.com/news/bridged-usdc-support-audit", date: "2025-01-01", type: "audit-report" },
      ],
    },
    incident: {
      score: 7,
      summary:
        "First-ever security incident on July 17, 2026: an attacker exploited a missing signature-verification check in Across's off-chain Solana relayer software (not the audited core contracts) to forge deposit events, draining roughly $4.5M gross (under $4M net after recovery) from Risk Labs' own relayer capital. Because Across's intents design has relayers front capital rather than pool user funds, every user transfer was completed or refunded the same day — the loss landed entirely on the protocol's foundation, not users.",
      evidence: [
        { label: "crypto.news: Across relayer loses under $4M in Solana attack", url: "https://crypto.news/across-protocol-relayer-lose-under-4m-in-solana-attack/", date: "2026-07-17", type: "incident-writeup" },
        { label: "Crypto Times: Across reports first attack on Solana after $34B in volume", url: "https://www.cryptotimes.io/2026/07/17/across-protocol-reports-first-attack-on-solana-after-34b-in-bridge-volume/", date: "2026-07-17", type: "incident-writeup" },
      ],
    },
    bounty: {
      score: 5,
      summary:
        "Runs a direct-submission bug bounty (not hosted on a major platform like Immunefi) with a tiered structure topping out at $1,000,000 for critical severity — a real program, but a materially lower ceiling than Wormhole's or Stargate's $10M-class payouts, and less independently visible without a third-party platform listing.",
      evidence: [
        { label: "Across Docs — Bug Bounty", url: "https://docs.across.to/introduction/bug-bounty", date: "2026-01-01", type: "bounty-program" },
      ],
    },
    transparency: {
      score: 6,
      summary:
        "Disputes over relayer fills are settled by UMA's optimistic oracle: assertions are accepted unless challenged, and challenges go to token-holder vote via UMA's public Data Verification Mechanism. That dispute process is transparent and auditable, though Freeboard did not find a published multisig/timelock threshold specific to Across's own admin keys.",
      evidence: [
        { label: "UMA Docs", url: "https://docs.uma.xyz/", date: "2026-01-01", type: "disclosure" },
        { label: "UMA's optimistic oracle unpacked: an Across case study", url: "https://medium.com/uma-project/umas-optimistic-oracle-unpacked-an-across-protocol-case-study-0f203285efce", date: "2023-01-01", type: "disclosure" },
      ],
    },
  },
};
