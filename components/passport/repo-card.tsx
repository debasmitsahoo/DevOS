import { Star, GitFork, Pin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { compact } from "@/lib/utils";
import type { RepoCard as Repo } from "@/types";

export function RepoCard({ repo }: { repo: Repo }) {
  return (
    <Card className="flex flex-col p-4 transition-colors hover:border-primary/40">
      <div className="flex items-start justify-between gap-2">
        <a
          href={repo.url}
          target="_blank"
          rel="noreferrer"
          className="font-medium hover:text-primary hover:underline"
        >
          {repo.name}
        </a>
        {repo.pinned && <Pin className="size-3.5 shrink-0 text-muted-foreground" />}
      </div>
      <p className="mt-1 line-clamp-2 flex-1 text-sm text-muted-foreground">{repo.description}</p>
      <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
        {repo.primaryLang && (
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-primary" />
            {repo.primaryLang}
          </span>
        )}
        <span className="inline-flex items-center gap-1">
          <Star className="size-3.5" /> {compact(repo.stars)}
        </span>
        <span className="inline-flex items-center gap-1">
          <GitFork className="size-3.5" /> {compact(repo.forks)}
        </span>
      </div>
    </Card>
  );
}