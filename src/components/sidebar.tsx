"use client";

import Link from "next/link";
import { Home, Users, PlusSquare, TrendingUp, Hash } from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type Community = {
  id: string;
  name: string;
  slug: string;
};

export default function Sidebar() {
  const { data: session } = useSession();
  const [communities, setCommunities] = useState<Community[]>([]);

  useEffect(() => {
    fetch("/api/communities")
      .then((res) => res.json())
      .then((data) => setCommunities(data))
      .catch(() => {});
  }, []);

  return (
    <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] border-r border-zinc-800 bg-zinc-950 p-4 hidden md:flex flex-col overflow-y-auto">

      {/* NAV LINKS */}
      <nav className="space-y-1">
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-800 text-zinc-100 font-medium text-sm transition">
          <Home size={18} className="text-orange-400" /> Home
        </Link>
        <Link href="/communities" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-800 text-zinc-100 font-medium text-sm transition">
          <Users size={18} className="text-orange-400" /> Communities
        </Link>
        <Link href="/create-community" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-800 text-zinc-100 font-medium text-sm transition">
          <PlusSquare size={18} className="text-orange-400" /> Create Community
        </Link>
        <Link href="/?sort=top" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-800 text-zinc-100 font-medium text-sm transition">
          <TrendingUp size={18} className="text-orange-400" /> Top Posts
        </Link>
        <Link href="/?sort=hot" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-800 text-zinc-100 font-medium text-sm transition">
          <Hash size={18} className="text-orange-400" /> Hot Posts
        </Link>
      </nav>

      <div className="my-4 border-t border-zinc-800" />

      {/* YOUR PROFILE */}
      {session?.user && (
        <>
          <div className="px-3 py-3 bg-zinc-900 rounded-xl border border-zinc-800 mb-4">
            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Logged in as</p>
            <Link
              href={`/u/${session.user.name}`}
              className="text-orange-400 font-semibold text-sm hover:underline"
            >
              u/{session.user.name}
            </Link>
            <div className="mt-3">
              <Link
                href="/create-post"
                className="block text-center bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold py-1.5 rounded-lg transition"
              >
                + Create Post
              </Link>
            </div>
          </div>
          <div className="my-1 border-t border-zinc-800" />
        </>
      )}

      {/* COMMUNITIES LIST */}
      <div className="mt-3">
        <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2 px-1">
          Communities
        </h3>
        <div className="space-y-1">
          {communities.length === 0 ? (
            <p className="text-zinc-600 text-xs px-2">No communities yet</p>
          ) : (
            communities.map((community) => (
              <Link
                key={community.id}
                href={`/r/${community.slug}`}
                className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-zinc-800 hover:text-orange-400 text-zinc-400 text-sm transition"
              >
                <span className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-pink-600 text-white text-xs flex items-center justify-center font-bold shrink-0">
                  r/
                </span>
                <span className="truncate">{community.name}</span>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* BOTTOM CREATE POST */}
      {!session?.user && (
        <div className="mt-auto pt-4">
          <Link
            href="/create-post"
            className="block text-center bg-orange-500 hover:bg-orange-600 transition text-white font-semibold py-2 rounded-xl text-sm"
          >
            + Create Post
          </Link>
        </div>
      )}

    </aside>
  );
}