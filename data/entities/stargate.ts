import type { ScoredEntity } from "../../lib/types";

export const stargate: ScoredEntity = {
  slug: "stargate",
  name: "Stargate",
  category: "bridge",
  status: "live",
  website: "https://stargate.finance",
  description:
    "Liquidity-pool bridge built on LayerZero's messaging protocol, offering native-asset transfers (not wrapped tokens) across 20+ chains.",
  chains: ["Ethereum", "Arbitrum", "Optimism", "Arc (planned via LayerZero integration)"],
  lastReviewed: "2026-07-28",
  defillamaSlug: "stargate-v2",
  pillars: {
    audit: {
      facts: { count: 2, mostRecentDate: "2024-06-01", hasTopTierFirm: true },
      summary:
        "Audited by Zellic and Quantstamp, with LayerZero's underlying V2 messaging layer covered by multiple additional firms and monthly published security reports. Fewer individually-citable reports than Wormhole's, though the underlying practice is active and ongoing.",
      evidence: [
        { label: "Zellic — LayerZero Stargate audit report", url: "https://reports.zellic.io/publications/layerzero-stargate", date: "2024-01-01", type: "audit-report" },
        { label: "Stargate Docs — Security", url: "https://docs.stargate.finance/resources/security", date: "2026-01-01", type: "disclosure" },
      ],
    },
    incident: {
      facts: {
        events: [
          { date: "2023-12-04", usdLost: 50_000, tvlAtTimeUsd: null, usersAffected: true, remediated: false },
        ],
      },
      summary:
        "No direct hack has drained Stargate's bridge contracts, but a Dec 2023 phishing attack via a spoofed governance-Snapshot proposal cost users over $50K — a real loss tied to the protocol's own governance channel, not an external event, and Freeboard found no confirmation that the underlying phishing vector was specifically hardened afterward. A separate Feb 2023 incident (an Alameda-held wallet compromised during the FTX collapse, forcing a precautionary STG token reissuance) isn't counted here since no Stargate/LayerZero contract was exploited and no confirmed dollar loss to the protocol itself was found.",
      evidence: [
        { label: "Crypto Times: Scammer steals $43K–50K via Stargate Snapshot phishing", url: "https://www.cryptotimes.io/2023/12/04/scammer-on-stargate-snapshot-stole-43000-via-phishing-link/", date: "2023-12-04", type: "incident-writeup" },
      ],
    },
    bounty: {
      facts: { maxPayoutUsd: 10_000_000, hasConfirmedPayout: true },
      summary:
        "Immunefi program paying up to $10M for critical smart-contract bugs (10% of directly affected funds, capped at $10M) — one of the larger ceilings among general-purpose bridges. LayerZero (which now governs Stargate) has paid out close to $1M to whitehats to date, a real confirmed track record rather than just an advertised number.",
      evidence: [
        { label: "Immunefi: Stargate launches $10M bug bounty program", url: "https://immunefi.com/blog/customers/stargate-launches-10-million-bug-bounty-program-on-immunefi/", date: "2023-01-01", type: "bounty-program" },
        { label: "TechCrunch: LayerZero and Immunefi launch $15M bug bounty program", url: "https://techcrunch.com/2023/05/17/layerzero-and-immunefi-launch-largest-crypto-bug-bounty-program-with-up-to-15m-in-rewards/", date: "2023-05-17", type: "bounty-program" },
      ],
    },
    transparency: {
      facts: { signerCount: 5, thresholdRatio: 2 / 5, timelockHours: 0, documentedConcerns: 2 },
      summary:
        "Two real, documented governance weak points: security researchers flagged that LayerZero Labs could upgrade the default message-receiving library without a timelock, and LayerZero's production 2-of-5 multisig was found holding keys inactive for years (one was separately observed trading an unrelated memecoin). Compounding that, a governance vote transferred full control of Stargate's protocol, token, and treasury to the LayerZero Foundation, ending StargateDAO's independent governance.",
      evidence: [
        { label: "Cryptopolitan: LayerZero multisig keys caught trading memecoin", url: "https://www.cryptopolitan.com/layerzero-multisig-trading-mcpepes-memecoin/", date: "2026-01-01", type: "disclosure" },
        { label: "Blockonomi: Stargate DAO handed LayerZero the keys", url: "https://blockonomi.com/wormhole-tried-120m-but-stargate-dao-handed-layerzero-the-keys", date: "2026-01-01", type: "disclosure" },
      ],
    },
  },
};
