"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { FaFileAlt } from "react-icons/fa";

export default function Dashboard() {
  const t = useTranslations("dashboard");
  const user = useSelector((state: RootState) => state.user);
  const profile = useSelector((state: RootState) => state.profile);

  const [progress] = useState(60);

  console.log("User: ", user);

  const tasks = [
    { key: "task1", days: 3, color: "text-red-500" },
    { key: "task2", days: 7, color: "text-yellow-500" },
    { key: "task3", days: 14, color: "text-green-500" },
  ];

  const documents = [
    { name: "Articles_of_Association.pdf", date: "Mar 15, 2025" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>

      {/* Display User Info */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold">
          Welcome, {profile?.firstName || "User"} {profile?.lastName || ""}
        </h2>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
        {profile?.location && <p>Location: {profile.location}</p>}
      </section>

      {/* Registration Status */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-bold">{t("registrationStatus.title")}</h2>
        <p className="text-yellow-600 font-bold">
          {t("registrationStatus.inProgress")}
        </p>
        <Progress value={progress} className="mt-2" />
        <p className="text-gray-600 text-sm mt-2">
          {t("registrationStatus.completedSteps", { completed: 3, total: 5 })}
        </p>
      </section>

      {/* Upcoming Tasks */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-bold">{t("upcomingTasks.title")}</h2>
        <ul className="mt-3 space-y-2">
          {tasks.map((task, idx) => (
            <li key={idx} className={`${task.color} flex items-center`}>
              • {t(`upcomingTasks.${task.key}`, { days: task.days })}
            </li>
          ))}
        </ul>
      </section>

      {/* Subscription */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-bold">{t("subscription.title")}</h2>
        <p className="font-bold">{t("subscription.plan", { plan: "Pro" })}</p>
        <p className="text-gray-600 text-sm">
          {t("subscription.activeUntil", { date: "Mar 18, 2026" })}
        </p>
        <Button className="mt-3 bg-blue-600 text-white hover:bg-blue-700">
          {t("subscription.manage")}
        </Button>
      </section>

      {/* Recent Documents */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold">{t("recentDocuments.title")}</h2>
        <ul className="mt-3 space-y-2">
          {documents.map((doc, idx) => (
            <li key={idx} className="flex items-center text-gray-600">
              <span className="text-blue-500 mr-2">
                <FaFileAlt />
              </span>{" "}
              {doc.name} ({t("recentDocuments.uploaded", { date: doc.date })})
            </li>
          ))}
        </ul>
        <p className="text-blue-500 mt-2 hover:underline cursor-pointer">
          {t("recentDocuments.viewAll")}
        </p>
      </section>
    </div>
  );
}
