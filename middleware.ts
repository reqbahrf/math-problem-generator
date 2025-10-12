import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import rateLimitMiddleware from './lib/middleware/rateLimit';

export async function middleware(req: NextRequest) {
  const rateLimitRes = await rateLimitMiddleware(req);
  if (rateLimitRes.status !== 200) return rateLimitRes;

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
