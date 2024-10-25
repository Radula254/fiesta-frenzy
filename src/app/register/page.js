"use client";
import { useState } from "react";
import Link from "next/link";


export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ name:username, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      setError(true);
    } else {
      setUserCreated(true);
    }
    setCreatingUser(false);
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
      {userCreated && (
        <div className="my-4 text-center">
          User created! <br /> You can now{" "}
          <Link className="underline text-blue-700 " href={"/login"}>
            Login &raquo;
          </Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center">
          An error has occured. <br /> Please try again later
        </div>
      )}
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="name"
          placeholder="Username"
          value={username}
          disabled={creatingUser}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          disabled={creatingUser}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          disabled={creatingUser}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit" disabled={creatingUser}>
          Register
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Already have an account?{" "}
          <Link className="underline text-blue-500" href={"/login"}>
            Login here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
}
