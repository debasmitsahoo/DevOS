import { Star, GitFork, ExternalLink, Pin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildDemoPassport } from "@/lib/mock/data";

export const metadata = { title: "Repositories" };

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 864e5);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  Rust:       "bg-orange-500",
  Python:     "bg-green-500",
  "Jupyter Notebook": "bg-orange-400",
  CSS:        "bg-purple-500",
};

export default function RepositoriesPage() {
  const p = buildDemoPassport();

  return (
    <div className="min-h-full space-y-5 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Repositories</h1>
          <p className="text-sm text-muted-foreground">
            {p.repos.length} verified repos · synced from GitHub
          </p>
        </div>
        <Button variant="outline" size="sm">
          <ExternalLink className="mr-2 size-4" />
          Sync GitHub
        </Button>
      </div>

      {/* summary bar */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total repos",     value: p.stats.repos },
          { label: "Total stars",     value: p.repos.reduce((a, r) => a + r.stars, 0).toLocaleString() },
          { label: "Total forks",     value: p.repos.reduce((a, r) => a + r.forks, 0).toLocaleString() },
          { label: "Pinned",          value: p.repos.filter((r) => r.pinned).length },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <div className="text-2xl font-black text-foreground">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </Card>
        ))}
      </div>

      {/* pinned */}
      {p.pinnedRepos.length > 0 && (
        <div>
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <Pin className="size-3.5" /> Pinned
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {p.pinnedRepos.map((repo) => (
              <Card key={repo.id} className="flex flex-col p-4 transition-all hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <a href={repo.url} target="_blank" rel="noreferrer"
                      className="font-semibold text-sm text-foreground hover:text-primary hover:underline">
                      {repo.fullName}
                    </a>
                  </div>
                  {repo.primaryLang && (
                    <Badge variant="secondary" className="shrink-0 text-[10px]">{repo.primaryLang}</Badge>
                  )}
                </div>
                {repo.description && (
                  <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                    {repo.description}
                  </p>
                )}
                {/* language bar */}
                <div className="mt-3 flex h-1.5 w-full overflow-hidden rounded-full">
                  {Object.entries(repo.languages).map(([lang, pct]) => (
                    <div
                      key={lang}
                      className={LANG_COLORS[lang] ?? "bg-muted"}
                      style={{ width: `${pct}%` }}
                      title={`${lang}: ${pct}%`}
                    />
                  ))}
                </div>
                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Star className="size-3" />{repo.stars.toLocaleString()}</span>
                  <span className="flex items-center gap-1"><GitFork className="size-3" />{repo.forks.toLocaleString()}</span>
                  <span className="ml-auto flex items-center gap-1"><Clock className="size-3" />{timeAgo(repo.pushedAt)}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* all repos */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">All repositories</h2>
        <Card>
          <div className="divide-y">
            {p.repos.map((repo) => (
              <div key={repo.id} className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-muted/20">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <a href={repo.url} target="_blank" rel="noreferrer"
                      className="font-medium text-sm text-foreground hover:text-primary hover:underline">
                      {repo.fullName}
                    </a>
                    {repo.pinned && <Pin className="size-3 text-muted-foreground" />}
                  </div>
                  {repo.description && (
                    <p className="mt-0.5 text-xs text-muted-foreground truncate">{repo.description}</p>
                  )}
                </div>
                <div className="hidden items-center gap-4 text-xs text-muted-foreground sm:flex">
                  {repo.primaryLang && (
                    <div className="flex items-center gap-1.5">
                      <span className={`h-2.5 w-2.5 rounded-full ${LANG_COLORS[repo.primaryLang] ?? "bg-muted"}`} />
                      {repo.primaryLang}
                    </div>
                  )}
                  <span className="flex items-center gap-1"><Star className="size-3" />{repo.stars.toLocaleString()}</span>
                  <span className="flex items-center gap-1"><GitFork className="size-3" />{repo.forks.toLocaleString()}</span>
                  <span>{timeAgo(repo.pushedAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
