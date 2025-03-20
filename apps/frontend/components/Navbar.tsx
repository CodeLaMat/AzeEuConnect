"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { locales } from "@/i18n";

export default function Navbar({ locale }: { locale: string }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("navbar");

  const handleLanguageChange = (newLocale: string) => {
    if (!locales.includes(newLocale as "az" | "en" | "ru" | "de")) return;
    const newPath = `/${newLocale}${pathname.slice(3)}`;
    router.push(newPath);
  };

  const user = useSelector((state: RootState) => state.user);

  const userRole = user.role;

  // Nav links
  function getNavLinks(role?: string) {
    if (!role) {
      return [
        { href: "company-formation", label: t("companyFormation") },
        { href: "services", label: t("services") },
        { href: "pricing", label: t("pricing") },
        { href: "about", label: t("aboutUs") },
        { href: "blog", label: t("blog") },
        { href: "contact", label: t("contact") },
      ];
    }

    switch (role) {
      case "admin":
        return [
          { href: "admin-dashboard", label: t("adminDashboard") },
          { href: "users", label: t("manageUsers") },
          { href: "services", label: t("services") },
          { href: "pricing", label: t("pricing") },
        ];
      case "consultant":
        return [
          { href: "consultant-dashboard", label: t("consultantDashboard") },
          { href: "clients", label: t("clients") },
          { href: "services", label: t("services") },
        ];
      case "customer":
        return [
          { href: "dashboard", label: t("dashboard") },
          { href: "company-formation", label: t("companyFormation") },
          { href: "documents", label: t("documents") },
          { href: "services", label: t("services") },
          { href: "pricing", label: t("pricing") },
        ];
      default:
        return [
          { href: "company-formation", label: t("companyFormation") },
          { href: "services", label: t("services") },
          { href: "pricing", label: t("pricing") },
          { href: "about", label: t("aboutUs") },
          { href: "blog", label: t("blog") },
          { href: "contact", label: t("contact") },
        ];
    }
  }

  const navLinks = getNavLinks(userRole);

  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu if user clicks outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowAccountMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-blue-700 text-white shadow-md">
      {/* Logo */}
      <Link
        href={`/${locale}`}
        className="text-2xl font-bold flex items-center space-x-2"
      >
        <span className="bg-white text-blue-700 px-3 py-1 rounded-lg font-bold">
          EU
        </span>
        <span>AzEUConnect</span>
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex space-x-2">
        {navLinks.map(({ href, label }) => {
          const isActive = pathname === `/${locale}/${href}`;
          return (
            <Link
              key={href}
              href={`/${locale}/${href}`}
              className={`px-4 py-2 rounded-md transition duration-300 ease-in-out 
                ${
                  isActive
                    ? "bg-white text-blue-700 font-bold"
                    : "hover:bg-blue-600"
                }`}
            >
              {label}
            </Link>
          );
        })}
      </div>

      {/* Right Side: Language + Account */}
      <div className="flex space-x-4 items-center">
        {/* Language Selector */}
        <Select onValueChange={handleLanguageChange} defaultValue={locale}>
          <SelectTrigger className="w-36 bg-white text-blue-700 cursor-pointer">
            <SelectValue placeholder={t("selectLanguage")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="az">🇦🇿 Azərbaycan</SelectItem>
            <SelectItem value="en">🇬🇧 English</SelectItem>
            <SelectItem value="ru">🇷🇺 Русский</SelectItem>
            <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
          </SelectContent>
        </Select>

        {status === "loading" ? (
          <Button className="bg-gray-500 text-white font-bold" disabled>
            {t("loading")}
          </Button>
        ) : session ? (
          <div className="relative" ref={menuRef}>
            <div
              className="cursor-pointer flex items-center space-x-2"
              onClick={() => setShowAccountMenu(!showAccountMenu)}
            >
              <img
                src={user.profile?.image || "/media/images/profile_icon.svg"}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            </div>

            {/* Account Dropdown */}
            {showAccountMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-black shadow-lg p-4 rounded-md z-50">
                <div className="flex items-center space-x-2 mb-3">
                  <img
                    src={
                      session.user?.image || "/media/images/profile_icon.svg"
                    }
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="font-bold">
                      {session.user?.firstName || session.user?.name || "User"}{" "}
                      {session.user?.lastName || ""}
                    </span>
                    <span className="text-sm text-gray-500">
                      {session.user?.role || "Member"} •{" "}
                      {user.profile?.location}
                    </span>
                  </div>
                </div>
                <hr className="my-2" />

                {/* Menu Links */}
                <Link
                  href={`/${locale}/account-settings`}
                  className="block px-2 py-1 text-gray-700 hover:bg-gray-100 rounded"
                >
                  Personal Settings
                </Link>
                <Link
                  href={`/${locale}/bookmarks`}
                  className="block px-2 py-1 text-gray-700 hover:bg-gray-100 rounded"
                >
                  Bookmarks
                </Link>
                <Link
                  href={`/${locale}/drafts`}
                  className="block px-2 py-1 text-gray-700 hover:bg-gray-100 rounded"
                >
                  Drafts
                </Link>
                <Link
                  href={`/${locale}/help`}
                  className="block px-2 py-1 text-gray-700 hover:bg-gray-100 rounded"
                >
                  Help Center
                </Link>

                <hr className="my-2" />

                {/* Logout */}
                <button
                  onClick={() => signOut({ callbackUrl: `/${locale}/signin` })}
                  className="w-full text-left px-2 py-1 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          // Not logged in: Show Sign In / Sign Up
          <>
            <Button
              className="bg-yellow-500 text-black font-bold hover:bg-yellow-600 cursor-pointer"
              asChild
            >
              <Link href={`/${locale}/signin`}>{t("logIn")}</Link>
            </Button>
            <Button
              className="bg-green-500 text-white font-bold hover:bg-green-600 cursor-pointer"
              asChild
            >
              <Link href={`/${locale}/signup`}>{t("signUp")}</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
