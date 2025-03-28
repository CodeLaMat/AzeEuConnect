"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  FaCheckCircle,
  FaClock,
  FaCreditCard,
  FaBuilding,
} from "react-icons/fa";
import { Progress } from "@/components/ui/progress";

export default function BankingPage() {
  const t = useTranslations("dashboard.banking");

  // Mock status data
  const [setupProgress, setSetupProgress] = useState(50);

  const services = [
    {
      icon: <FaBuilding />,
      title: "businessAccounts",
      desc: "businessAccountsDesc",
    },
    {
      icon: <FaCreditCard />,
      title: "corporateCards",
      desc: "corporateCardsDesc",
    },
  ];

  const transactions = [
    {
      id: "TXN12345",
      date: "Mar 18, 2025",
      amount: "+$5,000",
      status: "completed",
    },
    {
      id: "TXN12346",
      date: "Mar 17, 2025",
      amount: "-$1,200",
      status: "pending",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>

      {/* Bank Account Setup Progress */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-bold">{t("setup.title")}</h2>
        <p className="text-yellow-600 font-bold">{t("setup.inProgress")}</p>
        <Progress value={setupProgress} className="mt-2" />
        <p className="text-gray-600 text-sm mt-2">
          {t("setup.progress", { completed: 2, total: 4 })}
        </p>
      </section>

      {/* Banking Services */}
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

      {/* Recent Transactions */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold">{t("transactions.title")}</h2>
        <ul className="mt-3 space-y-3">
          {transactions.map((txn, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between p-3 border rounded-md"
            >
              <div>
                <p className="font-semibold">{txn.id}</p>
                <p className="text-gray-500 text-sm">
                  {t("transactions.date", { date: txn.date })}
                </p>
              </div>
              <span
                className={`text-sm px-3 py-1 rounded-md ${
                  txn.status === "completed"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {txn.status === "completed" ? (
                  <span className="inline mr-1">
                    <FaCheckCircle />
                  </span>
                ) : (
                  <span className="inline mr-1">
                    <FaClock />
                  </span>
                )}
                {t(`transactions.${txn.status}`)}
              </span>
              <p className="font-bold">{txn.amount}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
