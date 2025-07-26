"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LanguageSwitcherProps {
  locale: string;
  handleLanguageChange: (newLocale: string) => void;
  t: (key: string) => string;
}

export default function LanguageSwitcher({
  locale,
  handleLanguageChange,
  t,
}: LanguageSwitcherProps) {
  return (
    <Select onValueChange={handleLanguageChange} defaultValue={locale}>
      <SelectTrigger className=" border-2 cursor-pointer border-accent-200 hover:border-accent-300 focus:ring-0 focus:border-accent-300">
        <SelectValue placeholder={t("selectLanguage")} />
      </SelectTrigger>
      <SelectContent className=" bg-primary-50">
        <SelectItem value="az" className="cursor-pointer">AZ</SelectItem>
        <SelectItem value="en" className="cursor-pointer">EN</SelectItem>
        <SelectItem value="ru" className="cursor-pointer">РУС</SelectItem>
        <SelectItem value="de" className="cursor-pointer">DE</SelectItem>
      </SelectContent>
    </Select>
  );
}
