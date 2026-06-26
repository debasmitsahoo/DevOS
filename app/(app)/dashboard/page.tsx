import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScoreCard } from "@/components/app/score-card";
import { StatGrid } from "@/components/app/stat-grid";
import { ActivityTimeline } from "@/components/app/activity-timeline";
import { UtilityPanel } from "@/components/app/utility-panel";
import { ContributionHeatmap } from "@/components/charts/contribution-heatmap";
import { getOverview } from "@/server/queries/dashboard";

export default async function DashboardPage() {
  const { passport, connections, whatChanged, scoreDelta } = await getOverview();

  return (
    <div className="flex">
      <div className="min-w-0 flex-1 space-y-5 p-4 md:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Your public passport ·{" "}
            <Link href={`/${passport.handle}`} className="font-medium text-primary hover:underline">
              devos.app/{passport.handle}
            </Link>
          </p>
          <Button asChild variant="outline" size="sm">
            <Link href={`/${passport.handle}`}>
              View passport <ExternalLink className="size-3.5" />
            </Link>
          </Button>
        </div>

        <ScoreCard score={passport.score} delta={scoreDelta} />

        <StatGrid stats={passport.stats} />

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Contribution graph · last 365 days</CardTitle>
          </CardHeader>
          <CardContent>
            <ContributionHeatmap counts={passport.contributionHeatmap} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Recent activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityTimeline items={passport.milestones} />
          </CardContent>
        </Card>
      </div>

      <UtilityPanel connections={connections} whatChanged={whatChanged} />
    </div>
  );
}