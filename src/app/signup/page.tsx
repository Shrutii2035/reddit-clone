"use client";

import { useState } from "react";

export default function SignupPage() {

  const [email, setEmail] =
    useState("");

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

    const [error, setError] =
  useState("");

const [success, setSuccess] =
  useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    const response = await fetch(
      "/api/signup",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          email,
          username,
          password,
        }),
      }
    );

    const data =
  await response.json();

if (!response.ok) {

  setError(
    data.error ||
    "Signup failed"
  );

  setSuccess("");

  return;
}

setSuccess(
  "Account created successfully"
);

setError("");

console.log(data);
  };

  return (
    <div className="max-w-xl mx-auto mt-16">

      <h1 className="text-3xl font-bold mb-5">
        Sign Up
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

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="w-full border p-3 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border p-3 rounded"
        />

        <button
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Create Account
        </button>

      </form>

    </div>
  );
}