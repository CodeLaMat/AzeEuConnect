import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    id?: string;
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
    profile?: {
      firstName?: string;
      lastName?: string;
      location?: string;
      image?: string;
    };
  }

  interface Session {
    user?: {
      id?: string;
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
      profile?: {
        firstName?: string;
        lastName?: string;
        location?: string;
        image?: string;
      };
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
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
    profile?: {
      firstName?: string;
      lastName?: string;
      location?: string;
      image?: string;
    };
  }
}
