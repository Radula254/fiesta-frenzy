import * as mongoose from "mongoose";
import { User }  from "../../../models/User.js";
import NextAuth, { getServerSession } from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  secret: process.env.NEXT_PUBLIC_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: 'credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "johndoe@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        await mongoose.connect(process.env.NEXT_PUBLIC_MONGOURL);
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("No user found with this email");
        }

        const passwordOk = user && bcrypt.compareSync(password, user.password);
        if (!passwordOk) {
          throw new Error("Invalid email or password");
        }

        return user;
      },
    }),
  ],
  pages: {
    error: "/login",
  },
};

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user.email;
  if (!userEmail) {
    return false;
  }
  const userInfo = await UserInfofindOne({email:userEmail});
  if (!userInfo) {
    return false;
  }
  return userInfo.admin;
}

const handler = NextAuth(authOptions);

export { handler as GET , handler as POST }