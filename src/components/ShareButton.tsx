"use client";

import { useState } from "react"

interface Props {
  url: string;
}

export default function ShareButton({ url }: Props) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    await navigator.clipboard.writeText(
      window.location.origin + url
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-1 hover:text-orange-400 transition"
    >
      🔗 {copied ? "Copied!" : "Share"}
    </button>
  );
}