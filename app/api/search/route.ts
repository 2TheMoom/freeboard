import { NextRequest, NextResponse } from "next/server";
import { searchProtocols } from "../../../lib/defillama";
import { entities } from "../../../data/entities";
import { entityComposite } from "../../../lib/scoring";

export interface SearchResult {
  name: string;
  category: string;
  chains: string[];
  tvl: number | null;
  curated: boolean;
  href: string;
  score?: number | null;
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";
  const query = q.trim().toLowerCase();
  if (!query) return NextResponse.json({ results: [] });

  const curatedSlugs = new Set(entities.map((e) => e.defillamaSlug).filter(Boolean) as string[]);

  const curatedMatches: SearchResult[] = entities
    .filter((e) => e.name.toLowerCase().includes(query))
    .map((e) => ({
      name: e.name,
      category: e.category === "bridge" ? "Bridge" : e.category,
      chains: e.chains ?? [],
      tvl: null,
      curated: true,
      href: `/entities/${e.slug}`,
      score: entityComposite(e),
    }));

  let defillamaResults: SearchResult[] = [];
  try {
    const hits = await searchProtocols(query, 25);
    defillamaResults = hits
      .filter((p) => !curatedSlugs.has(p.slug))
      .map((p) => ({
        name: p.name,
        category: p.category,
        chains: p.chains ?? [],
        tvl: p.tvl ?? null,
        curated: false,
        href: `/discover/${p.slug}`,
      }));
  } catch {
    // DefiLlama unavailable — still return curated matches rather than failing the whole search
  }

  return NextResponse.json({ results: [...curatedMatches, ...defillamaResults].slice(0, 20) });
}
