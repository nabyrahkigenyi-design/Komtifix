// src/components/LanguageMenu.tsx
"use client";

import { flags, useI18n, type Lang } from "@/lib/i18n";
import { useEffect, useMemo, useRef, useState } from "react";

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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const entries = useMemo(() => {
    return (Object.entries(flags) as [Lang, { label: string; src: string }][])
      .filter(([code]) => Boolean(flags[code]?.label))
      .sort((a, b) => a[1].label.localeCompare(b[1].label));
  }, []);

  const current = flags[lang];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={[
          "flex items-center gap-2",
          "px-3 py-2 min-h-[40px]",
          "rounded-lg",
          "ring-1 ring-white/40 hover:ring-white/70",
          "bg-white/0",
          "text-white",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80",
        ].join(" ")}
        aria-label="Choose language"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <img
          alt={current.label}
          src={current.src}
          className="w-7 h-5 md:w-6 md:h-4 rounded-[2px] ring-1 ring-black/10"
          style={{ filter: "saturate(1.1)" }}
        />

        {/* FIX: make label visible (was hidden on small) and ensure contrast */}
        <span className="block text-sm font-medium leading-none text-white whitespace-nowrap">
          {current.label}
        </span>

        <span className="text-xs opacity-80">▾</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-56 z-50 overflow-hidden rounded-xl border border-black/10 bg-white shadow-xl"
        >
          {entries.map(([code, f]) => {
            const active = code === lang;
            return (
              <button
                key={code}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                onClick={() => {
                  setLang(code);
                  setOpen(false);
                }}
                className={[
                  "w-full px-3 py-2 text-left",
                  "flex items-center gap-3",
                  "hover:bg-cream",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-bronze)]",
                ].join(" ")}
              >
                <img src={f.src} alt="" className="w-7 h-5 md:w-6 md:h-4 rounded-[2px] ring-1 ring-black/10" />
                <span className="text-sm text-charcoal font-medium">{f.label}</span>
                {active ? <span className="ml-auto text-xs text-[color:var(--color-bronze)]">●</span> : null}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
