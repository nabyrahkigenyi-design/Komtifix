"use client";

import { useI18n } from "@/lib/i18n";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Keep flags + labels local to this component
const LANGS = [
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
  { code: "en", label: "English",   flag: "🇬🇧" },
  { code: "de", label: "Deutsch",   flag: "🇩🇪" },
  { code: "fr", label: "Français",  flag: "🇫🇷" },
  { code: "tr", label: "Türkçe",    flag: "🇹🇷" },
  { code: "ar", label: "العربية",    flag: "🇸🇦" },
] as const;

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  function choose(code: string) {
    setLang(code as any);
    setOpen(false);
    router.refresh(); // refresh server components too
  }

  return (
    <div className="relative" ref={ref}>
      <button
        aria-label="Select language"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-md border border-black/10 bg-white px-3 py-1.5 text-sm hover:bg-cream"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="hidden sm:inline">{current.label}</span>
      </button>

      {open && (
        <div className="absolute right-0 z-40 mt-2 w-48 rounded-lg border border-black/10 bg-white shadow-lg">
          <ul className="py-1">
            {LANGS.map((l) => (
              <li key={l.code}>
                <button
                  onClick={() => choose(l.code)}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-cream"
                >
                  <span className="text-base leading-none">{l.flag}</span>
                  <span className="flex-1">{l.label}</span>
                  {l.code === lang && <span className="text-xs">✓</span>}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
