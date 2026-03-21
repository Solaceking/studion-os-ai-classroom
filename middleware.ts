import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * AGPL Compliance Middleware
 * 
 * This middleware ensures that only API routes are publicly accessible.
 * All UI pages and other non-API routes are blocked with a 403 Forbidden response.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Allow API routes (Primary access point)
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // 2. Allow internal Next.js requests (needed for the server to function correctly)
  if (pathname.startsWith('/_next/')) {
    return NextResponse.next();
  }

  // 3. Block everything else with 403 Forbidden
  // This satisfies AGPL requirements by preventing UI access
  return new NextResponse('Forbidden: Only API access is permitted.', { 
    status: 403,
    headers: { 'Content-Type': 'text/plain' }
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (allowed in middleware)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * 
     * Note: matcher here is a performance optimization.
     * The middleware logic above is the authoritative source of truth.
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
