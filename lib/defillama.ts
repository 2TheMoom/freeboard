export interface DefiLlamaProtocol {
  name: string;
  slug: string;
  category: string;
  chains: string[];
  tvl: number;
  url: string;
  logo: string;
  description: string;
  audits: string;
  audit_links: string[];
}

let cache: { data: DefiLlamaProtocol[]; fetchedAt: number } | null = null;
const TTL_MS = 60 * 60 * 1000;

async function fetchProtocols(): Promise<DefiLlamaProtocol[]> {
  if (cache && Date.now() - cache.fetchedAt < TTL_MS) return cache.data;

  const res = await fetch("https://api.llama.fi/protocols", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    if (cache) return cache.data;
    throw new Error(`DefiLlama /protocols returned ${res.status}`);
  }
  const data = (await res.json()) as DefiLlamaProtocol[];
  cache = { data, fetchedAt: Date.now() };
  return data;
}

export async function searchProtocols(query: string, limit = 20): Promise<DefiLlamaProtocol[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const all = await fetchProtocols();

  const matches = all.filter((p) => p.name.toLowerCase().includes(q));
  matches.sort((a, b) => {
    const aExact = a.name.toLowerCase() === q ? 1 : 0;
    const bExact = b.name.toLowerCase() === q ? 1 : 0;
    if (aExact !== bExact) return bExact - aExact;
    return (b.tvl ?? 0) - (a.tvl ?? 0);
  });
  return matches.slice(0, limit);
}

export async function getProtocolBySlug(slug: string): Promise<DefiLlamaProtocol | undefined> {
  const all = await fetchProtocols();
  return all.find((p) => p.slug === slug);
}
