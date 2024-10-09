import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if(pathname==='/'&&request.cookies.has('email')){
    return NextResponse.redirect(new URL('/account', request.url));
  }
  if (pathname === '/' || pathname.endsWith('.png')) {
    return NextResponse.next();
  }

  if (!request.cookies.has('email')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!request.cookies.has('booked') && pathname !== '/step-1'&& pathname !== '/step-2'&&pathname !== '/book') {
    return NextResponse.redirect(new URL('/book', request.url));
  }

  return NextResponse.next();
}
 
export const config = {
    matcher: [
        '/((?!api|up|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
      ],
  }