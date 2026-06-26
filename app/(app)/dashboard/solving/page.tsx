import { TrendingUp, TrendingDown, Swords, BarChart2, CheckCircle2, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildDemoPassport } from "@/lib/mock/data";

export const metadata = { title: "Problem-Solving" };

export default function SolvingPage() {
  const p = buildDemoPassport();
  const contest = p.contests[0];
  const { easy, medium, hard } = contest.difficultyMix;
  const total = easy + medium + hard;

  const ratingHistory = [1420, 1540, 1612, 1520, 1700, 1780, 1850, 1912];
  const maxR = Math.max(...ratingHistory);
  const minR = Math.min(...ratingHistory);

  return (
    <div className="min-h-full space-y-5 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Problem-Solving</h1>
          <p className="text-sm text-muted-foreground">
            Competitive programming ratings &amp; difficulty breakdown
          </p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <a href={`https://codeforces.com/profile/${contest.handle}`} target="_blank" rel="noreferrer">
            <ExternalLink className="mr-2 size-4" />
            View profile
          </a>
        </Button>
      </div>

      {/* stat row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Current rating", value: contest.rating, icon: TrendingUp, positive: true },
          { label: "Peak rating",    value: contest.maxRating, icon: BarChart2, positive: true },
          { label: "Problems solved",value: contest.solvedCount, icon: CheckCircle2, positive: true },
          { label: "Rank",           value: contest.rank, icon: Swords, positive: true },
        ].map(({ label, value, icon: Icon, positive }) => (
          <Card key={label} className="p-4">
            <div className="flex items-center justify-between mb-1">
              <Icon className="size-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-black text-foreground tabular-nums">{value}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </Card>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* rating history sparkline */}
        <Card>
          <CardHeader className="pb-2 pt-4 px-5">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Rating history</CardTitle>
              <Badge variant="secondary">Codeforces</Badge>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="relative h-36">
              <svg viewBox="0 0 320 120" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="ratingGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* area */}
                <path
                  d={[
                    ...ratingHistory.map((r, i) => {
                      const x = (i / (ratingHistory.length - 1)) * 300 + 10;
                      const y = 10 + ((maxR - r) / (maxR - minR)) * 100;
                      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
                    }),
                    `L ${310} 110 L 10 110 Z`,
                  ].join(" ")}
                  fill="url(#ratingGrad)"
                />
                {/* line */}
                <path
                  d={ratingHistory
                    .map((r, i) => {
                      const x = (i / (ratingHistory.length - 1)) * 300 + 10;
                      const y = 10 + ((maxR - r) / (maxR - minR)) * 100;
                      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
                    })
                    .join(" ")}
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* dots */}
                {ratingHistory.map((r, i) => {
                  const x = (i / (ratingHistory.length - 1)) * 300 + 10;
                  const y = 10 + ((maxR - r) / (maxR - minR)) * 100;
                  return (
                    <circle key={i} cx={x} cy={y} r="3.5" fill="var(--color-primary)"
                      stroke="var(--color-background)" strokeWidth="1.5" />
                  );
                })}
              </svg>
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>Min: {minR}</span>
              <span>Max: {maxR}</span>
              <span>Current: {contest.rating}</span>
            </div>
          </CardContent>
        </Card>

        {/* difficulty breakdown */}
        <Card>
          <CardHeader className="pb-2 pt-4 px-5">
            <CardTitle className="text-sm">Difficulty breakdown</CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="flex items-end gap-4 h-32">
              {[
                { label: "Easy",   count: easy,   color: "bg-success",  pct: (easy / total) * 100 },
                { label: "Medium", count: medium,  color: "bg-warning",  pct: (medium / total) * 100 },
                { label: "Hard",   count: hard,    color: "bg-destructive", pct: (hard / total) * 100 },
              ].map((d) => (
                <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-sm font-bold text-foreground">{d.count}</span>
                  <div className="w-full overflow-hidden rounded-t-md" style={{ height: `${d.pct * 0.8}%` }}>
                    <div className={`h-full w-full ${d.color}`} />
                  </div>
                  <span className="text-xs text-muted-foreground">{d.label}</span>
                </div>
              ))}
            </div>

            {/* stacked progress */}
            <div className="mt-4 flex h-2 w-full overflow-hidden rounded-full">
              <div className="bg-success" style={{ width: `${(easy / total) * 100}%` }} />
              <div className="bg-warning" style={{ width: `${(medium / total) * 100}%` }} />
              <div className="bg-destructive" style={{ width: `${(hard / total) * 100}%` }} />
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>Easy {Math.round((easy / total) * 100)}%</span>
              <span>Medium {Math.round((medium / total) * 100)}%</span>
              <span>Hard {Math.round((hard / total) * 100)}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* platform card */}
      <Card>
        <CardHeader className="pb-2 pt-4 px-5">
          <CardTitle className="text-sm">Connected platforms</CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <div className="flex items-center justify-between rounded-xl border bg-muted/20 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-xs">
                CF
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">Codeforces</div>
                <div className="text-xs text-muted-foreground">@{contest.handle} · {contest.rank}</div>
              </div>
            </div>
            <Badge variant="success">Verified</Badge>
          </div>
          <div className="mt-3 flex items-center justify-between rounded-xl border border-dashed border-border bg-muted/10 px-4 py-3 text-sm text-muted-foreground">
            <span>+ Connect LeetCode (V2)</span>
            <Button variant="ghost" size="sm" disabled>Coming soon</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
