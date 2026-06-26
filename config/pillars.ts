import type { PillarKey, PillarMeta } from "@/types";

// §11.4 — five pillars and their default weights. Single source of truth used
// by the scoring engine, the radar chart, and the score breakdown UI.
export const PILLARS: Record<PillarKey, PillarMeta> = {
  code: { key: "code", label: "Code", colorVar: "--chart-1", weight: 0.3 },
  solving: { key: "solving", label: "Problem-Solving", colorVar: "--chart-2", weight: 0.25 },
  writing: { key: "writing", label: "Writing", colorVar: "--chart-3", weight: 0.15 },
  community: { key: "community", label: "Community", colorVar: "--chart-4", weight: 0.15 },
  consistency: { key: "consistency", label: "Consistency", colorVar: "--chart-5", weight: 0.15 },
};

export const PILLAR_LIST: PillarMeta[] = Object.values(PILLARS);