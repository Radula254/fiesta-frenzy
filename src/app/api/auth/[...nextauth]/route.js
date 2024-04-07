import * as mongoose from "mongoose";
import { User }  from "../../../models/User.js";
import NextAuth, { getServerSession } from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider  from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongoConnect";
import bcrypt from 'bcrypt';

export const authOptions = {
  secret: process.env.NEXT_PUBLIC_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
      GoogleProvider({
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      }),
      CredentialsProvider({
        name: 'Credentials',
        id: 'credentials',
        credentials: {
          email: { label: "Email", type: "email", placeholder: "test@example.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          const email = credentials?.email;
          const password = credentials?.password;
        
          mongoose.connect(process.env.NEXT_PUBLIC_MONGOURL)
          const user = await User.findOne({email});
          const passwordOk = user && bcrypt.compareSync(password, user.password);

          console.log({user})

          
          if (passwordOk) {
            return user;
          }

          return null
        }
      })
    ],
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