// src/app/api/contact/route.ts
import { Resend } from "resend";
import { z } from "zod";
import { NextRequest } from "next/server";
import { brand } from "@/lib/brand";

export const runtime = "nodejs"; // Node runtime (not edge)

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  phone: z.string().max(40).optional().nullable(),
  service: z.string().max(120).optional().nullable(),
  message: z.string().min(5).max(4000),
  company: z.string().max(120).optional().nullable(), // honeypot
});

// Create Resend client lazily after env check (prevents “undefined” issues)
function getResend(apiKey: string) {
  return new Resend(apiKey);
}

function htmlEscape(s: string) {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return s.replace(/[&<>"']/g, (c) => map[c] ?? c);
}

function mapQuery(address: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(address)}`;
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json().catch(() => ({}));
    const parsed = contactSchema.safeParse(json);

    if (!parsed.success) {
      return Response.json(
        { ok: false, error: "ValidationError", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Honeypot: if filled, silently accept without sending
    if (data.company && data.company.trim().length > 0) {
      return Response.json({ ok: true });
    }

    // Env (explicit checks fix TS "string | undefined" + prevents runtime misconfig)
    const toEmail = process.env.TO_EMAIL;
    const fromEmail = process.env.FROM_EMAIL;
    const apiKey = process.env.RESEND_API_KEY;

    if (!toEmail || !fromEmail || !apiKey) {
      return Response.json({ ok: false, error: "ServerMisconfigured" }, { status: 500 });
    }

    const resend = getResend(apiKey);

    const createdAt = new Date().toLocaleString("nl-NL", { timeZone: "Europe/Amsterdam" });

    const leadHtml = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto;line-height:1.5">
        <h2 style="margin:0 0 12px">New lead via ${htmlEscape(brand.name)}</h2>

        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:6px 0;width:140px"><b>Name</b></td><td style="padding:6px 0">${htmlEscape(
            data.name
          )}</td></tr>
          <tr><td style="padding:6px 0"><b>Email</b></td><td style="padding:6px 0">${htmlEscape(
            data.email
          )}</td></tr>
          <tr><td style="padding:6px 0"><b>Phone</b></td><td style="padding:6px 0">${htmlEscape(
            data.phone ?? "—"
          )}</td></tr>
          <tr><td style="padding:6px 0"><b>Service</b></td><td style="padding:6px 0">${htmlEscape(
            data.service ?? "—"
          )}</td></tr>
        </table>

        <div style="margin-top:14px">
          <b>Message</b>
          <div style="margin-top:6px;padding:12px;border:1px solid #e5e7eb;border-radius:12px;background:#fafafa">
            ${htmlEscape(data.message).replace(/\n/g, "<br/>")}
          </div>
        </div>

        <hr style="margin:16px 0;border:none;border-top:1px solid #e5e7eb" />
        <div style="color:#6b7280;font-size:12px">
          Sent: ${htmlEscape(createdAt)} · ${htmlEscape(brand.location.city)} ·
          <a href="${mapQuery(brand.address)}" target="_blank" rel="noopener noreferrer">Map</a>
        </div>
      </div>
    `;

    // Send to YOU (lead)
    const sentLead = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: data.email, // correct casing for Resend SDK
      subject: `New quote request: ${data.name}${data.service ? ` — ${data.service}` : ""}`,
      html: leadHtml,
    });

    if (sentLead.error) {
      console.error("Resend lead email error:", sentLead.error);
      return Response.json({ ok: false, error: "EmailSendFailed:lead" }, { status: 502 });
    }

    // Auto-reply to customer
    const confirmHtml = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto;line-height:1.6">
        <h2 style="margin:0 0 10px">Thanks, ${htmlEscape(data.name)}!</h2>
        <p style="margin:0 0 12px">
          We received your request and will contact you as soon as possible.
        </p>

        <div style="padding:12px 14px;border:1px solid #e5e7eb;border-radius:14px;background:#ffffff">
          <b>Summary</b>
          <ul style="margin:8px 0 0;padding-left:18px">
            <li>Service: ${htmlEscape(data.service ?? "—")}</li>
            <li>Phone: ${htmlEscape(data.phone ?? "—")}</li>
          </ul>
        </div>

        <p style="margin:14px 0 6px"><b>Your message</b></p>
        <div style="padding:12px 14px;border-left:4px solid #0ea5a4;background:#f8fafc;border-radius:10px">
          ${htmlEscape(data.message).replace(/\n/g, "<br/>")}
        </div>

        <p style="margin:16px 0 0">
          Regards,<br/>
          <b>${htmlEscape(brand.name)}</b><br/>
          ${htmlEscape(brand.phone)} · ${htmlEscape(brand.address)}
        </p>
      </div>
    `;

    const sentConfirm = await resend.emails.send({
      from: fromEmail,
      to: [data.email],
      subject: `We received your request — ${brand.name}`,
      html: confirmHtml,
    });

    if (sentConfirm.error) {
      console.error("Resend confirm email error:", sentConfirm.error);
      // Lead reached you, still ok
      return Response.json({ ok: true, ids: { lead: sentLead.data?.id ?? null, confirm: null } });
    }

    return Response.json({
      ok: true,
      ids: { lead: sentLead.data?.id ?? null, confirm: sentConfirm.data?.id ?? null },
    });
  } catch (e) {
    console.error(e);
    return Response.json({ ok: false, error: "ServerError" }, { status: 500 });
  }
}
