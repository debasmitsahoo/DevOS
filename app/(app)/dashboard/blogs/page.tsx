import { Heart, MessageSquare, Clock, ExternalLink, PenLine, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildDemoPassport } from "@/lib/mock/data";
import type { ArticleCard } from "@/types";

export const metadata = { title: "Blogs" };

function timeAgo(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 864e5);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

const SOURCE_LABEL: Record<string, string> = {
  DEVTO:    "Dev.to",
  HASHNODE: "Hashnode",
};

function ArticleRow({ article }: { article: ArticleCard }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-xl border bg-card px-5 py-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-sm text-foreground group-hover:text-primary line-clamp-2 flex-1">
          {article.title}
        </h3>
        <ExternalLink className="mt-0.5 size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <Badge variant="secondary" className="text-[10px]">
          {SOURCE_LABEL[article.source] ?? article.source}
        </Badge>
        <span className="flex items-center gap-1"><Heart className="size-3" />{article.reactions}</span>
        <span className="flex items-center gap-1"><MessageSquare className="size-3" />{article.comments}</span>
        <span className="flex items-center gap-1"><Clock className="size-3" />{article.readingMin} min read</span>
        <span className="ml-auto">{timeAgo(article.publishedAt)}</span>
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {article.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-muted/40 px-2 py-0.5 text-[10px] text-muted-foreground">
            #{tag}
          </span>
        ))}
      </div>
    </a>
  );
}

export default function BlogsPage() {
  const p = buildDemoPassport();
  const totalReactions = p.articles.reduce((a, art) => a + art.reactions, 0);
  const totalRead      = p.articles.reduce((a, art) => a + art.readingMin, 0);

  return (
    <div className="min-h-full space-y-5 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Blogs</h1>
          <p className="text-sm text-muted-foreground">
            Articles from Dev.to and Hashnode — verified &amp; synced
          </p>
        </div>
        <Button variant="outline" size="sm">
          <PenLine className="mr-2 size-4" />
          Connect source
        </Button>
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Articles",       value: p.stats.articles },
          { label: "Total reactions",value: totalReactions.toLocaleString() },
          { label: "Total read time",value: `${totalRead} min` },
          { label: "Platforms",      value: 2 },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <div className="text-2xl font-black text-foreground">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </Card>
        ))}
      </div>

      {/* engagement chart placeholder */}
      <Card>
        <CardHeader className="pb-2 pt-4 px-5">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Engagement over time</CardTitle>
            <div className="flex items-center gap-1 text-xs text-success">
              <TrendingUp className="size-3.5" />
              +24% this month
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          {/* simple bar chart using article data */}
          <div className="flex h-24 items-end gap-2">
            {p.articles.map((art) => (
              <div key={art.id} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-[9px] text-muted-foreground">{art.reactions}</span>
                <div
                  className="w-full rounded-t-md bg-primary/60"
                  style={{ height: `${(art.reactions / totalReactions) * 80}%`, minHeight: 4 }}
                />
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Reactions per article</p>
        </CardContent>
      </Card>

      {/* articles list */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
          All articles ({p.articles.length})
        </h2>
        <div className="space-y-3">
          {p.articles.map((art) => (
            <ArticleRow key={art.id} article={art} />
          ))}
        </div>
      </div>

      {/* platforms */}
      <Card>
        <CardHeader className="pb-2 pt-4 px-5">
          <CardTitle className="text-sm">Connected platforms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 px-5 pb-5">
          {[
            { abbr: "DT", name: "Dev.to",   desc: "API key connected", active: true },
            { abbr: "HN", name: "Hashnode", desc: "API key connected", active: true },
          ].map((p) => (
            <div key={p.name} className="flex items-center justify-between rounded-xl border bg-muted/20 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-xs">
                  {p.abbr}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.desc}</div>
                </div>
              </div>
              <Badge variant="success">Active</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
