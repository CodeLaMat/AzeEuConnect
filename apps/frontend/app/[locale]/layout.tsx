// layouts/LocaleLayout.tsx
import { getTranslations } from "@/lib/getTranslations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import "@/styles/globals.css";
import { Providers } from "../providers";
import UserHydrator from "@/components/UserHydration";
import { defaultLocale, locales } from "@/i18n";
import { Toaster } from "@/components/ui/sonner";
import SessionLoader from "@/components/SessionLoader";
import SessionManager from "@/components/SessionManager"; // Import the session manager

export default async function LocaleLayout({
  children,
  params: paramsPromise,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await paramsPromise;

  console.log("🔑 New Locale in layout:", locale);

  if (!locales.includes(locale as any)) {
    return notFound();
  }

  // Fetch translations for the given locale and set them in the Redux store.
  const messages = await getTranslations(locale);

  return (
    <html lang={locale || defaultLocale}>
      <body className="bg-primary text-secondary">
        <Providers locale={locale} messages={messages}>
          <SessionLoader>
            <UserHydrator />
            <SessionManager /> {/* Add SessionManager to the layout */}
            <Navbar locale={locale} />
            <main>{children}</main>
            <Toaster richColors position="top-right" />
            <Footer />
          </SessionLoader>
        </Providers>
      </body>
    </html>
  );
}
