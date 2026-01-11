"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import LanguageMenu from "./LanguageMenu";
import { useI18n } from "@/lib/i18n";
import SocialLinks from "./SocialLinks";

/* Inline icons (SVG) */
function IconShieldCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.25 4.5 5v6.485c0 5.052 3.607 7.95 6.53 9.22a2 2 0 0 0 1.94 0c2.924-1.27 6.53-4.168 6.53-9.22V5L12 2.25zM10.9 15.3l-2.6-2.6 1.06-1.06 1.54 1.54 3.74-3.74 1.06 1.06-4.8 4.8z" />
    </svg>
  );
}
function IconPin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
    </svg>
  );
}
function IconTools(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.7 13.35 19.65 15.4l-4.9-4.9 2.05-2.05a5 5 0 0 1-6.43-6.43L12.42 4 10.37 6.05l7.58 7.58 2.05-2.05 1.7 1.77zM3 21l4.24-4.24 2.83 2.83L5.83 24H3v-3z" />
    </svg>
  );
}
function IconFlame(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 2s.5 2.5-.5 4.5-3 2.5-3 4.5 1.5 3 3.5 3 4-1.5 4-4-2-4.5-4-8z" />
      <path d="M17 14c0 3.313-2.239 6-5 6s-5-2.687-5-6c0-1.55.6-2.91 1.6-3.98-.1 2.23 1.49 4.23 3.9 4.23 2.21 0 3.5-1.51 3.5-3.49 0-.42-.06-.83-.18-1.23C16.45 10.56 17 12.16 17 14z" />
    </svg>
  );
}
function IconBrush(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.71 5.63 18.37 3.29a1 1 0 0 0-1.41 0L5 15.25V19h3.75L20.71 7.04a1 1 0 0 0 0-1.41zM8.92 17H7v-1.92l8.66-8.66 1.92 1.92L8.92 17z" />
      <path d="M5 21c2.5 0 3.5-1.5 3.5-3H5a2 2 0 0 0 0 4z" />
    </svg>
  );
}
function IconPhone(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M2.25 5.25c0-1.243 1.007-2.25 2.25-2.25h2.09c.97 0 1.822.623 2.108 1.548l.735 2.45c.233.775-.11 1.607-.824 2.03l-1.256.742a1.25 1.25 0 0 0-.517 1.55 11.27 11.27 0 0 0 5.1 5.1 1.25 1.25 0 0 0 1.55-.517l.742-1.256a1.75 1.75 0 0 1 2.03-.824l2.45.735A2.25 2.25 0 0 1 21 19.66v2.09c0 1.243-1.007 2.25-2.25 2.25H17.5C9.491 24 2.25 16.759 2.25 8.75V5.25z" />
    </svg>
  );
}

export default function PreHeader() {
  const { t } = useI18n();

  const items = [
    { icon: IconShieldCheck, key: "ph_trust" },
    { icon: IconPin, key: "ph_region" },
    { icon: IconTools, key: "ph_services" },
    { icon: IconFlame, key: "ph_floorheat" },
    { icon: IconBrush, key: "ph_paint" },
  ] as const;

  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % items.length), 4000);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <div className="bg-charcoal text-white text-sm">
      <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between">
        {/* Left: phone with icon + offerte (desktop) */}
        <div className="hidden md:flex gap-4 items-center">
          <a href="tel:+31634099060" className="hover:text-bronze inline-flex items-center gap-2">
            <IconPhone className="w-4 h-4" />
            <span>06 34099060</span>
          </a>
          <Link href="/contact" className="bg-bronze text-charcoal px-3 py-1 rounded hover:opacity-90">
            {t("cta_quote")}
          </Link>
        </div>

        {/* Desktop marquee (desktop only) */}
        <div className="marquee flex-1 md:ml-8 hidden md:block" aria-label="Klusdam highlights">
          <ul>
            {items.concat(items).map((it, idx) => (
              <li key={idx} className="inline-flex items-center gap-2">
                <it.icon className="w-4 h-4" />
                <span>{t(it.key)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile (optional): show 1 rotating item if you want */}
        <div className="md:hidden flex-1 px-3 truncate">
          <div className="inline-flex items-center gap-2">
            {(() => {
              const It = items[i].icon;
              return <It className="w-4 h-4 shrink-0" />;
            })()}
            <span className="truncate">{t(items[i].key)}</span>
          </div>
        </div>

        {/* Right: socials + language */}
        <div className="flex items-center gap-4">
          <SocialLinks />
          <LanguageMenu />
        </div>
      </div>
    </div>
  );
}
