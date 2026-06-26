import { BadgeCheck, Trophy, Mic, GitPullRequest, Star, Crown, Sparkles } from "lucide-react";
import { timeAgo } from "@/lib/utils";
import type { MilestoneItem } from "@/types";

const TYPE_ICON = {
  HACKATHON: Trophy,
  AWARD: Star,
  TALK: Mic,
  LEADERSHIP: Crown,
  OSS: GitPullRequest,
  CUSTOM: Sparkles,
} as const;

export function ActivityTimeline({ items }: { items: MilestoneItem[] }) {
  return (
    <ol className="relative space-y-4 pl-6">
      <span className="absolute left-[9px] top-1 bottom-1 w-px bg-border" aria-hidden />
      {items.map((m) => {
        const Icon = TYPE_ICON[m.type];
        return (
          <li key={m.id} className="relative">
            <span className="absolute -left-6 grid size-[18px] place-items-center rounded-full border bg-card">
              <Icon className="size-3 text-primary" />
            </span>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="flex items-center gap-1.5 text-sm font-medium">
                  {m.title}
                  {m.verified && <BadgeCheck className="size-3.5 text-primary" />}
                </p>
                {m.description && (
                  <p className="text-xs text-muted-foreground">{m.description}</p>
                )}
              </div>
              <time className="shrink-0 text-xs text-muted-foreground">{timeAgo(m.occurredAt)}</time>
            </div>
          </li>
        );
      })}
    </ol>
  );
}