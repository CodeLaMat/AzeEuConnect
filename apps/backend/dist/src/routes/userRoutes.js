"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
//!!TODO: Add the authorize middleware to the routes that need RBAC
const router = (0, express_1.Router)();
// POST /api/auth/register
router.post("/register", userController_1.registerUser);
// POST /api/auth/login
router.post("/login", userController_1.loginUser);
// POST /api/auth/reset-password
router.post("/reset-password", userController_1.resetPassword);
// POST /api/auth/request-password-reset
router.post("/request-password-reset", userController_1.requestPasswordReset);
// POST /api/auth/switch-role
router.post("/switch-role", userController_1.switchUserRole);
exports.default = router;
