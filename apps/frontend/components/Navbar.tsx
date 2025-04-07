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
    <nav className="relative flex justify-between items-center px-8 py-4 bg-secondary text-primary shadow-md">
      {/* Logo */}
      <Logo locale={locale} />
      {/* Navigation Links */}
      <NavLinks
        locale={locale}
        navLinks={navLinks}
        pathname={pathname}
        showAboutDropdown={showAboutDropdown}
        setShowAboutDropdown={setShowAboutDropdown}
      />
      {/* Language + Account */}
      <div className="flex space-x-4 items-center">
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
    </nav>
  );
}
