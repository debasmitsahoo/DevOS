"use client";

import { useState } from "react";
import {
  Settings, Plug2, ShieldCheck, Eye, Bell, CreditCard,
  CheckCircle2, AlertCircle, RefreshCw, Unplug, ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { cn } from "@/lib/utils";

type Tab = "connections" | "privacy" | "appearance" | "notifications" | "billing";

const CONNECTIONS = [
  { source: "GITHUB",     label: "GitHub",     abbr: "GH", status: "ACTIVE",  lastSync: "2 min ago",  authType: "OAuth" },
  { source: "DEVTO",      label: "Dev.to",     abbr: "DT", status: "ACTIVE",  lastSync: "1h ago",     authType: "API key" },
  { source: "HASHNODE",   label: "Hashnode",   abbr: "HN", status: "ACTIVE",  lastSync: "3h ago",     authType: "API key" },
  { source: "CODEFORCES", label: "Codeforces", abbr: "CF", status: "STALE",   lastSync: "26h ago",    authType: "Proof" },
];

const TABS: { id: Tab; label: string; icon: typeof Settings }[] = [
  { id: "connections",   label: "Connections",   icon: Plug2 },
  { id: "privacy",       label: "Privacy",       icon: Eye },
  { id: "appearance",    label: "Appearance",    icon: Settings },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing",       label: "Billing",       icon: CreditCard },
];

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("connections");

  return (
    <div className="min-h-full space-y-5 p-4 md:p-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage connections, privacy, appearance and billing</p>
      </div>

      <div className="flex gap-6 flex-col lg:flex-row">
        {/* sidebar tabs */}
        <nav className="flex shrink-0 flex-row gap-1 lg:flex-col lg:w-44">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                tab === id
                  ? "bg-accent font-medium text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              )}
            >
              <Icon className="size-4 shrink-0" />
              <span className="hidden sm:inline lg:inline">{label}</span>
            </button>
          ))}
        </nav>

        {/* content */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* CONNECTIONS */}
          {tab === "connections" && (
            <>
              <Card>
                <CardHeader className="pb-2 pt-4 px-5">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">Connected sources</CardTitle>
                    <Button variant="outline" size="sm">
                      <Plug2 className="mr-2 size-3.5" />
                      Add source
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="divide-y px-5 pb-5">
                  {CONNECTIONS.map((c) => (
                    <div key={c.source} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted/50 font-bold text-xs text-foreground">
                        {c.abbr}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm text-foreground">{c.label}</span>
                          <Badge variant={c.status === "ACTIVE" ? "success" : "warning"} className="text-[9px]">
                            {c.status === "ACTIVE" ? "Active" : "Stale"}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {c.authType} · Last sync {c.lastSync}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {c.status === "STALE" && (
                          <Button variant="ghost" size="sm" className="text-xs">
                            <RefreshCw className="mr-1 size-3" />
                            Sync
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" className="text-xs text-destructive hover:text-destructive">
                          <Unplug className="mr-1 size-3" />
                          Revoke
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-dashed">
                <CardContent className="flex items-center gap-3 px-5 py-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted/40 text-muted-foreground">
                    <Plug2 className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">LeetCode, Stack Overflow &amp; more (V2)</p>
                    <p className="text-xs text-muted-foreground">More connectors are coming in the next release.</p>
                  </div>
                  <Badge variant="secondary" className="ml-auto shrink-0">V2</Badge>
                </CardContent>
              </Card>
            </>
          )}

          {/* PRIVACY */}
          {tab === "privacy" && (
            <Card>
              <CardHeader className="pb-2 pt-4 px-5">
                <CardTitle className="text-sm">Privacy settings</CardTitle>
              </CardHeader>
              <CardContent className="divide-y px-5 pb-5">
                {[
                  { label: "Public passport",          desc: "Anyone with the link can view your passport.",      on: true },
                  { label: "Discoverable by recruiters",desc: "Show up in recruiter search results (opt-in).",    on: false },
                  { label: "Show Engineering Score",    desc: "Display your score on your public passport.",       on: true },
                  { label: "Show exact ratings",        desc: "Show contest ratings next to rank labels.",         on: true },
                  { label: "Show location",             desc: "Show your location on your public profile.",        on: true },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{s.label}</p>
                      <p className="text-xs text-muted-foreground">{s.desc}</p>
                    </div>
                    <div className={cn(
                      "relative h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors",
                      s.on ? "bg-primary" : "bg-muted"
                    )}>
                      <div className={cn(
                        "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform",
                        s.on ? "left-4" : "left-0.5"
                      )} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* APPEARANCE */}
          {tab === "appearance" && (
            <Card>
              <CardHeader className="pb-2 pt-4 px-5">
                <CardTitle className="text-sm">Appearance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 px-5 pb-5">
                <div>
                  <p className="mb-2 text-sm font-medium text-foreground">Theme</p>
                  <ThemeSwitcher className="w-full justify-between" />
                </div>
                <div className="rounded-xl border bg-muted/20 px-4 py-3">
                  <p className="text-sm font-medium text-foreground">DevOS Footer</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Remove "Built with DevOS" from your public passport. Pro plan required.</p>
                  <Button variant="outline" size="sm" className="mt-2">Upgrade to Pro</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* NOTIFICATIONS */}
          {tab === "notifications" && (
            <Card>
              <CardHeader className="pb-2 pt-4 px-5">
                <CardTitle className="text-sm">Notification preferences</CardTitle>
              </CardHeader>
              <CardContent className="divide-y px-5 pb-5">
                {[
                  { label: "Weekly score digest",       desc: "Get a summary of score changes every Monday.", on: true },
                  { label: "Sync failure alerts",        desc: "Be notified when a source goes stale.",        on: true },
                  { label: "Recruiter views",            desc: "Know when a recruiter views your passport.",   on: false, pro: true },
                  { label: "New follower notifications", desc: "Email when someone follows your passport.",    on: false },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground">{s.label}</p>
                        {s.pro && <Badge variant="secondary" className="text-[9px]">Pro</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground">{s.desc}</p>
                    </div>
                    <div className={cn(
                      "relative h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors",
                      s.on && !s.pro ? "bg-primary" : "bg-muted"
                    )}>
                      <div className={cn(
                        "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform",
                        s.on && !s.pro ? "left-4" : "left-0.5"
                      )} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* BILLING */}
          {tab === "billing" && (
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2 pt-4 px-5">
                  <CardTitle className="text-sm">Current plan</CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  <div className="flex items-center justify-between rounded-xl border bg-muted/20 px-4 py-4">
                    <div>
                      <p className="font-bold text-foreground text-lg">Free</p>
                      <p className="text-xs text-muted-foreground">$0 / month · Forever free for the passport</p>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <div className="mt-4 space-y-2 text-sm">
                    {[
                      "Public passport at devos.app/you",
                      "All V1 connectors (GitHub, Dev.to, Hashnode, Codeforces)",
                      "Engineering Score + per-pillar breakdown",
                      "1 résumé export",
                    ].map((f) => (
                      <div key={f} className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle2 className="size-4 shrink-0 text-success" />
                        {f}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/30 bg-primary/5">
                <CardContent className="flex items-start gap-3 px-5 py-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary font-bold text-xs">
                    Pro
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">Upgrade to Pro — $8/mo</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Unlimited exports · Custom domain · Private analytics · Priority sync
                    </p>
                    <Button size="sm" className="mt-3 rounded-full">
                      Go Pro <ChevronRight className="ml-1 size-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
