// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/lib/services";
import { useI18n } from "@/lib/i18n";
import { brand } from "@/lib/brand";

function cx(...cls: (string | false | null | undefined)[]) {
  return cls.filter(Boolean).join(" ");
}

function telHref(phone: string) {
  const cleaned = phone.trim();
  return cleaned.startsWith("tel:") ? cleaned : `tel:${cleaned.replace(/\s+/g, "")}`;
}

export default function Navbar() {
  const { t } = useI18n();

  const [open, setOpen] = useState(false); // mobile drawer
  const [dienstenOpen, setDienstenOpen] = useState(false); // desktop dropdown
  const path = usePathname();

  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close dropdowns on route change
  useEffect(() => {
    setDienstenOpen(false);
    setOpen(false);
  }, [path]);

  // Hover intent handling (desktop)
  function openWithIntent() {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setDienstenOpen(true), 80);
  }
  function closeWithIntent() {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setDienstenOpen(false), 150);
  }

  // Keyboard accessibility
  function onDienstenKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setDienstenOpen((v) => !v);
    }
    if (e.key === "Escape") setDienstenOpen(false);
  }

  const columns = useMemo(() => {
    const mid = Math.ceil(services.length / 2);
    return { left: services.slice(0, mid), right: services.slice(mid) };
  }, []);

  return (
    // z-40 allows Preheader (if z-50) to overlay dropdown
    <header className="sticky top-0 z-40">
      {/* Glass header bar */}
      <div className="border-b border-black/5 bg-white/60 supports-[backdrop-filter]:bg-white/40 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Link href="/" aria-label={`${brand.name} homepage`} className="flex items-center gap-3">
              {/* Logo Image */}
              <img
                src="/logo.svg"
                alt={`${brand.name} logo`}
                className="h-9 w-auto object-contain opacity-95"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <span className="text-2xl font-bold tracking-tight text-teal">{brand.name}</span>
              <span className="hidden sm:inline text-sm font-medium text-black/60 pt-1">{brand.location.city}</span>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="/" active={path === "/"}>
              {t("home")}
            </NavLink>

            {/* Diensten dropdown container */}
            <div
              className="relative h-full flex items-center"
              onMouseEnter={openWithIntent}
              onMouseLeave={closeWithIntent}
            >
              <button
                onClick={() => setDienstenOpen((v) => !v)}
                onKeyDown={onDienstenKey}
                aria-haspopup="true"
                aria-expanded={dienstenOpen}
                className={cx(
                  "px-3 py-2 rounded-lg font-semibold inline-flex items-center gap-1",
                  "hover:bg-black/5",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-teal",
                  path?.startsWith("/diensten") && "text-teal"
                )}
              >
                {t("diensten")}
                <span className={`text-[10px] transition-transform duration-200 ${dienstenOpen ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </button>

              <AnimatePresence>
                {dienstenOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[620px]"
                    role="menu"
                  >
                    {/* CHANGED: solid light glass so text is always readable */}
                    <div className="rounded-2xl p-4 shadow-xl bg-white/95 backdrop-blur-xl border border-black/10">
                      <div className="grid grid-cols-2 gap-4 p-1">
                        <div className="flex flex-col gap-1">
                          {columns.left.map((s) => (
                            <Link
                              key={s.slug}
                              href={`/diensten/${s.slug}`}
                              className="px-3 py-2 rounded-lg hover:bg-black/5 text-sm text-black/80 hover:text-black transition-colors"
                              role="menuitem"
                            >
                              {t(s.titleKey)}
                            </Link>
                          ))}
                        </div>

                        <div className="flex flex-col gap-1">
                          {columns.right.map((s) => (
                            <Link
                              key={s.slug}
                              href={`/diensten/${s.slug}`}
                              className="px-3 py-2 rounded-lg hover:bg-black/5 text-sm text-black/80 hover:text-black transition-colors"
                              role="menuitem"
                            >
                              {t(s.titleKey)}
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-black/10 mt-3 pt-3 flex items-center justify-between px-2">
                        <span className="text-xs text-black/60 font-medium">{t("cta_quote")}</span>
                        <Link
                          href="/diensten"
                          className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-teal hover:opacity-90 transition-colors"
                        >
                          {t("all_services")} →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink href="/over-ons" active={path === "/over-ons"}>
              {t("over")}
            </NavLink>
            <NavLink href="/projecten" active={path === "/projecten"}>
              {t("projecten")}
            </NavLink>
            <NavLink href="/contact" active={path === "/contact"}>
              {t("contact")}
            </NavLink>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/contact"
              className={cx(
                "inline-flex items-center rounded-xl px-5 py-2.5 text-sm font-bold text-white",
                "bg-teal hover:bg-teal/90",
                "shadow-lg shadow-teal/20 transition-all duration-200 hover:-translate-y-0.5",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal"
              )}
            >
              {t("cta_quote")}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-xl p-2.5 text-black/80 hover:bg-black/5"
            aria-label={t("open_menu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer (animated) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden border-b border-black/10 bg-white shadow-xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              <MobileLink href="/" onClick={() => setOpen(false)} active={path === "/"}>
                {t("home")}
              </MobileLink>

              {/* Mobile accordion for Diensten */}
              <details className="group">
                <summary className="cursor-pointer select-none px-3 py-3 font-semibold rounded-xl hover:bg-black/5 flex items-center justify-between text-black/80">
                  <span className={cx(path?.startsWith("/diensten") && "text-teal")}>{t("diensten")}</span>
                  <span className="transition-transform duration-200 group-open:rotate-180">▾</span>
                </summary>

                <div className="pl-2 border-l-2 border-black/5 ml-3 my-1 space-y-1">
                  {services.map((s) => (
                    <MobileLink
                      key={s.slug}
                      href={`/diensten/${s.slug}`}
                      onClick={() => setOpen(false)}
                      active={path === `/diensten/${s.slug}`}
                    >
                      {t(s.titleKey)}
                    </MobileLink>
                  ))}

                  <MobileLink href="/diensten" onClick={() => setOpen(false)} active={path === "/diensten"}>
                    <span className="text-teal font-bold text-sm">{t("all_services")} →</span>
                  </MobileLink>
                </div>
              </details>

              <MobileLink href="/over-ons" onClick={() => setOpen(false)} active={path === "/over-ons"}>
                {t("over")}
              </MobileLink>
              <MobileLink href="/projecten" onClick={() => setOpen(false)} active={path === "/projecten"}>
                {t("projecten")}
              </MobileLink>
              <MobileLink href="/contact" onClick={() => setOpen(false)} active={path === "/contact"}>
                {t("contact")}
              </MobileLink>

              <div className="mt-4 grid grid-cols-2 gap-3 pt-4 border-t border-black/5">
                <a
                  href={telHref(brand.phone)}
                  className={cx(
                    "inline-flex items-center justify-center rounded-xl px-3 py-3 text-sm font-semibold",
                    "bg-gray-100 hover:bg-gray-200 text-charcoal",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                  )}
                >
                  {t("call")}
                </a>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className={cx(
                    "inline-flex items-center justify-center rounded-xl px-3 py-3 text-sm font-semibold text-white",
                    "bg-teal hover:opacity-95 shadow-sm",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                  )}
                >
                  {t("cta_quote")}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cx(
        "px-3 py-2 rounded-lg font-semibold transition-colors",
        "hover:bg-black/5 text-black/80 hover:text-black",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-teal",
        active && "text-teal"
      )}
    >
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  active,
  children,
  onClick,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cx(
        "block px-3 py-2.5 rounded-xl font-medium hover:bg-black/5 text-black/70",
        active && "text-teal bg-teal/5 font-semibold"
      )}
    >
      {children}
    </Link>
  );
}
