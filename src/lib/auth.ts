import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getLocalDB } from "@/lib/db";
import { user, session, account, verification } from "@/lib/auth-schema";
import { nextCookies } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Create database instance
const db = getLocalDB();

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001",
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
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

// JWT token generation for legacy auth (if needed)
export function generateToken(payload: object) {
  const secret = process.env.JWT_SECRET || "your-secret-key";
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

// Simple auth middleware wrapper
export function withAuth<T extends unknown[]>(
  handler: (req: NextRequest, ...args: T) => Promise<NextResponse>
) {
  return async (req: NextRequest, ...args: T): Promise<NextResponse> => {
    try {
      // For Better Auth, we can check the session
      const session = await auth.api.getSession({
        headers: req.headers,
      });

      if (!session) {
        return createErrorResponse("Unauthorized", 401);
      }

      // Add user to the request context if needed
      return handler(req, ...args);
    } catch (error) {
      console.error("Auth middleware error:", error);
      return createErrorResponse("Authentication failed", 401);
    }
  };
}