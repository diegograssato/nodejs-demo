const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // ... your Prisma Client queries will go here
  console.log(" A qui");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.disconnect());
