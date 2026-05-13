"use client";

import { useRouter, useSearchParams } from "next/navigation";

const SORT_OPTIONS = [
  { label: "🔥 Hot", value: "hot" },
  { label: "✨ New", value: "new" },
  { label: "📈 Top", value: "top" },
];

export default function SortBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("sort") ?? "new";

  const setSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex gap-2">
      {SORT_OPTIONS.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => setSort(value)}
          className={`transition text-xs px-3 py-1.5 rounded-full font-medium ${
            current === value
              ? "bg-orange-500 text-white"
              : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}