"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = require("@/controllers/usersController");
const authenticateUser_1 = require("@/middleware/authenticateUser");
const authorize_1 = require("@/middleware/authorize");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
// ✅ Users
router.get("/users", authenticateUser_1.authenticateUser, (0, authorize_1.authorizeMiddleware)("ALL"), usersController_1.getAllUsers);
router.get("/users/:id", authenticateUser_1.authenticateUser, (0, authorize_1.authorizeMiddleware)(client_1.Action.ALL), usersController_1.getUserById);
router.patch("/users/:userId/profile", authenticateUser_1.authenticateUser, (0, authorize_1.authorizeMiddleware)(client_1.Action.ALL), usersController_1.updateUserProfileField);
router.patch("/users/:userId/subscription", authenticateUser_1.authenticateUser, (0, authorize_1.authorizeMiddleware)(client_1.Action.ALL), usersController_1.updateSubscriptionField);
router.patch("/users/:userId/company", authenticateUser_1.authenticateUser, (0, authorize_1.authorizeMiddleware)(client_1.Action.ALL), usersController_1.updateCompanyField);
exports.default = router;
