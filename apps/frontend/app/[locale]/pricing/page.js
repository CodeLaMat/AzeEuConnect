"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Pricing;
var next_intl_1 = require("next-intl");
function Pricing() {
    var t = (0, next_intl_1.useTranslations)("pricing");
    return (<main className="container mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p className="mt-4 text-gray-700">{t("description")}</p>
    </main>);
}
