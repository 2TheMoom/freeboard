import type { InfraPartner } from "../lib/types";

/**
 * Compliance/custody infrastructure, not bridges or on-chain protocols.
 * Forcing these through the same audit/incident/bounty/transparency rubric
 * built for smart-contract risk would be a stretch bordering on misleading —
 * a KYT vendor doesn't have a "bug bounty" posture in the way a bridge does.
 * Listed here for context on the ecosystem, not scored.
 */
export const infraPartners: InfraPartner[] = [
  {
    slug: "elliptic",
    name: "Elliptic",
    website: "https://www.elliptic.co",
    description:
      "London-founded (2013) blockchain analytics and compliance firm providing wallet screening and transaction monitoring to financial institutions and crypto businesses.",
    role: "Confirmed infrastructure participant on Arc's public testnet, providing blockchain analytics; Circle Ventures has also invested directly in Elliptic.",
  },
  {
    slug: "trm-labs",
    name: "TRM Labs",
    website: "https://www.trmlabs.com",
    description:
      "Blockchain intelligence platform combining attributed on-chain data and investigation tooling, used by compliance teams, law enforcement, and regulators.",
    role: "Confirmed infrastructure participant supporting Arc's public testnet launch, providing blockchain-intelligence coverage for the ecosystem.",
  },
];
