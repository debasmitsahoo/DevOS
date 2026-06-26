import { cn } from "@/lib/utils";

// GitHub-style 365-day contribution heatmap (§4.2). Server component — pure SVG,
// no client JS. `counts` is oldest→newest.
export function ContributionHeatmap({
  counts,
  className,
}: {
  counts: number[];
  className?: string;
}) {
  const cell = 11;
  const gap = 3;
  const weeks = Math.ceil(counts.length / 7);
  const width = weeks * (cell + gap);
  const height = 7 * (cell + gap);

  const level = (c: number) => {
    if (c <= 0) return 0;
    if (c <= 2) return 1;
    if (c <= 4) return 2;
    if (c <= 6) return 3;
    return 4;
  };
  const fill = [
    "var(--muted)",
    "color-mix(in oklab, var(--primary) 28%, var(--muted))",
    "color-mix(in oklab, var(--primary) 52%, var(--muted))",
    "color-mix(in oklab, var(--primary) 76%, transparent)",
    "var(--primary)",
  ];

  const total = counts.reduce((a, b) => a + b, 0);

  return (
    <div className={cn("space-y-2", className)}>
      <svg
        width="100%"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMinYMin meet"
        role="img"
        aria-label={`${total} contributions in the last year`}
      >
        {counts.map((c, i) => {
          const week = Math.floor(i / 7);
          const day = i % 7;
          return (
            <rect
              key={i}
              x={week * (cell + gap)}
              y={day * (cell + gap)}
              width={cell}
              height={cell}
              rx={2}
              fill={fill[level(c)]}
            />
          );
        })}
      </svg>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{total.toLocaleString()} contributions in the last year</span>
        <span className="flex items-center gap-1">
          Less
          {fill.map((f, i) => (
            <span key={i} className="size-2.5 rounded-[2px]" style={{ background: f }} />
          ))}
          More
        </span>
      </div>
    </div>
  );
}