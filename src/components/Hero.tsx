// src/components/Hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { brand } from "@/lib/brand";

function telHref(phone: string) {
  const cleaned = phone.trim();
  return cleaned.startsWith("tel:") ? cleaned : `tel:${cleaned.replace(/\s+/g, "")}`;
}

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1920&auto=format&fit=crop"
          alt={`${brand.name} handyman work`}
          fill
          priority
          className="object-cover"
        />
        {/* Premium overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/35 to-black/55" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-28 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="max-w-2xl"
        >
          {/* Glass hero card */}
          <div className="glass glass-border rounded-3xl p-6 md:p-10 text-white">
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.35 }}
              className="font-serif text-4xl md:text-6xl leading-tight tracking-tight"
            >
              {t("hero_h")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.35 }}
              className="mt-4 text-lg/7 text-white/90"
            >
              {t("hero_p")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.35 }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/contact"
                className={[
                  "inline-flex items-center justify-center rounded-2xl px-6 py-3",
                  "font-semibold text-white",
                  "bg-[color:var(--color-teal)] hover:opacity-95",
                  "shadow-md hover:shadow-lg transition",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-teal)]",
                ].join(" ")}
              >
                {t("cta_quote")}
              </Link>

              <a
                href={telHref(brand.phone)}
                className={[
                  "inline-flex items-center justify-center rounded-2xl px-6 py-3",
                  "font-medium text-white",
                  "border border-white/40 hover:bg-white/10",
                  "transition",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
                ].join(" ")}
              >
                {t("call_now")}
              </a>
            </motion.div>

            {/* Location trust line */}
            <div className="mt-6 text-sm text-white/75">
              {brand.name} · {brand.location.city} · Zuid-Holland
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
