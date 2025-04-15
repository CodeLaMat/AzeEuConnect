import { Router } from "express";
import {
  createServiceListing,
  getAllServiceListings,
  updateServiceListing,
  deleteServiceListing,
} from "../controllers/serviceController";
import { authenticateUser } from "@/middleware/authenticateUser";
import { authorizeMiddleware } from "@/middleware/authorize";
import { Action } from "@repo/db";

const router = Router();

// Route to create a new service listing
router.post(
  "/services",
  authenticateUser,
  authorizeMiddleware(Action.POST_SERVICE),
  createServiceListing
);

// Route to get all service listings
router.get(
  "/services",
  // authenticateUser,
  // authorizeMiddleware(Action.VIEW_SERVICE_LISTINGS),
  getAllServiceListings
);

// Route to update a service listing
router.patch(
  "/services/:id",
  authenticateUser,
  authorizeMiddleware(Action.MANAGE_ORDERS),
  updateServiceListing
);

// Route to delete a service listing
router.delete(
  "/services/:id",
  authenticateUser,
  authorizeMiddleware(Action.MANAGE_ORDERS),
  deleteServiceListing
);

export default router;
