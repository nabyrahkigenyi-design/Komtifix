// src/components/ContactInline.tsx
"use client";

import ContactForm from "./ContactForm";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { brand } from "@/lib/brand";

function telHref(phone: string) {
  const cleaned = phone.trim();
  return cleaned.startsWith("tel:") ? cleaned : `tel:${cleaned.replace(/\s+/g, "")}`;
}

export default function ContactInline() {
  const { t } = useI18n();

  return (
    <section id="contact" className="py-16 md:py-20 bg-ivory">
      <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-10">
        {/* Left: form */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="font-serif text-2xl md:text-3xl tracking-tight">
            {t("cta_quote")}
          </h2>
          <p className="mt-2 text-black/70">
            {t("contact_inline_intro")}
          </p>

          <div className="mt-6 glass-light rounded-3xl p-6">
            <ContactForm />
          </div>
        </motion.div>

        {/* Right: contact info */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.06 }}
          className="rounded-3xl bg-white/70 glass-border p-6"
        >
          <h3 className="font-semibold text-lg">{t("contact")}</h3>

          <p className="mt-3 text-black/80">
            {brand.address}
          </p>

          <p className="mt-2 text-black/80">
            {t("contact_phone")}:{" "}
            <a
              className="font-semibold text-[color:var(--color-teal)] hover:opacity-90"
              href={telHref(brand.phone)}
            >
              {brand.phone}
            </a>
          </p>

          {/* Optional: add brand.email later if needed */}
          {/* <p className="mt-1 text-black/80">
            {t("contact_email_label")}:{" "}
            <a className="text-[color:var(--color-teal)]" href={`mailto:${brand.email}`}>
              {brand.email}
            </a>
          </p> */}

          <div className="mt-4 overflow-hidden rounded-2xl border border-black/10">
            <iframe
              title={`${brand.name} Map`}
              className="w-full h-64"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                brand.address
              )}&output=embed`}
            />
          </div>

          <div className="mt-4 text-xs text-black/60">
            {brand.name} · {brand.location.city}, {brand.location.region}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
