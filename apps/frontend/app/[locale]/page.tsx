"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import HeroSection from "@/components/landing/HeroSection";

export default function LandingPage() {
  const t = useTranslations();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredServices = selectedCategory
    ? serviceKeys.filter((key) => key === selectedCategory)
    : serviceKeys;

  return (
    <div className="min-h-screen bg-background text-secondary">
      {/* Hero Section */}
      <div className="relative w-full flex items-center justify-center  text-center">
        <HeroSection />
      </div>

      {/* Category Filter Buttons */}
      <section className="text-center py-12 px-4">
        <h2 className="text-3xl font-bold mb-6">{t("services.title")}</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {serviceKeys.map((key) => (
            <Button
              key={key}
              variant={selectedCategory === key ? "default" : "outline"}
              onClick={() =>
                setSelectedCategory(selectedCategory === key ? null : key)
              }
              className="capitalize"
            >
              {t(`services.${key}`)}
            </Button>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 px-6 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredServices.map((key) => (
          <Card key={key} className="p-4 shadow-md hover:scale-105 transition">
            <CardContent>
              <h3 className="text-xl font-semibold">{t(`services.${key}`)}</h3>
              <p className="text-muted-foreground mt-2">
                {t(`services.${key}Desc`)}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Pricing Plans */}
      <section className="py-16 px-6 text-center text-secondary">
        <h2 className="text-3xl font-bold mb-8">{t("pricing.title")}</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingKeys.map((key) => (
            <Card key={key} className="p-6 shadow-md">
              <CardContent>
                <h3 className="text-2xl font-bold">
                  {t(`pricing.plans.${key}`)}
                </h3>
                <p className="text-xl font-semibold text-accent mt-2">
                  {t(`pricing.plans.${key}Price`)}
                </p>
                <p className="text-muted-foreground mt-2">
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

// Mock service and pricing keys
const serviceKeys = [
  "companyFormation",
  "legalTax",
  "banking",
  "virtualOffice",
  "trademark",
  "aiLegalChat",
];

const pricingKeys = ["basic", "pro", "enterprise"];
