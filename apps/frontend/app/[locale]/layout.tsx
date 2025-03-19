"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { TranslationProvider } from "@/app/providers";
import { notFound } from "next/navigation";
import { locales } from "@/i18n";
import { use } from "react";
import Footer from "@/components/Footer";

export default function LocaleLayout({
  children,
  params: paramsPromise,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(paramsPromise);

  // Validate the locale from the URL
  if (!locales.includes(locale as "az" | "en" | "ru" | "de")) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <SessionProvider>
          <TranslationProvider locale={locale}>
            <Navbar locale={locale} />
            <main>{children}</main>
            <Footer />
          </TranslationProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
