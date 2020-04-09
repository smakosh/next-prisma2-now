import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(_req, res) {
  const posts = await prisma.post.findMany();
  res.json(posts);
}
