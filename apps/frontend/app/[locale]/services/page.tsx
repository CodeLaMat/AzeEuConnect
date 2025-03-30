"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import {
  FaBuilding,
  FaGavel,
  FaCreditCard,
  FaHome,
  FaTrademark,
  FaRobot,
} from "react-icons/fa";

export default function Services() {
  const t = useTranslations("services");

  const serviceList = [
    {
      icon: <FaBuilding />,
      title: t("companyFormation"),
      desc: t("companyFormationDesc"),
    },
    { icon: <FaGavel />, title: t("legalTax"), desc: t("legalTaxDesc") },
    { icon: <FaCreditCard />, title: t("banking"), desc: t("bankingDesc") },
    {
      icon: <FaHome />,
      title: t("virtualOffice"),
      desc: t("virtualOfficeDesc"),
    },
    { icon: <FaTrademark />, title: t("trademark"), desc: t("trademarkDesc") },
    { icon: <FaRobot />, title: t("aiLegalChat"), desc: t("aiLegalChatDesc") },
  ];

  return (
    <main className="container mx-auto py-12 px-6 bg-primary text-secondary">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-secondary">{t("title")}</h1>
        <p className="mt-4 text-lg text-gray-600">{t("description")}</p>
      </motion.section>

      {/* Services Grid */}
      <section className="grid md:grid-cols-3 gap-6">
        {serviceList.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white shadow-md p-6 rounded-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
          >
            <div className="text-secondary-foreground text-5xl mb-4">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold">{service.title}</h3>
            <p className="text-gray-600 mt-2">{service.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mt-12"
      >
        <p className="text-lg text-gray-800">{t("ctaText")}</p>
        <button className="mt-4 px-6 py-3 bg-primary-foreground text-primary rounded-md hover:bg-blue-700 transition">
          {t("ctaButton")}
        </button>
      </motion.section>
    </main>
  );
}
