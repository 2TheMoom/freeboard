export type EntityCategory = "bridge" | "compliance-infra" | "protocol";

export type EntityStatus = "live" | "testnet" | "deprecated";

export type EvidenceType =
  | "audit-report"
  | "incident-writeup"
  | "bounty-program"
  | "disclosure"
  | "other";

export interface EvidenceLink {
  label: string;
  url: string;
  date: string; // ISO date
  type: EvidenceType;
}

export interface AuditFacts {
  count: number;
  mostRecentDate: string; // ISO date
  hasTopTierFirm: boolean;
}

export interface IncidentEvent {
  date: string; // ISO date
  usdLost: number;
  /** TVL at the moment of the incident, if it could be confirmed against a real source (e.g. DefiLlama's historical chart). Null, not guessed. */
  tvlAtTimeUsd: number | null;
  /** Did end users lose funds, or did the protocol/its backers absorb the loss? */
  usersAffected: boolean;
  /** Was the root cause fixed, not just the immediate incident contained? */
  remediated: boolean;
}

export interface IncidentFacts {
  /** Empty array means a confirmed clean record, not "unreviewed" - that's what `null` on the pillar itself means. */
  events: IncidentEvent[];
}

export interface BountyFacts {
  maxPayoutUsd: number;
  /** A real historical payout, not just an advertised ceiling nobody has collected. */
  hasConfirmedPayout: boolean;
}

export interface TransparencyFacts {
  signerCount: number | null;
  thresholdRatio: number | null; // e.g. 13-of-19 -> 0.684
  timelockHours: number | null;
  /** Count of specific, cited negative findings (e.g. "no timelock on default library upgrade"). */
  documentedConcerns: number;
}

export interface AuditPillar {
  facts: AuditFacts | null; // null = Rating pending
  summary: string;
  evidence: EvidenceLink[];
}

export interface IncidentPillar {
  facts: IncidentFacts | null;
  summary: string;
  evidence: EvidenceLink[];
}

export interface BountyPillar {
  facts: BountyFacts | null;
  summary: string;
  evidence: EvidenceLink[];
}

export interface TransparencyPillar {
  facts: TransparencyFacts | null;
  summary: string;
  evidence: EvidenceLink[];
}

export interface EntityPillars {
  audit: AuditPillar;
  incident: IncidentPillar;
  bounty: BountyPillar;
  transparency: TransparencyPillar;
}

export interface ScoredEntity {
  slug: string;
  name: string;
  category: EntityCategory;
  status: EntityStatus;
  website: string;
  description: string;
  chains?: string[];
  pillars: EntityPillars;
  lastReviewed: string; // ISO date
  /** Manually-confirmed DefiLlama protocol slug, used only to de-duplicate
   * search results against this curated entity — never auto-matched. */
  defillamaSlug?: string;
}

export type PillarKey = keyof EntityPillars;

export interface ChangelogEntry {
  date: string; // ISO date
  entitySlug: string;
  pillar: PillarKey | "composite" | "metadata";
  from: number | string | null;
  to: number | string | null;
  reason: string;
  evidence?: EvidenceLink[];
}
