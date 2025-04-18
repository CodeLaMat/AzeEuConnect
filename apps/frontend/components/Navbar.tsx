"use client";
import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { Button } from "@/components/ui/button";
import { locales } from "@/i18n";
import Logo from "./navbar/Logo";
import NavLinks from "./navbar/NavLinks";
import LanguageSwitcher from "./navbar/LanguageSwitcher";
import AuthButtons from "./navbar/AuthButtons";
import AccountMenu from "./navbar/AccountMenu";
import { getNavLinks } from "@/lib/roleBasedLinks";

export default function Navbar({ locale }: { locale: string }) {
  const { data: session, status } = useSession();
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("navbar");
  const profile = useSelector((state: RootState) => state.profile);

  // Accessing currentRole instead of role
  const userRole = session?.user?.currentRole || "CUSTOMER";

  // Generate the correct navigation links based on currentRole
  const navLinks = getNavLinks(userRole, t);

  // Language switch handler
  const handleLanguageChange = (newLocale: string) => {
    if (!locales.includes(newLocale as "az" | "en" | "ru" | "de")) return;

    document.cookie = `NEXT_LOCALE=${newLocale}; path=/;`;
    const pathParts = pathname.split("/");
    pathParts[1] = newLocale;
    const newPath = pathParts.join("/");
    router.replace(newPath);
  };

  // Close account menu when clicking outside
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
    <nav className="relative flex justify-between items-center px-8 py-4 text-secondary">
      {/* Logo */}
      <Logo locale={locale} />

      {/* Hamburger Icon - Visible on mobile */}
      <button
        className="md:hidden focus:outline-none"
        onClick={() => setMobileMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {mobileMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Desktop NavLinks */}
      <div className="hidden md:flex">
        <NavLinks
          locale={locale}
          navLinks={navLinks}
          pathname={pathname}
          showAboutDropdown={showAboutDropdown}
          setShowAboutDropdown={setShowAboutDropdown}
          showServicesDropdown={showServicesDropdown}
          setShowServicesDropdown={setShowServicesDropdown}
          t={t}
        />
      </div>

      {/* Language + Auth - Desktop */}
      <div className="hidden md:flex space-x-4 items-center">
        <LanguageSwitcher
          locale={locale}
          handleLanguageChange={handleLanguageChange}
          t={t}
        />
        {status === "loading" ? (
          <Button className="bg-gray-500 text-white font-bold" disabled>
            {t("loading")}
          </Button>
        ) : session ? (
          <div className="relative" ref={menuRef}>
            <AccountMenu
              session={session}
              locale={locale}
              profile={profile}
              userRole={userRole}
              showAccountMenu={showAccountMenu}
              setShowAccountMenuAction={setShowAccountMenu}
              menuRef={menuRef}
              t={t}
            />
          </div>
        ) : (
          <AuthButtons locale={locale} t={t} />
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white z-50 shadow-md md:hidden">
          <div className="flex flex-col items-start px-4 py-2 space-y-2">
            <NavLinks
              locale={locale}
              navLinks={navLinks}
              pathname={pathname}
              showAboutDropdown={showAboutDropdown}
              setShowAboutDropdown={setShowAboutDropdown}
              showServicesDropdown={showServicesDropdown}
              setShowServicesDropdown={setShowServicesDropdown}
              t={t}
            />
            <LanguageSwitcher
              locale={locale}
              handleLanguageChange={handleLanguageChange}
              t={t}
            />
            {status === "loading" ? (
              <Button className="bg-gray-500 text-white font-bold" disabled>
                {t("loading")}
              </Button>
            ) : session ? (
              <div className="relative w-full" ref={menuRef}>
                <AccountMenu
                  session={session}
                  locale={locale}
                  profile={profile}
                  userRole={userRole}
                  showAccountMenu={showAccountMenu}
                  setShowAccountMenuAction={setShowAccountMenu}
                  menuRef={menuRef}
                  t={t}
                />
              </div>
            ) : (
              <AuthButtons locale={locale} t={t} />
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
