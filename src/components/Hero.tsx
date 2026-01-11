"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative" data-reveal>
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1920&auto=format&fit=crop"
          alt="Bouwplaats"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24 md:py-36">
        <div className="fade-dark rounded-xl p-6 md:p-10 text-white max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">{t("hero_h")}</h1>
          <p className="mt-4 text-lg/7 opacity-90">{t("hero_p")}</p>
          <div className="mt-6 flex items-center gap-3">
            <Link href="/contact" className="bg-bronze text-charcoal px-5 py-3 rounded-md font-semibold hover:opacity-90">
              {t("cta_quote")}
            </Link>
            <a href="tel:+31634099060" className="inline-flex items-center gap-2 border border-white/40 px-5 py-3 rounded-md hover:bg-white/10 font-medium">
              {t("call_now")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
