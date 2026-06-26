"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Gauge,
  Sparkles,
  FileText,
  Search,
  Users,
  Check,
  GitBranch,
  Star,
  Zap,
  TrendingUp,
  ChevronRight,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SOURCE_LIST } from "@/config/sources";
import { PRICING } from "@/config/pricing";
import { cn } from "@/lib/utils";

/* ─── animated counter ────────────────────────────────────────────────────── */
function useCountUp(target: number, duration = 1600, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const raf = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setValue(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [target, duration, start]);
  return value;
}

/* ─── intersection observer ────────────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── data ──────────────────────────────────────────────────────────────────── */
const FEATURES = [
  { icon: ShieldCheck, title: "Verified, not asserted",    body: "Every stat traces to a real merged PR, a real rating, a real published article. Fakes don't survive." },
  { icon: Gauge,       title: "Engineering Score",         body: "One number that expands into five explainable pillars. Recruiters filter on signal, not buzzwords." },
  { icon: FileText,    title: "Résumés from real data",    body: "Generate a role-targeted résumé from your verified contributions. Export and go." },
  { icon: Sparkles,    title: "A timeline of milestones",  body: "Hackathons, talks, awards and OSS — source-verified where it counts." },
  { icon: Search,      title: "Get discovered",            body: "Recruiters find you by pillar and skill — opt-in, privacy-first, no cold-scrape." },
  { icon: Users,       title: "Communities",               body: "Events that auto-verify into your timeline. Community activity feeds reputation." },
];

const STATS = [
  { value: 12400, suffix: "+", label: "developers onboarded" },
  { value: 98,    suffix: "%", label: "verification accuracy" },
  { value: 340,   suffix: "ms", label: "avg sync time" },
  { value: 4,     suffix: "×", label: "more recruiter views" },
];

const TESTIMONIALS = [
  { quote: "Finally, a portfolio that shows what I actually built — not what I claimed to build.",       author: "Aarav S.",  role: "SWE @ Stripe",              avatar: "AS" },
  { quote: "My Engineering Score got me three inbound recruiter messages in the first week.",            author: "Priya K.", role: "Competitive programmer",    avatar: "PK" },
  { quote: "The résumé generator is stupid good. Role-specific bullets from my real commits.",          author: "James O.", role: "Open-source contributor",   avatar: "JO" },
];

