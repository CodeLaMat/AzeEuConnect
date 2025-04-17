"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import HeroSection from "@/components/landing/HeroSection";
import { serviceCategories } from "../../lib/options";


export default function LandingPage() {
  const t = useTranslations("services");
  const locale = useLocale();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    router.push(`/${locale}/services/category?category=${category}`);
  };

  return (
    <div className="min-h-screen bg-background text-secondary">
      {/* Hero Section */}
      <div className="relative w-full flex items-center justify-center text-center">
        <HeroSection />
      </div>

      {/* Category Filter Buttons */}
      <section className="text-center py-12 px-4">
        <h2 className="text-3xl font-bold mb-6">{t("title")}</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {serviceCategories.map((category) => (
            <Button
              key={category.value}
              onClick={() => handleCategoryClick(category.value)}
              className="capitalize"
              variant="outline"
            >
              {t(`categoryLabels.${category.value.toLowerCase()}`)}
            </Button>
          ))}
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 px-6 text-center text-secondary">
        <h2 className="text-3xl font-bold mb-8">{t("pricing.title")}</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingKeys.map((key) => (
            <Card key={key} className="p-6 shadow-md">
              <CardContent>
                <h3 className="text-2xl font-bold">{t(`pricing.plans.${key}`)}</h3>
                <p className="text-xl font-semibold text-accent mt-2">
                  {t(`pricing.plans.${key}Price`)}
                </p>
                <p className="text-muted-foreground mt-2">
                  {t(`pricing.plans.${key}Desc`)}
                </p>
                <Button className="mt-4 bg-primary-foreground text-primary px-4 py-2 rounded-lg">
                  {t("ctaButton")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

const pricingKeys = ["basic", "pro", "enterprise"];
