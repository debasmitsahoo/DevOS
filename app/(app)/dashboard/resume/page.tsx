"use client";

import { useState } from "react";
import { FileText, Download, Sparkles, CheckCircle2, ArrowRight, Copy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TEMPLATES = [
  {
    id: "engineering",
    label: "Software Engineer",
    description: "Focuses on GitHub activity, contributions, and Engineering Score.",
    tags: ["GitHub", "PRs", "Score"],
  },
  {
    id: "competitive",
    label: "Competitive Programmer",
    description: "Highlights contest ratings, problems solved, and difficulty mix.",
    tags: ["Codeforces", "LeetCode", "Ratings"],
  },
  {
    id: "fullstack",
    label: "Full Stack Developer",
    description: "Balances code, writing, and community contributions.",
    tags: ["Code", "Blogs", "OSS"],
  },
  {
    id: "custom",
    label: "Custom",
    description: "Pick your own sections and order.",
    tags: ["Custom"],
  },
];

const VERIFIED_SECTIONS = [
  { label: "Engineering Score",         included: true,  verified: true },
  { label: "GitHub contributions",      included: true,  verified: true },
  { label: "Codeforces rating",         included: true,  verified: true },
  { label: "Published articles",        included: true,  verified: true },
  { label: "Hackathon wins",            included: true,  verified: true },
  { label: "Open source contributions", included: true,  verified: true },
  { label: "LeetCode (V2)",             included: false, verified: false },
];

export default function ResumePage() {
  const [selected, setSelected] = useState("engineering");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  function handleGenerate() {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 1500);
  }

  return (
    <div className="min-h-full space-y-5 p-4 md:p-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Résumé</h1>
        <p className="text-sm text-muted-foreground">
          Generate a role-targeted résumé from your verified data. Every bullet is real.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        {/* left — builder */}
        <div className="space-y-4">
          {/* template picker */}
          <Card>
            <CardHeader className="pb-2 pt-4 px-5">
              <CardTitle className="text-sm">Choose a template</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2 px-5 pb-5 sm:grid-cols-2">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelected(t.id)}
                  className={cn(
                    "rounded-xl border p-4 text-left transition-all",
                    selected === t.id
                      ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                      : "bg-card hover:border-primary/30 hover:bg-muted/20"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-sm font-semibold text-foreground">{t.label}</span>
                    {selected === t.id && <CheckCircle2 className="size-4 text-primary" />}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{t.description}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {t.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-muted/40 px-2 py-0.5 text-[10px] text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* sections */}
          <Card>
            <CardHeader className="pb-2 pt-4 px-5">
              <CardTitle className="text-sm">Included sections</CardTitle>
            </CardHeader>
            <CardContent className="divide-y px-5 pb-5">
              {VERIFIED_SECTIONS.map((s) => (
                <div key={s.label} className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className={cn("size-4", s.included ? "text-success" : "text-muted-foreground/30")} />
                    <span className={s.included ? "text-foreground" : "text-muted-foreground/50"}>{s.label}</span>
                  </div>
                  <Badge variant={s.verified ? "success" : "secondary"} className="text-[9px]">
                    {s.verified ? "Verified" : "V2"}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* generate button */}
          <Button
            size="lg"
            className="w-full rounded-xl"
            onClick={handleGenerate}
            disabled={generating}
          >
            {generating ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
                Generating…
              </>
            ) : (
              <>
                <Sparkles className="mr-2 size-4" />
                Generate résumé
                <ArrowRight className="ml-2 size-4" />
              </>
            )}
          </Button>
        </div>

        {/* right — preview / export */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2 pt-4 px-5">
              <CardTitle className="text-sm">Preview &amp; export</CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              {generated ? (
                <div className="space-y-3">
                  <div className="rounded-lg border bg-muted/20 p-4 text-xs font-mono text-muted-foreground space-y-1">
                    <p className="font-bold text-foreground text-sm">Debasmit Sahoo</p>
                    <p>Systems &amp; web — Rust, TypeScript</p>
                    <p className="pt-1 font-semibold text-foreground">Engineering Score: 84 / 100</p>
                    <p>Code 91 · Solving 78 · Writing 72</p>
                    <p className="pt-1 font-semibold text-foreground">Experience highlights</p>
                    <p>• 86 merged PRs in top OSS repos</p>
                    <p>• Contributor to vercel/next.js</p>
                    <p>• Codeforces 1912 (CM)</p>
                    <p>• 18 published articles · 960 reactions</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Copy className="mr-1.5 size-3.5" /> Copy
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Download className="mr-1.5 size-3.5" /> PDF
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 py-8 text-center">
                  <FileText className="size-10 text-muted-foreground/40" />
                  <p className="text-sm text-muted-foreground">
                    Choose a template and click Generate to create your résumé
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* plan note */}
          <Card className="border-dashed">
            <CardContent className="px-5 py-4">
              <p className="text-xs font-medium text-foreground">Free plan: 1 export</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Go Pro for unlimited exports, all templates, and custom domain.
              </p>
              <Button variant="outline" size="sm" className="mt-3 w-full text-xs">
                Upgrade to Pro
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
