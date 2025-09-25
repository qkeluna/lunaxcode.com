import { createAuthClient } from "better-auth/react";

// Check if we're in static export mode (no API routes available)
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true' ||
  (typeof window !== 'undefined' && !window.location.origin.includes('localhost'));

let client: any = null;
let fallbackSession = {
  data: null,
  isPending: false,
  error: null
};

if (!isStaticExport) {
  client = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' ? window.location.origin : "http://localhost:3000"),
  });
}

export const authClient = client;

// Export individual methods for easier use - ADMIN ONLY
export const signIn = client?.signIn || (() => Promise.resolve());
export const signUp = client?.signUp || (() => Promise.resolve());
export const signOut = client?.signOut || (() => Promise.resolve());
export const useSession = client?.useSession || (() => fallbackSession);

// Admin-specific utilities
export function useAdminSession() {
  const session = useSession();

  // In static export mode, disable admin functionality
  if (isStaticExport) {
    return {
      data: null,
      isPending: false,
      error: new Error('Admin functionality not available in static export mode'),
      isAdmin: false,
      user: null,
    };
  }

  return {
    ...session,
    isAdmin: session.data?.user ? true : false, // For now, any authenticated user is admin
    user: session.data?.user || null,
  };
}

// Admin route protection hook
export function useRequireAdmin() {
  const { isAdmin, isPending } = useAdminSession();

  // In static export mode, prevent admin access
  if (isStaticExport) {
    return { isAdmin: false, isPending: false };
  }

  if (!isPending && !isAdmin) {
    // Redirect to admin login
    if (typeof window !== 'undefined') {
      window.location.href = '/admin';
    }
  }

  return { isAdmin, isPending };
}