import { z } from "zod";

export const evidenceLinkSchema = z.object({
  label: z.string().min(1),
  url: z.string().url(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be ISO yyyy-mm-dd"),
  type: z.enum(["audit-report", "incident-writeup", "bounty-program", "disclosure", "other"]),
});

export const pillarScoreSchema = z
  .object({
    score: z.number().min(0).max(10).nullable(),
    summary: z.string().min(1),
    evidence: z.array(evidenceLinkSchema),
  })
  .refine((pillar) => pillar.score === null || pillar.evidence.length > 0, {
    message: "a non-null pillar score must have at least one evidence link",
    path: ["evidence"],
  });

export const scoredEntitySchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  category: z.enum(["bridge", "compliance-infra", "protocol"]),
  status: z.enum(["live", "testnet", "deprecated"]),
  website: z.string().url(),
  description: z.string().min(1),
  chains: z.array(z.string()).optional(),
  pillars: z.object({
    audit: pillarScoreSchema,
    incident: pillarScoreSchema,
    bounty: pillarScoreSchema,
    transparency: pillarScoreSchema,
  }),
  lastReviewed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "lastReviewed must be ISO yyyy-mm-dd"),
});

export const infraPartnerSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  website: z.string().url(),
  description: z.string().min(1),
  role: z.string().min(1),
});

export const changelogEntrySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be ISO yyyy-mm-dd"),
  entitySlug: z.string(),
  pillar: z.enum(["audit", "incident", "bounty", "transparency", "composite", "metadata"]),
  from: z.union([z.number(), z.string(), z.null()]),
  to: z.union([z.number(), z.string(), z.null()]),
  reason: z.string().min(1),
  evidence: z.array(evidenceLinkSchema).optional(),
});
