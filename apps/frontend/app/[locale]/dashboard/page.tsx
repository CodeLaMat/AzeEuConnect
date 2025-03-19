"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const t = useTranslations("dashboard");

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    router.push("/");
    return null;
  }

  return (
    <main className="container mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p className="mt-4 text-gray-700">
        {t("welcome", { name: session.user?.name || "Guest" })}
      </p>
    </main>
  );
}