/* ─── stat card ──────────────────────────────────────────────────────────────── */
function StatCard({ value, suffix, label, start }: { value: number; suffix: string; label: string; start: boolean }) {
  const count = useCountUp(value, 1500, start);
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl border bg-card px-8 py-6 shadow-sm">
      <span className="text-4xl font-black tracking-tight text-foreground">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

/* ─── section label ──────────────────────────────────────────────────────────── */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
      {children}
    </p>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════════════ */
export default function LandingPage() {
  const statsRef   = useInView(0.3);
  const featRef    = useInView(0.1);
  const pricingRef = useInView(0.1);
  const testiRef   = useInView(0.1);

  return (
    <>
      {/* ── subtle ambient orb — uses primary so it shifts with the theme ── */}
      <div
        aria-hidden
        className="pointer-events-none fixed left-[-15vw] top-[-10vh] h-[50vw] w-[50vw] max-h-[600px] max-w-[600px] rounded-full bg-primary/10 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed right-[-10vw] top-[30vh] h-[40vw] w-[40vw] max-h-[500px] max-w-[500px] rounded-full bg-primary/8 blur-[100px]"
      />

      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-20 lg:grid-cols-[1fr_460px] lg:pb-32 lg:pt-28">
        {/* left */}
        <div className="relative z-10">
          {/* live badge */}
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-primary/25 bg-primary/8 px-4 py-2 text-sm text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Now in beta · 12,400 devs and growing
          </div>

          <h1 className="text-5xl font-black leading-[1.06] tracking-tight text-foreground md:text-[4.5rem]">
            Your dev journey.{" "}
            <br />
            <span className="text-primary">
              Verified &amp; unified.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Import GitHub. Showcase contests. Publish blogs. Track hackathons.
            Build a passport you&apos;re proud to share — backed by real, tamper-proof data.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="group rounded-full px-8 text-base font-semibold">
              <Link href="/sign-up">
                Get started free
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full text-base">
              <Link href="/dashboard">
                <Zap className="mr-2 size-4 text-warning" />
                See a live passport
              </Link>
            </Button>
          </div>

          <p className="mt-5 text-xs text-muted-foreground">
            Free forever for the passport. No credit card. ~30 seconds to a populated profile.
          </p>

          {/* trust strip */}
          <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
            {["GitHub OAuth", "No cold-scrape", "Privacy-first"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <Lock className="size-3 text-success" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* right — passport preview card */}
        <div className="relative z-10 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[420px]">
            {/* soft glow behind card */}
            <div className="absolute inset-0 scale-95 rounded-3xl bg-primary/15 blur-3xl" />

            <div className="relative rounded-3xl border bg-card/80 p-6 shadow-xl backdrop-blur-md">
              {/* header */}
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground shadow-md">
                  A
                </div>
                <div>
                  <p className="font-semibold text-foreground">alex.dev</p>
                  <p className="text-xs text-muted-foreground">Full-stack · OSS contributor</p>
                </div>
                <div className="ml-auto flex flex-col items-end">
                  <span className="text-2xl font-black text-foreground">84</span>
                  <span className="text-[10px] text-muted-foreground">Eng Score</span>
                </div>
              </div>

              {/* pillars */}
              <div className="mt-5 space-y-3">
                {[
                  { label: "Code",            val: 91, color: "bg-chart-1" },
                  { label: "Problem-solving", val: 78, color: "bg-chart-2" },
                  { label: "Writing",         val: 72, color: "bg-chart-3" },
                  { label: "Community",       val: 65, color: "bg-chart-4" },
                  { label: "Consistency",     val: 88, color: "bg-chart-5" },
                ].map((p) => (
                  <div key={p.label}>
                    <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                      <span>{p.label}</span>
                      <span className="font-mono font-medium text-foreground">{p.val}</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div className={cn("h-full rounded-full", p.color)} style={{ width: `${p.val}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* verified badges */}
              <div className="mt-5 flex flex-wrap gap-2">
                {["GitHub", "Codeforces", "Dev.to", "Hashnode"].map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1.5 rounded-full border border-success/25 bg-success/10 px-2.5 py-1 text-[11px] text-success"
                  >
                    <ShieldCheck className="size-2.5" />
                    {s}
                  </span>
                ))}
              </div>

              {/* recent activity */}
              <div className="mt-4 space-y-2 rounded-2xl border bg-muted/30 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Recent activity
                </p>
                {[
                  { text: "Merged PR #412 in rust-lang/crates.io",         time: "2h ago", dotClass: "bg-chart-1" },
                  { text: 'Published "Tokio internals" · 2.1k reads',      time: "1d ago", dotClass: "bg-chart-3" },
                  { text: "Solved Codeforces Div2 E (rated 2200)",         time: "3d ago", dotClass: "bg-chart-2" },
                ].map((a) => (
                  <div key={a.text} className="flex items-start gap-2 text-[11px] text-muted-foreground">
                    <span className={cn("mt-1 h-1.5 w-1.5 shrink-0 rounded-full", a.dotClass)} />
                    <span className="flex-1">{a.text}</span>
                    <span className="shrink-0 opacity-50">{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          INTEGRATIONS STRIP
      ══════════════════════════════════════════════ */}
      <section className="border-y bg-muted/20 py-9">
        <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Connectors that populate your passport
        </p>
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-2.5 px-6">
          {SOURCE_LIST.map((s) => (
            <span
              key={s.source}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors",
                s.tier === "V1"
                  ? "border-primary/25 bg-primary/8 text-primary hover:bg-primary/15"
                  : "border-border bg-muted/30 text-muted-foreground"
              )}
            >
              {s.label}
              <Badge
                variant={s.tier === "V1" ? "success" : "secondary"}
                className="text-[9px] px-1.5 py-0"
              >
                {s.tier}
              </Badge>
            </span>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          STATS
      ══════════════════════════════════════════════ */}
      <section ref={statsRef.ref} className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} start={statsRef.inView} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════════ */}
      <section id="features" ref={featRef.ref} className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-14 text-center">
          <Eyebrow>Features</Eyebrow>
          <h2 className="text-4xl font-black tracking-tight text-foreground md:text-5xl">
            A flex, not a form
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Full value with zero recruiters present. The best free portfolio on
            the internet — built for an audience of one developer: you.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
                  featRef.inView && "animate-fade-in"
                )}
                style={{ animationDelay: `${i * 70}ms`, animationFillMode: "both" }}
              >
                {/* primary tint on hover */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-bold text-foreground">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                </div>

                <ChevronRight className="absolute bottom-5 right-5 size-4 text-muted-foreground/30 transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary/60" />
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════ */}
      <section className="border-y bg-muted/20 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-14 text-center">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="text-4xl font-black tracking-tight text-foreground">
              From zero to passport in 30 seconds
            </h2>
          </div>

          <div className="relative grid gap-10 md:grid-cols-3">
            {/* connector line */}
            <div className="absolute left-[16.7%] right-[16.7%] top-7 hidden h-px bg-border md:block" />

            {[
              { step: "01", icon: GitBranch,  title: "Connect GitHub",      body: "One OAuth click. We import your real PRs, commits, and contributions — cryptographically verified." },
              { step: "02", icon: ShieldCheck, title: "Verify sources",      body: "Add Codeforces, Dev.to, Hashnode, and more. Each connector uses proof-of-ownership, not self-report." },
              { step: "03", icon: TrendingUp,  title: "Share your passport", body: "Your live page at devos.app/you is auto-updated. Share it anywhere, impress everyone." },
            ].map(({ step, icon: Icon, title, body }) => (
              <div key={step} className="relative flex flex-col items-center text-center">
                <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border bg-card shadow-sm">
                  <Icon className="size-6 text-primary" />
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {step}
                  </span>
                </div>
                <h3 className="mb-2 font-bold text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════ */}
      <section ref={testiRef.ref} className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 text-center">
          <Eyebrow>Social proof</Eyebrow>
          <h2 className="text-4xl font-black tracking-tight text-foreground">
            Developers love it
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.author}
              className={cn(
                "relative rounded-2xl border bg-card p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md",
                testiRef.inView && "animate-fade-in"
              )}
              style={{ animationDelay: `${i * 90}ms`, animationFillMode: "both" }}
            >
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="size-3.5 fill-warning text-warning" />
                ))}
              </div>
              <p className="text-[15px] leading-relaxed text-foreground">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.author}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          PRICING
      ══════════════════════════════════════════════ */}
      <section id="pricing" ref={pricingRef.ref} className="border-t bg-muted/20 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="text-4xl font-black tracking-tight text-foreground md:text-5xl">
              Charge for outcomes,{" "}
              <span className="text-primary">never for your data</span>
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {PRICING.map((tier, i) => (
              <div
                key={tier.id}
                className={cn(
                  "relative flex flex-col rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1",
                  tier.highlighted
                    ? "border-primary/50 bg-card shadow-[0_0_40px_-10px] shadow-primary/20 ring-1 ring-primary/20"
                    : "bg-card hover:shadow-md",
                  pricingRef.inView && "animate-fade-in"
                )}
                style={{ animationDelay: `${i * 70}ms`, animationFillMode: "both" }}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground shadow">
                    Most popular
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-foreground">{tier.name}</h3>
                  {tier.badge && (
                    <Badge variant="secondary" className="text-[10px]">
                      {tier.badge}
                    </Badge>
                  )}
                </div>

                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-foreground">{tier.price}</span>
                  {tier.cadence && (
                    <span className="text-sm text-muted-foreground">{tier.cadence}</span>
                  )}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{tier.tagline}</p>

                <ul className="mt-5 flex-1 space-y-3">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex gap-2.5 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-success" />
                      <span className="text-muted-foreground">{feat}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className="mt-6 w-full rounded-xl"
                  variant={tier.highlighted ? "default" : "outline"}
                >
                  <Link href="/sign-up">{tier.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-28">
        {/* background accent */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-[80px]"
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2 text-sm text-primary">
            <Sparkles className="size-3.5" />
            Free forever — no credit card needed
          </div>
          <h2 className="text-5xl font-black leading-tight tracking-tight text-foreground md:text-6xl">
            Build a passport{" "}
            <br />
            <span className="text-primary">worth sharing</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground">
            Your work deserves to speak for itself — not hide behind a PDF that
            anyone could have faked.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="group rounded-full px-8 text-base font-semibold"
            >
              <Link href="/sign-up">
                Get your passport
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full text-base">
              <Link href="/dashboard">See an example</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════ */}
      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/15 text-primary">
              <Zap className="size-3.5" />
            </span>
            <span>© {new Date().getFullYear()} DevOS — One Identity. Every Contribution.</span>
          </div>
          <div className="flex gap-5">
            {["Privacy", "Terms", "Contact", "Roadmap"].map((l) => (
              <Link key={l} href="/#" className="transition-colors hover:text-foreground">
                {l}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}