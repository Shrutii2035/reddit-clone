import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CommunityPage({
  params,
}: Props) {

  const { slug } = await params;

  const community =
    await prisma.community.findUnique({
      where: {
        slug,
      },
      include:{
       
        posts:true,
        
      },
    });

  if (!community) {
    return (
      <div>
        Community not found
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-16">

      {/* Banner */}
<div className="bg-orange-500 h-12 rounded-t-xl" />

{/* Community Header */}
<div className="bg-zinc-800 rounded-b-xl px-6 py-4 mb-8 border border-zinc-700">
  <h1 className="text-3xl font-bold text-white">
    r/{community.slug}
  </h1>
  <p className="mt-1 text-zinc-400 text-sm">
    Welcome to r/{community.slug}
  </p>
  <div className="mt-3 flex gap-4 items-center">
    <span className="text-zinc-300 text-sm">
      🧑‍🤝‍🧑 {community.posts.length} posts
    </span>
    
  </div>
</div>

      <div className="mt-8 space-y-4">

  {community.posts.map((post) => (

    <div key={post.id} className="bg-zinc-800 border border-zinc-700 p-5 rounded-xl hover:border-zinc-500 transition cursor-pointer">
      <Link href={`/post/${post.id}`}>

  <h2 className="text-lg font-semibold text-zinc-100 hover:text-orange-400 transition">
<p className="text-zinc-400 text-sm mt-2"></p>
    {post.title}
  </h2>
<h2 className="text-zinc-400 text-sm font-medium uppercase tracking-wide mb-4">
  Posts · {community.posts.length}
</h2>
</Link>

      
        {post.content}
      

    </div>

  ))}

</div>

    </div>
  );
}