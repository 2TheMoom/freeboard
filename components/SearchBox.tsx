"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { SearchResult } from "../app/api/search/route";

function formatTvl(tvl: number | null): string | null {
  if (tvl === null) return null;
  if (tvl >= 1_000_000_000) return `$${(tvl / 1_000_000_000).toFixed(1)}B TVL`;
  if (tvl >= 1_000_000) return `$${(tvl / 1_000_000).toFixed(1)}M TVL`;
  if (tvl >= 1_000) return `$${(tvl / 1_000).toFixed(0)}K TVL`;
  return `$${tvl.toFixed(0)} TVL`;
}

export function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setResults(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const handle = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(q)}`)
        .then((res) => res.json())
        .then((data) => setResults(data.results ?? []))
        .catch(() => setResults([]))
        .finally(() => setLoading(false));
    }, 250);
    return () => clearTimeout(handle);
  }, [query]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const showDropdown = open && query.trim().length > 0;

  return (
    <div ref={containerRef} style={{ position: "relative", maxWidth: 480 }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setOpen(true)}
        placeholder="Search any bridge or protocol…"
        style={{
          width: "100%",
          fontFamily: "var(--font-body)",
          fontSize: 15,
          padding: "12px 14px",
          background: "var(--surface)",
          border: "1px solid var(--line)",
          color: "var(--text)",
        }}
      />
      {showDropdown && (
        <div
          className="card"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            zIndex: 10,
            padding: 6,
            maxHeight: 360,
            overflowY: "auto",
          }}
        >
          {loading && (
            <p style={{ padding: "10px 12px", fontSize: 13, color: "var(--text-dim)" }}>Searching…</p>
          )}
          {!loading && results && results.length === 0 && (
            <p style={{ padding: "10px 12px", fontSize: 13, color: "var(--text-dim)" }}>
              Nothing found for &quot;{query}&quot;.
            </p>
          )}
          {!loading &&
            results?.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 12px",
                }}
              >
                <span style={{ minWidth: 0 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 15, marginRight: 8 }}>{r.name}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)" }}>
                    {r.category}
                    {r.chains.length ? ` · ${r.chains.slice(0, 2).join(", ")}` : ""}
                    {formatTvl(r.tvl) ? ` · ${formatTvl(r.tvl)}` : ""}
                  </span>
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: r.curated ? "var(--score-good)" : "var(--text-dim)",
                    flexShrink: 0,
                  }}
                >
                  {r.curated ? (typeof r.score === "number" ? `${r.score.toFixed(1)}/10` : "Reviewed") : "Not reviewed"}
                </span>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
