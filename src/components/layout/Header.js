"use client";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { CartContext } from "../AppContext";
import { useContext } from "react";
import ShoppingCart from "@/components/icons/ShoppingCart";

export default function Header() {
  const session = useSession();
  const status = session.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const {cartProducts} = useContext(CartContext)
  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0];
  }

  return (
    <header className="flex items-center justify-between ">
      <Link className="text-primary font-semibold text-2xl" href={"/"}>
        FIESTA FRENZY
      </Link>
      <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        <Link href={"/"}>Home</Link>
        <Link href={"/menu"}>Menu</Link>
        <Link href={"/#about"}>About</Link>
        <Link href={"/#contact"}>Contact</Link>
      </nav>
      <nav className="flex items-center gap-4 text-gray-500 font-semibold">
        {status === "authenticated" && (
          <>
            <Link className="whitespace-nowrap" href={"/profile"}>Hello, {userName}</Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-primary rounded-full text-white px-7 py-2"
            >
              Logout
            </button>
          </>
        )}
        {status === "unauthenticated" && (
          <>
            <Link href={"/login"}>Login</Link>
            <Link
              href={"/register"}
              className="bg-primary rounded-full text-white px-7 py-2"
            >
              Register
            </Link>
          </>
        )}
        <Link className="relative" href={'/cart'}><ShoppingCart /> <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">{cartProducts.length}</span></Link>
      </nav>
    </header>
  );
}
