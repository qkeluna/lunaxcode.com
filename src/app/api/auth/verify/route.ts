import { NextRequest } from 'next/server';
import { withAdminAuth, createApiResponse } from '@/lib/auth';

// Enable Edge Runtime for Cloudflare Pages
export const runtime = 'edge';

export const GET = withAdminAuth(async (req: NextRequest) => {
  return createApiResponse({
    message: 'Token is valid',
  });
});