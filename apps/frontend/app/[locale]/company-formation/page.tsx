"use client";

import { useTranslations } from "next-intl";

export default function CompanyFormation() {
  const t = useTranslations("companyFormation");

  return (
    <main className="container mx-auto py-10 px-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-blue-700">{t("title")}</h1>
      <p className="mt-4 text-gray-700">{t("description")}</p>

      {/* Steps for Company Formation */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold">{t("stepsTitle")}</h2>
        <ol className="list-decimal list-inside mt-4 space-y-2 text-gray-700">
          <li>{t("steps.step1")}</li>
          <li>{t("steps.step2")}</li>
          <li>{t("steps.step3")}</li>
          <li>{t("steps.step4")}</li>
          <li>{t("steps.step5")}</li>
        </ol>
      </section>

      {/* Benefits of EU Company Formation */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">{t("benefitsTitle")}</h2>
        <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
          <li>{t("benefits.benefit1")}</li>
          <li>{t("benefits.benefit2")}</li>
          <li>{t("benefits.benefit3")}</li>
          <li>{t("benefits.benefit4")}</li>
        </ul>
      </section>

      {/* Required Documents */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">{t("documentsTitle")}</h2>
        <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
          <li>{t("documents.document1")}</li>
          <li>{t("documents.document2")}</li>
          <li>{t("documents.document3")}</li>
          <li>{t("documents.document4")}</li>
        </ul>
      </section>

      {/* CTA */}
      <div className="mt-10 text-center">
        <p className="text-lg text-gray-800">{t("ctaText")}</p>
        <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          {t("getStarted")}
        </button>
      </div>
    </main>
  );
}
