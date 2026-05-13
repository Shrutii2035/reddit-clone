export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto mt-16 space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div className="h-8 w-32 bg-zinc-800 rounded-lg animate-pulse" />
        <div className="flex gap-2">
          <div className="h-7 w-16 bg-zinc-800 rounded-full animate-pulse" />
          <div className="h-7 w-16 bg-zinc-800 rounded-full animate-pulse" />
          <div className="h-7 w-16 bg-zinc-800 rounded-full animate-pulse" />
        </div>
      </div>

      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
          <div className="h-6 w-3/4 bg-zinc-800 rounded animate-pulse" />
          <div className="h-4 w-1/3 bg-zinc-800 rounded animate-pulse" />
          <div className="space-y-2">
            <div className="h-3 w-full bg-zinc-800 rounded animate-pulse" />
            <div className="h-3 w-5/6 bg-zinc-800 rounded animate-pulse" />
            <div className="h-3 w-4/6 bg-zinc-800 rounded animate-pulse" />
          </div>
          <div className="h-px bg-zinc-800" />
          <div className="flex gap-4">
            <div className="h-4 w-16 bg-zinc-800 rounded animate-pulse" />
            <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}