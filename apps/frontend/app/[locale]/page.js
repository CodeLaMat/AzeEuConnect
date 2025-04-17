"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LandingPage;
var react_1 = require("react");
var next_intl_1 = require("next-intl");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var HeroSection_1 = require("@/components/landing/HeroSection");
function LandingPage() {
    var t = (0, next_intl_1.useTranslations)();
    var _a = (0, react_1.useState)(null), selectedCategory = _a[0], setSelectedCategory = _a[1];
    var filteredServices = selectedCategory
        ? serviceKeys.filter(function (key) { return key === selectedCategory; })
        : serviceKeys;
    return (<div className="min-h-screen bg-background text-secondary">
      {/* Hero Section */}
      <div className="relative w-full flex items-center justify-center  text-center">
        <HeroSection_1.default />
      </div>

      {/* Category Filter Buttons */}
      <section className="text-center py-12 px-4">
        <h2 className="text-3xl font-bold mb-6">{t("services.title")}</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {serviceKeys.map(function (key) { return (<button_1.Button key={key} variant={selectedCategory === key ? "default" : "outline"} onClick={function () {
                return setSelectedCategory(selectedCategory === key ? null : key);
            }} className="capitalize">
              {t("services.".concat(key))}
            </button_1.Button>); })}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 px-6 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredServices.map(function (key) { return (<card_1.Card key={key} className="p-4 shadow-md hover:scale-105 transition">
            <card_1.CardContent>
              <h3 className="text-xl font-semibold">{t("services.".concat(key))}</h3>
              <p className="text-muted-foreground mt-2">
                {t("services.".concat(key, "Desc"))}
              </p>
            </card_1.CardContent>
          </card_1.Card>); })}
      </section>

      {/* Pricing Plans */}
      <section className="py-16 px-6 text-center text-secondary">
        <h2 className="text-3xl font-bold mb-8">{t("pricing.title")}</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingKeys.map(function (key) { return (<card_1.Card key={key} className="p-6 shadow-md">
              <card_1.CardContent>
                <h3 className="text-2xl font-bold">
                  {t("pricing.plans.".concat(key))}
                </h3>
                <p className="text-xl font-semibold text-accent mt-2">
                  {t("pricing.plans.".concat(key, "Price"))}
                </p>
                <p className="text-muted-foreground mt-2">
                  {t("pricing.plans.".concat(key, "Desc"))}
                </p>
                <button_1.Button className="mt-4 bg-primary-foreground text-primary px-4 py-2 rounded-lg">
                  {t("getStarted")}
                </button_1.Button>
              </card_1.CardContent>
            </card_1.Card>); })}
        </div>
      </section>
    </div>);
}
// Mock service and pricing keys
var serviceKeys = [
    "companyFormation",
    "legalTax",
    "banking",
    "virtualOffice",
    "trademark",
    "aiLegalChat",
];
var pricingKeys = ["basic", "pro", "enterprise"];
