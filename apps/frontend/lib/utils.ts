import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const roleToDashboard = "dashboard";

export function getDashboardRoute(_role: string, locale: string): string {
  return `/dashboard`;
}

// Not used yet
export function getDashboardRouteWithRole(
  role: string,
  locale: string
): string {
  return `/${roleToDashboard}`;
}
