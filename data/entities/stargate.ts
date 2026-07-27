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
  lastReviewed: "2026-07-27",
  pillars: {
    audit: {
      score: 7,
      summary:
        "Audited by Zellic and Quantstamp, with LayerZero's underlying V2 messaging layer covered by multiple additional firms; LayerZero publishes monthly security reports. Less publicly consolidated than Wormhole's audit trail, but active and ongoing.",
      evidence: [
        { label: "Zellic — LayerZero Stargate audit report", url: "https://reports.zellic.io/publications/layerzero-stargate", date: "2024-01-01", type: "audit-report" },
        { label: "Stargate Docs — Security", url: "https://docs.stargate.finance/resources/security", date: "2026-01-01", type: "disclosure" },
      ],
    },
    incident: {
      score: 6,
      summary:
        "No direct hack has drained Stargate's bridge contracts, but the ecosystem around it has had real incidents: a Dec 2023 phishing attack via a spoofed governance-snapshot proposal cost users over $50K, and a Feb 2023 Alameda Research wallet compromise forced StargateDAO to reissue STG tokens as a precaution. A May 2023 liquidity-imbalance bug also let a trader extract ~$1-2K per transaction across ~200 transactions before being addressed.",
      evidence: [
        { label: "Crypto Times: Scammer steals $43K via Stargate Snapshot phishing", url: "https://www.cryptotimes.io/2023/12/04/scammer-on-stargate-snapshot-stole-43000-via-phishing-link/", date: "2023-12-04", type: "incident-writeup" },
        { label: "CoinDesk: Stargate to reissue STG tokens after Alameda wallet hack", url: "https://www.coindesk.com/business/2023/02/01/stargate-to-reissue-stg-tokens-following-alameda-wallets-hack", date: "2023-02-01", type: "incident-writeup" },
      ],
    },
    bounty: {
      score: 8,
      summary:
        "Live Immunefi program launched with up to $10M in rewards for critical smart-contract bugs (10% of directly affected funds, capped at $10M) — one of the larger ceilings among general-purpose bridges.",
      evidence: [
        { label: "Immunefi: Stargate launches $10M bug bounty program", url: "https://immunefi.com/blog/customers/stargate-launches-10-million-bug-bounty-program-on-immunefi/", date: "2023-01-01", type: "bounty-program" },
      ],
    },
    transparency: {
      score: 4,
      summary:
        "Real, documented governance weak points: security researchers flagged that LayerZero Labs could upgrade the default message-receiving library without a timelock, and LayerZero's production 2-of-5 multisig was found holding keys that had sat inactive for years (one was separately observed trading an unrelated memecoin). Most significantly, a governance vote transferred full control of Stargate's protocol, token, and treasury to the LayerZero Foundation, ending StargateDAO's independent governance.",
      evidence: [
        { label: "Cryptopolitan: LayerZero multisig keys caught trading memecoin", url: "https://www.cryptopolitan.com/layerzero-multisig-trading-mcpepes-memecoin/", date: "2026-01-01", type: "disclosure" },
        { label: "Blockonomi: Stargate DAO handed LayerZero the keys", url: "https://blockonomi.com/wormhole-tried-120m-but-stargate-dao-handed-layerzero-the-keys", date: "2026-01-01", type: "disclosure" },
      ],
    },
  },
};
