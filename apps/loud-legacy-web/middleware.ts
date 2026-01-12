import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Routes that require authentication
const protectedRoutes = [
  '/api/valuations',
  '/api/properties',
  '/api/ai',
  '/api/upload',
  '/api/admin',
];

// Routes that require admin role
const adminRoutes = [
  '/api/admin',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if route requires authentication
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // For demo mode: allow unauthenticated access to non-admin routes
    // Only block admin routes without authentication
    if (isAdminRoute && !token) {
      return NextResponse.json(
        { error: 'Authentication required for admin access' },
        { status: 401 }
      );
    }

    // Check admin access
    if (isAdminRoute && token) {
      const userRole = token.role as string;
      if (userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN') {
        return NextResponse.json(
          { error: 'Admin access required' },
          { status: 403 }
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/valuations/:path*',
    '/api/properties/:path*',
    '/api/ai/:path*',
    '/api/upload/:path*',
    '/api/admin/:path*',
  ],
};
