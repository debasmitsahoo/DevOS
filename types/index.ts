// DevOS shared domain types. Kept framework-agnostic so connectors, scoring,
// server queries, and UI all speak the same language.

export type Source =
  | "GITHUB"
  | "CODEFORCES"
  | "DEVTO"
  | "HASHNODE"
  | "LEETCODE"
  | "HACKERRANK"
  | "STACKOVERFLOW"
  | "KAGGLE"
  | "LINKEDIN"
  | "GOOGLE";

export type SourceTier = "V1" | "V2" | "V3";
export type AuthStrategy = "oauth" | "apikey" | "proof";
export type ConnStatus = "ACTIVE" | "STALE" | "ERROR" | "REVOKED";

/** The five reputation pillars. Order is canonical (radar + UI rely on it). */
export const PILLAR_KEYS = [
  "code",
  "solving",
  "writing",
  "community",
  "consistency",
] as const;
export type PillarKey = (typeof PILLAR_KEYS)[number];
export type Pillars = Record<PillarKey, number>;

export interface PillarMeta {
  key: PillarKey;
  label: string;
  /** css var name for the accent color, e.g. "--chart-1" */
  colorVar: string;
  weight: number; // §11.4 default weights
}

export interface ScoreEvent {
  pillar: PillarKey;
  reason: string; // human-readable, e.g. "+4: 12 merged PRs in >50★ repos"
  points: number;
}

export interface ScoreSnapshot {
  total: number; // 0-100
  pillars: Pillars;
  algoVersion: string;
  events: ScoreEvent[];
  createdAt: string; // ISO
}

// ───────────────────────── Connector inputs ─────────────────────────
// Raw, verified inputs each connector contributes to the scoring engine.
export interface CodeInputs {
  commits: number;
  mergedPRs: number;
  totalStars: number;
  reposCount: number;
  avgStarsPerRepo: number;
  avgContributors: number;
  externalContributions: number; // PRs to repos the user doesn't own
}

export interface SolvingInputs {
  rating: number; // current contest rating
  maxRating: number;
  solvedCount: number;
  difficultyMix: { easy: number; medium: number; hard: number };
}

export interface WritingInputs {
  articles: number;
  reactions: number;
  readingMinutes: number;
}

export interface CommunityInputs {
  externalContributions: number;
  talks: number;
  communityRoles: number;
}

export interface ConsistencyInputs {
  /** booleans per ISO week over the trailing 52 weeks, newest last */
  activeWeeks52: boolean[];
}

export interface PillarInputs {
  code?: Partial<CodeInputs>;
  solving?: Partial<SolvingInputs>;
  writing?: Partial<WritingInputs>;
  community?: Partial<CommunityInputs>;
  consistency?: Partial<ConsistencyInputs>;
}

// ───────────────────────── Passport view models ─────────────────────────
export interface RepoCard {
  id: string;
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  primaryLang: string | null;
  languages: Record<string, number>;
  pinned: boolean;
  pushedAt: string;
}

export interface ArticleCard {
  id: string;
  title: string;
  url: string;
  source: Source;
  reactions: number;
  comments: number;
  readingMin: number;
  tags: string[];
  publishedAt: string;
}

export interface ContestSummary {
  source: Source;
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  solvedCount: number;
  difficultyMix: { easy: number; medium: number; hard: number };
}

export interface MilestoneItem {
  id: string;
  type: "HACKATHON" | "AWARD" | "TALK" | "LEADERSHIP" | "OSS" | "CUSTOM";
  title: string;
  description?: string;
  link?: string;
  verified: boolean;
  occurredAt: string;
}

export interface ConnectionStatus {
  source: Source;
  status: ConnStatus;
  lastSyncedAt: string | null;
}

export interface PassportData {
  handle: string;
  displayName: string;
  avatarUrl: string | null;
  bannerUrl: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  openToWork: boolean;
  verified: boolean;
  socials: Record<string, string>;
  score: ScoreSnapshot;
  stats: { repos: number; articles: number; followers: number; solved: number };
  topLanguages: { name: string; pct: number }[];
  /** 365-day contribution heatmap: counts indexed oldest→newest */
  contributionHeatmap: number[];
  pinnedRepos: RepoCard[];
  repos: RepoCard[];
  articles: ArticleCard[];
  contests: ContestSummary[];
  milestones: MilestoneItem[];
}