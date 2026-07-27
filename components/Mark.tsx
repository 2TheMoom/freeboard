export function Mark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <rect x="6" y="32" width="52" height="18" fill="var(--water)" opacity="0.22" />
      <path
        d="M9,24 Q32,12 55,24 L55,40 Q32,50 9,40 Z"
        stroke="var(--text)"
        strokeWidth="2.4"
        fill="none"
        strokeLinejoin="round"
      />
      <line x1="4" y1="32" x2="60" y2="32" stroke="var(--accent)" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}

export function RuleDivider() {
  return (
    <div className="rule" aria-hidden="true">
      <span className="bar" />
      <svg width="72" height="20" viewBox="0 0 72 20">
        <circle cx="36" cy="10" r="9" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <line x1="27" y1="10" x2="45" y2="10" stroke="currentColor" strokeWidth="1.4" />
      </svg>
      <span className="bar" />
    </div>
  );
}
