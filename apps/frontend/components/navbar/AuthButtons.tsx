"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface AuthButtonsProps {
  locale: string;
  t: (key: string) => string;
}

export default function AuthButtons({ locale, t }: AuthButtonsProps) {
  return (
    <>
      <Button
        className="bg-primary text-primary-foreground font-bold hover:bg-chart-2 cursor-pointer"
        asChild
      >
        <Link href={`/${locale}/signin`}>{t("logIn")}</Link>
      </Button>
      <Button
        className="bg-accent text-white font-bold hover:bg-chart-1 cursor-pointer"
        asChild
      >
        <Link href={`/${locale}/signup`}>{t("signUp")} </Link>
      </Button>
    </>
  );
}
