import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mailer';
import { rateLimit, ipDeRequest } from '@/lib/rate-limit';
import { OPCIONES_VALIDAS, etiqueta } from '@/lib/cotizacion';
import { ADDRESS } from '@/lib/site';

/**
 * Endpoint público de captación de cotizaciones.
 *
 * Es el único endpoint del sitio y es el vector obvio de spam, por eso:
 *  1. Rate limit por IP (3 envíos / 10 min) y tope de tamaño de cuerpo.
 *  2. Validación estricta: campos permitidos, longitudes máximas y listas blancas
 *     para todo lo que es opción cerrada. Lo que no está en la lista, se rechaza.
 *  3. Escapado HTML de TODO lo que viene del usuario antes de meterlo al correo
 *     (prevención de inyección HTML en el mail del equipo).
 *  4. Saneo de encabezados en el asunto (sin \r\n) para evitar header injection SMTP.
 *  5. Honeypot: si viene lleno, respondemos 200 y tiramos el mensaje a la basura,
 *     así el bot cree que funcionó y no reintenta.
 *
 * Se eliminó la dependencia de Firestore (leía settings/admins_cache) y las acciones
 * new_user / new_contract / new_newsletter, que pertenecían a la plataforma SaaS
 * dada de baja el 2026-09-01.
 */

export const runtime = 'nodejs';

/**
 * Dos niveles a propósito:
 *  - FLOOD: tope duro de peticiones por IP. Frena el martilleo automatizado.
 *  - ENVIOS: tope de correos realmente enviados. Es el recurso caro que hay que proteger.
 * Se separan porque contar los intentos fallidos contra el límite de envíos castigaba
 * al usuario legítimo que se equivoca al escribir su correo: tres errores de dedo y
 * quedaba bloqueado diez minutos. El bloqueo debe caer sobre el abuso, no sobre el
 * cliente que quiere cotizar.
 */
const LIMITE_FLOOD = { limite: 20, ventanaMs: 10 * 60 * 1000 };
const LIMITE_ENVIOS = { limite: 3, ventanaMs: 10 * 60 * 1000 };
const MAX_BODY_BYTES = 8 * 1024;

const ORIGENES_PERMITIDOS = new Set([
  'https://www.limpiezamexico.com',
  'https://limpiezamexico.com',
]);

function origenPermitido(req: Request): boolean {
  const origin = req.headers.get('origin');
  if (origin) return ORIGENES_PERMITIDOS.has(origin);

  const referer = req.headers.get('referer');
  if (!referer) return true;
  try {
    return ORIGENES_PERMITIDOS.has(new URL(referer).origin);
  } catch {
    return false;
  }
}


const DESTINATARIOS = (process.env.ADMIN_EMAILS ?? 'contacto@limpiezamexico.com,ventas@limpiezamexico.com')
  .split(',')
  .map((e) => e.trim())
  .filter(Boolean);

const LIMITES_TEXTO = {
  nombre: 80,
  contacto: 120,
  detalle: 1500,
} as const;

