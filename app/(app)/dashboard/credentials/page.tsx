import { BadgeCheck, Plus, ExternalLink, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Credentials" };

const CREDENTIAL_DATA = [
  {
    id: "c1",
    title: "GitHub Verified Developer",
    issuer: "GitHub",
    issuedAt: "2025-11-01",
    type: "Platform badge",
    verified: true,
    url: "https://github.com",
  },
  {
    id: "c2",
    title: "Candidate Master — Codeforces",
    issuer: "Codeforces",
    issuedAt: "2026-01-14",
    type: "Contest rank",
    verified: true,
    url: "https://codeforces.com",
  },
  {
    id: "c3",
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    issuedAt: "2025-06-20",
    type: "Cloud certification",
    verified: false,
    url: "#",
  },
  {
    id: "c4",
    title: "Google Associate Cloud Engineer",
    issuer: "Google Cloud",
    issuedAt: "2025-09-10",
    type: "Cloud certification",
    verified: false,
    url: "#",
  },
];

function timeFromISO(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function CredentialsPage() {
  const verified = CREDENTIAL_DATA.filter((c) => c.verified);
  const unverified = CREDENTIAL_DATA.filter((c) => !c.verified);

  return (
    <div className="min-h-full space-y-5 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Credentials</h1>
          <p className="text-sm text-muted-foreground">
            Certificates, badges and skill assessments
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Plus className="mr-2 size-4" />
          Add credential
        </Button>
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[
          { label: "Total credentials",  value: CREDENTIAL_DATA.length },
          { label: "Verified",           value: verified.length },
          { label: "Pending verification", value: unverified.length },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <div className="text-2xl font-black text-foreground">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </Card>
        ))}
      </div>

      {/* verified */}
      {verified.length > 0 && (
        <div>
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
            <ShieldCheck className="size-4 text-success" />
            Verified credentials
          </h2>
          <div className="space-y-3">
            {verified.map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-4 rounded-xl border border-success/20 bg-success/5 px-5 py-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-success/15">
                  <BadgeCheck className="size-5 text-success" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-sm text-foreground">{c.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {c.issuer} · {timeFromISO(c.issuedAt)} · {c.type}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="success">Verified</Badge>
                  <a href={c.url} target="_blank" rel="noreferrer"
                    className="text-muted-foreground hover:text-foreground">
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* unverified */}
      {unverified.length > 0 && (
        <div>
          <h2 className="mb-3 text-sm font-semibold text-foreground">
            Self-reported (pending verification)
          </h2>
          <div className="space-y-3">
            {unverified.map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-4 rounded-xl border bg-card px-5 py-4 shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted/50">
                  <BadgeCheck className="size-5 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-sm text-foreground">{c.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {c.issuer} · {timeFromISO(c.issuedAt)} · {c.type}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Self-reported</Badge>
                  <Button variant="ghost" size="sm" className="text-xs">Verify</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* coming soon note */}
      <Card className="border-dashed">
        <CardContent className="flex items-center gap-3 px-5 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted/40">
            <Plus className="size-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">More integrations coming</p>
            <p className="text-xs text-muted-foreground">HackerRank certificates, Kaggle badges, and Stack Overflow assessments (V2)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
