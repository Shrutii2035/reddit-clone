import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.community.create({
    data: {
      name: "Programming",
      slug: "programming",
    },
  });

  console.log("Seed data added");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });