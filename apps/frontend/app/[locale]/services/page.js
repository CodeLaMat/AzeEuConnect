"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Services;
var next_intl_1 = require("next-intl");
var react_1 = require("motion/react");
var fa_1 = require("react-icons/fa");
var navigation_1 = require("next/navigation");
var options_1 = require("@/lib/options");
function Services() {
    var t = (0, next_intl_1.useTranslations)("services");
    var router = (0, navigation_1.useRouter)();
    var locale = (0, next_intl_1.useLocale)();
    var iconMap = {
        LEGAL: <fa_1.FaGavel />,
        FINANCE: <fa_1.FaCreditCard />,
        TECH: <fa_1.FaRobot />,
        REAL_ESTATE: <fa_1.FaHome />,
        HEALTHCARE: <fa_1.FaHeartbeat />,
        ENTERTAINMENT: <fa_1.FaFilm />,
        SECURITY: <fa_1.FaShieldAlt />,
        FOOD: <fa_1.FaUtensils />,
        TRANSPORTATION: <fa_1.FaTruck />,
        EDUCATION: <fa_1.FaChalkboardTeacher />,
        MANUFACTURING: <fa_1.FaIndustry />,
        SPORTS: <fa_1.FaFutbol />,
        OTHER: <fa_1.FaEllipsisH />,
    };
    var handleCategorySelect = function (category) {
        router.push("/".concat(locale, "/services/category?category=").concat(category));
    };
    return (<main className="container mx-auto py-12 px-6 bg-primary text-secondary">
      {/* Hero Section */}
      <react_1.motion.section initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
        <h1 className="text-4xl font-bold text-secondary">{t("title")}</h1>
        <p className="mt-4 text-lg text-gray-600">{t("description")}</p>
      </react_1.motion.section>

      {/* Categories Grid */}
      <section className="grid md:grid-cols-3 gap-6">
        {options_1.serviceCategories.map(function (category, index) { return (<react_1.motion.div key={category.value} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="bg-white shadow-md p-6 rounded-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 cursor-pointer" onClick={function () { return handleCategorySelect(category.value); }}>
            <div className="text-secondary-foreground text-5xl mb-4">
              {iconMap[category.value] || <fa_1.FaEllipsisH />}
            </div>
            <h3 className="text-xl font-semibold">
              {t("categoryLabels.".concat(category.value.toLowerCase()))}
            </h3>
            <p className="text-gray-600 mt-2">
              {t("categoryDescriptions.".concat(category.value.toLowerCase()))}
            </p>
          </react_1.motion.div>); })}
      </section>

      {/* CTA Section */}
      <react_1.motion.section initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mt-12">
        <p className="text-lg text-gray-800">{t("ctaText")}</p>
        <button className="mt-4 px-6 py-3 bg-primary-foreground text-primary rounded-md hover:bg-blue-700 transition">
          {t("ctaButton")}
        </button>
      </react_1.motion.section>
    </main>);
}
