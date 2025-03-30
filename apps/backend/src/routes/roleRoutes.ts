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

const router = Router();

// Routes for role management
router.get("/roles", authenticateUser, authorizeMiddleware("ALL"), getAllRoles);
router.post("/roles", authenticateUser, authorizeMiddleware("ALL"), createRole);
router.delete(
  "/roles/:id",
  authenticateUser,
  authorizeMiddleware("ALL"),
  deleteRole
);

// Routes for permission management
router.get(
  "/permissions",
  authenticateUser,
  authorizeMiddleware("ALL"),
  getAllPermissions
);
router.post(
  "/permissions",
  authenticateUser,
  authorizeMiddleware("ALL"),
  createPermission
);
router.delete(
  "/permissions/:id",
  authenticateUser,
  authorizeMiddleware("ALL"),
  deletePermission
);

// Routes for assigning permissions and updating user role
router.post(
  "/roles/:roleId/assign-permissions",
  authenticateUser,
  authorizeMiddleware("ALL"),
  assignPermissionsToRole
);
router.patch(
  "/users/:userId/role",
  authenticateUser,
  authorizeMiddleware("ALL"),
  updateUserRole
);

export default router;
