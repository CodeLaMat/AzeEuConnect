"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePermission = exports.deleteRole = exports.updateUserRole = exports.assignPermissionsToRole = exports.createPermission = exports.createRole = exports.getAllPermissions = exports.getAllRoles = void 0;
const db_1 = require("@packages/db");
// ✅ Get all roles with their permissions
const getAllRoles = async (req, res) => {
    console.log("Fetching all roles in Backend...");
    try {
        const roles = await db_1.prisma.role.findMany({
            include: {
                permissions: {
                    include: { permission: true },
                },
            },
        });
        res.json(roles);
    }
    catch (err) {
        console.error("Error fetching roles:", err);
        res.status(500).json({ error: "Failed to fetch roles" });
    }
};
exports.getAllRoles = getAllRoles;
// ✅ Get all permissions
const getAllPermissions = async (req, res) => {
    console.log("Fetching all permissions in Backend...");
    try {
        const permissions = await db_1.prisma.permission.findMany();
        res.json(permissions);
    }
    catch (err) {
        console.error("Error fetching permissions:", err);
        res.status(500).json({ error: "Failed to fetch permissions" });
    }
};
exports.getAllPermissions = getAllPermissions;
// ✅ Create a new role
const createRole = async (req, res) => {
    console.log("Creating a new role in Backend...");
    const { name, description } = req.body;
    try {
        const newRole = await db_1.prisma.role.create({
            data: { name, description },
        });
        res.status(201).json(newRole);
    }
    catch (err) {
        console.error("Error creating role:", err);
        res.status(500).json({ error: "Failed to create role" });
    }
};
exports.createRole = createRole;
// ✅ Create a new permission
const createPermission = async (req, res) => {
    console.log("Creating a new permission in Backend...");
    const { name, action, description } = req.body;
    try {
        const newPermission = await db_1.prisma.permission.create({
            data: {
                name,
                action,
                description,
            },
        });
        res.status(201).json(newPermission);
    }
    catch (err) {
        console.error("Error creating permission:", err);
        res.status(500).json({ error: "Failed to create permission" });
    }
};
exports.createPermission = createPermission;
// ✅ Assign permissions to a role
const assignPermissionsToRole = async (req, res) => {
    console.log("Assigning permissions to role in Backend...");
    const { roleId } = req.params;
    const { permissionIds } = req.body;
    try {
        // Remove existing permissions for the role
        await db_1.prisma.rolePermission.deleteMany({ where: { roleId } });
        // Create new associations
        const data = permissionIds.map((permissionId) => ({
            roleId,
            permissionId,
        }));
        await db_1.prisma.rolePermission.createMany({ data });
        res.status(200).json({ message: "Permissions updated successfully" });
    }
    catch (err) {
        console.error("Error assigning permissions:", err);
        res.status(500).json({ error: "Failed to assign permissions" });
    }
};
exports.assignPermissionsToRole = assignPermissionsToRole;
// ✅ Update user's role
const updateUserRole = async (req, res) => {
    console.log("Updating user role in Backend...");
    const { userId } = req.params;
    const { roleId } = req.body;
    try {
        const updatedUser = await db_1.prisma.user.update({
            where: { id: userId },
            data: { roleId },
        });
        res.status(200).json(updatedUser);
    }
    catch (err) {
        console.error("Error updating user role:", err);
        res.status(500).json({ error: "Failed to update user role" });
    }
};
exports.updateUserRole = updateUserRole;
// ✅ Delete a role
const deleteRole = async (req, res) => {
    console.log("Deleting role in Backend...");
    try {
        const { id } = req.params;
        await db_1.prisma.rolePermission.deleteMany({ where: { roleId: id } });
        await db_1.prisma.role.delete({ where: { id } });
        res.json({ message: "Role deleted" });
    }
    catch (err) {
        console.error("Error deleting role:", err);
        res.status(500).json({ error: "Failed to delete role" });
    }
};
exports.deleteRole = deleteRole;
// ✅ Delete a permission
const deletePermission = async (req, res) => {
    console.log("Deleting permission in Backend...");
    try {
        const { id } = req.params;
        await db_1.prisma.rolePermission.deleteMany({ where: { permissionId: id } });
        await db_1.prisma.permission.delete({ where: { id } });
        res.json({ message: "Permission deleted" });
    }
    catch (err) {
        console.error("Error deleting permission:", err);
        res.status(500).json({ error: "Failed to delete permission" });
    }
};
exports.deletePermission = deletePermission;
