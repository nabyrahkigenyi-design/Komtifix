// src/components/ContactForm.tsx
"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { services } from "@/lib/services";
import { brand } from "@/lib/brand";

type Props = { compact?: boolean };

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  // honeypot field (should stay empty)
  company: string;
};

function telHref(phone: string) {
  const cleaned = phone.trim();
  return cleaned.startsWith("tel:") ? cleaned : `tel:${cleaned.replace(/\s+/g, "")}`;
}

export default function ContactForm({ compact }: Props) {
  const { t } = useI18n();

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<null | "ok" | "err">(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    company: "",
  });

  const serviceOptions = useMemo(
    () => services.map((s) => ({ slug: s.slug, label: t(s.titleKey) })),
    [t]
  );

  const canSubmit =
    form.name.trim().length > 1 &&
    form.email.trim().length > 3 &&
    form.message.trim().length > 5 &&
    !loading;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setDone(null);
    setErrMsg(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok || !json?.ok) {
        throw new Error("contact_failed");
      }

      setDone("ok");
      setForm({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
        company: "",
      });
    } catch {
      setDone("err");
      setErrMsg(t("contact_send_error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {/* Honeypot (hidden) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">{t("contact_company")}</label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="off"
          value={form.company}
          onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
          tabIndex={-1}
        />
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field
          value={form.name}
          onChange={(v) => setForm((p) => ({ ...p, name: v }))}
          placeholder={t("contact_name")}
          required
        />
        <Field
          type="email"
          value={form.email}
          onChange={(v) => setForm((p) => ({ ...p, email: v }))}
          placeholder={t("contact_email")}
          required
        />
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field
          value={form.phone}
          onChange={(v) => setForm((p) => ({ ...p, phone: v }))}
          placeholder={t("contact_phone_optional")}
          inputMode="tel"
        />

        <select
          value={form.service}
          onChange={(e) => setForm((p) => ({ ...p, service: e.target.value }))}
          className={[
            "w-full rounded-2xl px-4 py-3",
            "bg-white/70",
            "border border-black/10",
            "outline-none",
            "focus:ring-2 focus:ring-[color:var(--color-teal)]",
          ].join(" ")}
        >
          <option value="">{t("contact_choose_service")}</option>
          {serviceOptions.map((s) => (
            <option key={s.slug} value={s.label}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <textarea
        required
        value={form.message}
        onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
        placeholder={t("contact_message_placeholder")}
        rows={compact ? 4 : 6}
        className={[
          "w-full rounded-2xl px-4 py-3",
          "bg-white/70",
          "border border-black/10",
          "outline-none",
          "focus:ring-2 focus:ring-[color:var(--color-teal)]",
        ].join(" ")}
      />

      {/* Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <button
          type="submit"
          disabled={!canSubmit}
          className={[
            "inline-flex items-center justify-center rounded-2xl px-5 py-3",
            "font-semibold text-white",
            "bg-[color:var(--color-teal)] hover:opacity-95",
            "shadow-sm active:scale-[0.99] transition",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-teal)]",
          ].join(" ")}
        >
          {loading ? t("contact_sending") : t("contact_send")}
        </button>

        <a
          href={telHref(brand.phone)}
          className="text-sm text-black/70 hover:text-black underline underline-offset-4"
        >
          {t("contact_prefer_call")} {brand.phone}
        </a>
      </div>

      {/* Status */}
      {done === "ok" && (
        <p className="text-sm text-emerald-700">{t("contact_success")}</p>
      )}
      {done === "err" && (
        <p className="text-sm text-red-700">{errMsg}</p>
      )}
    </form>
  );
}

function Field({
  value,
  onChange,
  placeholder,
  required,
  type = "text",
  inputMode,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  required?: boolean;
  type?: React.HTMLInputTypeAttribute;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <input
      required={required}
      type={type}
      inputMode={inputMode}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={[
        "w-full rounded-2xl px-4 py-3",
        "bg-white/70",
        "border border-black/10",
        "outline-none",
        "focus:ring-2 focus:ring-[color:var(--color-teal)]",
      ].join(" ")}
    />
  );
}
