"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-blue-700 text-white py-10">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-lg font-bold">AzEUConnect</h3>
          <p className="mt-2 text-gray-400">{t("companyDescription")}</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold">{t("quickLinks")}</h4>
          <ul className="mt-2 space-y-2">
            <li>
              <Link href="/about" className="text-gray-400 hover:text-white">
                {t("aboutUs")}
              </Link>
            </li>
            <li>
              <Link href="/services" className="text-gray-400 hover:text-white">
                {t("services")}
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="text-gray-400 hover:text-white">
                {t("pricing")}
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-gray-400 hover:text-white">
                {t("blog")}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-400 hover:text-white">
                {t("contact")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-lg font-semibold">{t("servicesTitle")}</h4>
          <ul className="mt-2 space-y-2">
            <li>
              <Link
                href="/company-formation"
                className="text-gray-400 hover:text-white"
              >
                {t("companyFormation")}
              </Link>
            </li>
            <li>
              <Link
                href="/legal-services"
                className="text-gray-400 hover:text-white"
              >
                {t("legalTax")}
              </Link>
            </li>
            <li>
              <Link href="/banking" className="text-gray-400 hover:text-white">
                {t("banking")}
              </Link>
            </li>
            <li>
              <Link
                href="/virtual-office"
                className="text-gray-400 hover:text-white"
              >
                {t("virtualOffice")}
              </Link>
            </li>
            <li>
              <Link
                href="/trademark"
                className="text-gray-400 hover:text-white"
              >
                {t("trademark")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold">{t("contactUs")}</h4>
          <p className="mt-2 text-gray-400">📍 {t("address")}</p>
          <p className="mt-2 text-gray-400">📞 {t("phone")}</p>
          <p className="mt-2 text-gray-400">✉️ {t("email")}</p>
          <div className="mt-4 flex space-x-4">
            <Link href="#" className="text-gray-400 hover:text-white">
              🔗 LinkedIn
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              📘 Facebook
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              📷 Instagram
            </Link>
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
