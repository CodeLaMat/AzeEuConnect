import { Request, Response, NextFunction, RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const registerUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, password, role, firstName, lastName, location } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role || "customer",
        profile: {
          create: {
            firstName: firstName || "John",
            lastName: lastName || "Doe",
            location: location || "",
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
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
    next(error);
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    });
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    res.status(200).json({
      id: user.id,
      email: user.email,
      role: user.role,
      profile: user.profile,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
    next(error);
  }
};

export const updateUserProfile: RequestHandler = async (req, res, next) => {
  try {
    const { userId, firstName, lastName, location } = req.body;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const updatedProfile = await prisma.profile.update({
      where: { userId },
      data: {
        firstName: firstName ?? undefined,
        lastName: lastName ?? undefined,
        location: location ?? undefined,
      },
    });

    res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Profile update failed" });
    next(error);
  }
};
