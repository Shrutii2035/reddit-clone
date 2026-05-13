import { postSchema }
from "@/validators/post";

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
  title,
  content,
  communityId,
  imageUrl
} = body;
    const validation =
  postSchema.safeParse({
    title,
    content,
    communityId,
  });

if (!validation.success) {

  return NextResponse.json(
    {
      error:
        "Invalid input",
    },
    {
      status: 400,
    }
  );
} 
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
    const post =
  await prisma.post.create({
    data: {
      title,
      content,
      communityId,
      authorId:
        session.user.id,
        imageUrl,
    },
  });
    return NextResponse.json(post);

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