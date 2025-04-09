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
import SessionManager from "@/components/SessionManager";

export default async function LocaleLayout({
  children,
  params: paramsPromise,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await paramsPromise;

  if (!locales.includes(locale as any)) {
    return notFound();
  }

  const messages = await getTranslations(locale);

  return (
    <html lang={locale || defaultLocale}>
      <body className=" text-secondary flex flex-col justify-center items-center">
        <Providers locale={locale} messages={messages}>
          <SessionLoader>
            <UserHydrator />
            <SessionManager />
            <div className="w-full max-w-[80%] px-4">
              <Navbar locale={locale} />
            </div>
            {/* Main Layout with 3/4 width center content */}
            <div className="flex justify-center w-full">
              {/* Left Ad Slot (1/8) */}
              <aside className="hidden lg:block w-1/8 max-w-[12.5%]"></aside>

              {/* Main Content (3/4 width) */}
              <main className="w-full px-4">{children}</main>

              {/* Right Ad Slot (1/8) */}
              <aside className="hidden lg:block w-1/8 max-w-[12.5%]"></aside>
            </div>

            <Toaster richColors position="top-right" />
            <Footer />
          </SessionLoader>
        </Providers>
      </body>
    </html>
  );
}
