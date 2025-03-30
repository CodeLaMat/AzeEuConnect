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

const router = express.Router();

// ✅ Users
router.get("/users", authenticateUser, authorizeMiddleware("ALL"), getAllUsers);
router.get(
  "/users/:id",
  authenticateUser,
  authorizeMiddleware("ALL"),
  getUserById
);
router.patch(
  "/users/:userId/profile",
  authenticateUser,
  authorizeMiddleware("ALL"),
  updateUserProfileField
);
router.patch(
  "/users/:userId/subscription",
  authenticateUser,
  authorizeMiddleware("ALL"),
  updateSubscriptionField
);
router.patch(
  "/users/:userId/company",
  authenticateUser,
  authorizeMiddleware("ALL"),
  updateCompanyField
);

export default router;
