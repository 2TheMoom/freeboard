function bandColor(score: number): string {
  if (score >= 7) return "var(--score-good)";
  if (score >= 4) return "var(--score-mid)";
  return "var(--score-low)";
}

export function ScoreBadge({ score, size = "md" }: { score: number | null; size?: "sm" | "md" | "lg" }) {
  const fontSize = size === "lg" ? "40px" : size === "md" ? "22px" : "15px";
  const labelSize = size === "lg" ? "13px" : "10px";

  if (score === null) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize,
            color: "var(--text-dim)",
          }}
        >
          —
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: labelSize,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--text-dim)",
          }}
        >
          Rating pending
        </span>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
      <span style={{ fontFamily: "var(--font-display)", fontSize, color: bandColor(score) }}>
        {score.toFixed(1)}
        <span style={{ fontSize: "0.5em", color: "var(--text-dim)" }}>/10</span>
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: labelSize,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--text-dim)",
        }}
      >
        Composite
      </span>
    </div>
  );
}

export function PillarChip({ label, score }: { label: string; score: number | null }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        padding: "6px 10px",
        border: "1px solid var(--line)",
        background: "var(--surface-2)",
      }}
    >
      <span style={{ color: "var(--text-dim)" }}>{label}</span>
      <span style={{ color: score === null ? "var(--text-dim)" : bandColor(score), fontWeight: 600 }}>
        {score === null ? "—" : score.toFixed(1)}
      </span>
    </div>
  );
}
