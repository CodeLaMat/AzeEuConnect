import { Router } from "express";
import {
  updateUserProfile,
  getUserProfile,
} from "../controllers/userController";
import multer from "multer";
import { authorizeMiddleware } from "../middleware/authorize";

//!!TODO: Add the authorize middleware to the routes that need RBAC

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// GET /api/profile/:userId"
router.get(
  "/profile/:userId",
  authorizeMiddleware("MANAGE_PROFILE"),
  getUserProfile
);
// PATCH /api/profile/updateprofile
router.patch(
  "/profile/updateprofile",
  upload.single("image"),
  authorizeMiddleware("MANAGE_PROFILE"),
  updateUserProfile
);

export default router;
