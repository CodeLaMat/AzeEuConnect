"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serviceController_1 = require("../controllers/serviceController");
const authenticateUser_1 = require("@/middleware/authenticateUser");
const authorize_1 = require("@/middleware/authorize");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
// Route to create a new service listing
router.post("/services", authenticateUser_1.authenticateUser, (0, authorize_1.authorizeMiddleware)(client_1.Action.POST_SERVICE), serviceController_1.createServiceListing);
// Route to get all service listings
router.get("/services", 
// authenticateUser,
// authorizeMiddleware(Action.VIEW_SERVICE_LISTINGS),
serviceController_1.getAllServiceListings);
// Route to update a service listing
router.patch("/services/:id", authenticateUser_1.authenticateUser, (0, authorize_1.authorizeMiddleware)(client_1.Action.MANAGE_ORDERS), serviceController_1.updateServiceListing);
// Route to delete a service listing
router.delete("/services/:id", authenticateUser_1.authenticateUser, (0, authorize_1.authorizeMiddleware)(client_1.Action.MANAGE_ORDERS), serviceController_1.deleteServiceListing);
exports.default = router;
