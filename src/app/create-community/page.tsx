"use client";

import { useState } from "react";

export default function CreateCommunityPage() {

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const [error, setError] =
  useState("");

const [success, setSuccess] =
  useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    const response = await fetch(
  "/api/communities",
  {
    method: "POST",

    headers: {
      "Content-Type":
        "application/json",
    },

    body: JSON.stringify({
      name,
      slug,
    }),
  }
);

const data =
  await response.json();

if (!response.ok) {

  setError(
    data.error ||
    "Failed to create community"
  );

  setSuccess("");

  return;
}

setSuccess(
  "Community created successfully"
);

setError("");

console.log(data);
  };

  return (
    <div className="max-w-xl mx-auto mt-16">

      <h1 className="text-3xl font-bold mb-5">
        Create Community
      </h1>

      {error && (

  <p className="text-red-500 mb-4">
    {error}
  </p>

)}

{success && (

  <p className="text-green-500 mb-4">
    {success}
  </p>

)}
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          placeholder="Community Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          placeholder="Community Slug"
          value={slug}
          onChange={(e) =>
            setSlug(e.target.value)
          }
          className="w-full border p-3 rounded"
        />

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Community
        </button>

      </form>
    </div>
  );
}