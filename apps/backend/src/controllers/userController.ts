import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import { prisma } from "@packages/db";
import crypto from "crypto";
import { sendEmail } from "../lib/sendEmail";

/**
 * Register a new user
 */
export const registerUser: RequestHandler = async (
  req,
  res,
  next
): Promise<void> => {
  try {
    const {
      email,
      password,
      roleName,
      firstName,
      lastName,
      location,
      phone,
      nationality,
      timezone,
      preferredLanguage,
    } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const role = await prisma.role.findUnique({
      where: { name: roleName || "CUSTOMER" },
    });
    if (!role) {
      res.status(400).json({ message: "Role not found" });
      return;
    }

    const newUser = await prisma.user.create({
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
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Registration failed" });
    next(error);
  }
};

/**
 * User Login
 */
export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Convert email to lowercase to prevent case-sensitive mismatches
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: { profile: true, role: true },
    });

    if (!user) {
      console.error("❌ User not found:", email);
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    console.log("🔹 Found User:", user.email);

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error("❌ Password mismatch for:", email);
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Update the lastLogin field to the current date/time
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
      include: { profile: true, role: true },
    });

    const responsePayload = {
      id: updatedUser.id,
      email: updatedUser.email,
      role: updatedUser.role,
      currentRole: updatedUser.currentRole,
      image: updatedUser.profile?.image ?? null,
      firstName: updatedUser.profile?.firstName ?? "",
      lastName: updatedUser.profile?.lastName ?? "",
      phone: updatedUser.profile?.phone ?? "",
      location: updatedUser.profile?.location ?? "",
      nationality: updatedUser.profile?.nationality ?? "",
      timezone: updatedUser.profile?.timezone ?? "UTC",
      preferredLanguage: updatedUser.profile?.preferredLanguage ?? "AZ",
      profile: updatedUser.profile,
      membership: null,
    };

    console.log("✅ Returning user response:", responsePayload);
    res.status(200).json(responsePayload);
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Something went wrong" });
    next(error);
  }
};

export const requestPasswordReset: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (!user) {
      res.status(404).json({ message: "No user with that email" });
      return;
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);

    await prisma.user.update({
      where: { email: email.toLowerCase() },
      data: { resetToken, resetTokenExpiry },
    });

    const userWithProfile = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: { profile: true },
    });

    const preferredLanguage =
      userWithProfile?.profile?.preferredLanguage || "en";
    const resetLink = `http://localhost:3000/${preferredLanguage.toLowerCase()}/reset-password?token=${resetToken}`;

    await sendEmail(
      user.email,
      "Password Reset Request",
      `<p>Hello,</p><p>You requested to reset your password. Click the link below to set a new one:</p><a href="${resetLink}">${resetLink}</a><p>This link will expire in 1 hour.</p>`
    );

    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error("Request Reset Error:", error);
    res.status(500).json({ message: "Failed to send reset link" });
    next(error);
  }
};

export const resetPassword: RequestHandler = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: { gt: new Date() },
      },
    });

    if (!user) {
      res.status(400).json({ message: "Invalid or expired token" });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Failed to reset password" });
    next(error);
  }
};

export const updateUserProfile: RequestHandler = async (req, res, next) => {
  try {
    const {
      userId,
      firstName,
      lastName,
      location,
      phone,
      nationality,
      timezone,
      preferredLanguage,
    } = req.body;

    const file = req.file;
    const { image } = req.body;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const updateData: any = {
      firstName,
      lastName,
      location,
      phone,
      nationality,
      timezone,
      preferredLanguage,
    };

    if (image === "") updateData.image = null;
    if (file)
      updateData.image = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

    const updatedProfile = await prisma.profile.update({
      where: { userId },
      data: updateData,
    });

    res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Profile Update Error:", error);
    next(error);
  }
};

export const getUserProfile: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        subscription: true,
        companyDetails: true,
        serviceSubscriptions: true,
        reviews: true,
        role: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const switchUserRole: RequestHandler = async (req, res, next) => {
  try {
    const { userId, newRole } = req.body;

    if (!["CUSTOMER", "SERVICE_PROVIDER"].includes(newRole)) {
      res.status(400).json({ message: "Invalid role selected" });
      return;
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { currentRole: newRole },
      include: { profile: true, role: true },
    });

    res.status(200).json({
      message: `Switched to ${newRole}`,
      currentRole: updatedUser.currentRole,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Switch Role Error:", error);
    res.status(500).json({ message: "Failed to switch role" });
    next(error);
  }
};
