import { Router } from "express";
import {
  registerUser,
  loginUser,
  updateUserProfile,
  requestPasswordReset,
  resetPassword,
} from "../controllers/userController";

const router = Router();

// POST /api/auth/register
router.post("/register", registerUser);

// POST /api/auth/login
router.post("/login", loginUser);

// PATCH /api/auth/profile
router.patch("/updateprofile", updateUserProfile);

// POST /api/auth/reset-password
router.post("/reset-password", resetPassword);

// POST /api/auth/request-password-reset
router.post("/request-password-reset", requestPasswordReset);

export default router;
