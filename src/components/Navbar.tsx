"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { services } from "@/lib/services";
import { useI18n } from "@/lib/i18n";

function cx(...cls: (string | false | null | undefined)[]) {
  return cls.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { t } = useI18n();

  const [open, setOpen] = useState(false); // mobile drawer
  const [dienstenOpen, setDienstenOpen] = useState(false); // desktop dropdown
  const path = usePathname();

  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close dropdown/drawer on route change
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
    hoverTimer.current = setTimeout(() => setDienstenOpen(false), 120);
  }

  // Keyboard accessibility for desktop dropdown
  function onDienstenKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setDienstenOpen((v) => !v);
    }
    if (e.key === "Escape") setDienstenOpen(false);
  }

  // Split services into two columns (desktop)
  const left = services.slice(0, Math.ceil(services.length / 2));
  const right = services.slice(Math.ceil(services.length / 2));

  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-black/5">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" aria-label="Klusdam homepage" className="flex items-center">
            <img
              src="https://i.ibb.co/Z1hM3YWs/final-1.png"
              alt="Klusdam logo"
              className="h-full max-h-14 w-auto object-contain opacity-90"
            />
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          <NavLink href="/" active={path === "/"}>
            {t("home")}
          </NavLink>

          {/* Diensten with hover-intent dropdown */}
          <div className="relative" onMouseEnter={openWithIntent} onMouseLeave={closeWithIntent}>
            <button
              onClick={() => setDienstenOpen((v) => !v)}
              onKeyDown={onDienstenKey}
              aria-haspopup="true"
              aria-expanded={dienstenOpen}
              className={cx(
                "px-3 py-2 rounded-lg font-semibold hover:bg-black/5",
                path?.startsWith("/diensten") && "text-bronze"
              )}
            >
              {t("diensten")}
            </button>

            {dienstenOpen && (
              <div
                className="absolute left-0 mt-2 w-[560px] rounded-xl shadow-xl bg-white border border-black/10 p-4 grid grid-cols-2 gap-2"
                onMouseLeave={closeWithIntent}
                role="menu"
              >
                <div className="flex flex-col">
                  {left.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/diensten/${s.slug}`}
                      className="px-3 py-2 rounded hover:bg-cream text-sm"
                      role="menuitem"
                    >
                      {t(s.titleKey)}
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col">
                  {right.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/diensten/${s.slug}`}
                      className="px-3 py-2 rounded hover:bg-cream text-sm"
                      role="menuitem"
                    >
                      {t(s.titleKey)}
                    </Link>
                  ))}
                </div>

                <div className="col-span-2 border-t border-black/10 mt-2 pt-2 text-right">
                  <Link href="/diensten" className="inline-flex items-center gap-1 text-sm font-semibold text-bronze">
                    {t("all_services")} →
                  </Link>
                </div>
              </div>
            )}
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

        {/* Mobile hamburger */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-lg p-3 ring-1 ring-black/10"
          aria-label={t("open_menu")}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-black/10 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <MobileLink href="/" onClick={() => setOpen(false)} active={path === "/"}>
              {t("home")}
            </MobileLink>

            {/* Mobile accordion for Diensten */}
            <details className="group">
              <summary className="cursor-pointer select-none px-3 py-2 font-semibold rounded-lg hover:bg-black/5 flex items-center justify-between">
                <span className={cx(path?.startsWith("/diensten") && "text-bronze")}>{t("diensten")}</span>
                <span className="transition-transform group-open:rotate-180">▾</span>
              </summary>

              <div className="pl-2">
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
                  {t("all_services")} →
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
          </div>
        </div>
      )}
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
        "px-3 py-2 rounded-lg font-semibold hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze",
        active && "text-bronze"
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
      className={cx("block px-3 py-2 rounded-lg font-semibold hover:bg-black/5", active && "text-bronze")}
    >
      {children}
    </Link>
  );
}
