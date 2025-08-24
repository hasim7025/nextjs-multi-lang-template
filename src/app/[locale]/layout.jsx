import React from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import { Italiana, Quicksand } from "next/font/google";
import "../globals.css";

const italiana = Italiana({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-italiana",
  display: "swap",
});

const playfair = Quicksand({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const isEnglish = locale === "en";

  const title = isEnglish ? "Villa Kramer" : "Villa Kramer";

  const description = isEnglish
    ? "Discover Villa Kramer, your perfect getaway in the Alps."
    : "Entdecken Sie Villa Kramer, Ihr perfektes Refugium in den Alpen.";

  const baseUrl = "https://villa-kramer.vercel.app";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: "%s | Villa Kramer",
    },
    description,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: "https://villa-kramer.vercel.app",
      siteName: "Villa Kramer",
      images: [
        {
          url: `${baseUrl}/banner.webp`,
          width: 1200,
          height: 630,
          alt: "Villa Kramer",
        },
      ],
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/banner.webp`],
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${italiana.variable} ${playfair.variable}`}>
      <body
        // className="tracking-widest"
        className={`tracking-widest`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
