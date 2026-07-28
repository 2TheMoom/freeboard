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
  lastReviewed: "2026-07-28",
  defillamaSlug: "circle-cctp",
  pillars: {
    audit: {
      facts: { count: 2, mostRecentDate: "2025-04-08", hasTopTierFirm: true },
      summary:
        "CCTP V1 and V2 have both been audited by ChainSecurity, with additional coverage from OtterSec, Halborn, and Zellic across late 2024 and early 2025. No exploit has been disclosed against CCTP's on-chain contracts in production.",
      evidence: [
        { label: "ChainSecurity — Circle CCTP Security Audit", url: "https://www.chainsecurity.com/security-audit/circle-cross-chain-transfer-protocol-cctp", date: "2025-01-01", type: "audit-report" },
        { label: "ChainSecurity — CCTP V2 Smart Contracts audit", url: "https://www.chainsecurity.com/security-audit/cctp-v2-smart-contracts", date: "2025-04-08", type: "audit-report" },
      ],
    },
    incident: {
      facts: { events: [] },
      summary:
        "No funds have ever been lost to a direct CCTP exploit — a confirmed clean record on this pillar's own terms. An Aug 2024 bug in Noble's CCTP integration that could have allowed forged mints was responsibly disclosed and patched before anyone exploited it, so it isn't counted as a loss event. Separately, during the April 2026 Drift Protocol hack (~$285M stolen elsewhere), the attacker used CCTP to bridge ~$232M of already-stolen USDC from Solana to Ethereum — CCTP itself wasn't exploited, but on-chain investigator ZachXBT publicly criticized Circle for not exercising its freeze authority for hours during the laundering. That's a real response-speed concern about Circle as an operator, which is reflected in the transparency pillar below, not here, since CCTP's own contracts were never compromised.",
      evidence: [
        { label: "Asymmetric Research: Circle's CCTP Noble Mint Bug", url: "https://www.asymmetric.re/blog-archived/circles-cctp-noble-mint-bug", date: "2024-08-01", type: "incident-writeup" },
        { label: "CoinDesk: Circle under fire after $285M Drift hack over inaction to freeze stolen USDC", url: "https://www.coindesk.com/business/2026/04/03/circle-under-fire-after-usd285-million-drift-hack-over-inaction-to-freeze-stolen-usdc", date: "2026-04-03", type: "incident-writeup" },
      ],
    },
    bounty: {
      facts: { maxPayoutUsd: 5_000, hasConfirmedPayout: false },
      summary:
        "Circle's HackerOne-hosted bug bounty program caps critical-severity payouts at $5,000 — confirmed directly against the program's own listed terms — a figure that drew public backlash from the security research community as Arc's testnet went public, and is a genuine outlier low next to the $1M–$10M ceilings every other bridge in this registry offers for comparable severity.",
      evidence: [
        { label: "Circle Bug Bounty Program — HackerOne", url: "https://hackerone.com/circle-bbp", date: "2026-01-01", type: "bounty-program" },
        { label: "Circle's $5,000 bug bounty cap sparks backlash as Arc testnet goes public", url: "https://cryptonews.net/news/security/32691062/", date: "2026-01-01", type: "disclosure" },
      ],
    },
    transparency: {
      facts: { signerCount: null, thresholdRatio: null, timelockHours: null, documentedConcerns: 1 },
      summary:
        "Structurally different from a DAO-governed bridge, not necessarily worse: source-chain tokens are burned rather than locked, so there's no pooled-liquidity honeypot to drain, and the only way to mint fraudulent USDC is to forge Circle's own attestation. But that means CCTP depends entirely on one centralized, regulated company's attestation and freeze authority rather than a public multisig or timelock — this pillar specifically measures decentralized-governance transparency signals, and a single company with no disclosed multisig genuinely scores low on that narrow axis, which is compounded by the real, cited criticism of Circle's freeze-response speed during the April 2026 Drift hack laundering.",
      evidence: [
        { label: "Circle Developers — CCTP Technical Guide", url: "https://developers.circle.com/cctp/references/technical-guide", date: "2026-01-01", type: "disclosure" },
        { label: "CoinDesk: Circle under fire after $285M Drift hack over inaction to freeze stolen USDC", url: "https://www.coindesk.com/business/2026/04/03/circle-under-fire-after-usd285-million-drift-hack-over-inaction-to-freeze-stolen-usdc", date: "2026-04-03", type: "disclosure" },
      ],
    },
  },
};
