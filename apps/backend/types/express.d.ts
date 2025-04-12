import { UserRole } from "@packages/db";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: UserRole;
        email?: string;
      };
    }
  }
}

export {};
