import type {
  ArticleCard,
  ConnectionStatus,
  ContestSummary,
  MilestoneItem,
  PassportData,
  PillarInputs,
  RepoCard,
} from "@/types";
import { computeScore } from "@/lib/scoring/engine";

// Demo data for keyless/mock dev. This is a single, well-formed verified
// developer ("debasmit") used by the dashboard, the public passport, and the
// landing hero. The Engineering Score below is COMPUTED by the real engine
// from these verified inputs — not hardcoded — so the foundation exercises the
// core IP end to end.

// Deterministic pseudo-random so the heatmap is stable across renders/SSR.
function seeded(seed: number): () => number {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

function buildHeatmap(seed = 42): number[] {
  const rand = seeded(seed);
  return Array.from({ length: 365 }, (_, day) => {
    // weekends quieter, a few intense streaks
    const weekday = day % 7;
    const base = weekday === 0 || weekday === 6 ? 0.3 : 0.7;
    const r = rand();
    if (r > base) return 0;
    return Math.min(8, Math.floor(rand() * 9));
  });
}

const repos: RepoCard[] = [
  {
    id: "r1",
    name: "next.js",
    fullName: "vercel/next.js",
    description: "Contributions to the React framework — streaming, RSC fixes.",
    url: "https://github.com/vercel/next.js",
    stars: 121000,
    forks: 26000,
    primaryLang: "TypeScript",
    languages: { TypeScript: 78.4, JavaScript: 14.2, CSS: 7.4 },
    pinned: true,
    pushedAt: new Date(Date.now() - 2 * 864e5).toISOString(),
  },
  {
    id: "r2",
    name: "devos",
    fullName: "debasmit/devos",
    description: "One identity. Every contribution. The verified developer passport.",
    url: "https://github.com/debasmit/devos",
    stars: 1240,
    forks: 88,
    primaryLang: "TypeScript",
    languages: { TypeScript: 91.2, CSS: 6.1, MDX: 2.7 },
    pinned: true,
    pushedAt: new Date(Date.now() - 1 * 864e5).toISOString(),
  },
  {
    id: "r3",
    name: "rust-allocator",
    fullName: "debasmit/rust-allocator",
    description: "A teaching-grade bump allocator written in Rust.",
    url: "https://github.com/debasmit/rust-allocator",
    stars: 412,
    forks: 31,
    primaryLang: "Rust",
    languages: { Rust: 97.3, Shell: 2.7 },
    pinned: true,
    pushedAt: new Date(Date.now() - 9 * 864e5).toISOString(),
  },
  {
    id: "r4",
    name: "ml-notebooks",
    fullName: "debasmit/ml-notebooks",
    description: "Reproducible notebooks for classic ML papers.",
    url: "https://github.com/debasmit/ml-notebooks",
    stars: 230,
    forks: 19,
    primaryLang: "Python",
    languages: { "Jupyter Notebook": 88.0, Python: 12.0 },
    pinned: false,
    pushedAt: new Date(Date.now() - 21 * 864e5).toISOString(),
  },
];

const articles: ArticleCard[] = [
  {
    id: "a1",
    title: "Rust at Scale: lessons from a 200k-line codebase",
    url: "https://dev.to/debasmit/rust-at-scale",
    source: "DEVTO",
    reactions: 642,
    comments: 53,
    readingMin: 12,
    tags: ["rust", "architecture", "performance"],
    publishedAt: new Date(Date.now() - 30 * 864e5).toISOString(),
  },
  {
    id: "a2",
    title: "Why your Engineering Score should never be a single number",
    url: "https://hashnode.com/@debasmit/engineering-score",
    source: "HASHNODE",
    reactions: 318,
    comments: 27,
    readingMin: 8,
    tags: ["career", "metrics"],
    publishedAt: new Date(Date.now() - 60 * 864e5).toISOString(),
  },
];

const contests: ContestSummary[] = [
  {
    source: "CODEFORCES",
    handle: "debasmit",
    rating: 1912,
    maxRating: 2031,
    rank: "Candidate Master",
    solvedCount: 531,
    difficultyMix: { easy: 142, medium: 268, hard: 121 },
  },
];

const milestones: MilestoneItem[] = [
  {
    id: "m1",
    type: "HACKATHON",
    title: "Won HackByte 2026",
    description: "1st of 240 teams — built a verifiable credentials demo.",
    link: "https://hackbyte.dev",
    verified: true,
    occurredAt: new Date(Date.now() - 14 * 864e5).toISOString(),
  },
  {
    id: "m2",
    type: "TALK",
    title: 'Speaker: "Rust at scale" — RustConf India',
    verified: true,
    occurredAt: new Date(Date.now() - 45 * 864e5).toISOString(),
  },
  {
    id: "m3",
    type: "OSS",
    title: "Merged PR #441 in vercel/next.js",
    link: "https://github.com/vercel/next.js/pull/441",
    verified: true,
    occurredAt: new Date(Date.now() - 3 * 864e5).toISOString(),
  },
];

// Verified inputs → real computed score.
export const DEMO_INPUTS: PillarInputs = {
  code: {
    commits: 4120,
    mergedPRs: 86,
    totalStars: 123000 + 1240 + 412 + 230,
    reposCount: repos.length,
    avgStarsPerRepo: 463,
    avgContributors: 14,
    externalContributions: 42,
  },
  solving: {
    rating: 1912,
    maxRating: 2031,
    solvedCount: 531,
    difficultyMix: { easy: 142, medium: 268, hard: 121 },
  },
  writing: { articles: 18, reactions: 960, readingMinutes: 184 },
  community: { externalContributions: 42, talks: 3, communityRoles: 2 },
  consistency: {
    activeWeeks52: Array.from({ length: 52 }, (_, i) => i % 5 !== 0),
  },
};

function topLanguages(rs: RepoCard[]): { name: string; pct: number }[] {
  const totals = new Map<string, number>();
  for (const r of rs)
    for (const [lang, pct] of Object.entries(r.languages))
      totals.set(lang, (totals.get(lang) ?? 0) + pct);
  const sum = [...totals.values()].reduce((a, b) => a + b, 0) || 1;
  return [...totals.entries()]
    .map(([name, v]) => ({ name, pct: Math.round((v / sum) * 1000) / 10 }))
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 5);
}

