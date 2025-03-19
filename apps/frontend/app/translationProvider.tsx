"use client";

import { IntlProvider } from "next-intl";

export function TranslationProvider({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, string>;
}) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}
