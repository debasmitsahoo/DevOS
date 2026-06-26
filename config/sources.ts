import type { AuthStrategy, Source, SourceTier } from "@/types";

// §0.3 integration matrix as data. The IA stays source-agnostic; these are the
// connectors that populate a domain, with their real verification reality.
export interface SourceConfig {
  source: Source;
  label: string;
  domain: "code" | "writing" | "solving" | "credentials" | "identity";
  tier: SourceTier;
  authStrategy: AuthStrategy;
  hasOfficialApi: boolean;
  /** "Cryptographic" | "Strong" | "Identity only" | "Weak" | "None" */
  verificationQuality: string;
  note?: string;
}

export const SOURCES: Record<Source, SourceConfig> = {
  GITHUB: {
    source: "GITHUB",
    label: "GitHub",
    domain: "code",
    tier: "V1",
    authStrategy: "oauth",
    hasOfficialApi: true,
    verificationQuality: "Cryptographic",
  },
  CODEFORCES: {
    source: "CODEFORCES",
    label: "Codeforces",
    domain: "solving",
    tier: "V1",
    authStrategy: "proof",
    hasOfficialApi: true,
    verificationQuality: "Strong",
    note: "Public API + verification snippet in bio.",
  },
  DEVTO: {
    source: "DEVTO",
    label: "Dev.to",
    domain: "writing",
    tier: "V1",
    authStrategy: "apikey",
    hasOfficialApi: true,
    verificationQuality: "Strong",
  },
  HASHNODE: {
    source: "HASHNODE",
    label: "Hashnode",
    domain: "writing",
    tier: "V1",
    authStrategy: "apikey",
    hasOfficialApi: true,
    verificationQuality: "Strong",
  },
  GOOGLE: {
    source: "GOOGLE",
    label: "Google",
    domain: "identity",
    tier: "V1",
    authStrategy: "oauth",
    hasOfficialApi: true,
    verificationQuality: "Identity only",
  },
  LEETCODE: {
    source: "LEETCODE",
    label: "LeetCode",
    domain: "solving",
    tier: "V2",
    authStrategy: "proof",
    hasOfficialApi: false,
    verificationQuality: "Strong (proof-of-solve)",
    note: "No official API. Proof-of-solve flow only — never scrape (§0.3).",
  },
  STACKOVERFLOW: {
    source: "STACKOVERFLOW",
    label: "Stack Overflow",
    domain: "credentials",
    tier: "V2",
    authStrategy: "oauth",
    hasOfficialApi: true,
    verificationQuality: "Strong",
  },
  KAGGLE: {
    source: "KAGGLE",
    label: "Kaggle",
    domain: "credentials",
    tier: "V2",
    authStrategy: "apikey",
    hasOfficialApi: true,
    verificationQuality: "Strong",
  },
  LINKEDIN: {
    source: "LINKEDIN",
    label: "LinkedIn",
    domain: "identity",
    tier: "V2",
    authStrategy: "oauth",
    hasOfficialApi: false,
    verificationQuality: "Identity only",
    note: "Sign-in only. No profile-import API — import never (§0.3).",
  },
  HACKERRANK: {
    source: "HACKERRANK",
    label: "HackerRank",
    domain: "credentials",
    tier: "V3",
    authStrategy: "proof",
    hasOfficialApi: false,
    verificationQuality: "Certificate URL only",
  },
};

export const SOURCE_LIST = Object.values(SOURCES);
export const V1_SOURCES = SOURCE_LIST.filter((s) => s.tier === "V1");