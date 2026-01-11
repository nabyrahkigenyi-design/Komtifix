"use client";

import ContactForm from "./ContactForm";
import { useI18n } from "@/lib/i18n";

export default function ContactInline() {
  const { t } = useI18n();

  return (
    <section id="contact" className="py-16 md:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-10">
        {/* Left: form */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">
            {t("cta_quote")}
          </h2>
          <p className="mt-2">
            {t("contact_inline_intro")}
          </p>
          <ContactForm />
        </div>

        {/* Right: contact info */}
        <div className="rounded-xl bg-cream p-6">
          <h3 className="font-semibold text-lg">{t("contact")}</h3>

          <p className="mt-2">
            {t("contact_address")}: Von Leibnizstraat 23 a, 3112 XN Schiedam
          </p>

          <p className="mt-1">
            {t("contact_phone")}:{" "}
            <a className="text-bronze" href="tel:+31634099060">
              06 34099060
            </a>
          </p>

          <p className="mt-1">
            {t("contact_email_label")}:{" "}
            <a className="text-bronze" href="mailto:info@klusdam.nl">
              info@klusdam.nl
            </a>
          </p>

          <div className="mt-4">
            <iframe
              title="Klusdam Map"
              className="w-full h-64 rounded"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Von%20Leibnizstraat%2023%20a%2C%203112%20XN%20Schiedam&output=embed"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
