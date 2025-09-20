import { createAuthClient } from "better-auth/react";

const client = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});

export const authClient = client;

// Export individual methods for easier use
export const signIn = client.signIn;
export const signUp = client.signUp;
export const signOut = client.signOut;
export const useSession = client.useSession;