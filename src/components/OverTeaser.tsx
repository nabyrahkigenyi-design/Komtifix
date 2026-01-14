// src/components/OverTeaser.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { brand } from "@/lib/brand";

export default function OverTeaser() {
  const { t } = useI18n();

  return (
    <section id="over" className="py-16 md:py-20 pattern-tools" data-reveal>
      <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-10 items-center">
        {/* Text */}
        <div className="fade-light rounded-3xl p-6 md:p-8 border border-black/5 bg-white/60 backdrop-blur">
          <p className="text-xs font-bold uppercase tracking-widest text-black/50">
            {brand.location.city} • {brand.location.region}
          </p>

          <h2 className="mt-2 font-serif text-3xl md:text-4xl tracking-tight">
            {t("over_title")}
          </h2>

          <p className="mt-4 text-lg text-black/80">{t("over_intro")}</p>

          <ul className="mt-5 space-y-2 text-base text-black/75">
            <li>• {t("over_bullet_1")}</li>
            <li>• {t("over_bullet_2")}</li>
            <li>• {t("over_bullet_3")}</li>
          </ul>

          {/* Use brand city in a safe, non-i18n-dependent way */}
          <p className="mt-5 text-black/75">
            {t("over_location")}{" "}
            <span className="font-semibold text-black/90">{brand.location.city}</span>.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-bold text-white bg-teal hover:bg-teal/90 transition shadow-lg shadow-teal/10"
            >
              {t("cta_quote")}
            </Link>

            <a
              href={`tel:${brand.phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold border border-black/10 bg-white/70 hover:bg-white transition"
            >
              {t("call_now")}
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-black/5 min-h-[320px]" data-reveal>
          <Image
            src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop"
            alt={t("over_image_alt")}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
