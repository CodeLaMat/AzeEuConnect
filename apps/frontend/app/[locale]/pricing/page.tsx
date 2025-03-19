"use client";

import { useTranslations } from "next-intl";

export default function Pricing() {
  const t = useTranslations("pricing");

  return (
    <main className="container mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p className="mt-4 text-gray-700">{t("description")}</p>
    </main>
  );
}
