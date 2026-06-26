import {
  MapPin,
  Globe,
  GitBranch,
  Share2,
  Link2,
  Briefcase,
  ShieldCheck,
  PenLine,
  Edit3,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildDemoPassport } from "@/lib/mock/data";

export const metadata = { title: "Profile" };

export default function ProfilePage() {
  const p = buildDemoPassport();

  const SOCIALS = [
    { icon: GitBranch, href: p.socials.github,   label: "GitHub" },
    { icon: Share2,    href: p.socials.x,         label: "X / Twitter" },
    { icon: Link2,     href: p.socials.linkedin,  label: "LinkedIn" },
  ];

  return (
    <div className="min-h-full space-y-5 p-4 md:p-6">
      {/* header row */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Profile</h1>
          <p className="text-sm text-muted-foreground">
            Your public identity on DevOS. Everything here appears on your passport.
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Edit3 className="mr-2 size-4" />
          Edit profile
        </Button>
      </div>

      <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
        {/* left column */}
        <div className="space-y-4">
          {/* avatar & identity */}
          <Card className="p-5">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-black text-primary-foreground ring-4 ring-primary/20">
                {p.displayName.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center justify-center gap-1.5">
                  <span className="font-bold text-foreground">{p.displayName}</span>
                  {p.verified && <ShieldCheck className="size-4 text-success" />}
                </div>
                <span className="text-sm text-muted-foreground">@{p.handle}</span>
              </div>
              {p.openToWork && (
                <Badge variant="success" className="gap-1">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
                  Open to work
                </Badge>
              )}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.bio}</p>

            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              {p.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 shrink-0" />
                  {p.location}
                </div>
              )}
              {p.website && (
                <a href={p.website} className="flex items-center gap-2 text-primary hover:underline" target="_blank" rel="noreferrer">
                  <Globe className="size-4 shrink-0" />
                  {p.website.replace("https://", "")}
                </a>
              )}
            </div>

            <div className="mt-4 flex gap-2">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border bg-muted/30 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  title={label}
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </Card>

          {/* top languages */}
          <Card>
            <CardHeader className="pb-3 pt-4 px-5">
              <CardTitle className="text-sm">Top languages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5 px-5 pb-5">
              {p.topLanguages.map((lang) => (
                <div key={lang.name}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-foreground">{lang.name}</span>
                    <span className="text-muted-foreground">{lang.pct}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${lang.pct}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* right column */}
        <div className="space-y-4">
          {/* stats */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Repositories", value: p.stats.repos },
              { label: "Articles",     value: p.stats.articles },
              { label: "Followers",    value: p.stats.followers.toLocaleString() },
              { label: "Solved",       value: p.stats.solved },
            ].map((s) => (
              <Card key={s.label} className="p-4">
                <div className="text-2xl font-black text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </Card>
            ))}
          </div>

          {/* bio editor placeholder */}
          <Card>
            <CardHeader className="pb-2 pt-4 px-5">
              <CardTitle className="text-sm flex items-center gap-2">
                <Briefcase className="size-4 text-muted-foreground" />
                Professional headline
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <p className="text-sm text-muted-foreground">
                Systems &amp; web. I make verifiable things. Rust, TypeScript, and the occasional proof.
              </p>
              <Button variant="outline" size="sm" className="mt-3">
                <PenLine className="mr-1.5 size-3.5" /> Edit headline
              </Button>
            </CardContent>
          </Card>

          {/* pinned repos preview */}
          <Card>
            <CardHeader className="pb-2 pt-4 px-5">
              <CardTitle className="text-sm">Pinned repositories</CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="space-y-3">
                {p.pinnedRepos.map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-lg border bg-muted/20 p-3 transition-colors hover:bg-muted/40"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-medium text-sm text-foreground">{repo.fullName}</span>
                      {repo.primaryLang && (
                        <Badge variant="secondary" className="shrink-0 text-[10px]">
                          {repo.primaryLang}
                        </Badge>
                      )}
                    </div>
                    {repo.description && (
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{repo.description}</p>
                    )}
                    <div className="mt-2 flex gap-3 text-xs text-muted-foreground">
                      <span>★ {repo.stars.toLocaleString()}</span>
                      <span>⑂ {repo.forks.toLocaleString()}</span>
                    </div>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
