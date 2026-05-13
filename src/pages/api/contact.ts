import type { APIRoute } from 'astro';
import { sanitizeInput, validateContactForm } from '../../utils/validation';

export const prerender = false;

const RESEND_API_URL = 'https://api.resend.com/emails';

function getText(value: FormDataEntryValue | null): string {
  return typeof value === 'string' ? value.trim() : '';
}

function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\r/g, '')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

function formatProposedDateTime(proposedDate?: string, proposedTime?: string) {
  if (!proposedDate && !proposedTime) return 'No indicado';
  try {
    let d: Date;
    if (proposedDate && proposedTime) d = new Date(`${proposedDate}T${proposedTime}:00`);
    else if (proposedDate) d = new Date(`${proposedDate}T00:00:00`);
    else d = new Date();
    return d.toLocaleString('es-ES', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  } catch (e) {
    return 'No indicado';
  }
}

function buildEmailHtml(input: {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  date?: string;
  time?: string;
  forRecipient?: 'owner' | 'submitter';
}) {
  const proposed = formatProposedDateTime(input.date, input.time);
  const title = input.forRecipient === 'submitter'
    ? 'Gracias por contactar a Kape Digital'
    : 'Nuevo lead de Kape Digital';

  return `
    <div style="font-family:Arial,sans-serif;color:#222;margin:0;padding:24px;background:#f6f6f7">
      <div style="max-width:680px;margin:0 auto;background:#fff;border-radius:8px;padding:20px;box-shadow:0 6px 18px rgba(0,0,0,0.06)">
        <h2 style="margin:0 0 12px;color:#4B2E2B">${title}</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;color:#333">
          <tbody>
            <tr><td style="padding:8px 0;width:160px;font-weight:700">Nombre:</td><td style="padding:8px 0">${sanitizeInput(input.name)}</td></tr>
            <tr><td style="padding:8px 0;font-weight:700">Email:</td><td style="padding:8px 0">${sanitizeInput(input.email)}</td></tr>
            <tr><td style="padding:8px 0;font-weight:700">Empresa:</td><td style="padding:8px 0">${sanitizeInput(input.company || '')}</td></tr>
            <tr><td style="padding:8px 0;font-weight:700">Servicio:</td><td style="padding:8px 0">${sanitizeInput(input.service || '')}</td></tr>
            <tr><td style="padding:8px 0;font-weight:700">Presupuesto:</td><td style="padding:8px 0">${sanitizeInput(input.budget || '')}</td></tr>
            <tr><td style="padding:8px 0;font-weight:700">Fecha propuesta:</td><td style="padding:8px 0">${proposed}</td></tr>
          </tbody>
        </table>
        <div style="margin-top:16px;padding:12px;background:#fafafa;border-radius:6px;color:#444;white-space:pre-wrap;line-height:1.5">${sanitizeInput(input.message)}</div>
        <p style="margin:18px 0 0;font-size:13px;color:#666">Recibirás un archivo adjunto (.ics) que te permitirá añadir la reunión a tu calendario.</p>
      </div>
    </div>
  `;
}

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();

  const name = getText(formData.get('name'));
  const email = getText(formData.get('email'));
  const company = getText(formData.get('company'));
  const service = getText(formData.get('service'));
  const budget = getText(formData.get('budget'));
  const message = getText(formData.get('message'));
  const date = getText(formData.get('date'));
  const time = getText(formData.get('time'));
  const honeypot = getText(formData.get('website'));

  if (honeypot) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ ok: false, error: 'Faltan campos obligatorios.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const validation = validateContactForm({
    name,
    email,
    company,
    service,
    budget,
    message,
    date,
    time,
    website: honeypot,
  });

  if (!validation.isValid) {
    return new Response(JSON.stringify({ ok: false, error: Object.values(validation.errors)[0] }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const env = globalThis.process?.env ?? {};
  const resendApiKey = env.RESEND_API_KEY ?? import.meta.env.RESEND_API_KEY;
  const fromEmail = env.RESEND_FROM_EMAIL ?? import.meta.env.RESEND_FROM_EMAIL;
  const toEmail = env.QUOTE_TO_EMAIL ?? import.meta.env.QUOTE_TO_EMAIL ?? import.meta.env.VITE_CONTACT_EMAIL ?? 'hola@kapedigital.com';

  if (!resendApiKey || !fromEmail) {
    return new Response(JSON.stringify({
      ok: false,
      error: 'Faltan variables de entorno: RESEND_API_KEY y RESEND_FROM_EMAIL.',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const subject = `Nuevo contacto de ${name} - Kape Digital`;

  function formatDateForIcal(d: Date, opts?: { utc?: boolean }) {
    const useUtc = opts?.utc ?? true;
    const yyyy = useUtc ? d.getUTCFullYear() : d.getFullYear();
    const mm = String((useUtc ? d.getUTCMonth() : d.getMonth()) + 1).padStart(2, '0');
    const dd = String(useUtc ? d.getUTCDate() : d.getDate()).padStart(2, '0');
    const hh = String(useUtc ? d.getUTCHours() : d.getHours()).padStart(2, '0');
    const min = String(useUtc ? d.getUTCMinutes() : d.getMinutes()).padStart(2, '0');
    const ss = String(useUtc ? d.getUTCSeconds() : d.getSeconds()).padStart(2, '0');
    return `${yyyy}${mm}${dd}T${hh}${min}${ss}${useUtc ? 'Z' : ''}`;
  }

  function buildIcs({
    name,
    email,
    company,
    service,
    message,
    organizerEmail,
    proposedDate,
    proposedTime,
  }: {
    name: string;
    email: string;
    company: string;
    service: string;
    message: string;
    organizerEmail: string;
    proposedDate?: string;
    proposedTime?: string;
  }) {
    // If the user provided date+time, use it (local). Otherwise fallback to next day 30min.
    let start: Date;
    if (proposedDate && proposedTime) {
      // Parse components to avoid inconsistent parsing across environments
      try {
        const [yy, mm, dd] = proposedDate.split('-').map(Number);
        const [hh, min] = proposedTime.split(':').map(Number);
        // Create a Date in local time with those components (floating time)
        start = new Date(yy, mm - 1, dd, hh || 0, min || 0, 0);
        if (isNaN(start.getTime())) throw new Error('Invalid date');
      } catch (e) {
        start = new Date(Date.now() + 24 * 60 * 60 * 1000);
      }
    } else {
      start = new Date(Date.now() + 24 * 60 * 60 * 1000);
    }

    const end = new Date(start.getTime() + 30 * 60 * 1000);

    // dtstamp in UTC, but DTSTART/DTEND as floating local times (no Z)
    const dtstamp = formatDateForIcal(new Date(), { utc: true });
    const dtstart = formatDateForIcal(start, { utc: false });
    const dtend = formatDateForIcal(end, { utc: false });
    const uid = `${Date.now()}-${Math.random().toString(36).slice(2)}@kapedigital.com`;

    const description = `Contacto: ${name} (${email})\\nEmpresa: ${company || 'No indicó'}\\nServicio: ${service || 'No indicó'}\\n\\nMensaje:\\n${message}`;
    const safeDescription = escapeIcsText(description);

    const lines = [
      'BEGIN:VCALENDAR',
      'PRODID:-//kapedigital.com//EN',
      'VERSION:2.0',
      'CALSCALE:GREGORIAN',
      'METHOD:REQUEST',
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART:${dtstart}`,
      `DTEND:${dtend}`,
      `SUMMARY:Reunión con ${escapeIcsText(name)} - Kape Digital`,
      `DESCRIPTION:${safeDescription}`,
      `ORGANIZER;CN=Kape Digital:mailto:${escapeIcsText(organizerEmail)}`,
      `ATTENDEE;CN=${escapeIcsText(name)};ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE:mailto:${escapeIcsText(email)}`,
      'SEQUENCE:0',
      'PRIORITY:5',
      'CLASS:PUBLIC',
      'END:VEVENT',
      'END:VCALENDAR',
    ];

    return lines.join('\r\n');
  }

  const icsContent = buildIcs({
    name,
    email,
    company,
    service,
    message,
    organizerEmail: fromEmail,
    proposedDate: date || undefined,
    proposedTime: time || undefined,
  });

  const resendResponse = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject,
      html: buildEmailHtml({ name, email, company, service, budget, message, date, time }),
      // Attach calendar invite so it can be added to calendars directly
      attachments: [
        {
          filename: 'kapedigital-invite.ics',
          type: 'text/calendar; charset=utf-8; method=REQUEST',
          content: Buffer.from(icsContent).toString('base64'),
        },
      ],
      reply_to: email,
    }),
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    return new Response(JSON.stringify({ ok: false, error: errorText }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Send a copy to the submitter so they receive the cotización/request copy
  try {
    const submitterResp = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [email],
        subject: `Copia de tu solicitud - Kape Digital`,
        html: buildEmailHtml({ name, email, company, service, budget, message, date, time, forRecipient: 'submitter' }),
        attachments: [
          {
            filename: 'kapedigital-invite.ics',
            type: 'text/calendar; charset=utf-8; method=REQUEST',
            content: Buffer.from(icsContent).toString('base64'),
          },
        ],
      }),
    });

    if (!submitterResp.ok) {
      const errText = await submitterResp.text();
      console.error('Error sending copy to submitter:', errText);
    }
  } catch (e) {
    console.error('Failed to send copy to submitter:', e);
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({
    ok: false,
    error: 'Usá POST para enviar el formulario de contacto.',
  }), {
    status: 405,
    headers: {
      'Content-Type': 'application/json',
      Allow: 'POST',
    },
  });
};
