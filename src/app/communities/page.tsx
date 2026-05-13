import { prisma } from "@/lib/prisma";
import type { Community } from "@prisma/client";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CommunitiesPage() {
  let communities: Community[] = [];

  try {
    communities = await prisma.community.findMany();
  } catch (error) {
    console.error("Failed to fetch communities:", error);
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Communities</h1>
        <Link href="/create-community" className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition">
          + Create Community
        </Link>
      </div>

      <div className="space-y-3">
        {communities.map((community) => (
          // ✅ Wrap in Link so clicking opens the community
          <Link
            key={community.id}
            href={`/r/${community.slug}`}
            className="block border border-zinc-700 bg-zinc-900 hover:border-orange-500 hover:bg-zinc-800 p-4 rounded-xl transition"
          >
            <h2 className="text-xl font-semibold text-orange-400">
              r/{community.slug}
            </h2>
            <p className="text-zinc-400 text-sm mt-1">{community.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}