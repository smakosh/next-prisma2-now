import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, content, authorId } = req.body;

  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      User: { connect: { id: authorId } },
      published: true,
    },
  });

  res.json(result);
};
