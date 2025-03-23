import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const roleToDashboard: Record<string, string> = {
  ADMIN: "admin-dashboard",
  CONSULTANT: "consultant-dashboard",
  SUPPORT_AGENT: "support-dashboard",
  LEGAL_ADVISOR: "legal-dashboard",
  REGULATORY_OFFICER: "regulatory-dashboard",
  USER: "dashboard",
};
