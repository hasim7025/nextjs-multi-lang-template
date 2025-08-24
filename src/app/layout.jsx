import React from "react";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const isEnglish = locale === "en";

  const title = isEnglish ? "website" : "website";

  const description = isEnglish
    ? "Website Description"
    : "Website Description in German";

  const baseUrl = "https://website.vercel.app";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: "%s | website",
    },
    description,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: "https://website.vercel.app",
      siteName: "website",
      images: [
        {
          url: `${baseUrl}/banner.webp`,
          width: 1200,
          height: 630,
          alt: "website",
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

export default function RootLayout({ children }) {

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://website.vercel.app" />
      </head>
      <body>{children}</body>
    </html>
  );
}
