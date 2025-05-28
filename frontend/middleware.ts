import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  // Protected routes that require authentication
  const protectedPaths = ['/organizerDashboard', '/playerdashboard']
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))

  // Redirect to login if accessing protected routes without authentication
  if (isProtectedPath && !user) {
    const redirectUrl = new URL('/auth/login', request.url)
    redirectUrl.searchParams.set('redirectedFrom', pathname)
    return NextResponse.redirect(redirectUrl);
  }

  // Your existing login/signup redirect logic
  if (user && (pathname === '/auth/login' || pathname === '/auth/sign-up')) {
    const url = request.nextUrl.clone();
    url.pathname = '/';  
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for static assets and images
     * Also match all dashboard routes
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    '/organizerDashboard/:path*',
    '/playerdashboard/:path*'
  ],
};