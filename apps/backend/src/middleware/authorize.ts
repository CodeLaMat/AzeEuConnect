import { Request, Response, NextFunction } from "express";
import { RolePermissions, Action } from "../lib/rbac";

export const authorizeMiddleware = (action: Action) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user;
    if (!user || !user.role) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // If user.role is an object, extract the name property; otherwise, use it directly
    const roleName =
      typeof user.role === "object" && user.role !== null && "name" in user.role
        ? (user.role as { name: string }).name
        : user.role;

    const allowedActions =
      RolePermissions[roleName as keyof typeof RolePermissions] || [];

    if (allowedActions.includes("ALL") || allowedActions.includes(action)) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden: Access denied" });
    }
  };
};
