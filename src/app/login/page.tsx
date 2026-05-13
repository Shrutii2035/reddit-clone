"use client";

import { useState } from "react";

import { signIn }
from "next-auth/react";

export default function LoginPage() {

  const [email, setEmail] =
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

    const result =
      await signIn(
        "credentials",
        {
          email,
          password,

          redirect: false,
        }
      );

    if (result?.error) {

  setError(
    "Invalid credentials"
  );

  setSuccess("");

  return;
}

setSuccess(
  "Login successful"
);

setError("");
  };

  return (
    <div className="max-w-xl mx-auto mt-16">

      <h1 className="text-3xl font-bold mb-5">
        Login
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
          Login
        </button>

      </form>

    </div>
  );
}