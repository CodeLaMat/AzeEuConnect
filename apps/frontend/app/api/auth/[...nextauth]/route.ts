import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          firstName: profile.given_name,
          lastName: profile.family_name,
          // location: Google doesn't typically provide location
        };
      },
    }),
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          }
        );

        const user = await res.json();
        if (!res.ok || !user.id) {
          throw new Error("Invalid credentials");
        }
        return user;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/signin",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const userEmail = user.email;
        const existingUser = await prisma.user.findUnique({
          where: { email: userEmail! },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: userEmail!,
              password: "",
              role: "customer",
              firstName: (user as any).firstName || null,
              lastName: (user as any).lastName || null,
            },
          });
        } else {
          await prisma.user.update({
            where: { email: userEmail! },
            data: {
              firstName: (user as any).firstName || existingUser.firstName,
              lastName: (user as any).lastName || existingUser.lastName,
            },
          });
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role || "customer";
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
