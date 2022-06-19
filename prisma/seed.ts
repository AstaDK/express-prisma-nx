import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const objAlice = {
    email: "alice@prisma.io",
    name: "Alice",
    posts: {
      create: [
        {
          title: "Check out Prisma with Next.js",
          published: true
        }
      ]
    }
  };

  const objBod = {
    email: "bob@prisma.io",
    name: "Bob",
    posts: {
      create: [
        {
          title: "Follow Prisma on Twitter",
          published: true
        },
        {
          title: "Follow Nexus on Twitter",
          published: true
        }
      ]
    }
  };

  const alice = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: objAlice,
    create: objAlice
  });

  const bob = await prisma.user.upsert({
    where: { email: "bob@prisma.io" },
    update: objBod,
    create: objBod
  });
  console.log({ alice, bob });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
