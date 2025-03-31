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

    {
      href: "dashboard/userlist",
      icon: React.createElement(FaUser),
      labelKey: "sidebar.userList",
    },
  ],
  USER: [
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

/// ✅ Define the navigation links for the account menu
export const accountMenuLinks: Record<
  UserRole,
  { href: string; icon: React.ReactNode; labelKey: string }[]
> = {
  ADMIN: [
    {
      href: "dashboard",
      icon: React.createElement(FaCheckCircle),
      labelKey: "account.dashboard",
    },
    {
      href: "bookmarks",
      icon: React.createElement(FaUser),
      labelKey: "account.bookmarks",
    },

    {
      href: "drafts",
      icon: React.createElement(FaUser),
      labelKey: "account.drafts",
    },
    {
      href: "help",
      icon: React.createElement(FaCheckCircle),
      labelKey: "account.helpCenter",
    },
  ],
  USER: [
    {
      href: "dashboard",
      icon: React.createElement(FaCheckCircle),
      labelKey: "account.dashboard",
    },
    {
      href: "bookmarks",
      icon: React.createElement(FaUser),
      labelKey: "account.bookmarks",
    },

    {
      href: "drafts",
      icon: React.createElement(FaUser),
      labelKey: "account.drafts",
    },
    {
      href: "help",
      icon: React.createElement(FaCheckCircle),
      labelKey: "account.helpCenter",
    },
  ],
  CONSULTANT: [
    {
      href: "dashboard",
      icon: React.createElement(FaCheckCircle),
      labelKey: "account.dashboard",
    },
    {
      href: "bookmarks",
      icon: React.createElement(FaUser),
      labelKey: "account.bookmarks",
    },

    {
      href: "drafts",
      icon: React.createElement(FaUser),
      labelKey: "account.drafts",
    },
    {
      href: "help",
      icon: React.createElement(FaCheckCircle),
      labelKey: "account.helpCenter",
    },
  ],
  SERVICE_PROVIDER: [
    {
      href: "dashboard",
      icon: React.createElement(FaCheckCircle),
      labelKey: "account.dashboard",
    },
    {
      href: "bookmarks",
      icon: React.createElement(FaUser),
      labelKey: "account.bookmarks",
    },

    {
      href: "drafts",
      icon: React.createElement(FaUser),
      labelKey: "account.drafts",
    },
    {
      href: "help",
      icon: React.createElement(FaCheckCircle),
      labelKey: "account.helpCenter",
    },
  ],
  MODERATOR: [
    {
      href: "dashboard",
      icon: React.createElement(FaCheckCircle),
      labelKey: "account.dashboard",
    },
    {
      href: "bookmarks",
      icon: React.createElement(FaUser),
      labelKey: "account.bookmarks",
    },

    {
      href: "drafts",
      icon: React.createElement(FaUser),
      labelKey: "account.drafts",
    },
    {
      href: "help",
      icon: React.createElement(FaCheckCircle),
      labelKey: "account.helpCenter",
    },
  ],
  SUPPORT_AGENT: [
    {
      href: "dashboard",
      icon: React.createElement(FaCheckCircle),
      labelKey: "account.dashboard",
    },
    {
      href: "bookmarks",
      icon: React.createElement(FaUser),
      labelKey: "account.bookmarks",
    },

    {
      href: "drafts",
      icon: React.createElement(FaUser),
      labelKey: "account.drafts",
    },
    {
      href: "help",
      icon: React.createElement(FaCheckCircle),
      labelKey: "account.helpCenter",
    },
  ],
  REGULATORY_OFFICER: [
    {
      href: "dashboard",
      icon: React.createElement(FaCheckCircle),
      labelKey: "account.dashboard",
    },
    {
      href: "bookmarks",
      icon: React.createElement(FaUser),
      labelKey: "account.bookmarks",
    },

    {
      href: "drafts",
      icon: React.createElement(FaUser),
      labelKey: "account.drafts",
    },
    {
      href: "help",
      icon: React.createElement(FaCheckCircle),
      labelKey: "account.helpCenter",
    },
  ],
};

// ✅ Define the protected sub-routes and their required roles for sidebar navigation
export const protectedSubRoutes: Record<string, UserRole[]> = {
  dashboard: [
    "USER",
    "ADMIN",
    "CONSULTANT",
    "SERVICE_PROVIDER",
    "MODERATOR",
    "SUPPORT_AGENT",
    "REGULATORY_OFFICER",
  ],
  documents: ["SERVICE_PROVIDER"],
  "company-formation": ["SERVICE_PROVIDER"],
  "tax-accounting": ["SERVICE_PROVIDER"],
  banking: ["SERVICE_PROVIDER"],
  profile: [
    "SERVICE_PROVIDER",
    "CONSULTANT",
    "ADMIN",
    "MODERATOR",
    "SERVICE_PROVIDER",
    "SUPPORT_AGENT",
    "REGULATORY_OFFICER",
  ],
  "manage-users": ["ADMIN"],
  userlist: ["ADMIN"],
  support: [
    "USER",
    "SUPPORT_AGENT",
    "ADMIN",
    "MODERATOR",
    "SERVICE_PROVIDER",
    "SUPPORT_AGENT",
    "REGULATORY_OFFICER",
  ],
};
