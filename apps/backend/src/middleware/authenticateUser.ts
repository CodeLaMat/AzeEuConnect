import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UserRole } from "@repo/db";

interface JwtPayload {
  id: string;
  role: UserRole;
  email: string;
}

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
      return;
    }

    const token = authHeader.split(" ")[1];

    console.log("🔑 Token received:", token);
    console.log("🧪 Decoded:", jwt.decode(token, { complete: true }));
    console.log("🔐 Secret used:", process.env.NEXTAUTH_SECRET);
    const decoded = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET!
    ) as JwtPayload;

    console.log("🧪 Decoded:", decoded);

    req.user = {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email,
    };

    next();
  } catch (error) {
    console.error("❌ Token verification failed", error);
    res.status(403).json({ message: "Forbidden: Invalid or expired token" });
  }
};
