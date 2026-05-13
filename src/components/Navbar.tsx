import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 px-4 py-3 sticky top-0 z-50">
      <div className=" flex items-center justify-between gap-3">
        
        {/* Logo */}
        <Link href="/" className="text-orange-400 font-extrabold text-2xl shrink-0 pl-6">
          Reddit Clone
        </Link>

        {/* Auth buttons — always visible, never overlap */}
        <div className="flex items-center gap-2 shrink-0">
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
        </div>

      </div>
    </nav>
  );
}