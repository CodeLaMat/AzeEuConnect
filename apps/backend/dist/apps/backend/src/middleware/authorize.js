import { RolePermissions } from "../lib/rbac";
export const authorizeMiddleware = (action) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user || !user.role) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        // If user.role is an object, extract the name property; otherwise, use it directly
        const roleName = typeof user.role === "object" && user.role !== null && "name" in user.role
            ? user.role.name
            : user.role;
        const allowedActions = RolePermissions[roleName] || [];
        if (allowedActions.includes("ALL") || allowedActions.includes(action)) {
            next();
        }
        else {
            res.status(403).json({ message: "Forbidden: Access denied" });
        }
    };
};
