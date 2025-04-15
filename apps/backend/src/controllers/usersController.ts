import { Request, Response } from "express";
import { prisma } from "@repo/db";

// ✅ Get all users with profile and subscription
export const getAllUsers = async (req: Request, res: Response) => {
  console.log("Fetching all users in Backend...");
  try {
    const users = await prisma.user.findMany({
      include: {
        profile: true,
        subscription: true,
        role: true,
      },
    });
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// ✅ Get user by ID with profile, subscription, and company details
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
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
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// ✅ Update user profile field
export const updateUserProfileField = async (req: Request, res: Response) => {
  console.log("Updating user profile field in backend...");
  const { userId } = req.params;
  const { fieldName, value } = req.body;

  console.log("Updating user profile field:", fieldName, value);

  if (!fieldName) {
    res.status(400).json({ error: "Field name is required" });
    return;
  }

  try {
    const updatedProfile = await prisma.profile.update({
      where: { userId },
      data: { [fieldName]: value },
    });

    res
      .status(200)
      .json({ updatedProfile, message: "Profile field updated successfully" });
    console.log("USER PROFILE UPDATED");
  } catch (err) {
    console.error("Error updating user profile field:", err);
    res.status(500).json({ error: "Failed to update profile field" });
  }
};

// ✅ Update user subscription field
export const updateSubscriptionField = async (req: Request, res: Response) => {
  console.log("Updating user subscription field in backend...");
  const { userId } = req.params;
  const { value, fieldName } = req.body;

  try {
    const updatedSubscription = await prisma.subscription.update({
      where: { userId },
      data: { [fieldName]: value },
    });
    console.log("USER SUBSCRIPTION UPDATED");

    res.status(200).json({
      updatedSubscription,
      message: "Subscription field updated successfully",
    });
  } catch (err) {
    console.error("Error updating subscription field:", err);
    res.status(500).json({ error: "Failed to update subscription field" });
  }
};

// ✅ Update user company field
export const updateCompanyField = async (req: Request, res: Response) => {
  console.log("Updating user company field in backend...");
  const { userId } = req.params;
  const { value, fieldName } = req.body;

  try {
    const updatedCompany = await prisma.company.update({
      where: { userId },
      data: { [fieldName]: value },
    });
    console.log("USER COMPANY UPDATED");

    res
      .status(200)
      .json({ updatedCompany, message: "Company field updated successfully" });
  } catch (err) {
    console.error("Error updating company field:", err);
    res.status(500).json({ error: "Failed to update company field" });
  }
};
