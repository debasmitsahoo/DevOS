import "server-only";
import type { ConnectionStatus, PassportData } from "@/types";
import {
  buildDemoPassport,
  DEMO_CONNECTIONS,
  DEMO_WHAT_CHANGED,
} from "@/lib/mock/data";

const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA !== "false";

export interface OverviewData {
  passport: PassportData;
  connections: ConnectionStatus[];
  whatChanged: { label: string; kind: "code" | "writing" | "score" | "social" }[];
  scoreDelta: number;
}

/** Dashboard overview (§4.2). Mock-gated; real mode reads the owner's graph. */
export async function getOverview(): Promise<OverviewData> {
  if (USE_MOCK_DATA) {
    return {
      passport: buildDemoPassport(),
      connections: DEMO_CONNECTIONS,
      whatChanged: DEMO_WHAT_CHANGED,
      scoreDelta: 3,
    };
  }
  // TODO: real path — requireUser() then compose from Prisma.
  throw new Error("Real data path not wired yet (set NEXT_PUBLIC_USE_MOCK_DATA=true).");
}