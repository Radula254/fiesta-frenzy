// src/app/api/auth/authOptions.js
import CredentialsProvider from "next-auth/providers/credentials";
import * as mongoose from "mongoose";
import { User } from "@/app/models/User"; // Check if this is the correct path
import bcrypt from "bcrypt";

export const authOptions = {
  secret: process.env.NEXT_PUBLIC_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "johndoe@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        // Ensure MongoDB connection is ready
        if (!mongoose.connection.readyState) {
          await mongoose.connect(process.env.NEXT_PUBLIC_MONGOURL);
        }

        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("No user found with this email");
        }

        const passwordOk = bcrypt.compareSync(password, user.password);
        if (!passwordOk) {
          throw new Error("Invalid email or password");
        }

        return { id: user._id, email: user.email, name: user.name };
      },
    }),
  ],
  pages: {
    error: "/login",
  },
};
