import type { AuthStrategy, PillarInputs, Source } from "@/types";

// §6.4 — every integration implements this one interface.
// New source = implement + register. No core changes.

export interface ConnectionRef {
  id: string;
  userId: string;
  source: Source;
  sourceUserId: string;
  accessToken?: string | null;
  raw?: unknown;
}

export interface SyncResult {
  itemsSynced: number;
  /** opaque cursor for incremental/paginated syncs */
  cursor?: string;
}

export interface VerificationResult {
  verified: boolean;
  /** present when verification requires a user action, e.g. a bio token */
  challenge?: { token: string; instructions: string };
  reason?: string;
}

export interface SourceConnector {
  source: Source;
  authStrategy: AuthStrategy;

  /** Idempotent, paginated. Upserts on (source, sourceId). Safe to re-run. */
  sync(conn: ConnectionRef): Promise<SyncResult>;

  /** Confirms the connected account truly belongs to the user. */
  verify(conn: ConnectionRef): Promise<VerificationResult>;

  /** Verified inputs this source contributes to the Engineering Score. */
  scoreInputs(userId: string): Promise<PillarInputs>;

  /** Source-scoped delete — "delete my X data, keep the rest" (§5, GDPR/DPDP). */
  disconnect(conn: ConnectionRef): Promise<void>;
}