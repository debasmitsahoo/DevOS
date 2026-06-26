import { FolderGit2, PenLine, Users, Swords } from "lucide-react";
import { Card } from "@/components/ui/card";
import { compact } from "@/lib/utils";

const ICONS = { repos: FolderGit2, articles: PenLine, followers: Users, solved: Swords };

export function StatGrid({
  stats,
}: {
  stats: { repos: number; articles: number; followers: number; solved: number };
}) {
  const items: { key: keyof typeof stats; label: string; delta?: string }[] = [
    { key: "repos", label: "Repositories", delta: "+2" },
    { key: "articles", label: "Articles" },
    { key: "followers", label: "Followers", delta: "+38" },
    { key: "solved", label: "Solved" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map(({ key, label, delta }) => {
        const Icon = ICONS[key];
        return (
          <Card key={key} className="p-4">
            <div className="flex items-center justify-between">
              <Icon className="size-4 text-muted-foreground" />
              {delta && <span className="text-xs font-medium text-[var(--success)]">▲ {delta}</span>}
            </div>
            <div className="mt-2 text-2xl font-bold tabular-nums">{compact(stats[key])}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </Card>
        );
      })}
    </div>
  );
}