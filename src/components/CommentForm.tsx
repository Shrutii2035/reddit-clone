"use client";
import { useRouter }
from "next/navigation";

import { useState } from "react";

interface Props {
  postId: string;
}

export default function CommentForm({
  postId,
}: Props) {
const router =
  useRouter();
  const [content, setContent] =
    useState("");
const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);  // add this

  const response = await fetch("/api/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, postId }),
  });

  const data = await response.json();

  if (response.status === 401) {
    alert("Please login first");
    router.push("/login");
    setLoading(false);  // add this
    return;
  }

  setContent("");
  setLoading(false);  // add this
  router.refresh();   // add this ← makes new comment appear instantly
};
<div className="mt-10">
  <h3 className="text-lg font-semibold text-zinc-100 mb-4 border-b border-zinc-800 pb-2">
    Leave a Comment
  </h3>
  <form onSubmit={handleSubmit} className="space-y-4">
    {/* textarea and button here */}
  </form>
</div>
  return (

    
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-4"
    >

      <textarea
        placeholder="Write a comment..."
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
        className="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 p-3 rounded-xl h-32 focus:outline-none focus:border-orange-500 transition resize-none"
      />
<button
  type="submit"
  disabled={!content.trim() || loading}
  className="bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition text-white font-semibold px-5 py-2 rounded-xl"
>
  {loading ? "Posting..." : "Add Comment"}
</button>

    </form>
  );
}