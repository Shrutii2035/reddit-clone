import Link from "next/link";

import { prisma }
from "@/lib/prisma";

interface Props {
  params: Promise<{
    username: string;
  }>;
}

export default async function
UserProfilePage({
  params,
}: Props) {

  const { username } =
    await params;

  const user =
    await prisma.user.findUnique({

      where: {
        username,
      },

      include: {
        posts: {
          include: {
            community: true,
          },

          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

  if (!user) {

    return (
      <div className="p-10">
        User not found
      </div>
    );
  }

  return (

    <div className="max-w-2xl mx-auto mt-16">

      <h1 className="text-4xl font-bold">
        u/{user.username}
      </h1>

      <p className="text-gray-500 mt-2">
        {user.email}
      </p>

      <div className="mt-10 space-y-5">

        {user.posts.map((post) => (

          <div
            key={post.id}
            className="border p-5 rounded"
          >

            <Link
              href={`/post/${post.id}`}
            >

              <h2
                className="text-2xl font-semibold hover:text-blue-500"
              >
                {post.title}
              </h2>

            </Link>

            <p className="text-gray-500 mt-2">

              in{" "}

              <Link
                href={`/r/${post.community.slug}`}
                className="text-blue-500"
              >
                r/{post.community.slug}
              </Link>

            </p>

            <p className="mt-4">
              {post.content}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}