export function buildDemoPassport(): PassportData {
  const score = computeScore(DEMO_INPUTS);
  return {
    handle: "debasmit",
    displayName: "Debasmit Sahoo",
    avatarUrl: null,
    bannerUrl: null,
    bio: "Systems & web. I make verifiable things. Rust, TypeScript, and the occasional proof.",
    location: "India",
    website: "https://debasmit.dev",
    openToWork: true,
    verified: true,
    socials: {
      github: "https://github.com/debasmit",
      x: "https://x.com/debasmit",
      linkedin: "https://linkedin.com/in/debasmit",
    },
    score,
    stats: { repos: 42, articles: 18, followers: 1204, solved: 531 },
    topLanguages: topLanguages(repos),
    contributionHeatmap: buildHeatmap(),
    pinnedRepos: repos.filter((r) => r.pinned),
    repos,
    articles,
    contests,
    milestones,
  };
}

export const DEMO_CONNECTIONS: ConnectionStatus[] = [
  { source: "GITHUB", status: "ACTIVE", lastSyncedAt: new Date(Date.now() - 2 * 60_000).toISOString() },
  { source: "DEVTO", status: "ACTIVE", lastSyncedAt: new Date(Date.now() - 60 * 60_000).toISOString() },
  { source: "CODEFORCES", status: "STALE", lastSyncedAt: new Date(Date.now() - 26 * 60 * 60_000).toISOString() },
  { source: "HASHNODE", status: "ACTIVE", lastSyncedAt: new Date(Date.now() - 3 * 60 * 60_000).toISOString() },
];

export const DEMO_WHAT_CHANGED = [
  { label: "+2 PRs merged", kind: "code" as const },
  { label: "+1 article published", kind: "writing" as const },
  { label: "Score +3 this week", kind: "score" as const },
  { label: "+38 new followers", kind: "social" as const },
];