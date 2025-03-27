import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UserRole } from "@prisma/client";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as {
      id: string;
      role: string;
      email: string;
    };

    req.user = {
      id: decoded.id,
      role: decoded.role as UserRole,
    };

    next();
  } catch (error) {
    console.error("❌ Token verification failed", error);
    res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};
