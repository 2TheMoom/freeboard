import type {
  AuditFacts,
  BountyFacts,
  EntityPillars,
  IncidentFacts,
  PillarKey,
  ScoredEntity,
  TransparencyFacts,
} from "./types";

/**
 * Track record (what's been audited, what's gone wrong) is 60% of the score,
 * split evenly between audit and incident history. Structural safeguards
 * (bug bounty programs, custody/upgrade transparency) are the other 40%,
 * weighted lower because they're leading indicators, not proof of outcomes.
 */
export const PILLAR_WEIGHTS: Record<PillarKey, number> = {
  audit: 0.3,
  incident: 0.3,
  bounty: 0.2,
  transparency: 0.2,
};

export const PILLAR_LABELS: Record<PillarKey, string> = {
  audit: "Audit history",
  incident: "Incident record",
  bounty: "Bug bounty",
  transparency: "Transparency",
};

const TOP_TIER_FIRMS = [
  "OpenZeppelin",
  "Trail of Bits",
  "ChainSecurity",
  "Zellic",
  "Spearbit",
  "Cyfrin",
  "Halborn",
  "OtterSec",
  "Quantstamp",
];

export const TOP_TIER_AUDIT_FIRMS: readonly string[] = TOP_TIER_FIRMS;

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

function clamp(n: number, min = 0, max = 10): number {
  return Math.max(min, Math.min(max, n));
}

function monthsBetween(isoDate: string, now: Date = new Date()): number {
  const then = new Date(isoDate);
  return (now.getFullYear() - then.getFullYear()) * 12 + (now.getMonth() - then.getMonth());
}

/**
 * Count (capped, diminishing returns past ~4 audits) + recency of the most
 * recent audit + a bonus if any of them is from a well-known firm.
 */
export function scoreAudit(facts: AuditFacts | null): number | null {
  if (facts === null) return null;
  const countScore = Math.min(facts.count, 4) * 1.5; // caps at 6
  const months = monthsBetween(facts.mostRecentDate);
  const recencyScore = months <= 12 ? 2.5 : months <= 24 ? 1.5 : months <= 36 ? 0.5 : 0;
  const tierScore = facts.hasTopTierFirm ? 1.5 : 0.5;
  return round1(clamp(countScore + recencyScore + tierScore));
}

/**
 * Starts at 10, each incident subtracts a severity penalty driven by the
 * WORSE of (a) absolute dollars lost and (b) loss as a share of TVL at the
 * time — absolute severity has to dominate for a nine-figure loss even when
 * the ratio view gets diluted by a large or uncertain TVL denominator.
 *
 * On top of the decaying penalty, a catastrophic-tier single event (>=$100M,
 * or >=$10M) also imposes a hard cap on how high the pillar can ever score,
 * independent of decay. This is intentional after backtesting an earlier
 * draft: a purely decay-based penalty let Wormhole's $326M hack fade to a
 * ~7.6/10 incident score after four years, which still undersells "second-
 * largest DeFi hack ever" — some incidents should permanently mark a
 * record, not just cost a temporarily-decaying number of points.
 */
export function scoreIncident(facts: IncidentFacts | null): number | null {
  if (facts === null) return null;
  let score = 10;
  let cap = 10;

  for (const event of facts.events) {
    const ratioSeverity = event.tvlAtTimeUsd
      ? event.usdLost / event.tvlAtTimeUsd
      : 0;
    const absoluteSeverity =
      event.usdLost >= 100_000_000 ? 1 : event.usdLost >= 10_000_000 ? 0.7 : event.usdLost >= 1_000_000 ? 0.45 : event.usdLost >= 100_000 ? 0.25 : 0.1;
    const ratioSeverityScore = ratioSeverity >= 0.3 ? 1 : ratioSeverity >= 0.1 ? 0.7 : ratioSeverity >= 0.02 ? 0.4 : 0.15;
    const severity = Math.max(absoluteSeverity, ratioSeverityScore) * 7; // 0-7 point base penalty

    const months = monthsBetween(event.date);
    // Floor at 45% of peak severity — a catastrophic incident should still
    // weigh on the score years later, not fade to a rounding error.
    const decay = Math.max(0.45, 1 - months / 96);

    const usersMultiplier = event.usersAffected ? 1 : 0.85;
    const remediatedMultiplier = event.remediated ? 0.9 : 1;

    score -= severity * decay * usersMultiplier * remediatedMultiplier;

    const eventCap = event.usdLost >= 100_000_000 ? 5.5 : event.usdLost >= 10_000_000 ? 7.5 : 10;
    cap = Math.min(cap, eventCap);
  }

  return round1(clamp(Math.min(score, cap)));
}

