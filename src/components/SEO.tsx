// src/components/SEO.tsx
"use client";

import Script from "next/script";
import { services } from "@/lib/services";
import { useI18n } from "@/lib/i18n";
import { brand } from "@/lib/brand";

function phoneDigits(phone: string) {
  // For wa.me links: digits only, keep leading country code if present
  return phone.replace(/[^0-9]/g, "");
}

// --- Local Business JSON-LD ---
export function LocalBusinessJSON() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: brand.name,
    url: brand.url,
    telephone: brand.phone, // keep as human-readable
    address: {
      "@type": "PostalAddress",
      streetAddress: brand.address,
      addressLocality: brand.location.city,
      addressRegion: brand.location.region,
      addressCountry: brand.location.country,
    },
    // Use nearby areas to support local SEO
    areaServed: ["Leidschendam", "Voorburg", "Den Haag", "Wassenaar", "Rijswijk"],
    image: [`${brand.url}/og.jpg`],
    sameAs: [
      // Replace with real profiles when available; ok to keep empty later
      `https://wa.me/${phoneDigits(brand.phone)}`,
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "16:00",
      },
      // If closed Sundays, omit Sunday entirely (cleaner for schema)
    ],
  };

  return (
    <Script id="jsonld-local" type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(data)}
    </Script>
  );
}

// --- Service JSON-LD (no FAQ because Service type has no faq fields) ---
export function ServiceJSON({ slug }: { slug: string }) {
  const { t } = useI18n();

  const svc = services.find((s) => s.slug === slug);
  if (!svc) return null;

  const title = t(svc.titleKey) || brand.name;
  const excerpt = t(svc.excerptKey) || "";

  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    serviceType: title,
    description: excerpt,
    provider: {
      "@type": "LocalBusiness",
      name: brand.name,
      telephone: brand.phone,
      url: brand.url,
    },
    areaServed: `${brand.location.city} en regio Den Haag`,
    url: `${brand.url}/diensten/${svc.slug}`,
    image: svc.images?.length ? svc.images : [svc.img],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      description: t("cta_quote"),
    },
  };

  return (
    <Script id={`jsonld-service-${slug}`} type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(data)}
    </Script>
  );
}
