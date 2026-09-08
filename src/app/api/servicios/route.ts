import { NextResponse } from 'next/server';
import { catalogoAgentes } from '@/lib/agent-cotizacion';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json(catalogoAgentes(), {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=300, s-maxage=3600',
    },
  });
}
