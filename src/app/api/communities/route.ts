import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const { name, slug } = body;

    const community =
      await prisma.community.create({
        data: {
          name,
          slug,
        },
      });

    return NextResponse.json(community);

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
export async function GET() {

  try {

    const communities =
      await prisma.community.findMany();

    return NextResponse.json(
      communities
    );

  } catch (error) {

    return NextResponse.json(
      {
        error:
          "Failed to fetch communities",
      },
      {
        status: 500,
      }
    );
  }
}