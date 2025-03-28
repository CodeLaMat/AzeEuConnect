import React from "react";
import {
  FaFileAlt,
  FaTasks,
  FaRegBuilding,
  FaWallet,
  FaHeadset,
  FaCheckCircle,
  FaUser,
} from "react-icons/fa";
import { Action, authorize } from "@/lib/rbac";
import { UserRole } from "@prisma/client";

/// ✅ Define the navigation links for the main menu
export const getNavLinks = (
  role?: string,
  t?: (key: string) => string
): { href: string; label: string }[] => {
  const items: {
    href: string;
    label: string;
    action?: Action;
  }[] = [
    { href: "/", label: t?.("homePage") ?? "Home" },
    {
      href: "services",
      label: t?.("services") ?? "Services",
      action: "VIEW_SERVICES",
    },
    {
      href: "users",
      label: t?.("manageUsers") ?? "Users",
      action: "READ_USERS",
    },
    { href: "pricing", label: t?.("pricing") ?? "Pricing" },
    { href: "about", label: t?.("aboutUs") ?? "About Us" },
    {
      href: "clients",
      label: t?.("clients") ?? "Clients",
      action: "VIEW_CLIENTS",
    },
  ];

  return items.filter(({ action }) =>
    action ? authorize(role || "", action) : true
  );
};

/// ✅ Define the navigation links for the sideBar
export const roleBasedLinks: Record<
  UserRole,
  { href: string; icon: React.ReactNode; labelKey: string }[]
> = {
  ADMIN: [
    {
      href: "dashboard",
      icon: React.createElement(FaCheckCircle),
      labelKey: "sidebar.dashboard",
    },
    {
      href: "dashboard/profile",
      icon: React.createElement(FaUser),
      labelKey: "sidebar.profile",
    },
  ],
  USER: [
    {
      href: "dashboard",
      icon: React.createElement(FaCheckCircle),
      labelKey: "sidebar.dashboard",
    },
    {
      href: "dashboard/documents",
      icon: React.createElement(FaFileAlt),
      labelKey: "sidebar.documents",
    },
    {
      href: "dashboard/company-formation",
      icon: React.createElement(FaRegBuilding),
      labelKey: "sidebar.companyFormation",
    },
    {
      href: "dashboard/tax-accounting",
      icon: React.createElement(FaWallet),
      labelKey: "sidebar.taxAccounting",
    },
    {
      href: "dashboard/banking",
      icon: React.createElement(FaTasks),
      labelKey: "sidebar.banking",
    },
    {
      href: "dashboard/profile",
      icon: React.createElement(FaUser),
      labelKey: "sidebar.profile",
    },
    {
      href: "dashboard/support",
      icon: React.createElement(FaHeadset),
      labelKey: "sidebar.support",
    },
  ],
  CONSULTANT: [
    {
      href: "dashboard",
      icon: React.createElement(FaCheckCircle),
      labelKey: "sidebar.dashboard",
    },
    {
      href: "dashboard/profile",
      icon: React.createElement(FaUser),
      labelKey: "sidebar.profile",
    },
  ],
  SERVICE_PROVIDER: [
    {
      href: "dashboard",
      icon: React.createElement(FaCheckCircle),
      labelKey: "sidebar.dashboard",
    },
    {
      href: "dashboard/profile",
      icon: React.createElement(FaUser),
      labelKey: "sidebar.profile",
    },
  ],
  MODERATOR: [
    {
      href: "dashboard",
      icon: React.createElement(FaCheckCircle),
      labelKey: "sidebar.dashboard",
    },
    {
      href: "dashboard/profile",
      icon: React.createElement(FaUser),
      labelKey: "sidebar.profile",
    },
  ],
  SUPPORT_AGENT: [
    {
      href: "dashboard",
      icon: React.createElement(FaCheckCircle),
      labelKey: "sidebar.dashboard",
    },
    {
      href: "dashboard/support",
      icon: React.createElement(FaHeadset),
      labelKey: "sidebar.support",
    },
    {
      href: "dashboard/profile",
      icon: React.createElement(FaUser),
      labelKey: "sidebar.profile",
    },
  ],
  REGULATORY_OFFICER: [
    {
      href: "dashboard",
      icon: React.createElement(FaCheckCircle),
      labelKey: "sidebar.dashboard",
    },
    {
      href: "dashboard/profile",
      icon: React.createElement(FaUser),
      labelKey: "sidebar.profile",
    },
  ],
};

// ✅ Define role-based access per dashboard
export const protectedSubRoutes: Record<string, UserRole[]> = {
  documents: ["USER"],
  "company-formation": ["USER"],
  "tax-accounting": ["USER"],
  banking: ["USER"],
  profile: [
    "USER",
    "CONSULTANT",
    "ADMIN",
    "MODERATOR",
    "SERVICE_PROVIDER",
    "SUPPORT_AGENT",
    "REGULATORY_OFFICER",
  ],
  support: ["USER", "SUPPORT_AGENT", "ADMIN"],
};
