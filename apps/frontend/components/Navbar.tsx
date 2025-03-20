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

  // Redux user
  const user = useSelector((state: RootState) => state.user);
  const userRole = user.role;

  // Language switch
  const handleLanguageChange = (newLocale: string) => {
    if (!locales.includes(newLocale as "az" | "en" | "ru" | "de")) return;

    document.cookie = `NEXT_LOCALE=${newLocale}; path=/;`;
    const pathParts = pathname.split("/");
    pathParts[1] = newLocale;
    const newPath = pathParts.join("/");

    router.replace(newPath);
  };

  // Build nav links
  function getNavLinks(role?: string) {
    if (!role) {
      return [
        { href: "services", label: t("services") },
        { href: "pricing", label: t("pricing") },
        { href: "about", label: t("aboutUs") },
      ];
    }

    switch (role) {
      case "admin":
        return [
          { href: "admin-dashboard", label: t("adminDashboard") },
          { href: "users", label: t("manageUsers") },
          { href: "services", label: t("services") },
          { href: "pricing", label: t("pricing") },
          { href: "about", label: t("aboutUs") },
        ];
      case "consultant":
        return [
          { href: "consultant-dashboard", label: t("consultantDashboard") },
          { href: "clients", label: t("clients") },
          { href: "services", label: t("services") },
          { href: "pricing", label: t("pricing") },
          { href: "about", label: t("aboutUs") },
        ];
      case "customer":
        return [
          { href: "dashboard", label: t("dashboard") },
          { href: "company-formation", label: t("companyFormation") },
          { href: "documents", label: t("documents") },
          { href: "services", label: t("services") },
          { href: "pricing", label: t("pricing") },
          { href: "about", label: t("aboutUs") },
        ];
      default:
        return [
          { href: "services", label: t("services") },
          { href: "pricing", label: t("pricing") },
          { href: "about", label: t("aboutUs") },
        ];
    }
  }
  const navLinks = getNavLinks(userRole);

  // Account menu
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowAccountMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Dropdown for "About Us"
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);

  return (
    <nav className="relative flex justify-between items-center px-8 py-4 bg-blue-700 text-white shadow-md">
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

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-2 items-center">
        {navLinks.map(({ href, label }) => {
          // If it's about
          if (href === "about") {
            return (
              <div
                key={href}
                className=" cursor-pointer "
                onMouseEnter={() => setShowAboutDropdown(true)}
              >
                <Link
                  href={`/${locale}/${href}`}
                  className=" px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-blue-600"
                >
                  {label}
                </Link>
                {/* The multi-column dropdown for "About Us" */}
                {showAboutDropdown && (
                  <div
                    className="absolute left-0 top-full w-screen bg-white text-black shadow-lg z-50 "
                    onMouseEnter={() => setShowAboutDropdown(true)}
                    onMouseLeave={() => setShowAboutDropdown(false)}
                  >
                    <div className="max-w-7xl mx-auto px-8 py-6 grid grid-cols-2 gap-8">
                      {/* Column 1 */}
                      <div>
                        <h3 className="uppercase font-bold text-sm mb-2">
                          Company
                        </h3>
                        <ul className="space-y-1">
                          <li>
                            <Link
                              href={`/${locale}/who-we-are`}
                              className="hover:underline"
                            >
                              Who we are
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={`/${locale}/career`}
                              className="hover:underline"
                            >
                              Career
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={`/${locale}/partners`}
                              className="hover:underline"
                            >
                              Partners
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={`/${locale}/customer-stories`}
                              className="hover:underline"
                            >
                              Customer Stories
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={`/${locale}/testimonials`}
                              className="hover:underline"
                            >
                              Testimonials
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={`/${locale}/contact`}
                              className="hover:underline"
                            >
                              Contact
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* Column 2 */}
                      <div>
                        <h3 className="uppercase font-bold text-sm mb-2">
                          Press
                        </h3>
                        <ul className="space-y-1">
                          <li>
                            <Link
                              href={`/${locale}/media-publications`}
                              className="hover:underline"
                            >
                              Media &amp; Publications
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={`/${locale}/advertise`}
                              className="hover:underline"
                            >
                              Advertise on AzEUConnect
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={`/${locale}/blog`}
                              className="hover:underline"
                            >
                              Blog
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={`/${locale}/news`}
                              className="hover:underline"
                            >
                              News
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          }

          // Normal link
          const isActive = pathname === `/${locale}/${href}`;
          return (
            <Link
              key={href}
              href={`/${locale}/${href}`}
              className={`px-4 py-2 rounded-md transition duration-300 ease-in-out ${
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

      {/* Language + Account */}
      <div className="flex space-x-4 items-center">
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
                      user.profile?.image || "/media/images/profile_icon.svg"
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
                      {user.profile?.location || t("account.noLocation")}
                    </span>
                  </div>
                </div>
                <hr className="my-2" />

                <Link
                  href={`/${locale}/account-settings`}
                  className="block px-2 py-1 text-gray-700 hover:bg-gray-100 rounded"
                >
                  {t("account.personalSettings")}
                </Link>
                <Link
                  href={`/${locale}/bookmarks`}
                  className="block px-2 py-1 text-gray-700 hover:bg-gray-100 rounded"
                >
                  {t("account.bookmarks")}
                </Link>
                <Link
                  href={`/${locale}/drafts`}
                  className="block px-2 py-1 text-gray-700 hover:bg-gray-100 rounded"
                >
                  {t("account.drafts")}
                </Link>
                <Link
                  href={`/${locale}/help`}
                  className="block px-2 py-1 text-gray-700 hover:bg-gray-100 rounded"
                >
                  {t("account.helpCenter")}
                </Link>

                <hr className="my-2" />

                <button
                  onClick={() => signOut({ callbackUrl: `/${locale}/signin` })}
                  className="w-full text-left px-2 py-1 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                >
                  {t("account.logout")}
                </button>
              </div>
            )}
          </div>
        ) : (
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
