import { z } from "zod";

export const evidenceLinkSchema = z.object({
  label: z.string().min(1),
  url: z.string().url(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be ISO yyyy-mm-dd"),
  type: z.enum(["audit-report", "incident-writeup", "bounty-program", "disclosure", "other"]),
});

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be ISO yyyy-mm-dd");

const evidenceGateRefinement = (pillar: { facts: unknown; evidence: unknown[] }) =>
  pillar.facts === null || pillar.evidence.length > 0;
const evidenceGateOptions = {
  message: "a non-null pillar (facts confirmed) must have at least one evidence link",
  path: ["evidence"] as PropertyKey[],
};

const auditFactsSchema = z.object({
  count: z.number().int().min(0),
  mostRecentDate: isoDate,
  hasTopTierFirm: z.boolean(),
});

const incidentEventSchema = z.object({
  date: isoDate,
  usdLost: z.number().min(0),
  tvlAtTimeUsd: z.number().min(0).nullable(),
  usersAffected: z.boolean(),
  remediated: z.boolean(),
});

const incidentFactsSchema = z.object({
  events: z.array(incidentEventSchema),
});

const bountyFactsSchema = z.object({
  maxPayoutUsd: z.number().min(0),
  hasConfirmedPayout: z.boolean(),
});

const transparencyFactsSchema = z.object({
  signerCount: z.number().int().min(0).nullable(),
  thresholdRatio: z.number().min(0).max(1).nullable(),
  timelockHours: z.number().min(0).nullable(),
  documentedConcerns: z.number().int().min(0),
});

export const auditPillarSchema = z
  .object({ facts: auditFactsSchema.nullable(), summary: z.string().min(1), evidence: z.array(evidenceLinkSchema) })
  .refine(evidenceGateRefinement, evidenceGateOptions);

export const incidentPillarSchema = z
  .object({ facts: incidentFactsSchema.nullable(), summary: z.string().min(1), evidence: z.array(evidenceLinkSchema) })
  .refine(evidenceGateRefinement, evidenceGateOptions);

export const bountyPillarSchema = z
  .object({ facts: bountyFactsSchema.nullable(), summary: z.string().min(1), evidence: z.array(evidenceLinkSchema) })
  .refine(evidenceGateRefinement, evidenceGateOptions);

export const transparencyPillarSchema = z
  .object({ facts: transparencyFactsSchema.nullable(), summary: z.string().min(1), evidence: z.array(evidenceLinkSchema) })
  .refine(evidenceGateRefinement, evidenceGateOptions);

export const scoredEntitySchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  category: z.enum(["bridge", "compliance-infra", "protocol"]),
  status: z.enum(["live", "testnet", "deprecated"]),
  website: z.string().url(),
  description: z.string().min(1),
  chains: z.array(z.string()).optional(),
  pillars: z.object({
    audit: auditPillarSchema,
    incident: incidentPillarSchema,
    bounty: bountyPillarSchema,
    transparency: transparencyPillarSchema,
  }),
  lastReviewed: isoDate,
  defillamaSlug: z.string().optional(),
});

export const changelogEntrySchema = z.object({
  date: isoDate,
  entitySlug: z.string(),
  pillar: z.enum(["audit", "incident", "bounty", "transparency", "composite", "metadata"]),
  from: z.union([z.number(), z.string(), z.null()]),
  to: z.union([z.number(), z.string(), z.null()]),
  reason: z.string().min(1),
  evidence: z.array(evidenceLinkSchema).optional(),
});
