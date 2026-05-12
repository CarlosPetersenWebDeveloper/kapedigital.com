import type { APIRoute } from 'astro';

const RESEND_API_URL = 'https://api.resend.com/emails';

function getText(value: FormDataEntryValue | null): string {
  return typeof value === 'string' ? value.trim() : '';
}

function buildEmailHtml(input: {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
}) {
  return `
    <h2 style="margin:0 0 16px;font-family:Arial,sans-serif;color:#4B2E2B">Nuevo lead de Kape Digital</h2>
    <p style="margin:0 0 8px;font-family:Arial,sans-serif"><strong>Nombre:</strong> ${input.name}</p>
    <p style="margin:0 0 8px;font-family:Arial,sans-serif"><strong>Email:</strong> ${input.email}</p>
    <p style="margin:0 0 8px;font-family:Arial,sans-serif"><strong>Empresa:</strong> ${input.company || 'No indicó'}</p>
    <p style="margin:0 0 8px;font-family:Arial,sans-serif"><strong>Servicio:</strong> ${input.service || 'No indicó'}</p>
    <p style="margin:0 0 8px;font-family:Arial,sans-serif"><strong>Presupuesto:</strong> ${input.budget || 'No indicó'}</p>
    <p style="margin:16px 0 8px;font-family:Arial,sans-serif"><strong>Mensaje:</strong></p>
    <div style="white-space:pre-wrap;font-family:Arial,sans-serif;line-height:1.6;color:#2f2f2f">${input.message}</div>
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

  const resendApiKey = import.meta.env.RESEND_API_KEY;
  const fromEmail = import.meta.env.RESEND_FROM_EMAIL;
  const toEmail = import.meta.env.QUOTE_TO_EMAIL ?? import.meta.env.VITE_CONTACT_EMAIL ?? 'hola@kapedigital.com';

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
      html: buildEmailHtml({ name, email, company, service, budget, message }),
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
