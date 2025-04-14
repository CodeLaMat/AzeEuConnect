// test.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany(); // or any existing model
  console.log(users);
}

main();
