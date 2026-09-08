import { NextRequest, NextResponse } from 'next/server';
import { routeMarkdown } from '@/lib/agent-content';

// Solo recursos que EXISTEN y funcionan. OAuth/WebMCP/commerce se omiten porque no aplican.
const LINK_HEADER = [
  '</.well-known/agent-skills/index.json>; rel="agent-skills"',
  '</.well-known/ai-catalog.json>; rel="ard"',
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</api/openapi.json>; rel="service-desc"',
  '</.well-known/mcp/server-card.json>; rel="mcp"',
].join(', ');

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname.replace(/\/$/, '') || '/';
  const acceptsMarkdown = request.headers.get('accept')?.toLowerCase().includes('text/markdown');

  if (acceptsMarkdown) {
    const md = routeMarkdown(pathname);
    if (md) {
      return new NextResponse(md, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Cache-Control': 'public, max-age=300, s-maxage=3600',
          Link: LINK_HEADER,
        },
      });
    }
  }

  const res = NextResponse.next();
  if (pathname === '/') res.headers.set('Link', LINK_HEADER);
  return res;
}

export const config = {
  matcher: ['/', '/servicio-de-limpieza-cdmx', '/limpieza-de-oficinas', '/limpieza-domestica', '/limpieza-especializada', '/zonas/:path*', '/preguntas-frecuentes'],
};
