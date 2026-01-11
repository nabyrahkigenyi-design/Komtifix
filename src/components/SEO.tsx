"use client";

import Script from "next/script";
import { services } from "@/lib/services";
import { useI18n } from "@/lib/i18n";

// --- Klusdam Site Details ---
const site = {
  name: "Klusdam",
  url: "https://klusdam.nl",
  phone: "+31 6 34099060",
  street: "Von Leibnizstraat 23 a",
  postal: "3112 XN",
  city: "Schiedam",
  country: "NL",
};

// --- Local Business JSON-LD ---
export function LocalBusinessJSON() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    url: site.url,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.street,
      postalCode: site.postal,
      addressLocality: site.city,
      addressCountry: "NL",
    },
    areaServed: ["Schiedam", "Rotterdam", "Vlaardingen", "Maassluis"],
    image: [`${site.url}/og.jpg`],
    sameAs: [
      "https://www.facebook.com/",
      "https://www.instagram.com/",
      "https://www.linkedin.com/",
      `https://wa.me/${site.phone.replace(/[^0-9]/g, "")}`,
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
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "00:00",
        closes: "00:00",
      },
    ],
  };

  return (
    <Script id="jsonld-local" type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(data)}
    </Script>
  );
}

// --- Service JSON-LD (NO FAQ because Service type has no faq fields) ---
export function ServiceJSON({ slug }: { slug: string }) {
  const { t } = useI18n();

  const svc = services.find((s) => s.slug === slug);
  if (!svc) return null;

  const title = t(svc.titleKey) || site.name;
  const excerpt = t(svc.excerptKey) || "";

  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    serviceType: title,
    description: excerpt,
    provider: {
      "@type": "LocalBusiness",
      name: site.name,
      telephone: site.phone,
      url: site.url,
    },
    areaServed: "Schiedam en regio Rotterdam",
    url: `${site.url}/diensten/${svc.slug}`,
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
