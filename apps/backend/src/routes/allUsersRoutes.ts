import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUserProfileField,
  updateSubscriptionField,
  updateCompanyField,
} from "@/controllers/usersController";

import { authenticateUser } from "@/middleware/authenticateUser";
import { authorizeMiddleware } from "@/middleware/authorize";
import { Action } from "@repo/db";

const router = express.Router();

// ✅ Users
router.get("/users", authenticateUser, authorizeMiddleware("ALL"), getAllUsers);
router.get(
  "/users/:id",
  authenticateUser,
  authorizeMiddleware(Action.ALL),
  getUserById
);
router.patch(
  "/users/:userId/profile",
  authenticateUser,
  authorizeMiddleware(Action.ALL),
  updateUserProfileField
);
router.patch(
  "/users/:userId/subscription",
  authenticateUser,
  authorizeMiddleware(Action.ALL),
  updateSubscriptionField
);
router.patch(
  "/users/:userId/company",
  authenticateUser,
  authorizeMiddleware(Action.ALL),
  updateCompanyField
);

export default router;
