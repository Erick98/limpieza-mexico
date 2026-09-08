import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  AGENT_COTIZACION_MAX_BODY_BYTES,
  AGENT_COTIZACION_RATE_LIMIT,
  cotizacionAgenteSchema,
} from '@/lib/agent-cotizacion';
import { EMAIL_VENTAS, PHONE_E164, SERVICIOS, SITE_NAME, SITE_URL } from '@/lib/site';

export const runtime = 'nodejs';

export async function GET() {
  const inputSchema = z.toJSONSchema(cotizacionAgenteSchema, { target: 'draft-7' });
  const servicioEjemplo = SERVICIOS[0]?.slug ?? '/limpieza-de-oficinas';

  const spec = {
    openapi: '3.1.0',
    info: {
      title: `${SITE_NAME} — API pública para cotización de agentes`,
      version: '2026-09-08',
      summary: 'Endpoint público y sin autenticación para que agentes soliciten una cotización real.',
      description:
        `Esta API documenta solo POST /api/cotizacion. No usa OAuth ni API keys: security: [] explícito. ` +
        `El rate-limit es en memoria por instancia serverless de Vercel (${AGENT_COTIZACION_RATE_LIMIT.limite}/min por IP), no global.`,
      contact: { name: 'Ventas Limpieza México', email: EMAIL_VENTAS },
    },
    servers: [{ url: SITE_URL, description: 'Dominio canónico con www' }],
    security: [],
    paths: {
      '/api/cotizacion': {
        options: {
          summary: 'Preflight CORS público',
          description: 'Permite llamadas desde agentes y clientes HTTP. No requiere autenticación.',
          security: [],
          responses: { '204': { description: 'CORS permitido.' } },
        },
        post: {
          summary: 'Solicitar cotización real desde un agente',
          description:
            'Valida el payload, aplica honeypot y rate-limit, y envía el lead al mismo backend de correo del formulario web con etiqueta [AGENTE] y User-Agent.',
          security: [],
          parameters: [
            {
              name: 'User-Agent',
              in: 'header',
              required: true,
              schema: { type: 'string', minLength: 1 },
              description: 'Identificador del agente o cliente HTTP solicitante.',
              example: 'mi-agente-cotizador/1.0',
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: inputSchema,
                examples: {
                  oficinaPolanco: {
                    summary: 'Oficina en Polanco',
                    value: {
                      nombre: 'María López',
                      telefono: '+525512345678',
                      email: 'maria@example.com',
                      servicio: servicioEjemplo,
                      zona: 'Polanco, Miguel Hidalgo',
                      detalles: 'Oficina de 250 m², limpieza lunes a viernes por la mañana.',
                    },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Cotización recibida o honeypot descartado silenciosamente.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    required: ['ok', 'id', 'mensaje', 'siguiente_paso'],
                    properties: {
                      ok: { type: 'boolean', const: true },
                      id: { type: 'string', examples: ['LMX-20260908063000-a1b2c3d4'] },
                      mensaje: { type: 'string' },
                      siguiente_paso: {
                        type: 'object',
                        required: ['whatsapp', 'telefono', 'email'],
                        properties: {
                          whatsapp: { type: ['string', 'null'], format: 'uri' },
                          telefono: { type: 'string', examples: [PHONE_E164] },
                          email: { type: 'string', format: 'email', examples: [EMAIL_VENTAS] },
                        },
                      },
                    },
                  },
                },
              },
            },
            '400': { description: 'JSON inválido, User-Agent faltante o campos fuera de esquema.' },
            '413': { description: `Payload mayor a ${AGENT_COTIZACION_MAX_BODY_BYTES} bytes.` },
            '415': { description: 'Content-Type distinto de application/json.' },
            '429': { description: 'Rate-limit excedido desde la misma IP.' },
          },
        },
      },
    },
  };

  return NextResponse.json(spec, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=300, s-maxage=3600',
    },
  });
}
