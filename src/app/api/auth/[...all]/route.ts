/**
 * Better Auth API Route Handler
 * Handles ALL authentication routes for admin-only access
 * Routes: /api/auth/sign-in, /api/auth/sign-up, /api/auth/sign-out, etc.
 */

import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// Handle all auth-related requests
const handler = toNextJsHandler(auth);

export const GET = handler.GET;
export const POST = handler.POST;

export const runtime = 'nodejs'; // Use Node.js runtime for better-auth compatibility