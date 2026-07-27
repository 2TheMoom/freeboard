import type { ScoredEntity } from "../../lib/types";
import { wormhole } from "./wormhole";
import { stargate } from "./stargate";
import { across } from "./across";
import { cctp } from "./cctp";

export const entities: ScoredEntity[] = [wormhole, stargate, across, cctp];

export function getEntity(slug: string): ScoredEntity | undefined {
  return entities.find((entity) => entity.slug === slug);
}
