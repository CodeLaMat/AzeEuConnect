"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const multer_1 = __importDefault(require("multer"));
const authorize_1 = require("../middleware/authorize");
const authenticateUser_1 = require("../middleware/authenticateUser");
const db_1 = require("@packages/db");
//!!TODO: Add the authorize middleware to the routes that need RBAC
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
});
// GET /api/profile/:userId"
router.get("/profile/:userId", authenticateUser_1.authenticateUser, (0, authorize_1.authorizeMiddleware)(db_1.Action.MANAGE_PROFILE), userController_1.getUserProfile);
// PATCH /api/profile/updateprofile
router.patch("/profile/updateprofile", authenticateUser_1.authenticateUser, (0, authorize_1.authorizeMiddleware)(db_1.Action.MANAGE_PROFILE), upload.single("image"), userController_1.updateUserProfile);
exports.default = router;
