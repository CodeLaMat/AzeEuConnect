import { getTranslations } from "@/lib/getTranslations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import "@/styles/globals.css";
import { Providers } from "../providers";

export default async function LocaleLayout({
  children,
  params: paramsPromise,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await paramsPromise;

  // Validate locale
  const supportedLocales = ["az", "en", "ru", "de"];
  if (!supportedLocales.includes(locale)) {
    notFound();
  }

  const messages = await getTranslations(locale);

  return (
    <html lang={locale}>
      <body>
        <Providers locale={locale} messages={messages}>
          <Navbar locale={locale} />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
