"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { services } from "@/lib/services";

type Props = { compact?: boolean };

export default function ContactForm({ compact }: Props) {
  const { t } = useI18n();

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<null | "ok" | "err">(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    // honeypot field (should stay empty)
    company: "", // <- if a bot fills this, API will drop it
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setDone(null);
    setErrMsg(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error("failed");

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
    <form onSubmit={submit} className="space-y-3">
      {/* Honeypot (hidden) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">{t("contact_company")}</label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="off"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          tabIndex={-1}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder={t("contact_name")}
          className="w-full rounded border border-black/10 px-3 py-2"
        />
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder={t("contact_email")}
          className="w-full rounded border border-black/10 px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder={t("contact_phone_optional")}
          className="w-full rounded border border-black/10 px-3 py-2"
        />

        <select
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          className="w-full rounded border border-black/10 px-3 py-2 bg-white"
        >
          <option value="">{t("contact_choose_service")}</option>
          {services.map((s) => (
            <option key={s.slug} value={t(s.titleKey)}>
              {t(s.titleKey)}
            </option>
          ))}
        </select>
      </div>

      <textarea
        required
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        placeholder={t("contact_message_placeholder")}
        rows={compact ? 4 : 6}
        className="w-full rounded border border-black/10 px-3 py-2"
      />

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-bronze text-charcoal px-5 py-2 rounded font-semibold disabled:opacity-60"
        >
          {loading ? t("contact_sending") : t("contact_send")}
        </button>

        <a href="tel:+31634099060" className="text-sm underline underline-offset-4">
          {t("contact_prefer_call")} 06 34099060
        </a>
      </div>

      {done === "ok" && <p className="text-green-700 text-sm">{t("contact_success")}</p>}
      {done === "err" && <p className="text-red-700 text-sm">{errMsg}</p>}
    </form>
  );
}
