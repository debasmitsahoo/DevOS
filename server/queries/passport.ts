import "server-only";
import type { PassportData } from "@/types";
import { buildDemoPassport } from "@/lib/mock/data";

const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA !== "false";

/**
 * Public passport by handle (§3 /{handle}). RSC-cached read path.
 * Mock mode serves the demo passport; real mode will compose this from Prisma
 * reads (profile + repos + articles + contests + latest score snapshot).
 */
export async function getPassport(handle: string): Promise<PassportData | null> {
  if (USE_MOCK_DATA) {
    const demo = buildDemoPassport();
    return handle.toLowerCase() === demo.handle ? demo : null;
  }
  // TODO: real path
  // const user = await db.user.findUnique({ where: { handle }, include: {...} });
  // if (!user || user.profile?.visibility !== "PUBLIC") return null;
  // return mapToPassport(user);
  return null;
}