import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma, UserRole } from "@packages/db";
import jwt from "jsonwebtoken";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        console.log("🔍 Google profile received:", profile);
        return {
          id: profile.sub,
          email: profile.email,
          firstName: profile.given_name,
          lastName: profile.family_name,
          image: profile.picture,
        };
      },
    }),

    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          }
        );

        const user = await response.json();

        if (!response.ok || !user.id) {
          console.error("❌ Login failed:", user);
          return null;
        }

        // ✅ Return full user object (not wrapped inside custom)
        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/signin",
    error: "/auth/error",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
          include: { profile: true, subscription: true },
        });

        let fullUser = existingUser;

        if (!existingUser) {
          fullUser = await prisma.user.create({
            data: {
              email: user.email!,
              password: "",
              role: UserRole.USER,
              profile: {
                create: {
                  firstName: (user as any).firstName || "",
                  lastName: (user as any).lastName || "",
                  image: user.image || "",
                  timezone: "UTC",
                  preferredLanguage: "AZ",
                },
              },
            },
            include: { profile: true, subscription: true },
          });
        }

        // ✅ Return custom user object via `user` to `jwt()`
        (user as any).custom = {
          id: fullUser?.id,
          email: fullUser?.email,
          role: fullUser?.role,
          image: fullUser?.profile?.image,
          firstName: fullUser?.profile?.firstName,
          lastName: fullUser?.profile?.lastName,
          timezone: fullUser?.profile?.timezone,
          preferredLanguage: fullUser?.profile?.preferredLanguage,
          profile: fullUser?.profile,
          membership: fullUser?.subscription
            ? {
                status: fullUser.subscription.paymentStatus,
                plan: fullUser.subscription.plan,
                expiration:
                  fullUser.subscription.nextBillingDate?.toISOString(),
                subscriptionId: fullUser.subscription.id,
                planId: fullUser.subscription.plan,
              }
            : undefined,
        };
      }

      return true;
    },
    async jwt({ token, user }) {
      const customUser = (user as any)?.custom || user;

      if (customUser) {
        token.id = customUser.id;
        token.email = customUser.email;
        token.role = customUser.role;
        token.preferredLanguage = customUser.preferredLanguage ?? undefined;
        token.firstName = customUser.firstName;
        token.lastName = customUser.lastName;
        token.membership = customUser.membership ?? undefined;

        // ✅ Generate signed JWT for backend auth
        token.jwtToken = jwt.sign(
          {
            id: customUser.id,
            email: customUser.email,
            role: customUser.role,
          },
          process.env.NEXTAUTH_SECRET!,
          { expiresIn: "1h" }
        );
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          role: token.role,
          image: token.image,
          firstName: token.firstName,
          lastName: token.lastName,
          phone: token.phone,
          location: token.location,
          nationality: token.nationality,
          timezone: token.timezone,
          preferredLanguage: token.preferredLanguage,
          profile: token.profile,
          membership: token.membership,
        };

        (session as any).jwtToken = token.jwtToken;
      }

      return session;
    },
  },

  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
