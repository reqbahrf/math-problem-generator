import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import ratelimit from '../rateLimiter';

export default async function rateLimitMiddleware(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'anonymous';
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  return NextResponse.next();
}