/** Escapa HTML. Todo dato de usuario pasa por aquí antes de tocar la plantilla. */
function esc(valor: unknown): string {
  return String(valor ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Quita saltos de línea y recorta: evita inyección de encabezados SMTP en el asunto. */
function limpiarLinea(valor: string, max: number): string {
  return valor.replace(/[\r\n\t]+/g, ' ').trim().slice(0, max);
}

function esContactoValido(valor: string): boolean {
  const email = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
  const digitos = valor.replace(/\D/g, '');
  return email.test(valor) || (digitos.length >= 10 && digitos.length <= 15);
}

function json(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

export async function POST(req: Request) {
  if (!origenPermitido(req)) {
    return json(403, { success: false, message: 'Origen no permitido.' });
  }

  // 1) Rate limit anti-flood (cuenta TODAS las peticiones) ---------------
  const ip = ipDeRequest(req);
  const flood = rateLimit(`flood:${ip}`, LIMITE_FLOOD);
  if (!flood.permitido) {
    return NextResponse.json(
      { success: false, message: 'Demasiadas solicitudes. Intenta de nuevo en unos minutos.' },
      { status: 429, headers: { 'Retry-After': String(flood.reintentarEnSegundos) } }
    );
  }

  // 2) Content-Type: lista blanca explícita ------------------------------
  // Sin esto, cualquier tipo (text/plain incluido) caía al parser de formulario.
  const contentType = (req.headers.get('content-type') ?? '').toLowerCase();
  const esJson = contentType.includes('application/json');
  const esForm = contentType.includes('application/x-www-form-urlencoded');
  if (!esJson && !esForm) {
    return json(415, { success: false, message: 'Tipo de contenido no soportado.' });
  }

  // 3) Cuerpo: corte duro por BYTES mientras se lee -----------------------
  // El header Content-Length es opcional y falsificable, así que no basta con
  // confiar en él: se lee por chunks y se aborta en cuanto se pasa del tope,
  // sin acumular el resto en memoria.
  const contentLength = Number(req.headers.get('content-length') ?? 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return json(413, { success: false, message: 'Solicitud demasiado grande.' });
  }

  let raw: string;
  try {
    if (!req.body) {
      raw = '';
    } else {
      const reader = req.body.getReader();
      const trozos: Uint8Array[] = [];
      let bytes = 0;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        bytes += value.byteLength;
        if (bytes > MAX_BODY_BYTES) {
          await reader.cancel();
          return json(413, { success: false, message: 'Solicitud demasiado grande.' });
        }
        trozos.push(value);
      }
      const buffer = new Uint8Array(bytes);
      let offset = 0;
      for (const t of trozos) {
        buffer.set(t, offset);
        offset += t.byteLength;
      }
      raw = new TextDecoder('utf-8').decode(buffer);
    }
  } catch {
    return json(400, { success: false, message: 'No se pudo leer la solicitud.' });
  }

  // 4) Parseo: JSON (wizard con JS) o form-urlencoded --------------------
  let data: Record<string, unknown>;
  try {
    if (esJson) {
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      const inner = parsed.data;
      data = (inner && typeof inner === 'object' ? inner : parsed) as Record<string, unknown>;
    } else {
      data = Object.fromEntries(new URLSearchParams(raw));
    }
  } catch {
    return json(400, { success: false, message: 'Formato de solicitud inválido.' });
  }

  // 5) Honeypot --------------------------------------------------------
  if (typeof data.website === 'string' && data.website.trim() !== '') {
    // Respuesta 200 deliberada: el bot no aprende que fue detectado.
    return json(200, { success: true, message: 'Recibido' });
  }

  // 6) Validación estricta --------------------------------------------
  const errores: string[] = [];

  const str = (v: unknown) => (typeof v === 'string' ? v : '');

  const nombre = limpiarLinea(str(data.nombre), LIMITES_TEXTO.nombre);
  const contacto = limpiarLinea(str(data.contacto), LIMITES_TEXTO.contacto);
  const detalle = str(data.detalle).slice(0, LIMITES_TEXTO.detalle).trim();

  if (nombre.length < 2) errores.push('nombre');
  if (!esContactoValido(contacto)) errores.push('contacto');

  const enum_ = (campo: keyof typeof OPCIONES_VALIDAS, obligatorio: boolean) => {
    const v = limpiarLinea(str(data[campo]), 40);
    if (!v) {
      if (obligatorio) errores.push(campo);
      return '';
    }
    if (!(OPCIONES_VALIDAS[campo] as readonly string[]).includes(v)) {
      errores.push(campo);
      return '';
    }
    return v;
  };

  const tipo = enum_('tipo', true);
  const tamano = enum_('tamano', false);
  const frecuencia = enum_('frecuencia', false);
  const zona = enum_('zona', false);

  if (errores.length > 0) {
    return json(400, {
      success: false,
      message: 'Revisa los datos del formulario.',
      campos: errores,
    });
  }

  // 7) Rate limit de envíos: sólo aquí, cuando la solicitud ya es válida ---
  const envios = rateLimit(`envio:${ip}`, LIMITE_ENVIOS);
  if (!envios.permitido) {
    return NextResponse.json(
      {
        success: false,
        message:
          'Ya recibimos tu solicitud. Si necesitas corregir algo, escríbenos a ventas@limpiezamexico.com.',
      },
      { status: 429, headers: { 'Retry-After': String(envios.reintentarEnSegundos) } }
    );
  }

  // 8) Correo ----------------------------------------------------------
  const subject = limpiarLinea(
    `Nueva cotización · ${etiqueta('tipo', tipo)} · ${nombre}`,
    140
  );

  const fila = (k: string, v: string) =>
    `<tr><td style="padding:8px 12px;border-bottom:1px solid #EDEDEA;color:#62626B;">${esc(k)}</td>` +
    `<td style="padding:8px 12px;border-bottom:1px solid #EDEDEA;color:#1F1F25;"><strong>${esc(v)}</strong></td></tr>`;

  const htmlContent = `
    <div style="font-family:Inter,Arial,sans-serif;color:#1F1F25;max-width:620px;">
      <h2 style="color:#2C7A4B;margin:0 0 4px;">Nueva solicitud de cotización</h2>
      <p style="color:#62626B;margin:0 0 20px;font-size:14px;">Enviada desde el formulario de limpiezamexico.com</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${fila('Nombre', nombre)}
        ${fila('Contacto', contacto)}
        ${fila('Servicio', etiqueta('tipo', tipo))}
        ${tamano ? fila('Superficie', etiqueta('tamano', tamano)) : ''}
        ${frecuencia ? fila('Frecuencia', etiqueta('frecuencia', frecuencia)) : ''}
        ${zona ? fila('Zona', etiqueta('zona', zona)) : ''}
      </table>
      ${
        detalle
          ? `<div style="margin-top:20px;padding:14px 16px;background:#EDEDEA;border-left:4px solid #2C7A4B;">
               <p style="margin:0 0 6px;font-weight:600;">Detalles del cliente</p>
               <p style="margin:0;white-space:pre-line;">${esc(detalle)}</p>
             </div>`
          : ''
      }
      <p style="margin-top:26px;font-size:12px;color:#62626B;">
        ${esc(ADDRESS.full)} · Mensaje automático, responder al contacto indicado arriba.
      </p>
    </div>`;

  const enviado = await sendEmail(DESTINATARIOS.join(', '), subject, htmlContent);

  if (!enviado) {
    // No exponemos detalles de infraestructura al cliente.
    console.error('[notify] Fallo al enviar la cotización. Revisar SMTP_USER / SMTP_PASS.');
    return json(502, {
      success: false,
      message: 'No pudimos enviar tu solicitud. Escríbenos a ventas@limpiezamexico.com.',
    });
  }

  return json(200, { success: true, message: 'Recibido' });
}

/** Cualquier otro método: 405 explícito en vez de comportamiento raro. */
export async function GET() {
  return json(405, { success: false, message: 'Método no permitido.' });
}
