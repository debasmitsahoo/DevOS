import { Plus, FileText, RefreshCw, GitPullRequest, PenLine, TrendingUp, Users } from "lucide-react";
import { SOURCES } from "@/config/sources";
import { timeAgo } from "@/lib/utils";
import type { ConnectionStatus } from "@/types";

const STATUS_DOT: Record<string, string> = {
  ACTIVE: "bg-[var(--success)]",
  STALE: "bg-[var(--warning)]",
  ERROR: "bg-destructive",
  REVOKED: "bg-muted-foreground",
};

const CHANGE_ICON = {
  code: GitPullRequest,
  writing: PenLine,
  score: TrendingUp,
  social: Users,
} as const;

export function UtilityPanel({
  connections,
  whatChanged,
}: {
  connections: ConnectionStatus[];
  whatChanged: { label: string; kind: "code" | "writing" | "score" | "social" }[];
}) {
  return (
    <aside className="hidden w-72 shrink-0 space-y-6 border-l p-4 xl:block">
      <section>
        <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Sync status
        </h3>
        <ul className="space-y-1.5">
          {connections.map((c) => (
            <li key={c.source} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <span className={`size-1.5 rounded-full ${STATUS_DOT[c.status]}`} />
                {SOURCES[c.source].label}
              </span>
              <span className="text-xs text-muted-foreground">
                {c.status === "STALE"
                  ? "stale"
                  : c.lastSyncedAt
                    ? timeAgo(c.lastSyncedAt)
                    : "—"}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          What changed
        </h3>
        <ul className="space-y-2">
          {whatChanged.map((w) => {
            const Icon = CHANGE_ICON[w.kind];
            return (
              <li key={w.label} className="flex items-center gap-2 text-sm">
                <Icon className="size-3.5 text-primary" />
                {w.label}
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Quick actions
        </h3>
        <div className="space-y-1.5">
          {[
            { label: "Add milestone", icon: Plus },
            { label: "Build résumé", icon: FileText },
            { label: "Re-sync all", icon: RefreshCw },
          ].map((a) => {
            const Icon = a.icon;
            return (
              <button
                key={a.label}
                className="flex w-full items-center gap-2 rounded-md border bg-card px-2.5 py-2 text-sm transition-colors hover:bg-accent"
              >
                <Icon className="size-4 text-muted-foreground" />
                {a.label}
              </button>
            );
          })}
        </div>
      </section>
    </aside>
  );
}