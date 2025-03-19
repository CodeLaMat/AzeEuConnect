"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FaFileAlt,
  FaTasks,
  FaRegBuilding,
  FaWallet,
  FaHeadset,
  FaCheckCircle,
} from "react-icons/fa";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("dashboard");
  const { locale } = useParams(); // Get current locale

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-lg">
        <h2 className="text-xl font-bold text-blue-700">AzEUConnect</h2>
        <nav className="mt-6 space-y-4">
          <Link
            href={`/${locale}/dashboard`}
            className="flex items-center p-2 text-gray-600 hover:text-blue-700"
          >
            <FaCheckCircle className="mr-2" /> {t("sidebar.dashboard")}
          </Link>
          <Link
            href={`/${locale}/dashboard/documents`}
            className="flex items-center p-2 text-gray-600 hover:text-blue-700"
          >
            <FaFileAlt className="mr-2" /> {t("sidebar.documents")}
          </Link>
          <Link
            href={`/${locale}/dashboard/company-formation`}
            className="flex items-center p-2 text-gray-600 hover:text-blue-700"
          >
            <FaRegBuilding className="mr-2" /> {t("sidebar.companyFormation")}
          </Link>
          <Link
            href={`/${locale}/dashboard/tax-accounting`}
            className="flex items-center p-2 text-gray-600 hover:text-blue-700"
          >
            <FaWallet className="mr-2" /> {t("sidebar.taxAccounting")}
          </Link>
          <Link
            href={`/${locale}/dashboard/banking`}
            className="flex items-center p-2 text-gray-600 hover:text-blue-700"
          >
            <FaTasks className="mr-2" /> {t("sidebar.banking")}
          </Link>
          <Link
            href={`/${locale}/dashboard/support`}
            className="flex items-center p-2 text-gray-600 hover:text-blue-700"
          >
            <FaHeadset className="mr-2" /> {t("sidebar.support")}
          </Link>
        </nav>
      </aside>

      {/* Dynamic Content Area */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
