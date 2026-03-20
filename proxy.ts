import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function unauthorized(message: string, status = 401) {
  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message,
      },
    },
    { status },
  );
}

export function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Keep health endpoint open for probes/load balancers.
  if (path === '/api/health') {
    return NextResponse.next();
  }

  const engineKey = process.env.ENGINE_API_KEY?.trim();

  // If not configured, skip auth (useful for local dev).
  if (!engineKey) {
    return NextResponse.next();
  }

  const authHeader = req.headers.get('authorization') || '';
  const bearer = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
  const headerKey = req.headers.get('x-engine-key')?.trim() || '';

  if (bearer === engineKey || headerKey === engineKey) {
    return NextResponse.next();
  }

  return unauthorized('Missing or invalid engine API key.');
}

export const config = {
  matcher: ['/api/:path*'],
};

