import { BadgeCheck, MapPin, Star } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ContributionHeatmap } from "@/components/charts/contribution-heatmap";
import { PILLAR_LIST } from "@/config/pillars";
import { compact } from "@/lib/utils";
import type { PassportData } from "@/types";

// The live demo card from §4.1 — a real <PassportPreview/>, not a PNG. Proves
// the product in one second.
export function PassportPreview({ data }: { data: PassportData }) {
  return (
    <div className="w-full max-w-md rounded-2xl border bg-card p-5 shadow-xl">
      <div className="flex items-start gap-3">
        <Avatar alt={data.displayName} size={48} fallback="DS" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="truncate font-semibold">{data.displayName}</span>
            {data.verified && <BadgeCheck className="size-4 text-primary" />}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>@{data.handle}</span>
            {data.location && (
              <span className="inline-flex items-center gap-0.5">
                <MapPin className="size-3" />
                {data.location}
              </span>
            )}
          </div>
        </div>
        {data.openToWork && (
          <Badge variant="success" className="shrink-0">
            Open to work
          </Badge>
        )}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="text-3xl font-bold tabular-nums">{data.score.total}</div>
        <div className="flex-1">
          <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
            <span>Engineering Score</span>
            <span className="text-[var(--success)]">▲ +3 this week</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary [transition:width_.8s_ease]"
              style={{ width: `${data.score.total}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-5 gap-1.5">
        {PILLAR_LIST.map((p) => (
          <div key={p.key} className="text-center">
            <div
              className="mx-auto mb-1 h-1.5 w-full rounded-full"
              style={{
                background: `color-mix(in oklab, var(${p.colorVar}) ${20 + (data.score.pillars[p.key] ?? 0) * 0.7}%, var(--muted))`,
              }}
            />
            <div className="text-[10px] font-semibold tabular-nums">{data.score.pillars[p.key]}</div>
            <div className="truncate text-[9px] text-muted-foreground">{p.label.split("-")[0]}</div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <ContributionHeatmap counts={data.contributionHeatmap.slice(-182)} />
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 border-t pt-3 text-center">
        {[
          { label: "Repos", value: data.stats.repos },
          { label: "Articles", value: data.stats.articles },
          { label: "Followers", value: data.stats.followers },
          { label: "Solved", value: data.stats.solved },
        ].map((s) => (
          <div key={s.label}>
            <div className="flex items-center justify-center gap-1 text-sm font-semibold tabular-nums">
              {s.label === "Followers" && <Star className="size-3 text-muted-foreground" />}
              {compact(s.value)}
            </div>
            <div className="text-[10px] text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}