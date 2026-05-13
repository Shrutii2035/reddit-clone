"use client";

import Link from "next/link";

import {
  Home,
  PlusSquare,
  Users,
} from "lucide-react";

export default function Sidebar() {

  return (

    <aside
      className="
fixed
top-16
left-0
w-64
h-[calc(100vh-4rem)]
border-r
border-zinc-800
bg-zinc-950
p-5
hidden
md:block
overflow-y-auto
"
    >

      <h2 className="text-xl font-bold mb-8 text-orange-500">
  Reddit Clone
</h2>

      <nav
        className="space-y-3"
      >

        <Link
          href="/"
          className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 text-orange-400 transition font-medium"
        >

          <Home size={20} />

          Home

        </Link>

        <Link
          href="/create-post"
          className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 text-orange-400 transition font-medium"
        >

          <PlusSquare size={20} />

          Create Post

        </Link>

        <Link
          href="/create-community"
          className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 text-orange-400 transition font-medium"
        >

          <Users size={20} />

          Communities

        </Link>

      </nav>
      <div className="mt-8 pt-6 border-t border-zinc-800">
  <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">
    Popular Communities
  </h3>
  <div className="space-y-2 text-sm text-zinc-400">
    <Link href="/r/webdev" className="block p-2 rounded-lg hover:bg-zinc-900 hover:text-orange-400 transition">
      r/webdev
    </Link>
    <Link href="/r/programming" className="block p-2 rounded-lg hover:bg-zinc-900 hover:text-orange-400 transition">
      r/programming
    </Link>
  </div>
</div>
<div className="absolute bottom-6 left-5 right-5">
  <Link
    href="/create-post"
    className="block text-center bg-orange-500 hover:bg-orange-600 transition text-white font-semibold py-2 rounded-xl text-sm"
  >
    + Create Post
  </Link>
</div>
    </aside>
  );
}