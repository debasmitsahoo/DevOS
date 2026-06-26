"use client";

import * as React from "react";
import { PILLAR_LIST } from "@/config/pillars";
import type { Pillars } from "@/types";

// Dependency-light SVG radar for the 5 reputation pillars (§0.4 — the headline
// score always expands into a per-pillar radar).
export function RadarChart({
  pillars,
  size = 220,
}: {
  pillars: Pillars;
  size?: number;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 28;
  const n = PILLAR_LIST.length;

  const pointAt = (i: number, radius: number) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)] as const;
  };

  const rings = [0.25, 0.5, 0.75, 1];

  const dataPoints = PILLAR_LIST.map((p, i) => {
    const value = (pillars[p.key] ?? 0) / 100;
    return pointAt(i, r * value);
  });
  const polygon = dataPoints.map(([x, y]) => `${x},${y}`).join(" ");

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
      {rings.map((ring) => (
        <polygon
          key={ring}
          points={PILLAR_LIST.map((_, i) => pointAt(i, r * ring).join(",")).join(" ")}
          fill="none"
          stroke="var(--border)"
          strokeWidth={1}
        />
      ))}
      {PILLAR_LIST.map((_, i) => {
        const [x, y] = pointAt(i, r);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--border)" strokeWidth={1} />;
      })}

      <polygon
        points={polygon}
        fill="color-mix(in oklab, var(--primary) 22%, transparent)"
        stroke="var(--primary)"
        strokeWidth={2}
        strokeLinejoin="round"
        className="[transition:all_.6s_ease]"
      />
      {dataPoints.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3} fill="var(--primary)" />
      ))}

      {PILLAR_LIST.map((p, i) => {
        const [x, y] = pointAt(i, r + 16);
        return (
          <text
            key={p.key}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-muted-foreground text-[9px] font-medium"
          >
            {p.label.split("-")[0]}
          </text>
        );
      })}
    </svg>
  );
}