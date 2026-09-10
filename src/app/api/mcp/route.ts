import { NextResponse } from 'next/server';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { rateLimit, ipDeRequest } from '@/lib/rate-limit';
import {
  AGENT_COTIZACION_MAX_BODY_BYTES,
  catalogoAgentes,
  CotizacionError,
  cotizacionAgenteShape,
  leerJsonLimitado,
  solicitarCotizacionAgente,
} from '@/lib/agent-cotizacion';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, MCP-Protocol-Version, Last-Event-ID, User-Agent',
  'Access-Control-Expose-Headers': 'MCP-Session-Id',
  'Cache-Control': 'no-store',
};

function withCors(response: Response): Response {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(CORS_HEADERS)) headers.set(key, value);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

function jsonRpcError(status: number, message: string, id: string | number | null = null): Response {
  return NextResponse.json(
    { jsonrpc: '2.0', error: { code: status === 429 ? -32000 : -32603, message }, id },
    { status, headers: CORS_HEADERS }
  );
}

function checkMcpRateLimit(req: Request): Response | null {
  const ip = ipDeRequest(req);
  const limite = rateLimit(`mcp:${ip}`, { limite: 60, ventanaMs: 60 * 1000 });
  if (!limite.permitido) {
    return NextResponse.json(
      { jsonrpc: '2.0', error: { code: -32000, message: 'Rate-limit MCP excedido.' }, id: null },
      { status: 429, headers: { ...CORS_HEADERS, 'Retry-After': String(limite.reintentarEnSegundos) } }
    );
  }
  return null;
}

function getServer(req: Request) {
  const server = new McpServer(
    {
      name: 'limpieza-mexico-agent-ready',
      version: '2026-09-08',
    },
    {
      capabilities: { tools: {} },
      instructions:
        'Servidor MCP público de Limpieza México. No requiere autenticación. Usa solicitar_cotizacion solo con consentimiento del usuario final.',
    }
  );

  server.registerTool(
    'consultar_servicios',
    {
      title: 'Consultar servicios',
      description: 'Devuelve el catálogo real de servicios de Limpieza México desde src/lib/site.ts.',
      inputSchema: {},
    },
    async () => ({
      content: [{ type: 'text', text: JSON.stringify({ servicios: catalogoAgentes().servicios }, null, 2) }],
    })
  );

  server.registerTool(
    'consultar_zonas',
    {
      title: 'Consultar zonas',
      description: 'Devuelve zonas publicadas, cobertura y contacto real de Limpieza México.',
      inputSchema: {},
    },
    async () => {
      const catalogo = catalogoAgentes();
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              { zonas: catalogo.zonas, cobertura: catalogo.cobertura, contacto: catalogo.contacto },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  server.registerTool(
    'solicitar_cotizacion',
    {
      title: 'Solicitar cotización',
      description:
        'Solicita una cotización real a Limpieza México. Valida el mismo schema de POST /api/cotizacion y envía el lead por el mismo backend de correo.',
      inputSchema: cotizacionAgenteShape,
    },
    async (args) => {
      try {
        const ip = ipDeRequest(req);
        const limite = rateLimit(`agent-cotizacion:${ip}`, { limite: 5, ventanaMs: 60 * 1000 });
        if (!limite.permitido) {
          return {
            isError: true,
            content: [{ type: 'text', text: `Rate-limit excedido. Reintenta en ${limite.reintentarEnSegundos}s.` }],
          };
        }
        const userAgent = req.headers.get('user-agent')?.trim() || 'mcp-client/unknown';
        const result = await solicitarCotizacionAgente(args, { userAgent, fuente: 'mcp' });
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        if (error instanceof CotizacionError) {
          return {
            isError: true,
            content: [{ type: 'text', text: `${error.message}${error.detalle ? ` ${JSON.stringify(error.detalle)}` : ''}` }],
          };
        }
        return { isError: true, content: [{ type: 'text', text: 'Error interno procesando la cotización.' }] };
      }
    }
  );

  return server;
}

async function handleMcp(req: Request): Promise<Response> {
  const blocked = checkMcpRateLimit(req);
  if (blocked) return blocked;

  let parsedBody: unknown;
  if (req.method === 'POST') {
    try {
      // Corte duro antes del SDK: el transporte MCP recibe el body ya parseado.
      parsedBody = await leerJsonLimitado(req);
    } catch (error) {
      if (error instanceof CotizacionError) return jsonRpcError(error.status, error.message);
      return jsonRpcError(400, 'JSON inválido.');
    }
  } else {
    const contentLength = Number(req.headers.get('content-length') ?? 0);
    if (Number.isFinite(contentLength) && contentLength > AGENT_COTIZACION_MAX_BODY_BYTES) {
      return jsonRpcError(413, 'Solicitud MCP demasiado grande.');
    }
  }

  const server = getServer(req);
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
    keepAliveMs: 1000,
  });
  let cerrarAlFinal = true;
  try {
    await server.connect(transport);
    const response = await transport.handleRequest(req, { parsedBody });
    const esSse = response.headers.get('content-type')?.toLowerCase().includes('text/event-stream') ?? false;
    cerrarAlFinal = !esSse;
    return withCors(response);
  } catch {
    console.error('[api/mcp] Error inesperado en transporte MCP.');
    return jsonRpcError(500, 'Error interno MCP.');
  } finally {
    if (cerrarAlFinal) {
      await transport.close().catch(() => undefined);
      await server.close().catch(() => undefined);
    }
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(req: Request) {
  return handleMcp(req);
}

export async function GET(req: Request) {
  return handleMcp(req);
}

export async function DELETE(req: Request) {
  return handleMcp(req);
}
