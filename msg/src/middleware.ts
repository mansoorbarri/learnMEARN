import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export { default } from 'next-auth/middleware';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  const protectedPaths = ['/dashboard', '/verify'];

  if (token) {
    if (url.pathname.startsWith('/signin') || url.pathname.startsWith('/signout')) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    if (protectedPaths.some(path => url.pathname.startsWith(path))) {
      return NextResponse.next();
    }
  }

  if (protectedPaths.some(path => url.pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/signin',
    '/signout',
    '/dashboard/:path*',
    '/verify/:path*',
  ],
};
