#!/usr/bin/env node
/**
 * Crea la base de datos de leads de Limpieza México en Notion.
 *
 * Uso:
 *   NOTION_API_TOKEN=secret_xxx node scripts/crear-db-leads-notion.mjs <parent_page_id> [titulo]
 *
 * Imprime el ID de la base creada. Después configurar NOTION_LEADS_DB_ID con ese valor.
 */

const token = process.env.NOTION_API_TOKEN?.trim();
const parentPageId = process.argv[2]?.trim();
const title = process.argv.slice(3).join(' ').trim() || 'Leads — Limpieza México';

if (!token) {
  console.error('Falta NOTION_API_TOKEN en el entorno.');
  process.exit(1);
}

if (!parentPageId) {
  console.error('Uso: NOTION_API_TOKEN=... node scripts/crear-db-leads-notion.mjs <parent_page_id> [titulo]');
  process.exit(1);
}

const properties = {
  Nombre: { title: {} },
  Fecha: { date: {} },
  Canal: { select: { options: [{ name: 'web', color: 'green' }, { name: 'api', color: 'blue' }, { name: 'mcp', color: 'purple' }] } },
  Servicio: { rich_text: {} },
  Zona: { rich_text: {} },
  Tamaño: { rich_text: {} },
  Frecuencia: { rich_text: {} },
  Contacto: { rich_text: {} },
  Detalle: { rich_text: {} },
  'Correo enviado': { checkbox: {} },
  Destinatarios: { rich_text: {} },
  'IP hash': { rich_text: {} },
  'User-Agent': { rich_text: {} },
  ID: { rich_text: {} },
  Honeypot: { checkbox: {} },
};

const response = await fetch('https://api.notion.com/v1/databases', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Notion-Version': '2022-06-28',
  },
  body: JSON.stringify({
    parent: { type: 'page_id', page_id: parentPageId },
    title: [{ type: 'text', text: { content: title } }],
    properties,
  }),
});

const bodyText = await response.text();
if (!response.ok) {
  console.error(`Notion respondió ${response.status}: ${bodyText}`);
  process.exit(1);
}

const body = JSON.parse(bodyText);
console.log(body.id);
