"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
      <div className="hidden md:flex space-x-6">
        <Link
          href={`/${locale}/company-formation`}
          className="hover:text-gray-300"
        >
          {t("companyFormation")}
        </Link>
        <Link href={`/${locale}/services`} className="hover:text-gray-300">
          {t("services")}
        </Link>
        <Link href={`/${locale}/pricing`} className="hover:text-gray-300">
          {t("pricing")}
        </Link>
        <Link href={`/${locale}/about`} className="hover:text-gray-300">
          {t("aboutUs")}
        </Link>
        <Link href={`/${locale}/blog`} className="hover:text-gray-300">
          {t("blog")}
        </Link>
        <Link href={`/${locale}/contact`} className="hover:text-gray-300">
          {t("contact")}
        </Link>
      </div>

      {/* Language Selector & Auth Buttons */}
      <div className="flex space-x-4 items-center">
        <Select onValueChange={handleLanguageChange} defaultValue={locale}>
          <SelectTrigger className="w-32 bg-white text-blue-700 rounded-md px-2 py-1">
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
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-white text-blue-700 rounded-md"
            >
              {t("dashboard")}
            </Link>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-red-500 text-white rounded-md"
            >
              {t("logout")}
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => signIn()}
              className="px-4 py-2 bg-white text-blue-700 rounded-md"
            >
              {t("logIn")}
            </button>
            <button
              onClick={() => signIn()}
              className="px-4 py-2 bg-blue-500 text-white border border-white rounded-md"
            >
              {t("signUp")}
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
