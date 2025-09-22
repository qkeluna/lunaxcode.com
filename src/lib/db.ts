import { drizzle } from 'drizzle-orm/libsql';
import { drizzle as drizzleD1 } from 'drizzle-orm/d1';
import { createClient } from '@libsql/client';
import * as schema from './schema';

// Import Cloudflare types
type D1Database = import('@cloudflare/workers-types').D1Database;

// For local development with SQLite
export function getLocalDB() {
  if (typeof window !== 'undefined') {
    throw new Error('Database connection should only be used on the server side');
  }
  
  const client = createClient({
    url: 'file:./local.db', // Local SQLite file for development
  });
  
  return drizzle(client, { schema });
}

// For production with Cloudflare D1
export function getDB(d1Database: D1Database) {
  return drizzleD1(d1Database, { schema });
}

// Smart database getter that works in different environments
export function getDatabaseInstance(): ReturnType<typeof getDB> | ReturnType<typeof getLocalDB> {
  // Check if we're in a Cloudflare Workers/Pages environment
  if (typeof globalThis !== 'undefined' && 'cloudflare' in globalThis) {
    // We're in Cloudflare environment - use D1
    const cf = (globalThis as typeof globalThis & { cloudflare?: { env: { DB: import('@cloudflare/workers-types').D1Database } } }).cloudflare;
    if (cf?.env?.DB) {
      return getDB(cf.env.DB);
    }
  }
  
  // For all other environments, use local DB
  // In production on Cloudflare, the middleware will provide D1 bindings
  return getLocalDB();
}

// Helper function to get DB from request context (for API routes)
export function getDBFromRequest(): ReturnType<typeof getDB> | ReturnType<typeof getLocalDB> {
  // In Cloudflare Pages Functions, the D1 binding is available on the context
  // This will be used when we migrate API routes to work with the platform adapter
  
  // For now, use the smart getter
  return getDatabaseInstance();
}

// Environment type definitions
declare global {
  interface CloudflareEnv {
    DB: D1Database;
  }
  
  // Extend global for Cloudflare Workers
  var cloudflare: {
    env: CloudflareEnv;
    cf: import('@cloudflare/workers-types').IncomingRequestCfProperties;
    ctx: import('@cloudflare/workers-types').ExecutionContext;
  } | undefined;
}

// Type helper for database instance
export type Database = ReturnType<typeof getDB>;
export type LocalDatabase = ReturnType<typeof getLocalDB>;
export type DatabaseInstance = Database | LocalDatabase;