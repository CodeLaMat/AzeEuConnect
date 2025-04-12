"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCompanyField = exports.updateSubscriptionField = exports.updateUserProfileField = exports.getUserById = exports.getAllUsers = void 0;
const db_1 = require("@packages/db");
// ✅ Get all users with profile and subscription
const getAllUsers = async (req, res) => {
    console.log("Fetching all users in Backend...");
    try {
        const users = await db_1.prisma.user.findMany({
            include: {
                profile: true,
                subscription: true,
                role: true,
            },
        });
        res.json(users);
    }
    catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
};
exports.getAllUsers = getAllUsers;
// ✅ Get user by ID with profile, subscription, and company details
const getUserById = async (req, res) => {
    try {
        const user = await db_1.prisma.user.findUnique({
            where: { id: req.params.id },
            include: {
                profile: true,
                subscription: true,
                role: true,
                companyDetails: true,
                services: true,
            },
        });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    }
    catch (err) {
        console.error("Error fetching user by ID:", err);
        res.status(500).json({ error: "Failed to fetch user" });
    }
};
exports.getUserById = getUserById;
// ✅ Update user profile field
const updateUserProfileField = async (req, res) => {
    console.log("Updating user profile field in backend...");
    const { userId } = req.params;
    const { fieldName, value } = req.body;
    console.log("Updating user profile field:", fieldName, value);
    if (!fieldName) {
        res.status(400).json({ error: "Field name is required" });
        return;
    }
    try {
        const updatedProfile = await db_1.prisma.profile.update({
            where: { userId },
            data: { [fieldName]: value },
        });
        res
            .status(200)
            .json({ updatedProfile, message: "Profile field updated successfully" });
        console.log("USER PROFILE UPDATED");
    }
    catch (err) {
        console.error("Error updating user profile field:", err);
        res.status(500).json({ error: "Failed to update profile field" });
    }
};
exports.updateUserProfileField = updateUserProfileField;
// ✅ Update user subscription field
const updateSubscriptionField = async (req, res) => {
    console.log("Updating user subscription field in backend...");
    const { userId } = req.params;
    const { value, fieldName } = req.body;
    try {
        const updatedSubscription = await db_1.prisma.subscription.update({
            where: { userId },
            data: { [fieldName]: value },
        });
        console.log("USER SUBSCRIPTION UPDATED");
        res.status(200).json({
            updatedSubscription,
            message: "Subscription field updated successfully",
        });
    }
    catch (err) {
        console.error("Error updating subscription field:", err);
        res.status(500).json({ error: "Failed to update subscription field" });
    }
};
exports.updateSubscriptionField = updateSubscriptionField;
// ✅ Update user company field
const updateCompanyField = async (req, res) => {
    console.log("Updating user company field in backend...");
    const { userId } = req.params;
    const { value, fieldName } = req.body;
    try {
        const updatedCompany = await db_1.prisma.company.update({
            where: { userId },
            data: { [fieldName]: value },
        });
        console.log("USER COMPANY UPDATED");
        res
            .status(200)
            .json({ updatedCompany, message: "Company field updated successfully" });
    }
    catch (err) {
        console.error("Error updating company field:", err);
        res.status(500).json({ error: "Failed to update company field" });
    }
};
exports.updateCompanyField = updateCompanyField;
