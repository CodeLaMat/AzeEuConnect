"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaFileAlt, FaUpload, FaCheckCircle, FaClock } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function DocumentPage() {
  const t = useTranslations("dashboard.documents");

  // Mock document data
  const [documents, setDocuments] = useState([
    {
      name: "Articles_of_Association.pdf",
      date: "Mar 15, 2025",
      status: "approved",
    },
    { name: "Business_License.pdf", date: "Mar 10, 2025", status: "pending" },
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>

      {/* Upload Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-bold">{t("upload.title")}</h2>
        <p className="text-gray-600">{t("upload.description")}</p>
        <div className="mt-4 flex items-center space-x-4">
          <input type="file" className="border p-2 rounded-md" />
          <Button className="bg-blue-600 text-white flex items-center">
            <FaUpload className="mr-2" /> {t("upload.button")}
          </Button>
        </div>
      </section>

      {/* Document Status Tracking */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-bold">{t("status.title")}</h2>
        <div className="mt-4">
          <div className="flex justify-between text-sm font-semibold">
            <span>{t("status.documentReview")}</span>
            <span className="text-green-600">{t("status.completed")}</span>
          </div>
          <Progress value={100} className="h-2 bg-green-500 mt-2" />

          <div className="flex justify-between text-sm font-semibold mt-4">
            <span>{t("status.verification")}</span>
            <span className="text-yellow-600">{t("status.inProgress")}</span>
          </div>
          <Progress value={50} className="h-2 bg-yellow-500 mt-2" />
        </div>
      </section>

      {/* Recent Documents */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold">{t("recentDocuments.title")}</h2>
        <ul className="mt-3 space-y-3">
          {documents.map((doc, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between p-3 border rounded-md"
            >
              <div className="flex items-center">
                <FaFileAlt className="text-blue-500 mr-3" />
                <div>
                  <p className="font-semibold">{doc.name}</p>
                  <p className="text-gray-500 text-sm">
                    {t("recentDocuments.uploaded", { date: doc.date })}
                  </p>
                </div>
              </div>
              <span
                className={`text-sm px-3 py-1 rounded-md ${
                  doc.status === "approved"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {doc.status === "approved" ? (
                  <FaCheckCircle className="inline mr-1" />
                ) : (
                  <FaClock className="inline mr-1" />
                )}
                {t(`status.${doc.status}`)}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
