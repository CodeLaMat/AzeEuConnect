"use client";

import { SessionProvider } from "next-auth/react";
import { IntlProvider } from "next-intl";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store/store";

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
        <ReduxProvider store={store}>{children}</ReduxProvider>
      </IntlProvider>
    </SessionProvider>
  );
}
