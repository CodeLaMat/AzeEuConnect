import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "User routes working!" });
});

router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ Use ES6 Export
export default router;
