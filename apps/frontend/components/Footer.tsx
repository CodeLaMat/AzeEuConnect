"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const { locale } = useParams(); // Get the current locale dynamically

  return (
    <footer className="bg-blue-700 text-white py-10">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-lg font-bold">{t("company.name")}</h3>
          <p className="mt-2 text-gray-400">{t("company.description")}</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold">{t("quickLinks.title")}</h4>
          <ul className="mt-2 space-y-2">
            {Object.entries(t.raw("quickLinks.links")).map(([key, value]) => (
              <li key={key}>
                <Link
                  href={`/${locale}/${key}`}
                  className="text-gray-400 hover:text-white"
                >
                  {value as React.ReactNode}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-lg font-semibold">{t("services.title")}</h4>
          <ul className="mt-2 space-y-2">
            {Object.entries(t.raw("services.list")).map(([key, value]) => (
              <li key={key}>
                <Link
                  href={`/${locale}/${key}`}
                  className="text-gray-400 hover:text-white"
                >
                  {value as React.ReactNode}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold">{t("contact.title")}</h4>
          <p className="mt-2 text-gray-400">📍 {t("contact.address")}</p>
          <p className="mt-2 text-gray-400">📞 {t("contact.phone")}</p>
          <p className="mt-2 text-gray-400">✉️ {t("contact.email")}</p>
          <div className="mt-4 flex space-x-4">
            {Object.entries(t.raw("contact.socials")).map(([key, value]) => (
              <Link
                key={key}
                href="#"
                className="text-gray-400 hover:text-white"
              >
                {value as React.ReactNode}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 text-gray-500">
        <p>
          © {new Date().getFullYear()} AzEUConnect. {t("rightsReserved")}
        </p>
      </div>
    </footer>
  );
}
