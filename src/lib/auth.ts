import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

export const auth = betterAuth({
  // Using session-only mode for Edge Runtime compatibility
  // No database persistence - suitable for admin authentication
  emailAndPassword: {
    enabled: true,
    autoSignIn: true, // Enable auto sign-in for admin convenience
    requireEmailVerification: false, // Disable for admin-only system
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  },
  advanced: {
    generateId: () => crypto.randomUUID(), // Use built-in UUID generation
  },
  plugins: [nextCookies()],
});

// Utility functions for API responses
export function createApiResponse<T>(data: T, status: number = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function createErrorResponse(message: string, status: number = 400) {
  return NextResponse.json({ success: false, error: message }, { status });
}

// Admin role checker - only admins can access admin routes
export async function isAdmin(request: NextRequest): Promise<boolean> {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    
    if (!session?.user) return false;
    
    // For now, any authenticated user is considered admin
    // In the future, you can add role-based checking here
    return true;
  } catch (error) {
    console.error("Admin check error:", error);
    return false;
  }
}

// Admin authentication middleware wrapper - ONLY for admin routes
export function withAdminAuth<T extends unknown[]>(
  handler: (req: NextRequest, ...args: T) => Promise<NextResponse>
) {
  return async (req: NextRequest, ...args: T): Promise<NextResponse> => {
    try {
      const adminAccess = await isAdmin(req);
      
      if (!adminAccess) {
        return createErrorResponse("Admin access required", 403);
      }

      return handler(req, ...args);
    } catch (error) {
      console.error("Admin auth middleware error:", error);
      return createErrorResponse("Authentication failed", 401);
    }
  };
}