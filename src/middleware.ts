import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin route protection - only /admin/* routes need authentication
  if (pathname.startsWith('/admin') && pathname !== '/admin') {
    const adminAccess = await isAdmin(request);
    
    if (!adminAccess) {
      // Redirect to admin login page
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // API admin route protection - only /api/cms/* routes need authentication (except POST onboarding)
  if (pathname.startsWith('/api/cms/')) {
    const isOnboardingPost = pathname === '/api/cms/onboarding' && request.method === 'POST';
    
    if (!isOnboardingPost) {
      const adminAccess = await isAdmin(request);
      
      if (!adminAccess) {
        return NextResponse.json(
          { success: false, error: 'Admin access required' },
          { status: 403 }
        );
      }
    }
  }

  // Public API routes (/api/public/*) should always be accessible without authentication
  if (pathname.startsWith('/api/public/')) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes) - except /api/cms/*
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
