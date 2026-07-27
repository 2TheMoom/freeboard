import type { ScoredEntity } from "../../lib/types";

export const cctp: ScoredEntity = {
  slug: "cctp",
  name: "CCTP",
  category: "bridge",
  status: "live",
  website: "https://www.circle.com/cross-chain-transfer-protocol",
  description:
    "Circle's native burn-and-mint transfer protocol for USDC: tokens are burned on the source chain and an equal amount of native USDC is minted on the destination chain once Circle's attestation service signs off — no wrapped assets, no locked liquidity pool to drain.",
  chains: ["Ethereum", "Solana", "Base", "Arc (Circle-native, day-one integration expected)"],
  lastReviewed: "2026-07-27",
  pillars: {
    audit: {
      score: 8,
      summary:
        "CCTP V1 and V2 have both been audited by ChainSecurity, with additional coverage from OtterSec, Halborn, and Zellic across late 2024 and early 2025. As of the most recent public review, no exploits had been disclosed against CCTP's on-chain contracts in production.",
      evidence: [
        { label: "ChainSecurity — Circle CCTP Security Audit", url: "https://www.chainsecurity.com/security-audit/circle-cross-chain-transfer-protocol-cctp", date: "2025-01-01", type: "audit-report" },
        { label: "ChainSecurity — CCTP V2 Smart Contracts audit", url: "https://www.chainsecurity.com/security-audit/cctp-v2-smart-contracts", date: "2025-04-08", type: "audit-report" },
      ],
    },
    incident: {
      score: 6,
      summary:
        "No funds have ever been lost to a direct CCTP exploit: an Aug 2024 bug in Noble's CCTP integration that could have allowed forged mints was responsibly disclosed and patched before anyone exploited it. However, CCTP's design as neutral rails cuts both ways — during the April 2026 Drift Protocol hack (~$285M stolen), the attacker used CCTP to bridge ~$232M of stolen USDC from Solana to Ethereum, and on-chain investigator ZachXBT publicly criticized Circle for not exercising its freeze authority for hours during active laundering. Circle was not confirmed to have technically failed at anything, but the episode is a real test of an incident-response question that only applies to CCTP because of its centralized attestation model.",
      evidence: [
        { label: "Asymmetric Research: Circle's CCTP Noble Mint Bug", url: "https://www.asymmetric.re/blog-archived/circles-cctp-noble-mint-bug", date: "2024-08-01", type: "incident-writeup" },
        { label: "CoinDesk: Circle under fire after $285M Drift hack over inaction to freeze stolen USDC", url: "https://www.coindesk.com/business/2026/04/03/circle-under-fire-after-usd285-million-drift-hack-over-inaction-to-freeze-stolen-usdc", date: "2026-04-03", type: "incident-writeup" },
      ],
    },
    bounty: {
      score: 2,
      summary:
        "Circle's HackerOne-hosted bug bounty program caps critical-severity payouts at just $3,000-$5,000 — a figure that drew public backlash from the security research community as Arc's testnet went public, and is far below the $1M-$10M ceilings peers in this registry offer for comparable severity.",
      evidence: [
        { label: "Circle Bug Bounty Program — HackerOne", url: "https://hackerone.com/circle-bbp", date: "2026-01-01", type: "bounty-program" },
        { label: "Circle's $5,000 bug bounty cap sparks backlash as Arc testnet goes public", url: "https://cryptonews.net/news/security/32691062/", date: "2026-01-01", type: "disclosure" },
      ],
    },
    transparency: {
      score: 6,
      summary:
        "Structurally reduces one class of bridge risk by design: because source-chain tokens are burned rather than locked, there is no pooled-liquidity honeypot for an attacker to drain — the only way to mint fraudulent USDC is to forge Circle's own attestation. That is also the tradeoff: CCTP depends entirely on one centralized, regulated company's attestation and freeze authority rather than a multisig or DAO, which is a fundamentally different (not necessarily worse, but different) trust model than the other bridges in this registry.",
      evidence: [
        { label: "Circle Developers — CCTP Technical Guide", url: "https://developers.circle.com/cctp/references/technical-guide", date: "2026-01-01", type: "disclosure" },
        { label: "Circle Developers — CCTP FAQ", url: "https://developers.circle.com/cctp/cctp-faq", date: "2026-01-01", type: "disclosure" },
      ],
    },
  },
};