/**
 * Tiered by the max advertised payout, plus a bonus if there's a confirmed
 * real historical payout — a proven ceiling beats an advertised one nobody
 * has collected.
 */
export function scoreBounty(facts: BountyFacts | null): number | null {
  if (facts === null) return null;
  const tierScore =
    facts.maxPayoutUsd >= 5_000_000 ? 7 :
    facts.maxPayoutUsd >= 1_000_000 ? 5.5 :
    facts.maxPayoutUsd >= 100_000 ? 4 :
    facts.maxPayoutUsd >= 10_000 ? 2 :
    facts.maxPayoutUsd > 0 ? 1 : 0;
  const payoutBonus = facts.hasConfirmedPayout ? 2.5 : 0;
  return round1(clamp(tierScore + payoutBonus));
}

/**
 * Baseline + bonuses for a disclosed, reasonably-sized multisig and a
 * meaningful timelock, minus a penalty per documented negative finding
 * (e.g. "no timelock on default library upgrade"). This pillar specifically
 * measures decentralized-governance transparency signals — a protocol with
 * a different but well-documented trust model (e.g. a single regulated
 * company with hardware-backed keys instead of a DAO multisig) will score
 * low here even if that's a defensible design choice; the pillar summary is
 * where that nuance belongs, not the formula.
 */
export function scoreTransparency(facts: TransparencyFacts | null): number | null {
  if (facts === null) return null;
  let score = 3; // baseline for existing at all
  if (facts.signerCount !== null && facts.signerCount >= 5) score += 2;
  if (facts.thresholdRatio !== null && facts.thresholdRatio >= 0.6 && facts.thresholdRatio <= 0.85) score += 1;
  if (facts.timelockHours !== null && facts.timelockHours >= 24) score += 3;
  score -= facts.documentedConcerns * 1.5;
  return round1(clamp(score));
}

/**
 * Composite score, or null if any pillar is unrated ("Rating pending").
 * Never averages across only the rated pillars — a partial score would
 * silently misrepresent confidence in the result.
 */
export function computeComposite(pillars: EntityPillars): number | null {
  const scores: Record<PillarKey, number | null> = {
    audit: scoreAudit(pillars.audit.facts),
    incident: scoreIncident(pillars.incident.facts),
    bounty: scoreBounty(pillars.bounty.facts),
    transparency: scoreTransparency(pillars.transparency.facts),
  };
  const keys = Object.keys(scores) as PillarKey[];
  if (keys.some((key) => scores[key] === null)) return null;

  const total = keys.reduce((sum, key) => sum + (scores[key] as number) * PILLAR_WEIGHTS[key], 0);
  return round1(total);
}

export function pillarScore(pillars: EntityPillars, key: PillarKey): number | null {
  switch (key) {
    case "audit":
      return scoreAudit(pillars.audit.facts);
    case "incident":
      return scoreIncident(pillars.incident.facts);
    case "bounty":
      return scoreBounty(pillars.bounty.facts);
    case "transparency":
      return scoreTransparency(pillars.transparency.facts);
  }
}

export function entityComposite(entity: ScoredEntity): number | null {
  return computeComposite(entity.pillars);
}

export function sortByComposite(entities: ScoredEntity[]): ScoredEntity[] {
  return [...entities].sort((a, b) => {
    const scoreA = entityComposite(a);
    const scoreB = entityComposite(b);
    if (scoreA === null && scoreB === null) return a.name.localeCompare(b.name);
    if (scoreA === null) return 1;
    if (scoreB === null) return -1;
    return scoreB - scoreA;
  });
}
