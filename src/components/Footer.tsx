"use client";

import Link from "next/link";
import SocialLinks from "./SocialLinks";
import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white footer-pattern" data-reveal>
      <div className="mx-auto max-w-7xl px-4 py-12 grid md:grid-cols-4 gap-8">
        {/* Logo + intro */}
        <div className="flex flex-col gap-3">
          <Link href="/" aria-label="Klusdam homepage" className="flex items-center">
            <img
              src="https://i.ibb.co/CpJPTBch/for-footer-2-1.png"
              alt="Klusdam logo"
              className="h-full max-h-14 w-auto object-contain opacity-90"
            />
          </Link>

          <p className="text-sm/6 opacity-80">{t("footer_intro")}</p>

          <div className="mt-2">
            <h4 className="font-semibold mb-2 text-sm">{t("footer_follow")}</h4>
            <SocialLinks className="[&>*]:text-white" />
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-semibold mb-3">{t("diensten")}</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/diensten/laminaat-leggen" className="hover:text-bronze">
                {t("svc_laminaat")}
              </a>
            </li>
            <li>
              <a href="/diensten/badkamer-renovatie" className="hover:text-bronze">
                {t("svc_badkamer")}
              </a>
            </li>
            <li>
              <a href="/diensten/plavuizen-vloer" className="hover:text-bronze">
                {t("svc_gietvloer")}
              </a>
            </li>
            <li>
              <a href="/diensten/schilder" className="hover:text-bronze">
                {t("svc_schilder")}
              </a>
            </li>
            <li>
              <a href="/diensten/stukadoor" className="hover:text-bronze">
                {t("svc_stukadoor")}
              </a>
            </li>
            <li>
              <a href="/diensten/tegelzetter" className="hover:text-bronze">
                {t("svc_tegelzetter")}
              </a>
            </li>
            <li>
              <a href="/diensten/vloerverwarming" className="hover:text-bronze">
                {t("svc_vloerverwarming")}
              </a>
            </li>
            <li>
              <a href="/diensten/wc-renovatie" className="hover:text-bronze">
                {t("svc_wc")}
              </a>
            </li>
            <li>
              <a href="/diensten/timmerwerk" className="hover:text-bronze">
                {t("svc_timmerwerk")}
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold mb-3">{t("footer_company")}</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/over-ons" className="hover:text-bronze">
                {t("over")}
              </a>
            </li>
            <li>
              <a href="/projecten" className="hover:text-bronze">
                {t("projecten")}
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-bronze">
                {t("contact")}
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-3">{t("footer_contact")}</h4>

          <p className="text-sm">
            {t("footer_address_line1")}
            <br />
            {t("footer_address_line2")}
          </p>

          <p className="mt-2 text-sm">
            <a href="tel:+31634099060" className="hover:text-bronze">
              06 34099060
            </a>
          </p>

          <p className="mt-1 text-sm">
            <a href="mailto:info@klusdam.nl" className="hover:text-bronze">
              info@klusdam.nl
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 text-xs px-4 py-4 text-center opacity-80">
        © {year} {t("footer_rights")} IFLAMM DESIGNS
      </div>
    </footer>
  );
}
