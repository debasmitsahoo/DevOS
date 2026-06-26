import type { Source } from "@/types";
import type { SourceConnector } from "./connector.interface";

// The connector registry. V1 connectors register here; the sync pipeline and
// scoring engine look up by source. Implementations land in their own files
// (github.ts, codeforces.ts, devto.ts, hashnode.ts) — stubbed until wired to
// real APIs, which is a vertical-slice task, not a foundation one.
const registry = new Map<Source, SourceConnector>();

export function registerConnector(connector: SourceConnector): void {
  registry.set(connector.source, connector);
}

export function getConnector(source: Source): SourceConnector | undefined {
  return registry.get(source);
}

export function listConnectors(): SourceConnector[] {
  return [...registry.values()];
}