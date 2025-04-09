import { Request, Response } from "express";
import { prisma } from "@packages/db";

// Controller functions for services

// Create a new service listing
export const createServiceListing = async (req: Request, res: Response) => {
  try {
    const { title, description, category, price, serviceType } = req.body;

    const newServiceListing = await prisma.serviceListing.create({
      data: {
        title,
        description,
        category,
        price,
        serviceType,
        country: req.body.country,
        ownerId:
          req.user?.id ??
          (() => {
            throw new Error("User is not authenticated");
          })(),
      },
    });

    res.status(201).json(newServiceListing);
  } catch (error) {
    console.error("❌ Service creation failed:", error);
    res.status(500).json({ message: "Failed to create service" });
  }
};

// Get all service listings
export const getAllServiceListings = async (req: Request, res: Response) => {
  try {
    const serviceListings = await prisma.serviceListing.findMany();
    res.status(200).json(serviceListings);
  } catch (error) {
    console.error("❌ Failed to fetch service listings:", error);
    res.status(500).json({ message: "Failed to fetch services" });
  }
};

// Update a service listing
export const updateServiceListing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, category, price, serviceType } = req.body;

    const updatedServiceListing = await prisma.serviceListing.update({
      where: { id },
      data: {
        title,
        description,
        category,
        price,
        serviceType,
      },
    });

    res.status(200).json(updatedServiceListing);
  } catch (error) {
    console.error("❌ Service update failed:", error);
    res.status(500).json({ message: "Failed to update service" });
  }
};

// Delete a service listing
export const deleteServiceListing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.serviceListing.delete({
      where: { id },
    });

    res.status(200).json({ message: "Service listing deleted successfully" });
  } catch (error) {
    console.error("❌ Service deletion failed:", error);
    res.status(500).json({ message: "Failed to delete service" });
  }
};
