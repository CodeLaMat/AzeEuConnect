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

export default async function Layout({
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
      <body className=" text-secondary flex flex-col items-center">
        <Providers locale={locale} messages={messages}>
          <SessionLoader>
            <UserHydrator />
            <SessionManager />

            {/* Navbar wrapper (optional max width) */}
            <div className="w-full max-w-[80%] px-4">
              <Navbar locale={locale} />
            </div>

            {/* Main Layout with 3/4 content and future ad slots */}
            <div className="flex w-full justify-center my-6">
              {/* Left Ad Slot */}
              <aside className="hidden lg:block w-[12.5%]"></aside>

              {/* Main Content */}
              <main className="w-full max-w-[70%] px-4">{children}</main>

              {/* Right Ad Slot */}
              <aside className="hidden lg:block w-[12.5%]"></aside>
            </div>

            <Toaster richColors position="top-right" />
            <Footer />
          </SessionLoader>
        </Providers>
      </body>
    </html>
  );
}
