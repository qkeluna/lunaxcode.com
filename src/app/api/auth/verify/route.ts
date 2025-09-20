import { NextRequest } from 'next/server';
import { withAuth, createApiResponse } from '@/lib/auth';

export const GET = withAuth(async (req: NextRequest, user) => {
  return createApiResponse({
    message: 'Token is valid',
    user,
  });
});