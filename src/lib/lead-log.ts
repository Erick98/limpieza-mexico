import { createHash } from 'node:crypto';

export type CanalLead = 'web' | 'api' | 'mcp';

export type LeadLogInput = {
  nombre?: string;
  canal: CanalLead;
  servicio?: string;
  zona?: string;
  tamano?: string;
  frecuencia?: string;
  contacto?: string;
  detalle?: string;
  correoEnviado?: boolean;
  destinatarios?: string;
  ip?: string;
  userAgent?: string;
  id?: string;
  honeypot?: boolean;
  fecha?: string;
};

export type LeadLogResult = {
  ok: boolean;
  pageId?: string;
  skipped?: boolean;
};

const NOTION_VERSION = '2022-06-28';
const NOTION_API_URL = 'https://api.notion.com/v1';
const TIMEOUT_MS = 4_000;

let warnedMissingConfig = false;

function recortar(valor: unknown, max: number): string {
  return String(valor ?? '').replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, max);
}

function richText(valor: unknown, max = 2000) {
  const content = recortar(valor, max);
  return content ? [{ text: { content } }] : [];
}

function ipHash(ip: string | undefined): string {
  const limpia = recortar(ip, 128);
  if (!limpia || limpia === 'desconocida') return '';
  return createHash('sha256').update(limpia).digest('hex').slice(0, 16);
}

function notionConfig(): { token: string; databaseId: string } | null {
  const token = process.env.NOTION_API_TOKEN?.trim();
  const databaseId = process.env.NOTION_LEADS_DB_ID?.trim();
  if (!token || !databaseId) {
    if (!warnedMissingConfig) {
      warnedMissingConfig = true;
      console.warn('[lead-log] NOTION_API_TOKEN o NOTION_LEADS_DB_ID no configurado; registro de leads omitido.');
    }
    return null;
  }
  return { token, databaseId };
}

async function notionFetch(path: string, init: RequestInit): Promise<Response> {
  const config = notionConfig();
  if (!config) throw new Error('notion_config_missing');

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(`${NOTION_API_URL}${path}`, {
      ...init,
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${config.token}`,
        'Content-Type': 'application/json',
        'Notion-Version': NOTION_VERSION,
        ...(init.headers ?? {}),
      },
    });
  } finally {
    clearTimeout(timeout);
  }
}

export async function registrarLead(lead: LeadLogInput): Promise<LeadLogResult> {
  const config = notionConfig();
  if (!config) return { ok: true, skipped: true };

  const nombre = recortar(lead.nombre, 120) || 'Lead sin nombre';
  const fecha = lead.fecha ?? new Date().toISOString();

  try {
    const response = await notionFetch('/pages', {
      method: 'POST',
      body: JSON.stringify({
        parent: { database_id: config.databaseId },
        properties: {
          Nombre: { title: [{ text: { content: nombre } }] },
          Fecha: { date: { start: fecha } },
          Canal: { select: { name: lead.canal } },
          Servicio: { rich_text: richText(lead.servicio) },
          Zona: { rich_text: richText(lead.zona) },
          Tamaño: { rich_text: richText(lead.tamano) },
          Frecuencia: { rich_text: richText(lead.frecuencia) },
          Contacto: { rich_text: richText(lead.contacto) },
          Detalle: { rich_text: richText(lead.detalle, 2000) },
          'Correo enviado': { checkbox: Boolean(lead.correoEnviado) },
          Destinatarios: { rich_text: richText(lead.destinatarios) },
          'IP hash': { rich_text: richText(ipHash(lead.ip), 16) },
          'User-Agent': { rich_text: richText(lead.userAgent, 200) },
          ID: { rich_text: richText(lead.id, 80) },
          Honeypot: { checkbox: Boolean(lead.honeypot) },
        },
      }),
    });

    if (!response.ok) {
      console.error(`[lead-log] Notion POST falló con status ${response.status}.`);
      return { ok: false };
    }

    const body = (await response.json().catch(() => null)) as { id?: string } | null;
    return { ok: true, pageId: body?.id };
  } catch (error) {
    if (error instanceof Error && error.message === 'notion_config_missing') return { ok: true, skipped: true };
    console.error('[lead-log] Error registrando lead en Notion:', error);
    return { ok: false };
  }
}

export async function actualizarCorreoLead(pageId: string | undefined, correoEnviado: boolean): Promise<void> {
  if (!pageId) return;
  if (!notionConfig()) return;

  try {
    const response = await notionFetch(`/pages/${encodeURIComponent(pageId)}`, {
      method: 'PATCH',
      body: JSON.stringify({
        properties: {
          'Correo enviado': { checkbox: correoEnviado },
        },
      }),
    });
    if (!response.ok) {
      console.error(`[lead-log] Notion PATCH falló con status ${response.status}.`);
    }
  } catch (error) {
    console.error('[lead-log] Error actualizando estado de correo en Notion:', error);
  }
}
