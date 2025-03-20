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
          image: profile.picture,
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
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const userEmail = user.email;
        const existingUser = await prisma.user.findUnique({
          where: { email: userEmail! },
          include: { profile: true },
        });

        if (!existingUser) {
          const createdUser = await prisma.user.create({
            data: {
              email: userEmail!,
              password: "",
              role: "customer",
              profile: {
                create: {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  location: "",
                  image: (user as any).image,
                },
              },
            },
            include: { profile: true },
          });
          (user as any).id = createdUser.id;
          (user as any).profile = createdUser.profile;
        } else {
          let updatedProfile;
          if (existingUser.profile) {
            updatedProfile = await prisma.profile.update({
              where: { userId: existingUser.id },
              data: {
                firstName: user.firstName,
                lastName: user.lastName,
                image: (user as any).image,
              },
            });
          } else {
            updatedProfile = await prisma.profile.create({
              data: {
                firstName: user.firstName,
                lastName: user.lastName,
                image: (user as any).image,
                location: "",
                user: { connect: { id: existingUser.id } },
              },
            });
          }
          (user as any).id = existingUser.id;
          (user as any).profile = updatedProfile;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role || "customer";
        token.profile = (user as any).profile || null;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.profile = token.profile;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
