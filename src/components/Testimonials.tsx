"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";

type Review = {
  source: "google" | "werkspot";
  name: string;
  textKey: string; // i18n key
  stars: 4 | 5;
};

const BG = "https://i.ibb.co/ycJLF4mp/092091021.jpg"; // replace later if needed

// Use i18n keys for the review texts
const reviews: Review[] = [
  {
    source: "google",
    name: "Jeroen • Schiedam",
    textKey: "review_1",
    stars: 5,
  },
  {
    source: "werkspot",
    name: "Meral • Rotterdam",
    textKey: "review_2",
    stars: 5,
  },
  {
    source: "google",
    name: "Koen • Vlaardingen",
    textKey: "review_3",
    stars: 4,
  },
  {
    source: "werkspot",
    name: "Anja • Schiedam",
    textKey: "review_4",
    stars: 5,
  },
];

function GoogleLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className="w-6 h-6" {...props}>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.5 31.6 29.1 34 24 34c-7.2 0-13-5.8-13-13S16.8 8 24 8c3.3 0 6.3 1.2 8.6 3.3l5.7-5.7C34.7 2.3 29.7 0 24 0 10.7 0 0 10.7 0 24s10.7 24 24 24c12.4 0 22.8-9 24-21v-6.5z"
      />
      <path fill="#FF3D00" d="M0 0h48v48H0z" fillOpacity="0" />
      <path
        fill="#4CAF50"
        d="M0 24c0-13.3 10.7-24 24-24 5.7 0 10.7 2.3 14.4 5.6l-5.7 5.7C30.3 8.2 27.3 7 24 7 16.8 7 11 12.8 11 20s5.8 13 13 13c5.1 0 9.5-2.4 11.3-6H24v-8h19v1c0 13-10.4 22-23 22C10.7 42 0 37.3 0 24z"
        opacity=".001"
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
    <div className="flex">
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
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIdx((v) => (v + 1) % reviews.length);
    }, 4000);
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

  return (
    <section className="relative" data-reveal>
      <div className="absolute inset-0 -z-10">
        <img src={BG} className="w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      <div
        className="mx-auto max-w-7xl px-4 py-20 text-white"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold">{t("reviews_h")}</h2>

        <div
          className="relative mt-8 max-w-xl overflow-hidden rounded-xl ring-1 ring-white/10 bg-white/5 backdrop-blur"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            ref={trackRef}
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${idx * 100}%)` }}
          >
            {reviews.map((r, i) => (
              <div key={i} className="min-w-full p-6">
                <div className="flex items-center gap-3">
                  {r.source === "google" ? <GoogleLogo /> : <WerkspotLogo />}
                  <div className="text-sm opacity-90">
                    {r.source === "google" ? t("source_google") : t("source_werkspot")}
                  </div>
                </div>

                <div className="mt-3">
                  <Stars n={r.stars} />
                </div>

                <p className="mt-4 text-base leading-relaxed">{t(r.textKey)}</p>
                <p className="mt-3 text-sm opacity-90">— {r.name}</p>
              </div>
            ))}
          </div>

          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                aria-label={`${t("go_to_review")} ${i + 1}`}
                className={`w-2 h-2 rounded-full ${i === idx ? "bg-white" : "bg-white/40"}`}
                onClick={() => setIdx(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
