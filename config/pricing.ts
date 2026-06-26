// §14 monetization. Charge for outcomes (getting hired/discovered), never for
// seeing your own data. Free is the growth engine, not a trap.
export interface PricingTier {
  id: "free" | "student" | "pro" | "recruiter";
  name: string;
  price: string;
  cadence?: string;
  tagline: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  badge?: string;
}

export const PRICING: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    tagline: "The best free developer portfolio on the internet.",
    features: [
      "Public passport at devos.app/you",
      "All V1 connectors (GitHub, Dev.to, Hashnode, Codeforces)",
      "Engineering Score + per-pillar breakdown",
      "1 résumé export",
    ],
    cta: "Get started",
  },
  {
    id: "student",
    name: "Student",
    price: "$0",
    tagline: "Pro features free while you're verified.",
    badge: "Verified .edu",
    features: [
      "Everything in Pro",
      "Free while enrolled (GitHub Student Pack / .edu)",
      "Carries into the job-seeker funnel on graduation",
    ],
    cta: "Verify student status",
  },
  {
    id: "pro",
    name: "Pro",
    price: "$8",
    cadence: "/mo",
    tagline: "For when you're on the job hunt.",
    highlighted: true,
    features: [
      "Unlimited résumés + all templates",
      "Custom domain (you.dev)",
      'Private analytics — "who viewed you"',
      "Priority sync · remove DevOS footer",
    ],
    cta: "Go Pro",
  },
  {
    id: "recruiter",
    name: "Recruiter",
    price: "$49",
    cadence: "/seat/mo",
    badge: "V2",
    tagline: "Find talent by verified signal, not buzzwords.",
    features: [
      "Pillar + skill search",
      "Pipelines & saved candidates",
      "Verified candidate access",
      "Opt-in intro requests (no cold-scrape)",
    ],
    cta: "Join the waitlist",
  },
];