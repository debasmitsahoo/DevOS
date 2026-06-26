import { Users, MapPin, Calendar, ArrowRight, Plus, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Communities" };

const COMMUNITIES = [
  {
    id: "c1",
    name: "Rust India",
    members: 1240,
    role: "Member",
    joined: "2025-03",
    location: "India",
    verified: true,
    recentEvent: "RustConf India 2025 — spoke",
  },
  {
    id: "c2",
    name: "Open Source Weekend",
    members: 870,
    role: "Organizer",
    joined: "2024-09",
    location: "Remote",
    verified: true,
    recentEvent: "Monthly OSS sprint — led session",
  },
];

const UPCOMING_EVENTS = [
  {
    id: "e1",
    title: "RustConf India 2026",
    community: "Rust India",
    date: "2026-08-15",
    type: "Conference",
    virtual: false,
    autoVerify: true,
  },
  {
    id: "e2",
    title: "Global OSS Hackathon",
    community: "Open Source Weekend",
    date: "2026-07-20",
    type: "Hackathon",
    virtual: true,
    autoVerify: true,
  },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function CommunitiesPage() {
  return (
    <div className="min-h-full space-y-5 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Communities</h1>
          <p className="text-sm text-muted-foreground">
            Groups and events that auto-verify into your achievement timeline
          </p>
        </div>
        <Button variant="outline" size="sm" disabled>
          <Plus className="mr-2 size-4" />
          Join community
        </Button>
      </div>

      {/* V2 notice */}
      <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
        <Lock className="mt-0.5 size-4 shrink-0 text-primary" />
        <div>
          <p className="text-sm font-medium text-foreground">Communities is a V2 feature</p>
          <p className="text-xs text-muted-foreground">
            Community discovery and event auto-verification are coming in the next major release. Your current memberships are shown below.
          </p>
        </div>
        <Badge variant="secondary" className="ml-auto shrink-0">V2</Badge>
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[
          { label: "Communities joined",  value: COMMUNITIES.length },
          { label: "Events attended",     value: 4 },
          { label: "Auto-verified events",value: 1 },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <div className="text-2xl font-black text-foreground">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </Card>
        ))}
      </div>

      {/* my communities */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-foreground">My communities</h2>
        <div className="space-y-3">
          {COMMUNITIES.map((c) => (
            <Card key={c.id} className="p-4 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-sm">
                  {c.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-sm text-foreground">{c.name}</span>
                    <Badge variant={c.role === "Organizer" ? "default" : "secondary"} className="text-[10px]">
                      {c.role}
                    </Badge>
                    {c.verified && <Badge variant="success" className="text-[10px]">Verified</Badge>}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Users className="size-3" />{c.members.toLocaleString()} members</span>
                    <span className="flex items-center gap-1"><MapPin className="size-3" />{c.location}</span>
                    <span>Joined {c.joined}</span>
                  </div>
                  {c.recentEvent && (
                    <p className="mt-1.5 text-xs text-muted-foreground italic">{c.recentEvent}</p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* upcoming events */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-foreground">Upcoming events</h2>
        <div className="space-y-3">
          {UPCOMING_EVENTS.map((ev) => (
            <div
              key={ev.id}
              className="flex items-center gap-4 rounded-xl border bg-card px-4 py-3 shadow-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted/40 text-muted-foreground">
                <Calendar className="size-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-foreground">{ev.title}</div>
                <div className="mt-0.5 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span>{formatDate(ev.date)}</span>
                  <span>·</span>
                  <span>{ev.community}</span>
                  {ev.virtual && <span>· Remote</span>}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant="secondary" className="text-[10px]">{ev.type}</Badge>
                {ev.autoVerify && (
                  <Badge variant="outline" className="text-[10px] border-success/30 text-success">
                    Auto-verify
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* discovery prompt */}
      <Card className="border-dashed">
        <CardContent className="flex items-center gap-3 px-5 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted/40">
            <Users className="size-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Discover communities in V2</p>
            <p className="text-xs text-muted-foreground">
              Find developer groups by language, location, or interest. Events auto-verify into your passport.
            </p>
          </div>
          <Button variant="outline" size="sm" className="ml-auto shrink-0" disabled>
            Coming soon <ArrowRight className="ml-1 size-3" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
