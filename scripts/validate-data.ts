import { entities } from "../data/entities";
import { changelog } from "../data/changelog";
import { scoredEntitySchema, changelogEntrySchema } from "../lib/schema";

let hasErrors = false;

function report(context: string, error: unknown) {
  hasErrors = true;
  console.error(`\n✗ ${context}`);
  if (error && typeof error === "object" && "issues" in error) {
    for (const issue of (error as { issues: { path: (string | number)[]; message: string }[] }).issues) {
      console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
    }
  } else {
    console.error(`  ${String(error)}`);
  }
}

const seenEntitySlugs = new Set<string>();
for (const entity of entities) {
  const result = scoredEntitySchema.safeParse(entity);
  if (!result.success) {
    report(`entity "${entity.slug ?? "(unknown)"}"`, result.error);
  } else if (seenEntitySlugs.has(entity.slug)) {
    report(`entity "${entity.slug}"`, "duplicate slug");
  } else {
    seenEntitySlugs.add(entity.slug);
  }
}

changelog.forEach((entry, i) => {
  const result = changelogEntrySchema.safeParse(entry);
  if (!result.success) {
    report(`changelog[${i}]`, result.error);
  } else if (!seenEntitySlugs.has(entry.entitySlug)) {
    report(`changelog[${i}]`, `entitySlug "${entry.entitySlug}" does not match any known entity`);
  }
});

if (hasErrors) {
  console.error("\nData validation failed — fix the issues above before building.\n");
  process.exit(1);
} else {
  console.log(
    `✓ Data validation passed (${entities.length} entities, ${changelog.length} changelog entries)`
  );
}
