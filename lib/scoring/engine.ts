import type { PillarInputs, PillarKey, Pillars, ScoreEvent, ScoreSnapshot } from "@/types";
import { PILLARS } from "@/config/pillars";
import { SCORE_ALGO_VERSION } from "./version";

/* ──────────────────────────────────────────────────────────────────────────
   Engineering Score engine — §11.4 (core IP)

   Design invariants:
   • Verified inputs only (callers must not pass self-reported data).
   • log1p on every count → diminishing returns, kills volume-spam.
   • Per-pillar cap at 100; no pillar can exceed regardless of input.
   • Every point is explainable: each contribution emits a ScoreEvent.
   • Deterministic + pure → unit-testable, reproducible per algoVersion.
────────────────────────────────────────────────────────────────────────── */

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const log1p = (n: number) => Math.log1p(Math.max(0, n));

/** Logistic map of an unbounded raw signal into 0..100. */
function normalize(raw: number, midpoint: number, steepness: number): number {
  return 100 / (1 + Math.exp(-steepness * (raw - midpoint)));
}

interface PillarResult {
  value: number;
  events: ScoreEvent[];
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

// ───────────────────────── Code (0.30) ─────────────────────────
function scoreCode(i: PillarInputs["code"]): PillarResult {
  const events: ScoreEvent[] = [];
  if (!i) return { value: 0, events };

  const mergedPRs = i.mergedPRs ?? 0;
  const totalStars = i.totalStars ?? 0;
  const commits = i.commits ?? 0;
  const avgStars = i.avgStarsPerRepo ?? 0;
  const avgContributors = i.avgContributors ?? 0;

  const prTerm = 1.0 * log1p(mergedPRs);
  const starTerm = 0.8 * log1p(totalStars);
  const commitTerm = 0.5 * log1p(commits);

  // Repo quality multiplier: stars + multi-contributor repos signal real impact.
  const repoQualityFactor = clamp(
    0.8 + 0.05 * log1p(avgStars) + 0.06 * log1p(avgContributors),
    0.8,
    1.5
  );

  const raw = (prTerm + starTerm + commitTerm) * repoQualityFactor;
  const value = clamp(normalize(raw, 6, 0.45), 0, 100);

  events.push({ pillar: "code", reason: `${mergedPRs} merged PRs`, points: round1(prTerm) });
  events.push({ pillar: "code", reason: `${totalStars} stars across repos`, points: round1(starTerm) });
  events.push({ pillar: "code", reason: `${commits} commits`, points: round1(commitTerm) });
  if (repoQualityFactor > 1)
    events.push({
      pillar: "code",
      reason: `repo quality ×${repoQualityFactor.toFixed(2)} (avg ${Math.round(avgStars)}★, ${avgContributors} contributors)`,
      points: round1((repoQualityFactor - 1) * (prTerm + starTerm + commitTerm)),
    });

  return { value, events };
}

// ───────────────────── Problem-Solving (0.25) ─────────────────────
function scoreSolving(i: PillarInputs["solving"]): PillarResult {
  const events: ScoreEvent[] = [];
  if (!i) return { value: 0, events };

  const rating = i.rating ?? 0;
  const solved = i.solvedCount ?? 0;
  const mix = i.difficultyMix ?? { easy: 0, medium: 0, hard: 0 };

  // Codeforces-style rating → percentile-ish 0..1 (2400 ≈ top).
  const ratingScore = clamp(rating / 2400, 0, 1) * 60;
  const solvedScore = clamp(log1p(solved) * 6, 0, 25);
  // Difficulty mix rewards hard problems most.
  const total = mix.easy + mix.medium + mix.hard || 1;
  const hardShare = mix.hard / total;
  const difficultyScore = clamp(hardShare * 15 + (mix.medium / total) * 8, 0, 15);

  const value = clamp(ratingScore + solvedScore + difficultyScore, 0, 100);

  events.push({ pillar: "solving", reason: `contest rating ${rating}`, points: round1(ratingScore) });
  events.push({ pillar: "solving", reason: `${solved} problems solved`, points: round1(solvedScore) });
  events.push({
    pillar: "solving",
    reason: `difficulty mix (${Math.round(hardShare * 100)}% hard)`,
    points: round1(difficultyScore),
  });

  return { value, events };
}

// ───────────────────────── Writing (0.15) ─────────────────────────
function scoreWriting(i: PillarInputs["writing"]): PillarResult {
  const events: ScoreEvent[] = [];
  if (!i) return { value: 0, events };

  const articles = i.articles ?? 0;
  const reactions = i.reactions ?? 0;
  const readingMin = i.readingMinutes ?? 0;

  const articleTerm = log1p(articles) * 14;
  const reactionTerm = log1p(reactions) * 8;
  const depthTerm = log1p(readingMin) * 5;

  const raw = articleTerm + reactionTerm + depthTerm;
  const value = clamp(normalize(raw, 28, 0.12), 0, 100);

  events.push({ pillar: "writing", reason: `${articles} published articles`, points: round1(articleTerm) });
  events.push({ pillar: "writing", reason: `${reactions} reactions`, points: round1(reactionTerm) });
  events.push({ pillar: "writing", reason: `${readingMin} min total read time`, points: round1(depthTerm) });

  return { value, events };
}

// ───────────────────────── Community (0.15) ─────────────────────────
function scoreCommunity(i: PillarInputs["community"]): PillarResult {
  const events: ScoreEvent[] = [];
  if (!i) return { value: 0, events };

  const external = i.externalContributions ?? 0;
  const talks = i.talks ?? 0;
  const roles = i.communityRoles ?? 0;

  // Contributions to OTHER people's repos are the hardest signal to fake → weighted highest.
  const externalTerm = log1p(external) * 16;
  const talkTerm = log1p(talks) * 10;
  const roleTerm = log1p(roles) * 8;

  const raw = externalTerm + talkTerm + roleTerm;
  const value = clamp(normalize(raw, 22, 0.14), 0, 100);

  events.push({
    pillar: "community",
    reason: `${external} contributions to others' repos`,
    points: round1(externalTerm),
  });
  events.push({ pillar: "community", reason: `${talks} talks`, points: round1(talkTerm) });
  events.push({ pillar: "community", reason: `${roles} community roles`, points: round1(roleTerm) });

  return { value, events };
}

// ───────────────────────── Consistency (0.15) ─────────────────────────
function scoreConsistency(i: PillarInputs["consistency"]): PillarResult {
  const events: ScoreEvent[] = [];
  if (!i?.activeWeeks52?.length) return { value: 0, events };

  const weeks = i.activeWeeks52;
  const n = weeks.length;

  // Recency-decayed active-weeks ratio: recent weeks count more.
  // weight for week k (0 = oldest, n-1 = newest): 0.5 ^ ((n-1-k)/52)
  let weightedActive = 0;
  let weightSum = 0;
  weeks.forEach((active, k) => {
    const ageWeeks = n - 1 - k;
    const w = Math.pow(0.5, ageWeeks / 52);
    weightSum += w;
    if (active) weightedActive += w;
  });
  const ratio = weightSum > 0 ? weightedActive / weightSum : 0;
  const value = clamp(ratio * 100, 0, 100);

  const activeCount = weeks.filter(Boolean).length;
  events.push({
    pillar: "consistency",
    reason: `active ${activeCount}/${n} weeks (recency-weighted)`,
    points: round1(value),
  });

  return { value, events };
}

const SCORERS: Record<PillarKey, (i: PillarInputs[PillarKey]) => PillarResult> = {
  code: scoreCode as never,
  solving: scoreSolving as never,
  writing: scoreWriting as never,
  community: scoreCommunity as never,
  consistency: scoreConsistency as never,
};

/**
 * Compute a full, explainable Engineering Score snapshot from verified inputs.
 */
export function computeScore(inputs: PillarInputs): ScoreSnapshot {
  const pillars = {} as Pillars;
  const events: ScoreEvent[] = [];

  (Object.keys(PILLARS) as PillarKey[]).forEach((key) => {
    const result = SCORERS[key](inputs[key]);
    pillars[key] = Math.round(result.value);
    events.push(...result.events.filter((e) => e.points !== 0));
  });

  const total = Math.round(
    (Object.keys(PILLARS) as PillarKey[]).reduce(
      (sum, key) => sum + pillars[key] * PILLARS[key].weight,
      0
    )
  );

  return {
    total: clamp(total, 0, 100),
    pillars,
    algoVersion: SCORE_ALGO_VERSION,
    events,
    createdAt: new Date().toISOString(),
  };
}