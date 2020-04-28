import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const posts = await prisma.post.findMany({
    include: {
      Tag: true,
    },
  });
  res.json(posts);
};
