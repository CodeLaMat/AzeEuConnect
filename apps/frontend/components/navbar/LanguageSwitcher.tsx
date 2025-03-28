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
      <SelectTrigger className="w-36 bg-white text-blue-700 cursor-pointer">
        <SelectValue placeholder={t("selectLanguage")} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="az">🇦🇿 Azərbaycan</SelectItem>
        <SelectItem value="en">🇬🇧 English</SelectItem>
        <SelectItem value="ru">🇷🇺 Русский</SelectItem>
        <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
      </SelectContent>
    </Select>
  );
}
