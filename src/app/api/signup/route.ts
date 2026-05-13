import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const {
      email,
      username,
      password,
    } = body;

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await prisma.user.create({
        data: {
          email,
          username,
          password:
            hashedPassword,
        },
      });

    return NextResponse.json(user);

  } catch (error) {

    return NextResponse.json(
      {
        error:
          "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}