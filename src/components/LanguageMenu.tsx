"use client";

import { flags, useI18n } from "@/lib/i18n";
import { useEffect, useRef, useState } from "react";

export default function LanguageMenu() {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const entries = Object.entries(flags) as [
    keyof typeof flags,
    { label: string; src: string }
  ][];

  return (
    <div className="relative" ref={ref}>
      {/* Larger tap target for mobile */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-2 min-h-[40px] rounded ring-1 ring-white/40 hover:ring-white/70 bg-white/0"
        aria-label="Taal kiezen"
        aria-expanded={open}
      >
        {/* Crisp SVG flag */}
        <img
          alt={flags[lang].label}
          src={flags[lang].src}
          className="w-7 h-5 md:w-6 md:h-4"
          style={{ filter: "saturate(1.1)" }}
        />
        <span className="hidden sm:inline text-sm">{flags[lang].label}</span>
        <span className="text-xs opacity-80">▾</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 bg-white shadow rounded border border-black/10 w-52 z-50">
          {entries.map(([code, f]) => (
            <button
              key={code}
              onClick={() => {
                setLang(code as any);
                setOpen(false);
              }}
              className="w-full px-3 py-2 text-left hover:bg-cream flex items-center gap-3"
            >
              <img src={f.src} alt="" className="w-7 h-5 md:w-6 md:h-4" />
              <span className="text-sm">{f.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
