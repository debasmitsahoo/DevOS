import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  BadgeCheck,
  MapPin,
  Globe,
  Trophy,
  Heart,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { RepoCard } from "@/components/passport/repo-card";
import { ContributionHeatmap } from "@/components/charts/contribution-heatmap";
import { ActivityTimeline } from "@/components/app/activity-timeline";
import { RadarChart } from "@/components/charts/radar-chart";
import { SOURCES } from "@/config/sources";
import { getPassport } from "@/server/queries/passport";
import { compact } from "@/lib/utils";

interface Props {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const data = await getPassport(handle);
  if (!data) return { title: "Profile not found" };
  const title = `${data.displayName} (@${data.handle})`;
  const description =
    data.bio ?? `${data.displayName}'s verified developer passport on DevOS.`;
  return {
    title,
    description,
    openGraph: { title, description, url: `/${data.handle}`, type: "profile" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function PassportPage({ params }: Props) {
  const { handle } = await params;
  const data = await getPassport(handle);
  if (!data) notFound();

  return (
    <div className="min-h-dvh">
      {/* Banner */}
      <div className="h-40 w-full bg-gradient-to-br from-primary/25 via-primary/10 to-transparent md:h-52" />

      <div className="mx-auto max-w-5xl px-4 pb-20">
        {/* Header */}
        <header className="-mt-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex items-end gap-4">
            <span className="rounded-2xl border-4 border-background">
              <Avatar alt={data.displayName} size={96} fallback="DS" className="rounded-xl" />
            </span>
            <div className="pb-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{data.displayName}</h1>
                {data.verified && <BadgeCheck className="size-5 text-primary" />}
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                <span>@{data.handle}</span>
                {data.location && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="size-3.5" /> {data.location}
                  </span>
                )}
                {data.openToWork && <Badge variant="success">Open to work</Badge>}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pb-1">
            {data.socials.github && (
              <a href={data.socials.github} target="_blank" rel="noreferrer" className="rounded-md border bg-card p-2 hover:bg-accent">
                <Github className="size-4" />
              </a>
            )}
            {data.website && (
              <a href={data.website} target="_blank" rel="noreferrer" className="rounded-md border bg-card p-2 hover:bg-accent">
                <Globe className="size-4" />
              </a>
            )}
            <Link
              href="/sign-up"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Follow
            </Link>
          </div>
        </header>

        {data.bio && <p className="mt-4 max-w-2xl text-sm text-muted-foreground">{data.bio}</p>}

        {/* Score + stats */}
        <div className="mt-6 grid gap-4 md:grid-cols-[280px_1fr]">
          <Card className="flex items-center gap-4 p-4">
            <RadarChart pillars={data.score.pillars} size={140} />
            <div>
              <div className="text-4xl font-bold tabular-nums">{data.score.total}</div>
              <div className="text-xs text-muted-foreground">Engineering Score</div>
              <div className="mt-1 font-mono text-[10px] text-muted-foreground">
                {data.score.algoVersion}
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Repos", value: data.stats.repos },
              { label: "Articles", value: data.stats.articles },
              { label: "Followers", value: data.stats.followers },
              { label: "Solved", value: data.stats.solved },
            ].map((s) => (
              <Card key={s.label} className="flex flex-col justify-center p-4">
                <div className="text-2xl font-bold tabular-nums">{compact(s.value)}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </Card>
            ))}
            <Card className="col-span-2 p-4 sm:col-span-4">
              <ContributionHeatmap counts={data.contributionHeatmap} />
            </Card>
          </div>
        </div>

        {/* Pinned / Code */}
        <Section title="Pinned" pillar={`Code · ${data.score.pillars.code}`}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {data.pinnedRepos.map((r) => (
              <RepoCard key={r.id} repo={r} />
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {data.topLanguages.map((l) => (
              <Badge key={l.name} variant="secondary">
                {l.name} · {l.pct}%
              </Badge>
            ))}
          </div>
        </Section>

        {/* Solving */}
        <Section title="Problem-Solving" pillar={`Solving · ${data.score.pillars.solving}`}>
          <div className="grid gap-3 sm:grid-cols-2">
            {data.contests.map((c) => (
              <Card key={c.source} className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{SOURCES[c.source].label}</span>
                  <Badge>{c.rank}</Badge>
                </div>
                <div className="mt-3 flex items-end gap-4">
                  <div>
                    <div className="text-2xl font-bold tabular-nums">{c.rating}</div>
                    <div className="text-xs text-muted-foreground">rating · max {c.maxRating}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold tabular-nums">{c.solvedCount}</div>
                    <div className="text-xs text-muted-foreground">solved</div>
                  </div>
                </div>
                <div className="mt-3 flex gap-1.5 text-[10px]">
                  <span className="rounded bg-[var(--success)]/15 px-1.5 py-0.5 text-[var(--success)]">
                    {c.difficultyMix.easy} easy
                  </span>
                  <span className="rounded bg-[var(--warning)]/15 px-1.5 py-0.5 text-[var(--warning)]">
                    {c.difficultyMix.medium} med
                  </span>
                  <span className="rounded bg-destructive/15 px-1.5 py-0.5 text-destructive">
                    {c.difficultyMix.hard} hard
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* Writing */}
        <Section title="Writing" pillar={`Writing · ${data.score.pillars.writing}`}>
          <div className="space-y-2">
            {data.articles.map((a) => (
              <a
                key={a.id}
                href={a.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-4 rounded-lg border bg-card p-3 transition-colors hover:border-primary/40"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{a.title}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{SOURCES[a.source].label}</span>
                    <span className="inline-flex items-center gap-1">
                      <Heart className="size-3" /> {a.reactions}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MessageCircle className="size-3" /> {a.comments}
                    </span>
                    <span>{a.readingMin} min</span>
                  </div>
                </div>
                <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" />
              </a>
            ))}
          </div>
        </Section>

        {/* Milestones */}
        <Section title="Milestones" pillar={<Trophy className="size-4" />}>
          <ActivityTimeline items={data.milestones} />
        </Section>

        <p className="mt-12 text-center text-xs text-muted-foreground">
          Verified developer passport on{" "}
          <Link href="/" className="font-medium text-primary hover:underline">
            DevOS
          </Link>
        </p>
      </div>
    </div>
  );
}

function Section({
  title,
  pillar,
  children,
}: {
  title: string;
  pillar: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">{pillar}</span>
      </div>
      {children}
    </section>
  );
}