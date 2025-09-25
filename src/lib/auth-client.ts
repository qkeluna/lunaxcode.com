import { createAuthClient } from "better-auth/react";

const client = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' ? window.location.origin : "http://localhost:3000"),
});

export const authClient = client;

// Export individual methods for easier use - ADMIN ONLY
export const signIn = client.signIn;
export const signUp = client.signUp;
export const signOut = client.signOut;
export const useSession = client.useSession;

// Admin-specific utilities
export function useAdminSession() {
  const session = useSession();
  
  return {
    ...session,
    isAdmin: session.data?.user ? true : false, // For now, any authenticated user is admin
    user: session.data?.user || null,
  };
}

// Admin route protection hook
export function useRequireAdmin() {
  const { isAdmin, isPending } = useAdminSession();
  
  if (!isPending && !isAdmin) {
    // Redirect to admin login
    if (typeof window !== 'undefined') {
      window.location.href = '/admin';
    }
  }
  
  return { isAdmin, isPending };
}