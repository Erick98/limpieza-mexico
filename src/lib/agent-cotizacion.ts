import { z } from 'zod';
import { sendEmail } from '@/lib/mailer';
import { rateLimit, ipDeRequest } from '@/lib/rate-limit';
import {
  ADDRESS,
  EMAIL_CONTACTO,
  EMAIL_VENTAS,
  PHONE_DISPLAY,
  PHONE_E164,
  SERVICIOS,
  SITE_NAME,
  SITE_URL,
  whatsappUrl,
  ZONAS,
  COBERTURA,
} from '@/lib/site';

export const runtime = 'nodejs';

export const AGENT_COTIZACION_MAX_BODY_BYTES = 16 * 1024;
export const AGENT_COTIZACION_RATE_LIMIT = { limite: 5, ventanaMs: 60 * 1000 } as const;

export const SERVICIO_SLUGS = SERVICIOS.map((servicio) => servicio.slug) as [string, ...string[]];

const telefonoSchema = z
  .string()
  .trim()
  .min(10, 'El teléfono debe tener 10 dígitos MX o formato E.164.')
  .max(20, 'El teléfono es demasiado largo.')
  .refine((valor) => {
    const compacto = valor.replace(/[\s().-]/g, '');
    const digitos = valor.replace(/\D/g, '');
    return /^\+[1-9]\d{7,14}$/.test(compacto) || digitos.length === 10;
  }, 'Usa formato E.164 (+525539643612) o 10 dígitos MX.');

export const cotizacionAgenteSchema = z
  .object({
    nombre: z.string().trim().min(2).max(80),
    telefono: telefonoSchema,
    email: z.string().trim().email().max(120).optional().or(z.literal('')),
    servicio: z.enum(SERVICIO_SLUGS),
    zona: z.string().trim().max(80).optional().default(''),
    detalles: z.string().trim().max(1000).optional().default(''),
    website: z.string().trim().max(200).optional().default(''),
  })
  .strict();

export const cotizacionAgenteShape = {
  nombre: z.string().trim().min(2).max(80).describe('Nombre de la persona que solicita la cotización.'),
  telefono: telefonoSchema.describe('Teléfono del prospecto en E.164 o 10 dígitos MX.'),
  email: z.string().trim().email().max(120).optional().or(z.literal('')).describe('Email opcional del prospecto.'),
  servicio: z.enum(SERVICIO_SLUGS).describe('Slug real del servicio en el catálogo de Limpieza México.'),
  zona: z.string().trim().max(80).optional().describe('Colonia, alcaldía o municipio donde se requiere el servicio.'),
  detalles: z.string().trim().max(1000).optional().describe('Detalles relevantes: superficie, frecuencia, horarios, acceso, insumos o restricciones.'),
  website: z.string().trim().max(200).optional().describe('Honeypot anti-spam. Los agentes legítimos deben omitirlo.'),
} as const;

export type CotizacionAgenteInput = z.infer<typeof cotizacionAgenteSchema>;

export type ResultadoCotizacionAgente = {
  ok: true;
  id: string;
  mensaje: string;
  siguiente_paso: {
    whatsapp: string | null;
    telefono: string;
    email: string;
  };
  dryRun?: boolean;
};

export class CotizacionError extends Error {
  constructor(
    public status: number,
    message: string,
    public detalle?: unknown,
    public retryAfter?: number
  ) {
    super(message);
  }
}

export function catalogoAgentes() {
  return {
    sitio: { nombre: SITE_NAME, url: SITE_URL },
    servicios: SERVICIOS.map((servicio) => ({
      slug: servicio.slug,
      nombre: servicio.nombre,
      corto: servicio.corto,
      resumen: servicio.resumen,
      url: `${SITE_URL}${servicio.slug}`,
    })),
    zonas: ZONAS.map((zona) => ({ ...zona, url: `${SITE_URL}${zona.slug}` })),
    cobertura: [...COBERTURA],
    contacto: {
      telefono: PHONE_E164,
      telefono_display: PHONE_DISPLAY,
      whatsapp: whatsappUrl('Hola, quiero cotizar un servicio de limpieza en CDMX.'),
      email: EMAIL_VENTAS,
      email_general: EMAIL_CONTACTO,
      direccion: ADDRESS.full,
    },
    api: {
      cotizacion: `${SITE_URL}/api/cotizacion`,
      openapi: `${SITE_URL}/api/openapi.json`,
      mcp: `${SITE_URL}/api/mcp`,
      seguridad: 'API pública sin autenticación; validación estricta, honeypot y controles antiabuso.',
    },
  };
}

