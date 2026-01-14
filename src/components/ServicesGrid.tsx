// src/components/ServicesGrid.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { services } from "@/lib/services";
import { useI18n } from "@/lib/i18n";

type Mode = "featured" | "all";

type Props = {
  mode?: Mode; // default: featured (homepage)
  limit?: number; // default: 9 (homepage)
  showHeader?: boolean; // default: true
  showAllLink?: boolean; // default: true (homepage)
};

export default function ServicesGrid({
  mode = "featured",
  limit = 9,
  showHeader = true,
  showAllLink = true,
}: Props) {
  const { t } = useI18n();

  const visibleServices = [...services]
    .filter((s) => (mode === "featured" ? !!s.featured : true))
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
    .slice(0, limit);

  return (
    <section id="mogelijkheden" className="py-16 md:py-20 bg-ivory" data-reveal>
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        {showHeader && (
          <div className="flex items-end justify-between">
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight">
              {t("view_options")}
            </h2>

            {showAllLink && mode === "featured" && (
              <Link
                href="/diensten"
                className="hidden md:inline-flex items-center gap-1 font-semibold text-[color:var(--color-teal)] hover:opacity-90"
              >
                {t("all_services")} →
              </Link>
            )}
          </div>
        )}

        {/* Grid */}
        <div className={showHeader ? "mt-8" : "mt-0"}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleServices.map((svc, idx) => (
              <motion.div
                key={svc.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="h-full"
              >
                {/* Make the whole tile clickable */}
                <Link
                  href={`/diensten/${svc.slug}`}
                  aria-label={`${t("read_more")}: ${t(svc.titleKey)}`}
                  className={[
                    "group block h-full rounded-3xl overflow-hidden",
                    "bg-white/70 glass-border",
                    "border border-black/5",
                    "hover:shadow-lg transition-shadow",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-teal)]",
                  ].join(" ")}
                >
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={svc.img}
                      alt={t(svc.titleKey)}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold">{t(svc.titleKey)}</h3>

                    <p className="mt-2 text-sm text-black/70 line-clamp-3">
                      {t(svc.excerptKey)}
                    </p>

                    {/* Keep "Lees meer" visible, but avoid nested <a> */}
                    <div className="mt-4 inline-flex items-center gap-1 font-semibold text-[color:var(--color-teal)]">
                      {t("read_more")} →
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile CTA (only for featured mode) */}
        {mode === "featured" && showAllLink && (
          <div className="mt-6 md:hidden">
            <Link
              href="/diensten"
              className="inline-flex items-center gap-1 font-semibold text-[color:var(--color-teal)]"
            >
              {t("all_services")} →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
