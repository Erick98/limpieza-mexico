import { NextResponse } from 'next/server';
import {
  aplicaRateLimitCotizacion,
  CotizacionError,
  leerJsonLimitado,
  solicitarCotizacionAgente,
} from '@/lib/agent-cotizacion';

export const runtime = 'nodejs';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, User-Agent',
  'Access-Control-Max-Age': '86400',
  'Cache-Control': 'no-store',
};

function json(status: number, body: Record<string, unknown>, retryAfter?: number) {
  return NextResponse.json(body, {
    status,
    headers: {
      ...CORS_HEADERS,
      ...(retryAfter ? { 'Retry-After': String(retryAfter) } : {}),
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(req: Request) {
  const userAgent = req.headers.get('user-agent')?.trim();
  if (!userAgent) {
    return json(400, { ok: false, mensaje: 'User-Agent obligatorio para identificar al agente solicitante.' });
  }

  try {
    aplicaRateLimitCotizacion(req);
    const body = await leerJsonLimitado(req);
    const result = await solicitarCotizacionAgente(body, { userAgent, fuente: 'api' });
    return json(200, result);
  } catch (error) {
    if (error instanceof CotizacionError) {
      return json(error.status, { ok: false, mensaje: error.message, detalle: error.detalle }, error.retryAfter);
    }
    console.error('[api/cotizacion] Error inesperado procesando cotización de agente.');
    return json(500, { ok: false, mensaje: 'Error interno.' });
  }
}
