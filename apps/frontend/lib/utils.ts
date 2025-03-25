import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const roleToDashboard: Record<string, string> = {
  ADMIN: "admin-dashboard",
  USER: "dashboard",
  CONSULTANT: "consultant-dashboard",
  SERVICE_PROVIDER: "provider-dashboard",
  MODERATOR: "moderator-dashboard",
  SUPPORT_AGENT: "support-dashboard",
  REGULATORY_OFFICER: "regulatory-dashboard",
};
