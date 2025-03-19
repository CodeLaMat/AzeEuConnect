import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

/**
 * Extend default NextAuth interfaces to include custom user fields like:
 * - role
 * - membership
 * - firstName
 * - lastName
 * - location
 */

declare module "next-auth" {
  interface User extends DefaultUser {
    role?: string;
    firstName?: string;
    lastName?: string;
    location?: string;

    membership?: {
      status: string;
      plan: string;
      expiration: string;
      createdAt: string;
      updatedAt: string;
      subscriptionId: string;
      planId: string;
    };
  }

  interface Session {
    user?: {
      role?: string;
      firstName?: string;
      lastName?: string;
      location?: string;

      membership?: {
        status: string;
        plan: string;
        expiration: string;
        createdAt: string;
        updatedAt: string;
        subscriptionId: string;
        planId: string;
      };
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    firstName?: string;
    lastName?: string;
    location?: string;

    membership?: {
      status: string;
      plan: string;
      expiration: string;
      createdAt: string;
      updatedAt: string;
      subscriptionId: string;
      planId: string;
    };
  }
}
