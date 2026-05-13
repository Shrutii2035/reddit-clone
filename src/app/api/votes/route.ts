import { getServerSession }
from "next-auth";

import { authOptions }
from "@/lib/auth";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      postId,
      type,
    } = body;

    const session =
  await getServerSession(
    authOptions
  );

if (!session?.user?.id) {

  return NextResponse.json(
    {
      error: "Unauthorized",
    },
    {
      status: 401,
    }
  );
}

const userId =
  session.user.id;
    const existingVote =
      await prisma.vote.findUnique({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });

    if (existingVote) {

      const updatedVote =
        await prisma.vote.update({
          where: {
            id: existingVote.id,
          },

          data: {
            type,
          },
        });

      return NextResponse.json(
        updatedVote
      );
    }

    const vote =
      await prisma.vote.create({
        data: {
          type,
          postId,
          userId,
        },
      });

    return NextResponse.json(vote);

  } catch (error) {

    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}