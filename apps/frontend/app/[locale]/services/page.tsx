"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  FaGavel,
  FaCreditCard,
  FaRobot,
  FaHome,
  FaHeartbeat,
  FaFilm,
  FaShieldAlt,
  FaUtensils,
  FaTruck,
  FaChalkboardTeacher,
  FaIndustry,
  FaFutbol,
  FaEllipsisH,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { JSX } from "react";
import { serviceCategories } from "../../../lib/options";

export default function Services() {
  const t = useTranslations("services");
  const router = useRouter();
  const locale = useLocale();

  const iconMap: Record<string, JSX.Element> = {
    LEGAL: <FaGavel />,
    FINANCE: <FaCreditCard />,
    TECH: <FaRobot />,
    REAL_ESTATE: <FaHome />,
    HEALTHCARE: <FaHeartbeat />,
    ENTERTAINMENT: <FaFilm />,
    SECURITY: <FaShieldAlt />,
    FOOD: <FaUtensils />,
    TRANSPORTATION: <FaTruck />,
    EDUCATION: <FaChalkboardTeacher />,
    MANUFACTURING: <FaIndustry />,
    SPORTS: <FaFutbol />,
    OTHER: <FaEllipsisH />,
  };

  const handleCategorySelect = (category: string) => {
    router.push(`/${locale}/services/category?category=${category}`);
  };

  return (
    <main className="container mx-auto py-12 px-6  text-secondary">
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

      {/* Categories Grid */}
      <section className="grid md:grid-cols-3 gap-6">
        {serviceCategories.map((category: any, index: number) => (
          <motion.div
            key={category.value}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-primary shadow-md p-6 rounded-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => handleCategorySelect(category.value)}
          >
            <div className="text-secondary-foreground text-5xl mb-4">
              {iconMap[category.value] || <FaEllipsisH />}
            </div>
            <h3 className="text-xl font-semibold">
              {t(`categoryLabels.${category.value.toLowerCase()}`)}
            </h3>
            <p className="text-gray-600 mt-2">
              {t(`categoryDescriptions.${category.value.toLowerCase()}`)}
            </p>
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
