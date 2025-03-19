"use client";

import { useEffect, useState } from "react";
import { IntlProvider } from "next-intl";

export function TranslationProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const [messages, setMessages] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    import(`@/locales/${locale}.json`)
      .then((module) => setMessages(module.default))
      .catch(() => setMessages(null));
  }, [locale]);

  if (!messages) return <p>Loading translations...</p>;

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}
