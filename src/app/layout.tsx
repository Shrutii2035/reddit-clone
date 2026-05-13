import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reddit Clone",
  description: "A Reddit-style community app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-100 min-h-screen">
        <Navbar />

        <div className="flex">

          {/* ── LEFT SIDEBAR ── */}
          <aside className="hidden lg:flex flex-col w-64 shrink-0 fixed top-14 left-0 h-[calc(100vh-3.5rem)] border-r border-zinc-800 bg-zinc-950 pt-5 pb-5 px-2 overflow-hidden">

            {/* Main nav */}
            <nav className="flex flex-col gap-0.5">
              <Link
                href="/"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-800 transition text-zinc-100 font-bold text-sm"
              >
                <span className="text-lg">🏠</span>
                Home
              </Link>
              <Link
                href="/create-community"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-800 transition text-zinc-100 font-bold text-sm"
              >
                <span className="text-lg">👥</span>
                Communities
              </Link>
            </nav>

            {/* Divider */}
            <div className="my-4 border-t border-zinc-800" />

            {/* Communities section */}
            <p className="text-xs font-extrabold text-zinc-400 uppercase tracking-widest px-3 mb-2">
              Your Communities
            </p>

            {/* Community links — no scroll, fixed height */}
            <nav className="flex flex-col gap-0.5 overflow-hidden">
              <Link
                href="/r/php"
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-zinc-800 transition text-zinc-400 hover:text-zinc-200 text-sm font-medium"
              >
                <span className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs font-bold shrink-0">
                  r/
                </span>
                r/php
              </Link>
              <Link
                href="/r/game"
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-zinc-800 transition text-zinc-400 hover:text-zinc-200 text-sm font-medium"
              >
                <span className="w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center text-xs font-bold shrink-0">
                  r/
                </span>
                r/game 
              </Link>
              <Link
                href="/r/discuss"
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-zinc-800 transition text-zinc-400 hover:text-zinc-200 text-sm font-medium"
              >
                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold shrink-0">
                  r/
                </span>
                r/discuss
              </Link>
              <Link
                href="/r/programming"
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-zinc-800 transition text-zinc-400 hover:text-zinc-200 text-sm font-medium"
              >
                <span className="w-6 h-6 rounded-full bg-zinc-700 text-zinc-300 flex items-center justify-center text-xs font-bold shrink-0">
                  r/
                </span>
                r/programming
              </Link>
              <Link
                href="/r/webdev"
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-zinc-800 transition text-zinc-400 hover:text-zinc-200 text-sm font-medium"
              >
                <span className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs font-bold shrink-0">
                  r/
                </span>
                r/webdev
              </Link>
            </nav>

            {/* Divider */}
            <div className="my-4 border-t border-zinc-800" />

            {/* Create Post — always visible, pinned above bottom */}
            <Link
              href="/create-post"
              className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 transition text-white font-bold text-sm py-2.5 rounded-xl"
            >
              <span className="text-base leading-none">+</span>
              Create Post
            </Link>

          </aside>

          {/* ── MAIN CONTENT ── offset by sidebar width, constrained width */}
          <main className="lg:ml-64 flex-1 min-w-0 py-6 px-4 sm:px-8">
            <div className="max-w-2xl mx-auto">
              {children}
            </div>
          </main>

        </div>

        {/* ── MOBILE BOTTOM NAV ── */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-zinc-900 border-t border-zinc-800 flex items-center justify-around px-2 py-2">
          <Link
            href="/"
            className="flex flex-col items-center gap-0.5 text-zinc-400 hover:text-orange-400 transition text-xs"
          >
            <span className="text-xl">🏠</span>
            Home
          </Link>

          <Link
            href="/create-post"
            className="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-400 transition text-white shadow-lg -mt-5"
          >
            <span className="text-2xl leading-none">+</span>
          </Link>

          <Link
            href="/create-community"
            className="flex flex-col items-center gap-0.5 text-zinc-400 hover:text-orange-400 transition text-xs"
          >
            <span className="text-xl">👥</span>
            Communities
          </Link>
        </nav>

        <div className="lg:hidden h-20" />

      </body>
    </html>
  );
}