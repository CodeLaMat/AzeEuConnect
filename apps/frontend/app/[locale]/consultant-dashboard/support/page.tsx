"use client";

import { useTranslations } from "next-intl";
import {
  FaPhone,
  FaEnvelope,
  FaComments,
  FaQuestionCircle,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function SupportPage() {
  const t = useTranslations("dashboard.support");

  const faqs = [
    { question: "faq.faq1.question", answer: "faq.faq1.answer" },
    { question: "faq.faq2.question", answer: "faq.faq2.answer" },
    { question: "faq.faq3.question", answer: "faq.faq3.answer" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>

      {/* Contact Support Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-bold">{t("contact.title")}</h2>
        <p className="text-gray-600">{t("contact.description")}</p>
        <div className="mt-4 space-y-4">
          <div className="flex items-center space-x-4 p-4 border rounded-md">
            <FaPhone className="text-blue-600 text-2xl" />
            <div>
              <p className="font-semibold">{t("contact.phone")}</p>
              <p className="text-gray-500">+49 123 456 7890</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 border rounded-md">
            <FaEnvelope className="text-blue-600 text-2xl" />
            <div>
              <p className="font-semibold">{t("contact.email")}</p>
              <p className="text-gray-500">support@azeuconnect.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Chat Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-bold">{t("liveChat.title")}</h2>
        <p className="text-gray-600">{t("liveChat.description")}</p>
        <Button className="mt-3 bg-blue-600 text-white hover:bg-blue-700 flex items-center space-x-2">
          <FaComments />
          <span>{t("liveChat.startChat")}</span>
        </Button>
      </section>

      {/* FAQ Section */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold">{t("faq.title")}</h2>
        <div className="mt-4 space-y-4">
          {faqs.map((faq, idx) => (
            <details key={idx} className="border rounded-md p-4">
              <summary className="font-semibold cursor-pointer flex items-center space-x-2">
                <FaQuestionCircle className="text-blue-600" />
                <span>{t(faq.question)}</span>
              </summary>
              <p className="text-gray-600 mt-2">{t(faq.answer)}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
