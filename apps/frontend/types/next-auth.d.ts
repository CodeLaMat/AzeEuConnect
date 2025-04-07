import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";
import { UserRole } from "@prisma/client"; // ✅ Import UserRole enum

declare module "next-auth" {
  interface User extends DefaultUser {
    id?: string;
    role?: UserRole; // ✅ Use Prisma Enum
    email?: string;
    phone?: string;
    location?: string;
    nationality?: string;
    image?: string;
    timezone?: string;
    preferredLanguage?: string;
    profile?: {
      firstName?: string;
      lastName?: string;
      location?: string;
      image?: string;
      phone?: string;
      nationality?: string;
      timezone?: string;
      preferredLanguage?: string;
    };
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
      id?: string;
      role?: UserRole;
      currentRole?: UserRole;
      email?: string;
      phone?: string;
      firstName?: string;
      lastName?: string;
      location?: string;
      image?: string;
      nationality?: string;
      timezone?: string;
      preferredLanguage?: string;
      profile?: {
        firstName?: string;
        lastName?: string;
        location?: string;
        image?: string;
        phone?: string;
        nationality?: string;
        timezone?: string;
        preferredLanguage?: string;
      };
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
    id?: string;
    role?: UserRole;
    currentRole?: UserRole;
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    location?: string;
    image?: string;
    nationality?: string;
    timezone?: string;
    preferredLanguage?: string;
    profile?: {
      firstName?: string;
      lastName?: string;
      location?: string;
      image?: string;
      phone?: string;
      nationality?: string;
      timezone?: string;
      preferredLanguage?: string;
    };
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
