import { Resend } from "resend";
import { z } from "zod";
import { NextRequest } from "next/server";

export const runtime = "nodejs"; // ensure Node runtime (not edge)

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  phone: z.string().max(40).optional().nullable(),
  service: z.string().max(120).optional().nullable(),
  message: z.string().min(5).max(4000),
  company: z.string().max(120).optional().nullable(), // honeypot
});

const resend = new Resend(process.env.RESEND_API_KEY);

function htmlEscape(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]!));
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json().catch(() => ({}));
    const body = contactSchema.safeParse(json);
    if (!body.success) {
      return Response.json(
        { ok: false, error: "ValidationError", details: body.error.flatten() },
        { status: 400 }
      );
    }
    const data = body.data;

    // Honeypot: if filled, silently accept without sending
    if (data.company && data.company.trim().length > 0) {
      return Response.json({ ok: true });
    }

    const leadHtml = `
      <h2>Nieuwe lead via Klusdam.nl</h2>
      <p><b>Naam:</b> ${htmlEscape(data.name)}</p>
      <p><b>E-mail:</b> ${htmlEscape(data.email)}</p>
      <p><b>Telefoon:</b> ${htmlEscape(data.phone ?? "")}</p>
      <p><b>Dienst:</b> ${htmlEscape(data.service ?? "")}</p>
      <p><b>Bericht:</b><br>${htmlEscape(data.message).replace(/\n/g, "<br/>")}</p>
      <hr/>
      <p>Verzonden op: ${new Date().toLocaleString("nl-NL", { timeZone: "Europe/Amsterdam" })}</p>
    `;

    const toEmail = process.env.TO_EMAIL!;
    const fromEmail = process.env.FROM_EMAIL!;
    if (!toEmail || !fromEmail || !process.env.RESEND_API_KEY) {
      return Response.json({ ok: false, error: "ServerMisconfigured" }, { status: 500 });
    }

    // Send to YOU
    const sent1 = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: data.email, // camelCase
      subject: `Nieuwe offerte-aanvraag: ${data.name}`,
      html: leadHtml,
    });
    if (sent1.error) {
      console.error("Resend lead email error:", sent1.error);
      return Response.json({ ok: false, error: "EmailSendFailed:lead" }, { status: 502 });
    }

    // Auto-reply to CUSTOMER
    const confirmHtml = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto;">
        <h2>Bedankt voor je bericht, ${htmlEscape(data.name)}!</h2>
        <p>We hebben je aanvraag ontvangen en nemen <b>zo snel mogelijk</b> contact op.</p>
        <p><b>Samenvatting</b></p>
        <ul>
          <li>Dienst: ${htmlEscape(data.service ?? "—")}</li>
          <li>Telefoon: ${htmlEscape(data.phone ?? "—")}</li>
        </ul>
        <p>Je bericht:</p>
        <blockquote style="border-left:4px solid #b08d57;padding-left:10px;color:#444">
          ${htmlEscape(data.message).replace(/\n/g, "<br/>")}
        </blockquote>
        <p>Met vriendelijke groet,<br/>Klusdam<br/>06 34099060 • Von Leibnizstraat 23a, Schiedam</p>
      </div>
    `;

    const sent2 = await resend.emails.send({
      from: fromEmail,
      to: [data.email],
      subject: "We hebben je aanvraag ontvangen – Klusdam",
      html: confirmHtml,
    });
    if (sent2.error) {
      console.error("Resend confirm email error:", sent2.error);
      // Still return ok, since your lead reached you
      return Response.json({ ok: true, ids: { lead: sent1.data?.id, confirm: null } });
    }

    return Response.json({ ok: true, ids: { lead: sent1.data?.id, confirm: sent2.data?.id } });
  } catch (e: any) {
    console.error(e);
    return Response.json({ ok: false, error: "ServerError" }, { status: 500 });
  }
}
