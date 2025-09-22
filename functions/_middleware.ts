/**
 * Cloudflare Pages Functions Middleware
 * This middleware ensures D1 database bindings are available to Next.js API routes
 */

interface Env {
  DB: import('@cloudflare/workers-types').D1Database;
  ASSETS: import('@cloudflare/workers-types').Fetcher;
}

export const onRequest: import('@cloudflare/workers-types').PagesFunction<Env> = async (context) => {
  // Make D1 binding available globally for API routes
  if (context.env.DB) {
    // Set the D1 binding in a global context that our API routes can access
    (globalThis as typeof globalThis & { cloudflare: unknown }).cloudflare = {
      env: context.env,
      cf: context.request.cf || {} as import('@cloudflare/workers-types').IncomingRequestCfProperties,
      ctx: context as unknown as import('@cloudflare/workers-types').ExecutionContext,
    };
  }

  // Continue to the next handler (Next.js)
  return context.next();
};
