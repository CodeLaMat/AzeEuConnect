import { Router } from "express";
import {
  getAllRoles,
  getAllPermissions,
  createRole,
  createPermission,
  assignPermissionsToRole,
  updateUserRole,
  deleteRole,
  deletePermission,
} from "../controllers/roleController";
import { authenticateUser } from "@/middleware/authenticateUser";
import { authorizeMiddleware } from "@/middleware/authorize";
import { Action } from "@packages/db";

const router = Router();

// Routes for role management
router.get("/roles", authenticateUser, authorizeMiddleware("ALL"), getAllRoles);
router.post("/roles", authenticateUser, authorizeMiddleware("ALL"), createRole);
router.delete(
  "/roles/:id",
  authenticateUser,
  authorizeMiddleware(Action.ALL),
  deleteRole
);

// Routes for permission management
router.get(
  "/permissions",
  authenticateUser,
  authorizeMiddleware(Action.ALL),
  getAllPermissions
);
router.post(
  "/permissions",
  authenticateUser,
  authorizeMiddleware(Action.ALL),
  createPermission
);
router.delete(
  "/permissions/:id",
  authenticateUser,
  authorizeMiddleware(Action.ALL),
  deletePermission
);

// Routes for assigning permissions and updating user role
router.post(
  "/roles/:roleId/assign-permissions",
  authenticateUser,
  authorizeMiddleware(Action.ALL),
  assignPermissionsToRole
);
router.patch(
  "/users/:userId/role",
  authenticateUser,
  authorizeMiddleware(Action.ALL),
  updateUserRole
);

export default router;
