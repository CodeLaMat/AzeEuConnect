"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissions = void 0;
exports.authorize = authorize;
exports.RolePermissions = {
    ADMIN: ["ALL"],
    CUSTOMER: [
        "CREATE_ORDER",
        "VIEW_SERVICES",
        "WRITE_REVIEW",
        "MANAGE_PROFILE",
        "VIEW_ORDERS",
        "VIEW_NOTIFICATIONS",
        "SEND_MESSAGES",
        "SEND_EMAILS",
    ],
    CONSULTANT: [
        "POST_SERVICE",
        "MANAGE_APPOINTMENTS",
        "VIEW_CLIENTS",
        "MANAGE_PROFILE",
        "VIEW_APPOINTMENTS",
        "RESPOND_TO_REVIEWS",
        "VIEW_NOTIFICATIONS",
        "VIEW_REVIEWS",
    ],
    SERVICE_PROVIDER: [
        "POST_SERVICE",
        "MANAGE_ORDERS",
        "RESPOND_TO_REVIEWS",
        "MANAGE_PROFILE",
        "VIEW_CLIENTS",
        "VIEW_SERVICE_LISTINGS",
        "MANAGE_SUBSCRIPTIONS",
        "VIEW_ORDERS",
        "MANAGE_REVIEWS",
    ],
    SUPPORT_AGENT: [
        "MANAGE_TICKETS",
        "READ_USERS",
        "VIEW_SUPPORT_TICKETS",
        "MANAGE_NOTIFICATIONS",
        "VIEW_NOTIFICATIONS",
        "MANAGE_DOCUMENTS",
    ],
    REGULATORY_OFFICER: [
        "VERIFY_COMPANY",
        "MANAGE_COMPANY",
        "APPROVE_DOCUMENTS",
        "APPROVE_SERVICE",
    ],
};
function authorize(role, action) {
    const allowedActions = exports.RolePermissions[role] || [];
    return (allowedActions.includes("ALL") || allowedActions.includes(action));
}
