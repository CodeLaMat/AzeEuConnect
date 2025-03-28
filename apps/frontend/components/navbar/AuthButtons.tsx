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
        className="bg-yellow-500 text-black font-bold hover:bg-yellow-600 cursor-pointer"
        asChild
      >
        <Link href={`/${locale}/signin`}>{t("logIn")}</Link>
      </Button>
      <Button
        className="bg-green-500 text-white font-bold hover:bg-green-600 cursor-pointer"
        asChild
      >
        <Link href={`/${locale}/signup`}>{t("signUp")} </Link>
      </Button>
    </>
  );
}
