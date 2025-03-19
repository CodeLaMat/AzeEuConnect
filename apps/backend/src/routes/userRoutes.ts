import { Router } from "express";
import {
  registerUser,
  loginUser,
  updateUserProfile,
} from "../controllers/userController";

const router = Router();

// POST /api/auth/register
router.post("/register", registerUser);

// POST /api/auth/login
router.post("/login", loginUser);

// PATCH /api/auth/profile
router.patch("/profile", updateUserProfile);

export default router;
