// src/components/MobileActionBar.tsx
"use client";

import { useMemo } from "react";
import { brand } from "@/lib/brand";
import { useI18n } from "@/lib/i18n";

function digitsOnly(phone: string) {
  return phone.replace(/[^0-9]/g, "");
}

function telHref(phone: string) {
  const cleaned = phone.trim();
  return cleaned.startsWith("tel:") ? cleaned : `tel:${cleaned.replace(/\s+/g, "")}`;
}

export default function MobileActionBar() {
  const { t } = useI18n();

  const waLink = useMemo(() => {
    const phone = digitsOnly(brand.phone);
    // Keep message short (better conversion), language-agnostic
    const text = encodeURIComponent(`${brand.name}: ${t("cta_quote")}`);
    return `https://wa.me/${phone}?text=${text}`;
  }, [t]);

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden pointer-events-none">
      <div className="mx-auto max-w-7xl px-4 pb-[env(safe-area-inset-bottom)]">
        <div className="pointer-events-auto mb-3 grid grid-cols-2 gap-3">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              "text-center rounded-2xl font-semibold py-3",
              "text-white",
              "bg-[color:var(--color-emerald)]/90 hover:opacity-95",
              "shadow-sm active:scale-[0.99] transition",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-emerald)]",
            ].join(" ")}
            aria-label="WhatsApp"
          >
            WhatsApp
          </a>

          <a
            href={telHref(brand.phone)}
            className={[
              "text-center rounded-2xl font-semibold py-3",
              "text-white",
              "bg-[color:var(--color-teal)] hover:opacity-95",
              "shadow-sm active:scale-[0.99] transition",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-teal)]",
            ].join(" ")}
            aria-label={t("call")}
          >
            {t("call")}
          </a>
        </div>

        {/* subtle background plate for contrast on busy pages */}
        <div className="pointer-events-none h-6 bg-gradient-to-t from-black/10 to-transparent rounded-b-2xl" />
      </div>
    </div>
  );
}
