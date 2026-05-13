import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import ShareButton from "@/components/ShareButton";
import SortBar from "@/components/SortBar";
import VoteButtons from "@/components/VoteButtons";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PostWithRelations = Prisma.PostGetPayload<{
  include: {
    author: true;
    community: true;
    _count: { select: { comments: true; votes: true } };
  };
}>;

type SortOption = "hot" | "new" | "top";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { sort?: string };
}) {
  const sort = (searchParams?.sort ?? "new") as SortOption;

  const orderBy:
    | Prisma.PostOrderByWithRelationInput
    | Prisma.PostOrderByWithRelationInput[] =
    sort === "top"
      ? { votes: { _count: "desc" } }
      : sort === "hot"
      ? [{ votes: { _count: "desc" } }, { createdAt: "desc" }]
      : { createdAt: "desc" };

  const posts: PostWithRelations[] = await prisma.post.findMany({
    include: {
      author: true,
      community: true,
      _count: {
        select: { comments: true, votes: true },
      },
    },
    orderBy,
  });

  return (
    <div className="space-y-4">

      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-bold text-zinc-100">Home Feed</h1>
        <SortBar />
      </div>
    {/* Mobile-only create post bar */}
<Link
  href="/create-post"
  className="flex lg:hidden items-center gap-3 bg-zinc-900 border border-zinc-800 hover:border-orange-500 rounded-2xl p-3 transition"
>
  <span className="flex-1 bg-zinc-800 text-zinc-500 text-sm rounded-xl px-3 py-2">
    Create a post...
  </span>
  <span className="text-xs bg-orange-500 text-white px-3 py-2 rounded-xl font-semibold">
    Post
  </span>
</Link>
<br></br>


      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition"
        >
          <Link href={`/post/${post.id}`}>
            <h2 className="text-xl font-semibold text-zinc-100 hover:text-orange-400 transition">
              {post.title}
            </h2>
          </Link>

          <p className="text-zinc-500 text-sm mt-2">
            Posted by{" "}
            <Link
              href={`/u/${post.author.username}`}
              className="text-orange-400 hover:text-orange-300 transition"
            >
              {post.author.username}
            </Link>
            {" "}in{" "}
            <Link
              href={`/r/${post.community.slug}`}
              className="text-blue-500 hover:text-blue-400 transition"
            >
              r/{post.community.slug}
            </Link>
          </p>

          <p className="mt-3 text-zinc-400 text-sm leading-relaxed line-clamp-3">
            {post.content}
          </p>

          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="mt-3 rounded-xl max-h-72 w-full object-cover"
            />
          )}

          <div className="mt-4 pt-3 border-t border-zinc-800 flex flex-wrap gap-3 text-zinc-500 text-xs items-center">
            <VoteButtons
  postId={post.id}
  initialVotes={post._count.votes}
/>
            <Link
              href={`/post/${post.id}`}
              className="flex items-center gap-1 hover:text-orange-400 transition"
            >
              💬 {post._count.comments} Comments
            </Link>
            <ShareButton url={`/post/${post.id}`} />
          </div>
        </div>
      ))}
    </div>
  );
}