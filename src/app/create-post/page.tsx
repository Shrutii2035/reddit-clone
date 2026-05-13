"use client";

import {
  useEffect,
  useState,
} from "react";
import Link from "next/link";

import ShareButton from "@/components/ShareButton";
import SortBar from "@/components/SortBar";

type SortOption = "hot" | "new" | "top";
// add this below the "use client":
export const dynamic = "force-dynamic";

export async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const { sort: sortParam } = await searchParams;
  const sort = (sortParam ?? "new") as SortOption;
}

export default function CreatePostPage() {

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

    const [
  communities,
  setCommunities,
] = useState([]);

const [
  communityId,
  setCommunityId,
] = useState("");


    const [error, setError] =
  useState("");

const [success, setSuccess] =
  useState("");
const [image, setImage] = useState<File | null>(null);
const [imagePreview, setImagePreview] = useState("");
const [uploading, setUploading] = useState(false);
const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;
  setImage(file);
  setImagePreview(URL.createObjectURL(file));
};
  useEffect(() => {

  const fetchCommunities =
    async () => {

      const response =
        await fetch(
          "/api/communities"
        );

      const data = await response.json();

      setCommunities(data);
    };

  fetchCommunities();

}, []);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setUploading(true);

  let imageUrl = "";

  console.log("Image state:", image);  // ← add this

  if (image) {
    console.log("Uploading image...");  // ← add this
    const formData = new FormData();
    formData.append("file", image);

    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    console.log("Upload status:", uploadRes.status);  // ← add this
    const uploadData = await uploadRes.json();
    console.log("Upload data:", uploadData);  // ← add this
    imageUrl = uploadData.url;
  }

  console.log("Final imageUrl being sent:", imageUrl);  // ← add this

  const response = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content, communityId, imageUrl }),
  });

  setUploading(false);
  const data = await response.json();

  if (!response.ok) {
    setError(data.error || "Failed to create post");
    return;
  }

  setSuccess("Post created successfully!");
  setError("");
};
  return (
    <div className="max-w-2xl mx-auto mt-16">

      <h1 className="text-3xl font-bold mb-5">
        Create Post
      </h1>

    {error && (

  <p className="text-red-500">
    {error}
  </p>

)}

{success && (

  <p className="text-green-500">
    {success}
  </p>

)}


      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
          <select
  value={communityId}



  onChange={(e) =>
    setCommunityId(
      e.target.value
    )
  }

  className="
w-full
bg-zinc-900
text-white
border
border-zinc-700
p-4
rounded-xl
focus:outline-none
focus:ring-2
focus:ring-blue-500
"
>

  <option value="">
    Select Community
  </option>

  {communities.map(
    (community: any) => (

      <option
        key={community.id}
        value={community.id}
      >

        {community.name}

      </option>
    )
  )}

</select>

        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full border p-3 rounded"
        />

        <textarea
          placeholder="Post Content"
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          className="w-full border p-3 rounded h-40"
        />
        <div className="border-2 border-dashed border-zinc-700 rounded-xl p-4 text-center">
  <input
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    className="hidden"
    id="image-upload"
  />
  <label htmlFor="image-upload" className="cursor-pointer text-zinc-400 hover:text-orange-400 transition text-sm">
    📷 Click to attach an image (optional)
  </label>
  {imagePreview && (
    <div className="mt-3">
      <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg object-cover" />
      <button
        type="button"
        onClick={() => { setImage(null); setImagePreview(""); }}
        className="mt-2 text-xs text-red-400 hover:text-red-300"
      >
        Remove
      </button>
    </div>
  )}
</div>
<button
  type="submit"
  disabled={uploading}
  className="bg-orange-500 hover:bg-orange-600 disabled:opacity-40 transition text-white font-semibold px-5 py-2 rounded-xl"
>
  {uploading ? "Uploading..." : "Create Post"}
</button>

      </form>

    </div>
  );
}
