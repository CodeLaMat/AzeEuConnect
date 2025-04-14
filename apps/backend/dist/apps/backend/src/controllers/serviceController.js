"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteServiceListing = exports.updateServiceListing = exports.getAllServiceListings = exports.createServiceListing = void 0;
const db_1 = require("@packages/db");
// Create a new service listing
const createServiceListing = async (req, res) => {
    try {
        const { title, description, category, subCategory, price, country, image } = req.body;
        const newServiceListing = await db_1.prisma.serviceListing.create({
            data: {
                title,
                description,
                category,
                subCategory,
                price,
                country,
                image,
                ownerId: req.user?.id ??
                    (() => {
                        throw new Error("User is not authenticated");
                    })(),
            },
        });
        res.status(201).json(newServiceListing);
    }
    catch (error) {
        console.error("❌ Service creation failed:", error);
        res.status(500).json({ message: "Failed to create service" });
    }
};
exports.createServiceListing = createServiceListing;
// Get all service listings
const getAllServiceListings = async (req, res) => {
    try {
        const serviceListings = await db_1.prisma.serviceListing.findMany({
            include: {
                packages: true,
                owner: {
                    select: {
                        id: true,
                        email: true,
                        profile: true,
                    },
                },
            },
        });
        res.status(200).json(serviceListings);
    }
    catch (error) {
        console.error("❌ Failed to fetch service listings:", error);
        res.status(500).json({ message: "Failed to fetch services" });
    }
};
exports.getAllServiceListings = getAllServiceListings;
// Update a service listing
const updateServiceListing = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, category, subCategory, price, country, image } = req.body;
        const updatedServiceListing = await db_1.prisma.serviceListing.update({
            where: { id },
            data: {
                title,
                description,
                category,
                subCategory,
                price,
                country,
                image,
            },
        });
        res.status(200).json(updatedServiceListing);
    }
    catch (error) {
        console.error("❌ Service update failed:", error);
        res.status(500).json({ message: "Failed to update service" });
    }
};
exports.updateServiceListing = updateServiceListing;
// Delete a service listing
const deleteServiceListing = async (req, res) => {
    try {
        const { id } = req.params;
        await db_1.prisma.serviceListing.delete({
            where: { id },
        });
        res.status(200).json({ message: "Service listing deleted successfully" });
    }
    catch (error) {
        console.error("❌ Service deletion failed:", error);
        res.status(500).json({ message: "Failed to delete service" });
    }
};
exports.deleteServiceListing = deleteServiceListing;
