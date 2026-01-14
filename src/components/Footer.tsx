// src/components/Footer.tsx
"use client";

import Link from "next/link";
import SocialLinks from "./SocialLinks";
import { useI18n } from "@/lib/i18n";
import { brand } from "@/lib/brand";
import { services } from "@/lib/services";

/* --- Icons --- */
function IconMapPin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  );
}

function IconPhone(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
      />
    </svg>
  );
}

function IconWhatsapp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" {...props}>
      <path d="M19.1 17.4c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.3-.7.1c-.9-.5-1.6-1.2-2.1-2.1-.2-.4 0-.6.1-.8.1-.1.2-.3.3-.4s.1-.2.2-.3.1-.2 0-.3c0-.1-.7-1.7-.9-2.3-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.4.2-.6.4-.2.3-.8.8-.8 2s.8 2.3.9 2.4c.1.2 1.6 2.4 3.9 3.3.5.2.9.3 1.2.4.5.1 1 .1 1.4.1.4 0 1.3-.3 1.5-.8.2-.4.2-.8.1-.9zM26.9 5.1C24.1 2.3 20.3 1 16.6 1 9.1 1 3.1 7 3.1 14.5c0 2.4.6 4.7 1.8 6.8L3 31l9-1.9c2 .9 4.1 1.3 6.2 1.3 7.5 0 13.5-6 13.5-13.5 0-3.7-1.3-7.5-4.1-10.3zm-10.3 23c-2 0-3.9-.5-5.7-1.3l-.4-.2-5.4 1.1 1.1-5.3-.2-.4c-1.1-1.7-1.6-3.7-1.6-5.8C4.4 8 9.9 2.5 16.6 2.5c3.2 0 6.2 1.2 8.4 3.4 2.2 2.2 3.4 5.2 3.4 8.4 0 6.7-5.5 12.2-12.2 12.2z" />
    </svg>
  );
}

function digitsOnly(phone: string) {
  return phone.replace(/[^0-9]/g, "");
}

function telHref(phone: string) {
  const cleaned = phone.trim();
  return cleaned.startsWith("tel:") ? cleaned : `tel:${cleaned.replace(/\s+/g, "")}`;
}

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  const footerServices = services
    .filter((s) => s.featured)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
    .slice(0, 9);

  return (
    <footer className="bg-charcoal text-white border-t border-white/5" data-reveal>
      <div className="h-1 bg-gradient-to-r from-transparent via-teal/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Column 1: Brand */}
        <div className="flex flex-col gap-5">
          <Link href="/" className="group inline-flex flex-col">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold tracking-tight text-teal group-hover:text-white transition-colors">
                {brand.name}
              </span>
            </div>
            <span className="text-xs text-white/50 mt-1 uppercase tracking-widest font-medium">
              {brand.location.city} • {brand.location.region}
            </span>
          </Link>

          <p className="text-sm/6 text-white/70 max-w-xs">{t("footer_intro")}</p>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">{t("footer_follow")}</h4>
            <SocialLinks className="flex gap-4 text-white/60 hover:text-teal transition-colors" />
          </div>
        </div>

        {/* Column 2: Services */}
        <div>
          <h4 className="font-bold text-lg mb-6 border-b border-teal/30 pb-2 inline-block">
            {t("diensten")}
          </h4>
          <ul className="space-y-3 text-sm">
            {footerServices.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/diensten/${s.slug}`}
                  className="text-white/70 hover:text-teal transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  {t(s.titleKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Company */}
        <div>
          <h4 className="font-bold text-lg mb-6 border-b border-teal/30 pb-2 inline-block">
            {t("footer_company")}
          </h4>

          <ul className="space-y-3 text-sm">
            <li>
              <Link
                href="/over-ons"
                className="text-white/70 hover:text-teal transition-all duration-200 hover:translate-x-1 inline-block"
              >
                {t("over")}
              </Link>
            </li>
            <li>
              <Link
                href="/projecten"
                className="text-white/70 hover:text-teal transition-all duration-200 hover:translate-x-1 inline-block"
              >
                {t("projecten")}
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-white/70 hover:text-teal transition-all duration-200 hover:translate-x-1 inline-block"
              >
                {t("contact")}
              </Link>
            </li>
          </ul>

          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-bold text-white bg-teal hover:bg-teal/90 transition-all shadow-lg shadow-teal/10"
            >
              {t("cta_quote")}
            </Link>
          </div>
        </div>

        {/* Column 4: Contact */}
        <div className="flex flex-col gap-8">
          <div>
            <h4 className="font-bold text-lg mb-6 border-b border-teal/30 pb-2 inline-block">
              {t("footer_contact")}
            </h4>

            <div className="space-y-5 text-sm text-white/70">
              <div className="flex items-start gap-3">
                <IconMapPin className="w-5 h-5 text-teal shrink-0" />
                <span>{brand.address}</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <IconPhone className="w-5 h-5 text-teal shrink-0" />
                  <a href={telHref(brand.phone)} className="hover:text-white transition-colors font-semibold">
                    {brand.phone}
                  </a>
                </div>

                <a
                  href={`https://wa.me/${digitsOnly(brand.phone)}?text=${encodeURIComponent(
                    `Hello ${brand.name}, I would like a quote.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-8 inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 hover:text-emerald-200 transition-colors"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <IconWhatsapp className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-white/40">
              ✓ {t("ph_trust")}
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-white/40">
              ✓ {brand.location.city}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-black/20">
        <div className="mx-auto max-w-7xl px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-medium uppercase tracking-widest text-white/40 text-center md:text-left">
          <p>
            © {year} {brand.name}. {t("footer_rights")}
            <span className="mx-2 hidden md:inline">|</span>
            <br className="md:hidden" />
            Designed by{" "}
            <a
              href="https://iflammdesigns.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal hover:text-white transition-colors underline underline-offset-4"
            >
              IFLAMM DESIGNS
            </a>
          </p>

          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/voorwaarden" className="hover:text-white transition-colors">
              Voorwaarden
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
