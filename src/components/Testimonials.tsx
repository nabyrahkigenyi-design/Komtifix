// src/components/Testimonials.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { brand } from "@/lib/brand";

type Review = {
  source: "google" | "werkspot";
  nameKey: string; // i18n key (so we can localize city names if needed)
  textKey: string; // i18n key
  stars: 4 | 5;
};

/**
 * Keep as a placeholder background for now.
 * Later: replace with a Komtifix-specific photo in /public (faster, controlled).
 */
const BG = "https://i.ibb.co/ycJLF4mp/092091021.jpg";

// Reviews as keys (avoid hardcoding Schiedam/Rotterdam in code)
const reviews: Review[] = [
  { source: "google", nameKey: "review_name_1", textKey: "review_1", stars: 5 },
  { source: "werkspot", nameKey: "review_name_2", textKey: "review_2", stars: 5 },
  { source: "google", nameKey: "review_name_3", textKey: "review_3", stars: 4 },
  { source: "werkspot", nameKey: "review_name_4", textKey: "review_4", stars: 5 },
];

function GoogleLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className="w-6 h-6" {...props}>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.5 31.6 29.1 34 24 34c-7.2 0-13-5.8-13-13S16.8 8 24 8c3.3 0 6.3 1.2 8.6 3.3l5.7-5.7C34.7 2.3 29.7 0 24 0 10.7 0 0 10.7 0 24s10.7 24 24 24c12.4 0 22.8-9 24-21v-6.5z"
      />
    </svg>
  );
}

function WerkspotLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" {...props}>
      <rect x="2" y="4" width="20" height="16" rx="3" fill="#1b79ff" />
      <path d="M7 9h10v2H7zM7 13h7v2H7z" fill="white" />
    </svg>
  );
}

function Stars({ n }: { n: 4 | 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="w-4 h-4" fill="#fbbf24" aria-hidden>
          <path d="M12 17.3l-6.18 3.73 1.64-7.03L2 9.97l7.19-.61L12 2.7l2.81 6.66 7.19.61-5.46 4.03 1.64 7.03z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { t } = useI18n();

  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setIdx((v) => (v + 1) % reviews.length), 5200);
    return () => clearInterval(timer);
  }, [paused]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 50) {
      setIdx((v) => {
        if (dx < 0) return (v + 1) % reviews.length;
        return (v - 1 + reviews.length) % reviews.length;
      });
    }
    touchStart.current = null;
  };

  const current = useMemo(() => reviews[idx], [idx]);

  return (
    <section className="relative overflow-hidden" data-reveal>
      <div className="absolute inset-0 -z-10">
        <img src={BG} className="w-full h-full object-cover" alt="" />
        {/* Premium overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/35" />
        <div className="absolute inset-0 opacity-80 bg-[radial-gradient(900px_500px_at_15%_10%,rgba(14,165,164,0.25),transparent_60%)]" />
      </div>

      <div
        className="mx-auto max-w-7xl px-4 py-20 text-white"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="flex flex-col gap-2 max-w-2xl">
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight">
            {t("reviews_h")}
          </h2>
          <p className="text-white/80">
            {brand.name} · {brand.location.city} · {t("ph_trust")}
          </p>
        </div>

        <div
          className="relative mt-8 max-w-xl"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Card */}
          <div className="glass glass-border rounded-3xl p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <div className="flex items-center gap-3">
                  {current.source === "google" ? <GoogleLogo /> : <WerkspotLogo />}
                  <div className="text-sm text-white/85">
                    {current.source === "google" ? t("source_google") : t("source_werkspot")}
                  </div>
                </div>

                <div className="mt-3">
                  <Stars n={current.stars} />
                </div>

                <p className="mt-4 text-base leading-relaxed text-white/90">
                  {t(current.textKey)}
                </p>

                <p className="mt-3 text-sm text-white/80">
                  — {t(current.nameKey)}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="mt-5 flex justify-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  aria-label={`${t("go_to_review")} ${i + 1}`}
                  className={[
                    "h-2.5 w-2.5 rounded-full transition",
                    i === idx ? "bg-white" : "bg-white/40 hover:bg-white/60",
                  ].join(" ")}
                  onClick={() => setIdx(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
