"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  FaCalculator,
  FaFileInvoice,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export default function TaxAccountPage() {
  const t = useTranslations("dashboard.taxAccounting");

  // Mock status data
  const [taxProgress, setTaxProgress] = useState(40);

  const services = [
    {
      icon: <FaCalculator />,
      title: "taxConsulting",
      desc: "taxConsultingDesc",
    },
    { icon: <FaFileInvoice />, title: "vatFiling", desc: "vatFilingDesc" },
  ];

  const filings = [
    { id: "TAX2025-001", date: "Mar 10, 2025", status: "completed" },
    { id: "TAX2025-002", date: "Apr 15, 2025", status: "pending" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>

      {/* Tax Filing Status */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-bold">{t("taxStatus.title")}</h2>
        <p className="text-yellow-600 font-bold">{t("taxStatus.inProgress")}</p>
        <Progress value={taxProgress} className="mt-2" />
        <p className="text-gray-600 text-sm mt-2">
          {t("taxStatus.progress", { completed: 2, total: 5 })}
        </p>
      </section>

      {/* Tax & Accounting Services */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-bold">{t("services.title")}</h2>
        <div className="mt-4 space-y-4">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-4 p-4 border rounded-md"
            >
              <div className="text-blue-600 text-3xl">{service.icon}</div>
              <div>
                <h3 className="font-semibold">
                  {t(`services.${service.title}`)}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t(`services.${service.desc}`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Tax Filings */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold">{t("filings.title")}</h2>
        <ul className="mt-3 space-y-3">
          {filings.map((filing, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between p-3 border rounded-md"
            >
              <div>
                <p className="font-semibold">{filing.id}</p>
                <p className="text-gray-500 text-sm">
                  {t("filings.date", { date: filing.date })}
                </p>
              </div>
              <span
                className={`text-sm px-3 py-1 rounded-md ${
                  filing.status === "completed"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {filing.status === "completed" ? (
                  <FaCheckCircle className="inline mr-1" />
                ) : (
                  <FaClock className="inline mr-1" />
                )}
                {t(`filings.${filing.status}`)}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
