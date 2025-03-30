import { Request, Response } from "express";
import { prisma } from "@packages/db";

// ✅ Get all roles with their permissions
export const getAllRoles = async (req: Request, res: Response) => {
  console.log("Fetching all roles in Backend...");
  try {
    const roles = await prisma.role.findMany({
      include: {
        permissions: {
          include: { permission: true },
        },
      },
    });
    res.json(roles);
  } catch (err) {
    console.error("Error fetching roles:", err);
    res.status(500).json({ error: "Failed to fetch roles" });
  }
};

// ✅ Get all permissions
export const getAllPermissions = async (req: Request, res: Response) => {
  console.log("Fetching all permissions in Backend...");
  try {
    const permissions = await prisma.permission.findMany();
    res.json(permissions);
  } catch (err) {
    console.error("Error fetching permissions:", err);
    res.status(500).json({ error: "Failed to fetch permissions" });
  }
};

// ✅ Create a new role
export const createRole = async (req: Request, res: Response) => {
  console.log("Creating a new role in Backend...");
  const { name, description } = req.body;
  try {
    const newRole = await prisma.role.create({
      data: { name, description },
    });
    res.status(201).json(newRole);
  } catch (err) {
    console.error("Error creating role:", err);
    res.status(500).json({ error: "Failed to create role" });
  }
};

// ✅ Create a new permission
export const createPermission = async (req: Request, res: Response) => {
  console.log("Creating a new permission in Backend...");
  const { name, action, description } = req.body;

  try {
    const newPermission = await prisma.permission.create({
      data: {
        name,
        action,
        description,
      },
    });

    res.status(201).json(newPermission);
  } catch (err) {
    console.error("Error creating permission:", err);
    res.status(500).json({ error: "Failed to create permission" });
  }
};

// ✅ Assign permissions to a role
export const assignPermissionsToRole = async (req: Request, res: Response) => {
  console.log("Assigning permissions to role in Backend...");
  const { roleId } = req.params;
  const { permissionIds } = req.body;

  try {
    // Remove existing permissions for the role
    await prisma.rolePermission.deleteMany({ where: { roleId } });

    // Create new associations
    const data = permissionIds.map((permissionId: string) => ({
      roleId,
      permissionId,
    }));
    await prisma.rolePermission.createMany({ data });

    res.status(200).json({ message: "Permissions updated successfully" });
  } catch (err) {
    console.error("Error assigning permissions:", err);
    res.status(500).json({ error: "Failed to assign permissions" });
  }
};

// ✅ Update user's role
export const updateUserRole = async (req: Request, res: Response) => {
  console.log("Updating user role in Backend...");
  const { userId } = req.params;
  const { roleId } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { roleId },
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating user role:", err);
    res.status(500).json({ error: "Failed to update user role" });
  }
};

// ✅ Delete a role
export const deleteRole = async (req: Request, res: Response) => {
  console.log("Deleting role in Backend...");
  try {
    const { id } = req.params;
    await prisma.rolePermission.deleteMany({ where: { roleId: id } });
    await prisma.role.delete({ where: { id } });
    res.json({ message: "Role deleted" });
  } catch (err) {
    console.error("Error deleting role:", err);
    res.status(500).json({ error: "Failed to delete role" });
  }
};

// ✅ Delete a permission
export const deletePermission = async (req: Request, res: Response) => {
  console.log("Deleting permission in Backend...");
  try {
    const { id } = req.params;
    await prisma.rolePermission.deleteMany({ where: { permissionId: id } });
    await prisma.permission.delete({ where: { id } });
    res.json({ message: "Permission deleted" });
  } catch (err) {
    console.error("Error deleting permission:", err);
    res.status(500).json({ error: "Failed to delete permission" });
  }
};
