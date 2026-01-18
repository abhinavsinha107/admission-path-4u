import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Define public paths that don't need auth even if under /admin (like login)
    const isPublicPath = path === '/admin/login';

    // Check for admin token
    const token = request.cookies.get('admin_token')?.value || '';

    if (path.startsWith('/admin') && !isPublicPath && !token) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    if (isPublicPath && token) {
        // If already logged in, redirect to dashboard
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
    ],
};
