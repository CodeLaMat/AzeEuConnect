"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
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
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("navbar");

  const handleLanguageChange = (newLocale: string) => {
    if (!locales.includes(newLocale as "az" | "en" | "ru" | "de")) return;
    const newPath = `/${newLocale}${pathname.slice(3)}`;
    router.push(newPath);
  };

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

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-2">
        {[
          { href: "company-formation", label: t("companyFormation") },
          { href: "services", label: t("services") },
          { href: "pricing", label: t("pricing") },
          { href: "about", label: t("aboutUs") },
          { href: "blog", label: t("blog") },
          { href: "contact", label: t("contact") },
        ].map(({ href, label }) => {
          const isActive = pathname === `/${locale}/${href}`;
          return (
            <Link
              key={href}
              href={`/${locale}/${href}`}
              className={`px-4 py-2 rounded-md transition duration-300 ease-in-out 
                ${isActive ? "bg-white text-blue-700 font-bold" : "hover:bg-blue-600"}`}
            >
              {label}
            </Link>
          );
        })}
      </div>

      {/* Language Selector & Auth Buttons */}
      <div className="flex space-x-2 items-center">
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

        {session ? (
          <>
            <Button variant="outline" asChild>
              <Link href="/dashboard">{t("dashboard")}</Link>
            </Button>
            <Button
              variant="destructive"
              className="cursor-pointer"
              onClick={() => signOut()}
            >
              {t("logout")}
            </Button>
          </>
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
