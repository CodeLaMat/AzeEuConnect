"use client";

import { SessionProvider } from "next-auth/react";
import { IntlProvider } from "next-intl";

export function Providers({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, string>;
}) {
  return (
    <SessionProvider>
      <IntlProvider locale={locale} messages={messages}>
        {children}
      </IntlProvider>
    </SessionProvider>
  );
}
