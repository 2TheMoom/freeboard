import type { EntityPillars, PillarKey, ScoredEntity } from "./types";

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

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

/**
 * Composite score, or null if any pillar is unrated ("Rating pending").
 * Never averages across only the rated pillars — a partial score would
 * silently misrepresent confidence in the result.
 */
export function computeComposite(pillars: EntityPillars): number | null {
  const keys = Object.keys(pillars) as PillarKey[];
  if (keys.some((key) => pillars[key].score === null)) return null;

  const total = keys.reduce(
    (sum, key) => sum + (pillars[key].score as number) * PILLAR_WEIGHTS[key],
    0
  );
  return round1(total);
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
