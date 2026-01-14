// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { cookies } from "next/headers";
import { LanguageProvider, type Lang } from "@/lib/i18n";
import { LocalBusinessJSON } from "@/components/SEO";
import { Manrope, Playfair_Display } from "next/font/google";
import { brand } from "@/lib/brand";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${brand.name} – Handyman & Maintenance in ${brand.location.city}`,
  description: brand.seo.description,
  metadataBase: new URL(brand.url),
  openGraph: {
    title: `${brand.name} – Handyman & Maintenance in ${brand.location.city}`,
    description: brand.seo.ogDescription,
    url: brand.url,
    siteName: brand.name,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: brand.name }],
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} – Handyman & Maintenance`,
    description: brand.seo.twitterDescription,
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
      <body
        className={[
          "antialiased",
          manrope.variable,
          playfair.variable,
          // keep existing classes for now; we’ll upgrade tokens in globals.css next
          "bg-cream text-charcoal text-[17px]",
        ].join(" ")}
      >
        <LanguageProvider initialLang={initialLang}>
          {children}
          <LocalBusinessJSON />
        </LanguageProvider>
      </body>
    </html>
  );
}
