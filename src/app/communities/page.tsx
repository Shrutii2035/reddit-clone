import { prisma } from "@/lib/prisma";

export default async function CommunitiesPage() {

  const communities =
    await prisma.community.findMany();

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