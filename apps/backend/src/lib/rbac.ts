export function authorize(role: string, action: Action): boolean {
  const allowedActions =
    RolePermissions[role as keyof typeof RolePermissions] || [];
  return (
    allowedActions.includes("ALL") || allowedActions.includes(action as Action)
  );
}

export const RolePermissions = {
  ADMIN: ["ALL"],
  USER: ["CREATE_ORDER", "VIEW_SERVICES", "WRITE_REVIEW", "MANAGE_PROFILE"],
  CONSULTANT: ["POST_SERVICE", "MANAGE_APPOINTMENTS", "VIEW_CLIENTS"],
  SERVICE_PROVIDER: ["POST_SERVICE", "MANAGE_ORDERS", "RESPOND_TO_REVIEWS"],
  SUPPORT_AGENT: ["MANAGE_TICKETS", "READ_USERS"],
  REGULATORY_OFFICER: ["VERIFY_COMPANY", "APPROVE_DOCUMENTS"],
};

export type Action =
  | "ALL"
  | "CREATE_ORDER"
  | "VIEW_SERVICES"
  | "WRITE_REVIEW"
  | "POST_SERVICE"
  | "MANAGE_PROFILE"
  | "MANAGE_TICKETS"
  | "MANAGE_ORDERS"
  | "VERIFY_COMPANY"
  | "APPROVE_DOCUMENTS"
  | "RESPOND_TO_REVIEWS"
  | "MANAGE_APPOINTMENTS"
  | "READ_USERS"
  | "VIEW_CLIENTS";
