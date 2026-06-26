import { Trophy, Mic, GitMerge, Zap, ExternalLink, ShieldCheck, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildDemoPassport } from "@/lib/mock/data";
import type { MilestoneItem } from "@/types";
import { cn } from "@/lib/utils";

export const metadata = { title: "Achievements" };

const TYPE_CONFIG: Record<MilestoneItem["type"], { icon: typeof Trophy; label: string; color: string }> = {
  HACKATHON:  { icon: Zap,      label: "Hackathon",  color: "bg-amber-500/15 text-amber-600 dark:text-amber-400" },
  AWARD:      { icon: Trophy,   label: "Award",      color: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400" },
  TALK:       { icon: Mic,      label: "Talk",       color: "bg-blue-500/15 text-blue-600 dark:text-blue-400" },
  LEADERSHIP: { icon: Trophy,   label: "Leadership", color: "bg-purple-500/15 text-purple-600 dark:text-purple-400" },
  OSS:        { icon: GitMerge, label: "OSS",        color: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" },
  CUSTOM:     { icon: Trophy,   label: "Custom",     color: "bg-muted text-muted-foreground" },
};

function timeFrom(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function AchievementsPage() {
  const p = buildDemoPassport();
  const verified = p.milestones.filter((m) => m.verified);

  return (
    <div className="min-h-full space-y-5 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Achievements</h1>
          <p className="text-sm text-muted-foreground">
            Hackathons, talks, awards and OSS milestones — verified where it counts
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Plus className="mr-2 size-4" />
          Add achievement
        </Button>
      </div>

      {/* quick stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total",      value: p.milestones.length },
          { label: "Verified",   value: verified.length },
          { label: "Hackathons", value: p.milestones.filter((m) => m.type === "HACKATHON").length },
          { label: "Talks",      value: p.milestones.filter((m) => m.type === "TALK").length },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <div className="text-2xl font-black text-foreground">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </Card>
        ))}
      </div>

      {/* timeline */}
      <div>
        <h2 className="mb-4 text-sm font-semibold text-muted-foreground">Timeline</h2>
        <div className="relative space-y-0">
          {p.milestones.map((m, i) => {
            const cfg = TYPE_CONFIG[m.type];
            const Icon = cfg.icon;
            return (
              <div key={m.id} className="relative flex gap-4 pb-6 last:pb-0">
                {/* vertical connector */}
                {i < p.milestones.length - 1 && (
                  <div className="absolute left-[19px] top-12 bottom-0 w-px bg-border" />
                )}

                {/* icon */}
                <div className={cn("relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", cfg.color)}>
                  <Icon className="size-5" />
                </div>

                {/* content */}
                <div className="flex-1 rounded-xl border bg-card px-4 py-3 shadow-sm">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-sm text-foreground">{m.title}</span>
                        {m.verified && <ShieldCheck className="size-3.5 text-success" />}
                      </div>
                      {m.description && (
                        <p className="mt-0.5 text-xs text-muted-foreground">{m.description}</p>
                      )}
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1.5">
                      <Badge variant="secondary" className="text-[10px]">{cfg.label}</Badge>
                      {m.link && (
                        <a href={m.link} target="_blank" rel="noreferrer"
                          className="text-muted-foreground hover:text-primary">
                          <ExternalLink className="size-3" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="mt-1.5 text-[11px] text-muted-foreground">{timeFrom(m.occurredAt)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* add more prompt */}
      <Card className="border-dashed">
        <CardContent className="flex items-center gap-3 px-5 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted/40">
            <Plus className="size-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Got more to show?</p>
            <p className="text-xs text-muted-foreground">Log hackathons, conference talks, open source awards, or any career milestone.</p>
          </div>
          <Button variant="outline" size="sm" className="ml-auto shrink-0">Add</Button>
        </CardContent>
      </Card>
    </div>
  );
}
