import { PrismaClient } from "../generated/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ log: ["query", "info", "warn", "error"] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma; // Prevent creating a new PrismaClient every time in development
