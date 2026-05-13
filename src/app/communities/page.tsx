import { prisma } from "@/lib/prisma";
import type { Community } from "@prisma/client";

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
      <h1 className="text-3xl font-bold mb-5">
        Communities
      </h1>

      <div className="space-y-4">
        {communities.map((community) => (
          <div
            key={community.id}
            className="border p-4 rounded"
          >
            <h2 className="text-xl font-semibold">
              r/{community.slug}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}