"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [error, setError] = useState("");

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/"
    });

    if (result.error) {
      setError(result.error);
    } else if (result.url) {
      window.location.href = result.url;
    }

    setLoginInProgress(false);
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
      {error && (
        <div className="text-center text-red-500 mb-4">
          {error}
        </div>
      )}
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          disabled={loginInProgress}
          onChange={ev => setEmail(ev.target.value)}
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          disabled={loginInProgress}
          onChange={ev => setPassword(ev.target.value)}
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <button
          disabled={loginInProgress}
          type="submit"
          className="block w-full p-2 bg-blue-500 text-white rounded"
        >
          Login
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Don't have an account?{" "}
          <Link className="underline text-blue-500" href={"/register"}>
            Register here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
}
