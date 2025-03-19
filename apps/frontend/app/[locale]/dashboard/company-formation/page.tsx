"use client";

import { useTranslations } from "next-intl";
import { Progress } from "@/components/ui/progress";

export default function CompanyFormation() {
  const t = useTranslations("dashboard.companyFormation");

  const steps = [
    {
      title: "documentPreparation",
      progress: 100,
      status: "completed",
      color: "bg-green-500",
      textColor: "text-green-600",
    },
    {
      title: "notarization",
      progress: 30,
      status: "inProgress",
      color: "bg-yellow-500",
      textColor: "text-yellow-600",
    },
    {
      title: "bankAccountOpening",
      progress: 0,
      status: "notStarted",
      color: "bg-gray-300",
      textColor: "text-gray-500",
    },
    {
      title: "commercialRegisterEntry",
      progress: 0,
      status: "notStarted",
      color: "bg-gray-300",
      textColor: "text-gray-500",
    },
    {
      title: "taxRegistration",
      progress: 0,
      status: "notStarted",
      color: "bg-gray-300",
      textColor: "text-gray-500",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>

      {/* Registration Progress */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold">{t("registrationProgress")}</h2>
        {steps.map((step, idx) => (
          <div key={idx} className="mt-4">
            <div className="flex justify-between text-sm font-semibold">
              <span>{t(`steps.${step.title}`)}</span>
              <span className={step.textColor}>
                {t(`status.${step.status}`)}
              </span>
            </div>
            <Progress
              value={step.progress}
              className={`h-2 mt-2 ${step.color}`}
            />
          </div>
        ))}
      </section>
    </div>
  );
}
