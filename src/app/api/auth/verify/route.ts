import { NextRequest } from 'next/server';
import { withAuth, createApiResponse } from '@/lib/auth';

// Enable Edge Runtime for Cloudflare Pages
export const runtime = 'edge';

export const GET = withAuth(async (req: NextRequest, user) => {
  return createApiResponse({
    message: 'Token is valid',
    user,
  });
});