// test.ts
import { PrismaClient } from "./generated/client"; // Adjust the import path as necessary

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany(); // or any existing model
  console.log(users);
}

main();
