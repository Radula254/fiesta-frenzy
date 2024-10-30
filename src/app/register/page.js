"use client";
import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  const isEmailValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
  const isConfirmPasswordValid = confirmPassword === password;
  const isFormValid =
    username.length > 0 &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid;

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ name: username, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      setError(true);
    } else {
      setUserCreated(true);
      window.location.href = "/login";
    }
    setCreatingUser(false);
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
      {error && (
        <div className="my-4 text-center">
          An error has occurred. <br /> Please try again later
        </div>
      )}
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <div className="relative">
          <input
            type="text"
            placeholder="Username"
            value={username}
            required
            disabled={creatingUser}
            onChange={(ev) => setUsername(ev.target.value)}
            className="block w-full px-4 py-2 mb-1 border rounded"
          />
          {username && (
            <span className="absolute right-3 top-3 text-green-600">✓</span>
          )}
        </div>
        <div className="relative">
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            disabled={creatingUser}
            onChange={(ev) => setEmail(ev.target.value)}
            className="block w-full px-4 py-2 mb-1 border rounded"
          />
          {email && !isEmailValid && (
            <p className="text-sm text-red-600">Please enter a valid email.</p>
          )}
          {isEmailValid && (
            <span className="absolute right-3 top-3 text-green-600">✓</span>
          )}
        </div>
        <div className="relative">
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            minLength="8"
            disabled={creatingUser}
            onChange={(ev) => setPassword(ev.target.value)}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            title="Password must be at least 8 characters long, contain a capital letter, a lowercase letter, a number, and a special character"
            className="block w-full px-4 py-2 mb-1 border rounded"
          />
          {!isPasswordValid && password && (
            <p className="text-sm text-red-600">
              Password must be at least 8 characters long, contain a capital
              letter, lowercase letter, number, and special character.
            </p>
          )}
          {isPasswordValid && (
            <span className="absolute right-3 top-3 text-green-600">✓</span>
          )}
        </div>
        <div className="relative">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            required
            minLength="8"
            disabled={creatingUser}
            onChange={(ev) => setConfirmPassword(ev.target.value)}
            className="block w-full px-4 py-2 mb-1 border rounded"
          />
          {confirmPassword && !isConfirmPasswordValid && (
            <p className="text-sm text-red-600">Passwords do not match.</p>
          )}
          {isConfirmPasswordValid && confirmPassword && (
            <span className="absolute right-3 top-3 text-green-600">✓</span>
          )}
        </div>
        <button
          type="submit"
          disabled={!isFormValid || creatingUser}
          className={`w-full px-4 py-2 mt-3 text-white bg-blue-600 rounded ${
            (!isFormValid || creatingUser) && "opacity-50 cursor-not-allowed"
          }`}
        >
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
