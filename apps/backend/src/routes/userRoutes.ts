import { Router } from "express";
import {
  registerUser,
  loginUser,
  requestPasswordReset,
  resetPassword,
} from "../controllers/userController";

//!!TODO: Add the authorize middleware to the routes that need RBAC

const router = Router();

// POST /api/auth/register
router.post("/register", registerUser);

// POST /api/auth/login
router.post("/login", loginUser);

// POST /api/auth/reset-password
router.post("/reset-password", resetPassword);

// POST /api/auth/request-password-reset
router.post("/request-password-reset", requestPasswordReset);

export default router;
