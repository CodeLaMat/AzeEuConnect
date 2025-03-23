import { RequestHandler } from "express";
import bcrypt from "bcrypt";

import { prisma } from "@packages/db";

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
