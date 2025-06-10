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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("navbar");
  const profile = useSelector((state: RootState) => state.profile);
  const userRole = session?.user?.currentRole || "CUSTOMER";
  const navLinks = getNavLinks(userRole, t);

  const handleLanguageChange = (newLocale: string) => {
    if (!locales.includes(newLocale as "az" | "en" | "ru" | "de")) return;

    document.cookie = `NEXT_LOCALE=${newLocale}; path=/;`;
    const pathParts = pathname.split("/");
    pathParts[1] = newLocale;
    const newPath = pathParts.join("/");
    router.replace(newPath);
  };

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Logo locale={locale} />

          {/* Hamburger Icon */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <NavLinks
              locale={locale}
              navLinks={navLinks}
              pathname={pathname}
              t={t}
            />

            <div className="flex items-center space-x-4">
              <LanguageSwitcher
                locale={locale}
                handleLanguageChange={handleLanguageChange}
                t={t}
              />
              
              {status === "loading" ? (
                <Button variant="ghost" disabled>
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
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLinks
              locale={locale}
              navLinks={navLinks}
              pathname={pathname}
              t={t}
              
            />
            
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-5 space-x-3">
                <LanguageSwitcher
                  locale={locale}
                  handleLanguageChange={handleLanguageChange}
                  t={t}
                  
                />
                
                {status === "loading" ? (
                  <Button variant="ghost" disabled className="w-full">
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
                  <AuthButtons locale={locale} t={t}  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}