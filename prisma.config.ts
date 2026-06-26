import path from "node:path";
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// Prisma 7: connection URLs live here (used by Migrate / introspection).
// Runtime connections use a driver adapter passed to PrismaClient (see lib/db.ts).
export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  migrations: {
    path: path.join("prisma", "migrations"),
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});