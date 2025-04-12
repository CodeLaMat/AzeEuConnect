"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roleController_1 = require("../controllers/roleController");
const authenticateUser_1 = require("@/middleware/authenticateUser");
const authorize_1 = require("@/middleware/authorize");
const db_1 = require("@packages/db");
const router = (0, express_1.Router)();
// Routes for role management
router.get("/roles", authenticateUser_1.authenticateUser, (0, authorize_1.authorizeMiddleware)("ALL"), roleController_1.getAllRoles);
router.post("/roles", authenticateUser_1.authenticateUser, (0, authorize_1.authorizeMiddleware)("ALL"), roleController_1.createRole);
router.delete("/roles/:id", authenticateUser_1.authenticateUser, (0, authorize_1.authorizeMiddleware)(db_1.Action.ALL), roleController_1.deleteRole);
// Routes for permission management
router.get("/permissions", authenticateUser_1.authenticateUser, (0, authorize_1.authorizeMiddleware)(db_1.Action.ALL), roleController_1.getAllPermissions);
router.post("/permissions", authenticateUser_1.authenticateUser, (0, authorize_1.authorizeMiddleware)(db_1.Action.ALL), roleController_1.createPermission);
router.delete("/permissions/:id", authenticateUser_1.authenticateUser, (0, authorize_1.authorizeMiddleware)(db_1.Action.ALL), roleController_1.deletePermission);
// Routes for assigning permissions and updating user role
router.post("/roles/:roleId/assign-permissions", authenticateUser_1.authenticateUser, (0, authorize_1.authorizeMiddleware)(db_1.Action.ALL), roleController_1.assignPermissionsToRole);
router.patch("/users/:userId/role", authenticateUser_1.authenticateUser, (0, authorize_1.authorizeMiddleware)(db_1.Action.ALL), roleController_1.updateUserRole);
exports.default = router;
