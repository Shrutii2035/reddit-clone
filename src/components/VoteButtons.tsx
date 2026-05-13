"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  postId: string;
  initialVotes: number;
  initialUserVote?: "UP" | "DOWN" | null;
}

export default function VoteButtons({ postId, initialVotes, initialUserVote = null }: Props) {
  const router = useRouter();
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState<"UP" | "DOWN" | null>(initialUserVote);
  const [loading, setLoading] = useState(false);

  const handleVote = async (type: "UP" | "DOWN") => {
    if (loading) return;
    setLoading(true);

    // --- Optimistic update ---
    const previousVote = userVote;
    const previousVotes = votes;

    if (userVote === type) {
      // clicking same button = undo vote
      setUserVote(null);
      setVotes((v) => v + (type === "UP" ? -1 : 1));
    } else {
      // switching vote or fresh vote
      setVotes((v) => v + (type === "UP" ? 1 : -1) + (userVote ? (userVote === "UP" ? -1 : 1) : 0));
      setUserVote(type);
    }

    const response = await fetch("/api/votes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, type }),
    });

    if (response.status === 401) {
      // Revert optimistic update
      setUserVote(previousVote);
      setVotes(previousVotes);
      alert("Please login first");
      router.push("/login");
      setLoading(false);
      return;
    }

    if (!response.ok) {
      // Revert on any other error
      setUserVote(previousVote);
      setVotes(previousVotes);
    }

    router.refresh();
    setLoading(false);
  };

  return (
    <div className="flex items-center gap-1">
      {/* Upvote */}
      <button
        onClick={() => handleVote("UP")}
        disabled={loading}
        className={`p-1.5 rounded-lg transition disabled:opacity-50 ${
          userVote === "UP"
            ? "text-orange-400 bg-orange-400/10"
            : "text-zinc-500 hover:text-orange-400 hover:bg-orange-400/10"
        }`}
      >
        ▲
      </button>

      {/* Vote count */}
      <span
        className={`text-xs font-bold min-w-[2ch] text-center transition ${
          userVote === "UP"
            ? "text-orange-400"
            : userVote === "DOWN"
            ? "text-blue-400"
            : "text-zinc-400"
        }`}
      >
        {votes}
      </span>

      {/* Downvote */}
      <button
        onClick={() => handleVote("DOWN")}
        disabled={loading}
        className={`p-1.5 rounded-lg transition disabled:opacity-50 ${
          userVote === "DOWN"
            ? "text-blue-400 bg-blue-400/10"
            : "text-zinc-500 hover:text-blue-400 hover:bg-blue-400/10"
        }`}
      >
        ▼
      </button>
    </div>
  );
}