// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions"; // Adjust path if necessary

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
