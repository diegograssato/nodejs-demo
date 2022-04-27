import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main (): Promise<void> {
  // ... your Prisma Client queries will go here
  console.log('Aqui')
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())
