"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function HeroSection() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<"find" | "browse">("find");

  return (
    <section
      className="relative w-full h-[60vh] flex items-center justify-center bg-cover bg-center rounded-2xl text-center mt-2.5"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="absolute inset-0 bg-black/50 rounded-2xl " />
      <div className="relative z-10 w-full max-w-4xl text-white text-center px-4 sm:pt-8">
        <h1 className="text-3xl sm:text-3xl md:text-5xl font-bold leading-tight">
          {t("hero.title")}
        </h1>
        <p className="text-md sm:text-lg mt-4">{t("hero.description")}</p>

        {/* Search Box */}
        <div className="mt-8 bg-secondary/80 p-4 sm:p-6 rounded-2xl shadow-md backdrop-blur-md md:w-[70%]">
          {/* Tabs */}
          <div className="flex flex-col sm:flex-row mb-4 justify-center gap-2 sm:gap-4">
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                activeTab === "find"
                  ? "bg-white text-black"
                  : "bg-transparent text-white border border-white"
              }`}
            >
              {t("hero.findServices")}
            </button>
            <button
              onClick={() => setActiveTab("browse")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                activeTab === "browse"
                  ? "bg-white text-black"
                  : "bg-transparent text-white border border-white"
              }`}
            >
              {t("hero.offerServices")}
            </button>
          </div>

          {/* Search input and button */}
          <div className="flex flex-col sm:flex-row gap-3 items-center w-full">
            <Input
              placeholder={t("searchPlaceholder")}
              className="w-full px-4 py-2 text-black rounded-lg"
            />
            <Button className="w-full sm:w-auto bg-primary hover:bg-green-600 text-secondary px-6 py-2 rounded-lg">
              {t("hero.search")}
            </Button>
          </div>

          {/* Logos */}
          <div className="mt-6 flex justify-center items-center flex-wrap gap-4 sm:gap-6 opacity-80">
            <img src="/images/microsoft.svg" alt="Last search" className="h-5" />
            <img src="/images/airbnb.svg" alt="Last search" className="h-5" />
            <img src="/images/nasdaq.svg" alt="Last search" className="h-5" />
            <img src="/images/glassdoor.svg" alt="Last search" className="h-5" />
          </div>
        </div>
      </div>
    </section>
  );
}
