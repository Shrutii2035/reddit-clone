"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between gap-3">

        {/* Logo */}
        <Link href="/" className="text-orange-400 font-extrabold text-2xl shrink-0 pl-6">
          Reddit Clone
        </Link>

        {/* Auth area */}
        <div className="flex items-center gap-2 shrink-0">
          {session?.user ? (
            <>
              {/* Logged in — show username */}
              <Link
                href={`/u/${session.user.name}`}
                className="text-orange-400 font-medium text-sm px-3 py-1.5 rounded-lg border border-zinc-700 hover:border-orange-400 transition"
              >
                u/{session.user.name}
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-zinc-300 hover:text-white text-sm px-3 py-1.5 rounded-lg border border-zinc-700 hover:border-zinc-500 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Logged out — show Login/Signup */}
              <Link
                href="/login"
                className="text-zinc-300 hover:text-white text-sm px-3 py-1.5 rounded-lg border border-zinc-700 hover:border-zinc-500 transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-orange-500 hover:bg-orange-400 text-white text-sm px-3 py-1.5 rounded-lg font-medium transition"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}