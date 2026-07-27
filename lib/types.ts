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

export interface PillarScore {
  /** 0-10, or null when there isn't enough public evidence to rate this pillar yet. */
  score: number | null;
  summary: string;
  evidence: EvidenceLink[];
}

export interface EntityPillars {
  audit: PillarScore;
  incident: PillarScore;
  bounty: PillarScore;
  transparency: PillarScore;
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
}

export interface InfraPartner {
  slug: string;
  name: string;
  website: string;
  description: string;
  role: string;
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