export function escHtml(valor: unknown): string {
  return String(valor ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function limpiarLinea(valor: string, max: number): string {
  return valor.replace(/[\r\n\t]+/g, ' ').trim().slice(0, max);
}

export function siguientePaso() {
  return {
    whatsapp: whatsappUrl('Hola, quiero cotizar un servicio de limpieza en CDMX.'),
    telefono: PHONE_E164,
    email: EMAIL_VENTAS,
  };
}

export function respuestaHoneypot(): ResultadoCotizacionAgente {
  return {
    ok: true,
    id: 'silencioso',
    mensaje: 'Solicitud recibida.',
    siguiente_paso: siguientePaso(),
  };
}

export function aplicaRateLimitCotizacion(req: Request): void {
  const ip = ipDeRequest(req);
  const limite = rateLimit(`agent-cotizacion:${ip}`, AGENT_COTIZACION_RATE_LIMIT);
  if (!limite.permitido) {
    throw new CotizacionError(
      429,
      'Demasiadas solicitudes de cotización. Intenta de nuevo en unos minutos.',
      undefined,
      limite.reintentarEnSegundos
    );
  }
}

export async function leerJsonLimitado(req: Request): Promise<unknown> {
  const contentType = (req.headers.get('content-type') ?? '').toLowerCase();
  if (!contentType.includes('application/json')) {
    throw new CotizacionError(415, 'Tipo de contenido no soportado. Usa application/json.');
  }

  const contentLength = Number(req.headers.get('content-length') ?? 0);
  if (Number.isFinite(contentLength) && contentLength > AGENT_COTIZACION_MAX_BODY_BYTES) {
    throw new CotizacionError(413, 'Solicitud demasiado grande. Máximo 16KB.');
  }

  let raw = '';
  try {
    if (req.body) {
      const reader = req.body.getReader();
      const chunks: Uint8Array[] = [];
      let bytes = 0;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        bytes += value.byteLength;
        if (bytes > AGENT_COTIZACION_MAX_BODY_BYTES) {
          await reader.cancel();
          throw new CotizacionError(413, 'Solicitud demasiado grande. Máximo 16KB.');
        }
        chunks.push(value);
      }
      const buffer = new Uint8Array(bytes);
      let offset = 0;
      for (const chunk of chunks) {
        buffer.set(chunk, offset);
        offset += chunk.byteLength;
      }
      raw = new TextDecoder('utf-8', { fatal: false }).decode(buffer);
    }
    return JSON.parse(raw || '{}');
  } catch (error) {
    if (error instanceof CotizacionError) throw error;
    throw new CotizacionError(400, 'JSON inválido.');
  }
}

function servicioNombre(slug: string): string {
  return SERVICIOS.find((servicio) => servicio.slug === slug)?.nombre ?? slug;
}

function destinatarios(): string {
  return (process.env.ADMIN_EMAILS ?? `${EMAIL_CONTACTO},${EMAIL_VENTAS}`)
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean)
    .join(', ');
}

export async function solicitarCotizacionAgente(
  input: unknown,
  opciones: { userAgent: string; fuente: 'api' | 'mcp' }
): Promise<ResultadoCotizacionAgente> {
  const parsed = cotizacionAgenteSchema.safeParse(input);
  if (!parsed.success) {
    throw new CotizacionError(400, 'Datos inválidos para la cotización.', parsed.error.flatten());
  }

  const data = parsed.data;
  if (data.website) return respuestaHoneypot();

  const id = `LMX-${new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14)}-${crypto.randomUUID().slice(0, 8)}`;
  const ua = limpiarLinea(opciones.userAgent, 180);
  const fuente = opciones.fuente === 'mcp' ? 'MCP' : 'API';
  const subject = limpiarLinea(`[AGENTE] Cotización ${fuente} · ${servicioNombre(data.servicio)} · ${data.nombre}`, 140);

  const fila = (k: string, v: string) =>
    `<tr><td style="padding:8px 12px;border-bottom:1px solid #EDEDEA;color:#62626B;">${escHtml(k)}</td>` +
    `<td style="padding:8px 12px;border-bottom:1px solid #EDEDEA;color:#1F1F25;"><strong>${escHtml(v)}</strong></td></tr>`;

  const htmlContent = `
    <div style="font-family:Inter,Arial,sans-serif;color:#1F1F25;max-width:660px;">
      <h2 style="color:#2C7A4B;margin:0 0 4px;">[AGENTE] Nueva solicitud de cotización</h2>
      <p style="color:#62626B;margin:0 0 20px;font-size:14px;">Origen: ${escHtml(fuente)} público para agentes · ID ${escHtml(id)}</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${fila('Nombre', data.nombre)}
        ${fila('Teléfono', data.telefono)}
        ${data.email ? fila('Email', data.email) : ''}
        ${fila('Servicio', servicioNombre(data.servicio))}
        ${data.zona ? fila('Zona', data.zona) : ''}
        ${fila('User-Agent', ua)}
      </table>
      ${
        data.detalles
          ? `<div style="margin-top:20px;padding:14px 16px;background:#EDEDEA;border-left:4px solid #2C7A4B;">
               <p style="margin:0 0 6px;font-weight:600;">Detalles del prospecto</p>
               <p style="margin:0;white-space:pre-line;">${escHtml(data.detalles)}</p>
             </div>`
          : ''
      }
      <p style="margin-top:26px;font-size:12px;color:#62626B;">
        ${escHtml(ADDRESS.full)} · Mensaje automático de limpiezamexico.com/api/${escHtml(opciones.fuente)}.
      </p>
    </div>`;

  const dryRun = process.env.COTIZACION_DRY_RUN === '1' || process.env.COTIZACION_DRY_RUN === 'true';
  if (!dryRun) {
    const enviado = await sendEmail(destinatarios(), subject, htmlContent);
    if (!enviado) {
      throw new CotizacionError(502, 'No pudimos enviar la solicitud. Usa WhatsApp o email como siguiente paso.');
    }
  }

  return {
    ok: true,
    id,
    mensaje: dryRun
      ? 'Cotización validada en modo dry-run; no se envió correo.'
      : 'Solicitud de cotización recibida. El equipo de Limpieza México dará seguimiento.',
    siguiente_paso: siguientePaso(),
    ...(dryRun ? { dryRun: true } : {}),
  };
}
