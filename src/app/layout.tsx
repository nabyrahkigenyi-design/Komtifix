import type { Metadata } from "next";
import "./globals.css";
import { cookies } from "next/headers";
import { LanguageProvider, type Lang } from "@/lib/i18n";
import { LocalBusinessJSON } from "@/components/SEO";

export const metadata: Metadata = {
  title: "Klusdam – Bouw & Renovatie in Schiedam",
  description:
    "Allround bouwbedrijf in Schiedam: laminaat, badkamers, plavuizen, schilder, stukadoor, tegelzetter, vloerverwarming, WC renovatie, timmerwerk.",
  metadataBase: new URL("https://klusdam.nl"),
  openGraph: {
    title: "Klusdam – Bouw & Renovatie in Schiedam",
    description:
      "Vakmanschap in badkamers, tegels, vloerverwarming, stuc- en schilderwerk. Gratis offerte.",
    url: "https://klusdam.nl",
    siteName: "Klusdam",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Klusdam" }],
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Klusdam – Bouw & Renovatie",
    description:
      "Vakmanschap in badkamers, tegels, vloerverwarming, stuc- en schilderwerk.",
    images: ["/og.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
};

const LANGS: Lang[] = ["nl", "en", "de", "fr", "tr", "ar"];

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get("lang")?.value;

  const initialLang =
    cookieLang && (LANGS as string[]).includes(cookieLang) ? (cookieLang as Lang) : "nl";

  return (
    <html lang={initialLang} dir={initialLang === "ar" ? "rtl" : "ltr"}>
      <body className="antialiased bg-cream text-charcoal text-[17px]">
        <LanguageProvider initialLang={initialLang}>
          {children}
          <LocalBusinessJSON />
        </LanguageProvider>
      </body>
    </html>
  );
}
