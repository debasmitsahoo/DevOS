import { TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { RadarChart } from "@/components/charts/radar-chart";
import { PILLAR_LIST } from "@/config/pillars";
import type { ScoreSnapshot } from "@/types";

// §0.4 — never a single number in isolation. The headline always expands into
// the per-pillar radar + explainable breakdown.
export function ScoreCard({ score, delta }: { score: ScoreSnapshot; delta: number }) {
  return (
    <Card className="overflow-hidden">
      <div className="grid gap-4 p-5 sm:grid-cols-[auto_1fr]">
        <div className="flex flex-col items-center justify-center">
          <RadarChart pillars={score.pillars} size={200} />
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold tabular-nums">{score.total}</span>
            <span className="text-lg text-muted-foreground">/ 100</span>
            {delta !== 0 && (
              <span className="ml-1 inline-flex items-center gap-0.5 text-sm font-medium text-[var(--success)]">
                <TrendingUp className="size-4" />+{delta} this week
              </span>
            )}
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Engineering Score · <span className="font-mono text-xs">{score.algoVersion}</span>
          </p>

          <div className="mt-4 space-y-2">
            {PILLAR_LIST.map((p) => (
              <div key={p.key} className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-xs text-muted-foreground">{p.label}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full [transition:width_.7s_ease]"
                    style={{
                      width: `${score.pillars[p.key]}%`,
                      background: `var(${p.colorVar})`,
                    }}
                  />
                </div>
                <span className="w-7 text-right text-xs font-medium tabular-nums">
                  {score.pillars[p.key]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <details className="border-t bg-muted/30 px-5 py-3 text-sm [&_summary]:cursor-pointer">
        <summary className="text-muted-foreground hover:text-foreground">
          View breakdown — every point is explainable
        </summary>
        <ul className="mt-3 space-y-1.5">
          {score.events.map((e, i) => (
            <li key={i} className="flex items-center justify-between gap-3 text-xs">
              <span className="text-muted-foreground">
                <span className="mr-1.5 inline-block w-20 font-medium capitalize text-foreground">
                  {e.pillar}
                </span>
                {e.reason}
              </span>
              <span className="shrink-0 font-mono tabular-nums text-[var(--success)]">
                +{e.points.toFixed(1)}
              </span>
            </li>
          ))}
        </ul>
      </details>
    </Card>
  );
}