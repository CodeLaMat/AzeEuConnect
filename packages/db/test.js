"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// test.ts
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const users = await prisma.user.findMany(); // or any existing model
    console.log(users);
}
main();
