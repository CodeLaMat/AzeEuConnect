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
      className="relative w-2/3 h-[60vh] flex items-center justify-center bg-cover bg-center rounded-2xl text-center mt-2.5"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="absolute inset-0 bg-black/50 rounded-2xl" />
      <div className="relative z-10 max-w-3xl text-white text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          {t("heroTitle")}
        </h1>
        <p className="text-lg mt-4">{t("heroDescription")}</p>

        {/* Search Box */}
        <div className="mt-8 bg-secondary p-6 rounded-2xl shadow-md backdrop-blur-md">
          <div className="flex mb-4 justify-center space-x-2">
            <button
              onClick={() => setActiveTab("find")}
              className={`px-6 py-2 rounded-full text-sm font-medium ${
                activeTab === "find"
                  ? "bg-white text-black"
                  : "bg-transparent text-white border border-white"
              }`}
            >
              {t("findServices")}
            </button>
            <button
              onClick={() => setActiveTab("browse")}
              className={`px-6 py-2 rounded-full text-sm font-medium ${
                activeTab === "browse"
                  ? "bg-white text-black"
                  : "bg-transparent text-white border border-white"
              }`}
            >
              {t("offerServices")}
            </button>
          </div>

          <div className="flex gap-2 items-center">
            <Input
              placeholder={t("searchPlaceholder")}
              className="flex-grow px-4 py-2 text-black rounded-lg"
            />
            <Button className="bg-primary hover:bg-green-600 text-secondary px-6 py-2 rounded-lg cursor-pointer">
              {t("search")}
            </Button>
          </div>

          {/* Logos */}
          <div className="mt-6 flex justify-center items-center flex-wrap gap-6 opacity-80">
            <img src="/images/microsoft.svg" alt="Microsoft" className="h-5" />
            <img src="/images/airbnb.svg" alt="Airbnb" className="h-5" />
            <img src="/images/nasdaq.svg" alt="Nasdaq" className="h-5" />
            <img src="/images/glassdoor.svg" alt="Glassdoor" className="h-5" />
          </div>
        </div>
      </div>
    </section>
  );
}
