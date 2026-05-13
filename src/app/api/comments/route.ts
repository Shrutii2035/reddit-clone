import { getServerSession }
from "next-auth";

import { authOptions }
from "@/lib/auth";

import CommentForm
from "@/components/CommentForm";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      content,
      postId,
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
    const comment =
      await prisma.comment.create({
        data: {
          content,
          postId,
          authorId:
  session.user.id,
        },
      });

    return NextResponse.json(comment);

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