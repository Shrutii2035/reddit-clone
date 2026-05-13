import CommentForm
from "@/components/CommentForm";

import VoteButtons
from "@/components/VoteButtons";

import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function PostPage({
  params,
}: Props) {

  const { id } = await params;

  const post =
    await prisma.post.findUnique({
      where: {
        id,
      },
      include:{
        comments:true,
        votes: true,
      },
     
    });
if (!post) {
  return (
    <div>
      Post not found
    </div>
  );
}

const upvotes =
  post.votes.filter(
    (vote) => vote.type === "UP"
  ).length;

const downvotes =
  post.votes.filter(
    (vote) => vote.type === "DOWN"
  ).length;

const score =
  upvotes - downvotes;

  return (
    <div className="max-w-2xl mx-auto mt-16">

      <h1 className="text-4xl font-bold">
        {post.title}
      </h1>
      <p className="text-zinc-500 text-sm mt-2">
  Posted in <span className="text-orange-400">a community</span>
</p>

      <p className="mt-5 text-zinc-300">
        {post.content}
      </p>

      <VoteButtons postId={post.id} initialVotes={score} />

      <div className="mt-4 flex gap-3">
  <span className="bg-zinc-800 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
    ▲ {upvotes}
  </span>
  <span className="bg-zinc-800 text-red-400 px-3 py-1 rounded-full text-sm font-medium">
    ▼ {downvotes}
  </span>
  <span className="bg-zinc-800 text-orange-400 px-3 py-1 rounded-full text-sm font-medium">
    Score: {score}
  </span>
</div>
       <CommentForm postId={post.id} />

       <div className="mt-10 space-y-4">
    <h2 className="text-xl font-semibold text-zinc-100 mt-10 mb-4 border-b border-zinc-700 pb-2">
  Comments ({post.comments.length})
</h2>
  {post.comments.map((comment) => (

    <div key={comment.id} className="bg-zinc-800 border border-zinc-700 p-4 rounded-lg hover:border-zinc-500 transition">
  <p className="text-zinc-300 text-sm">{comment.content}</p>
</div>

  ))}

</div>

    </div>
  );
}