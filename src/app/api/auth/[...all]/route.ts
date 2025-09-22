import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// Enable Edge Runtime for Cloudflare Pages
export const runtime = 'edge';

export const { GET, POST } = toNextJsHandler(auth);