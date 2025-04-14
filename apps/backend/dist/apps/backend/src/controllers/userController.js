"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchUserRole = exports.getUserProfile = exports.updateUserProfile = exports.resetPassword = exports.requestPasswordReset = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("@packages/db");
const crypto_1 = __importDefault(require("crypto"));
const sendEmail_1 = require("../lib/sendEmail");
const generateSessionToken = () => {
    // Generates a secure random session token
    return require("crypto").randomBytes(32).toString("hex");
};
/**
 * Register a new user
 */
// This function handles user registration by creating a new user in the database
const registerUser = async (req, res, next) => {
    try {
        const { email, password, roleName, firstName, lastName, location, phone, nationality, timezone, preferredLanguage, } = req.body;
        const existingUser = await db_1.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(409).json({ message: "User already exists" });
            return;
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const role = await db_1.prisma.role.findUnique({
            where: { name: roleName || "CUSTOMER" },
        });
        if (!role) {
            res.status(400).json({ message: "Role not found" });
            return;
        }
        const newUser = await db_1.prisma.user.create({
            data: {
                email: email.toLowerCase(),
                password: hashedPassword,
                roleId: role.id,
                currentRole: role.name,
                profile: {
                    create: {
                        firstName,
                        lastName,
                        location: location || "",
                        phone: phone || "",
                        nationality: nationality || "",
                        timezone: timezone || "UTC",
                        preferredLanguage: preferredLanguage || "AZ",
                    },
                },
            },
            include: { profile: true, role: true },
        });
        res.status(201).json({
            id: newUser.id,
            email: newUser.email,
            role: newUser.role,
            profile: newUser.profile,
        });
    }
    catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Registration failed" });
        next(error);
    }
};
exports.registerUser = registerUser;
/**
 * User Login
 */
// This function handles user login by verifying the email and password provided in the request body
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await db_1.prisma.user.findUnique({
            where: { email: email.toLowerCase() },
            include: { profile: true, role: true },
        });
        if (!user) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        await db_1.prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() },
        });
        const responsePayload = {
            id: user.id,
            email: user.email,
            role: user.role?.name,
            currentRole: user.currentRole,
            image: user.profile?.image ?? null,
            firstName: user.profile?.firstName ?? "",
            lastName: user.profile?.lastName ?? "",
            phone: user.profile?.phone ?? "",
            location: user.profile?.location ?? "",
            nationality: user.profile?.nationality ?? "",
            timezone: user.profile?.timezone ?? "UTC",
            preferredLanguage: user.profile?.preferredLanguage ?? "AZ",
            profile: user.profile,
            membership: null,
        };
        res.status(200).json(responsePayload);
    }
    catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({ message: "Something went wrong" });
        next(error);
    }
};
exports.loginUser = loginUser;
// Request Password Reset
// This function handles the password reset request by generating a token and sending an email to the user
const requestPasswordReset = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await db_1.prisma.user.findUnique({
            where: { email: email.toLowerCase() },
        });
        if (!user) {
            res.status(404).json({ message: "No user with that email" });
            return;
        }
        const resetToken = crypto_1.default.randomBytes(32).toString("hex");
        const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);
        await db_1.prisma.user.update({
            where: { email: email.toLowerCase() },
            data: { resetToken, resetTokenExpiry },
        });
        const userWithProfile = await db_1.prisma.user.findUnique({
            where: { email: email.toLowerCase() },
            include: { profile: true },
        });
        const preferredLanguage = userWithProfile?.profile?.preferredLanguage || "en";
        const resetLink = `http://localhost:3000/${preferredLanguage.toLowerCase()}/reset-password?token=${resetToken}`;
        await (0, sendEmail_1.sendEmail)(user.email, "Password Reset Request", `<p>Hello,</p><p>You requested to reset your password. Click the link below to set a new one:</p><a href="${resetLink}">${resetLink}</a><p>This link will expire in 1 hour.</p>`);
        res.status(200).json({ message: "Password reset link sent to your email" });
    }
    catch (error) {
        console.error("Request Reset Error:", error);
        res.status(500).json({ message: "Failed to send reset link" });
        next(error);
    }
};
exports.requestPasswordReset = requestPasswordReset;
// Reset Password
// This function resets the password based on the token and new password provided in the request body
const resetPassword = async (req, res, next) => {
    try {
        const { token, newPassword } = req.body;
        const user = await db_1.prisma.user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpiry: { gt: new Date() },
            },
        });
        if (!user) {
            res.status(400).json({ message: "Invalid or expired token" });
            return;
        }
        const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
        await db_1.prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null,
            },
        });
        res.status(200).json({ message: "Password has been reset successfully" });
    }
    catch (error) {
        console.error("Reset Password Error:", error);
        res.status(500).json({ message: "Failed to reset password" });
        next(error);
    }
};
exports.resetPassword = resetPassword;
// Update User Profile
// This function updates the user profile based on the userId provided in the request body
const updateUserProfile = async (req, res, next) => {
    try {
        const { userId, firstName, lastName, location, phone, nationality, timezone, preferredLanguage, } = req.body;
        const file = req.file;
        const { image } = req.body;
        const user = await db_1.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const updateData = {
            firstName,
            lastName,
            location,
            phone,
            nationality,
            timezone,
            preferredLanguage,
        };
        if (image === "")
            updateData.image = null;
        if (file)
            updateData.image = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
        const updatedProfile = await db_1.prisma.profile.update({
            where: { userId },
            data: updateData,
        });
        res.status(200).json({
            message: "Profile updated successfully",
            profile: updatedProfile,
        });
    }
    catch (error) {
        console.error("Profile Update Error:", error);
        next(error);
    }
};
exports.updateUserProfile = updateUserProfile;
//  Get User Profile
// This function retrieves the user profile based on the userId provided in the request parameters
const getUserProfile = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await db_1.prisma.user.findUnique({
            where: { id: userId },
            include: {
                profile: true,
                subscription: true,
                companyDetails: true,
                serviceSubscriptions: true,
                reviews: true,
                role: true,
                paidInvoices: true,
                receivedInvoices: true,
            },
        });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getUserProfile = getUserProfile;
// Switch User Role
// This function allows a user to switch a  role between CUSTOMER and SERVICE_PROVIDER
const switchUserRole = async (req, res, next) => {
    try {
        const { userId, newRole } = req.body;
        if (!["CUSTOMER", "SERVICE_PROVIDER"].includes(newRole)) {
            res.status(400).json({ message: "Invalid role selected" });
            return;
        }
        const user = await db_1.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const updatedUser = await db_1.prisma.user.update({
            where: { id: userId },
            data: { currentRole: newRole },
            include: { profile: true, role: true },
        });
        res.status(200).json({
            message: `Switched to ${newRole}`,
            currentRole: updatedUser.currentRole,
            user: updatedUser,
        });
    }
    catch (error) {
        console.error("Switch Role Error:", error);
        res.status(500).json({ message: "Failed to switch role" });
        next(error);
    }
};
exports.switchUserRole = switchUserRole;
