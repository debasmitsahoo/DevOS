// Auth abstraction. V1 sole identity source is Clerk (§0.5), but keyless local
// dev runs on a mock so the app renders without keys. Swap the mock branch for
// Clerk's `auth()` / `currentUser()` once CLERK_* env is set — call sites don't
// change.

export interface SessionUser {
  id: string;
  clerkUserId: string;
  email: string;
  handle: string;
  displayName: string;
  avatarUrl: string | null;
  role: "DEVELOPER" | "RECRUITER" | "ADMIN";
  plan: "FREE" | "STUDENT" | "PRO" | "RECRUITER";
}

const USE_MOCK_AUTH = process.env.NEXT_PUBLIC_USE_MOCK_AUTH !== "false";

const MOCK_USER: SessionUser = {
  id: "usr_demo_debasmit",
  clerkUserId: "clerk_demo",
  email: "sahoodebasmit@gmail.com",
  handle: "debasmit",
  displayName: "Debasmit Sahoo",
  avatarUrl: null,
  role: "DEVELOPER",
  plan: "FREE",
};

/** Returns the current session user, or null if signed out. */
export async function getCurrentUser(): Promise<SessionUser | null> {
  if (USE_MOCK_AUTH) return MOCK_USER;
  // TODO: const { userId } = await auth(); if (!userId) return null;
  //       map clerk user → our `users` row (synced via webhook).
  return null;
}

/** Server guard for protected routes. */
export async function requireUser(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) throw new Error("UNAUTHENTICATED");
  return user;
}

export const isMockAuth = USE_MOCK_AUTH;