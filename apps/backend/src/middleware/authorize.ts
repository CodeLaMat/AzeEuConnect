import { Request, Response, NextFunction } from "express";
import { RolePermissions, Action } from "../lib/rbac";

export const authorizeMiddleware = (action: Action) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user;

    if (!user || !user.role) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const allowedActions =
      RolePermissions[user.role as keyof typeof RolePermissions] || [];

    if (allowedActions.includes("ALL") || allowedActions.includes(action)) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden: Access denied" });
    }
  };
};
