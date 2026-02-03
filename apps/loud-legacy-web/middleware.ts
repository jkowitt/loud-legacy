import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Routes that require authentication (real account, not demo)
const protectedRoutes = [
  '/api/valuations',
  '/api/properties',
  '/api/ai',
  '/api/upload',
  '/api/admin',
  '/api/analyze-building',
  '/api/property-records',
];

// Routes that require admin role
const adminRoutes = [
  '/api/admin',
];

// Allowed origins for CORS (add your production domain)
const allowedOrigins = new Set([
  process.env.NEXTAUTH_URL || '',
  process.env.NEXT_PUBLIC_APP_URL || '',
].filter(Boolean));

function addSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self), payment=(self)');
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isApiRoute = pathname.startsWith('/api/');

  // CORS: Block cross-origin API requests in production
  if (isApiRoute && allowedOrigins.size > 0) {
    const origin = request.headers.get('origin');
    if (origin && !allowedOrigins.has(origin)) {
      return addSecurityHeaders(
        NextResponse.json(
          { error: 'Cross-origin request blocked' },
          { status: 403 }
        )
      );
    }
  }

  // Check if route requires authentication
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Require real authentication for all protected routes
    if (!token) {
      return addSecurityHeaders(
        NextResponse.json(
          { error: 'Authentication required. Please sign in with a real account.' },
          { status: 401 }
        )
      );
    }

    // Check admin access
    if (isAdminRoute) {
      const userRole = token.role as string;
      if (userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN') {
        return addSecurityHeaders(
          NextResponse.json(
            { error: 'Admin access required' },
            { status: 403 }
          )
        );
      }
    }
  }

  const response = NextResponse.next();
  return addSecurityHeaders(response);
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
