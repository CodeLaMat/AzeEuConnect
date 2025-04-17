"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("../generated/client");
const globalForPrisma = globalThis;
exports.prisma = globalForPrisma.prisma ||
    new client_1.PrismaClient({ log: ["query", "info", "warn", "error"] });
if (process.env.NODE_ENV !== "production")
    globalForPrisma.prisma = exports.prisma; // Prevent creating a new PrismaClient every time in development
