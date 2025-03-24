import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import { prisma } from "@packages/db";
import crypto from "crypto";
import { sendEmail } from "../lib/sendEmail";

// Ensure role matches Prisma enum UserRole
enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  CONSULTANT = "CONSULTANT",
  LEGAL_ADVISOR = "LEGAL_ADVISOR",
  SUPPORT_AGENT = "SUPPORT_AGENT",
  REGULATORY_OFFICER = "REGULATORY_OFFICER",
}

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
      role,
      firstName,
      lastName,
      location,
      phone,
      nationality,
      timezone,
      preferredLanguage,
    } = req.body;

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with profile
    const newUser = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        role: role || UserRole.USER,
        profile: {
          create: {
            firstName: firstName,
            lastName: lastName,
            location: location || "",
            phone: phone || "",
            nationality: nationality || "",
            timezone: timezone || "UTC",
            preferredLanguage: preferredLanguage || "AZ",
          },
        },
      },
      include: { profile: true },
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

    console.log("🔍 Logging in user:", email, password);

    // Convert email to lowercase to prevent case-sensitive mismatches
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: { profile: true },
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

    const responsePayload = {
      id: user.id,
      email: user.email,
      role: user.role,
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

    console.log("✅ Returning user response:", responsePayload);

    res.status(200).json(responsePayload);
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Something went wrong" });
    next(error);
  }
};

// Request password reset
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
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

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
      `<p>Hello,</p>
       <p>You requested to reset your password. Click the link below to set a new one:</p>
       <a href="${resetLink}">${resetLink}</a>
       <p>This link will expire in 1 hour.</p>`
    );

    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error("Request Reset Error:", error);
    res.status(500).json({ message: "Failed to send reset link" });
    next(error);
  }
};

// Reset password using token
export const resetPassword: RequestHandler = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    console.log("🧪 Reset password attempt:", { token, newPassword });

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date(),
        },
      },
    });

    console.log("🔍 User found for reset?", user);

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

/**
 * Update User Profile
 */
export const updateUserProfile: RequestHandler = async (
  req,
  res,
  next
): Promise<void> => {
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

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Update profile
    const updatedProfile = await prisma.profile.update({
      where: { userId },
      data: {
        firstName: firstName ?? undefined,
        lastName: lastName ?? undefined,
        location: location ?? undefined,
        phone: phone ?? undefined,
        nationality: nationality ?? undefined,
        timezone: timezone ?? undefined,
        preferredLanguage: preferredLanguage ?? undefined,
      },
    });

    res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Profile Update Error:", error);
    res.status(500).json({ message: "Profile update failed" });
    next(error);
  }
};
