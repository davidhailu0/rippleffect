import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url))
}
 
export const config = {
    matcher: [
        '/((?!api|up|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
      ],
  }