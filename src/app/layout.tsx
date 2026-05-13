import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar";
import AuthProviders from "@/providers/SessionProvider";  // ✅ import
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reddit Clone",
  description: "A Reddit-style community app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-100 min-h-screen">
        <AuthProviders>  {/* ✅ wrap everything */}
          <Navbar />

          <div className="flex">
            <Sidebar />
            <main className="lg:ml-64 flex-1 min-w-0 py-6 px-4 sm:px-8">
              <div className="max-w-2xl mx-auto">
                {children}
              </div>
            </main>
          </div>

          <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-zinc-900 border-t border-zinc-800 flex items-center justify-around px-2 py-2">
            <Link href="/" className="flex flex-col items-center gap-0.5 text-zinc-400 hover:text-orange-400 transition text-xs">
              <span className="text-xl">🏠</span>
              Home
            </Link>
            <Link href="/create-post" className="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-400 transition text-white shadow-lg -mt-5">
              <span className="text-2xl leading-none">+</span>
            </Link>
            <Link href="/communities" className="flex flex-col items-center gap-0.5 text-zinc-400 hover:text-orange-400 transition text-xs">
              <span className="text-xl">👥</span>
              Communities
            </Link>
          </nav>

          <div className="lg:hidden h-20" />
        </AuthProviders>  {/* ✅ close wrapper */}
      </body>
    </html>
  );
}