import "./globals.css";
import { ReactNode } from "react";
import { Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "sonner";
import { routing } from "@/i18n/routing";
import { METADATA } from "@/shared/lib/utils/constants";
import { QueryProvider } from "./providers/query-provider";

const rubik = Montserrat({
  subsets: ["cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata = METADATA;

interface Props {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

const LocaleLayout = async ({ children, params }: Readonly<Props>) => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className={rubik.variable}>
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <QueryProvider>
            <Toaster position="top-center" />

            <main className="flex-1">{children}</main>
          </QueryProvider>
          ;
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
