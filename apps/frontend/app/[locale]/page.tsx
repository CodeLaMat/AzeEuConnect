"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-primary text-secondary">
      {/* Hero Section */}
      <section className="text-center py-20  ">
        <h1 className="text-4xl font-bold">{t("heroTitle")}</h1>
        <p className="mt-4 text-lg">{t("heroDescription")}</p>
        <Button className="mt-6 bg-primary-foreground text-primary px-6 py-3 rounded-lg cursor-pointer">
          {t("getStarted")}
        </Button>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto ">
        {serviceKeys.map((key) => (
          <Card key={key} className="p-4 shadow-md ">
            <CardContent>
              <h3 className="text-xl font-semibold">{t(`services.${key}`)}</h3>
              <p className="text-text_secondary mt-2">
                {t(`services.${key}Desc`)}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Pricing Plans */}
      <section className="py-16  text-secondary text-center">
        <h2 className="text-3xl font-bold">{t("pricing.title")}</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto">
          {pricingKeys.map((key) => (
            <Card key={key} className="p-6 shadow-md ">
              <CardContent>
                <h3 className="text-2xl font-bold">
                  {t(`pricing.plans.${key}`)}
                </h3>
                <p className="text-xl font-semibold text-accent">
                  {t(`pricing.plans.${key}Price`)}
                </p>
                <p className="text-secondary mt-2">
                  {t(`pricing.plans.${key}Desc`)}
                </p>
                <Button className="mt-4 bg-primary-foreground text-primary px-4 py-2 rounded-lg">
                  {t("getStarted")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

const serviceKeys = [
  "companyFormation",
  "legalTax",
  "banking",
  "virtualOffice",
  "trademark",
  "aiLegalChat",
];

const pricingKeys = ["basic", "pro", "enterprise"];
