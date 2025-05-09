import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const nyc = await prisma.city.create({
    data: {
      name: 'New York City',
      parkingAreas: {
        create: [
          { name: 'Brooklyn' },
          { name: 'Queens' }
        ]
      }
    }
  });

  const washington = await prisma.city.create({
    data: {
      name: 'Washington',
      parkingAreas: {
        create: [
          { name: 'Downtown' },
          { name: 'Uptown' }
        ]
      }
    }
  });

  console.log(' Seed data inserted');
}

main()
  .catch((e) => {
    console.error(' Seed error:', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
