import { drizzle } from 'drizzle-orm/libsql';
import { drizzle as drizzleD1 } from 'drizzle-orm/d1';
import * as schema from './schema';

// Import Cloudflare types
type D1Database = import('@cloudflare/workers-types').D1Database;

// Lazy database instances to avoid build-time initialization
let localDbInstance: ReturnType<typeof drizzle> | null = null;

// For local development with SQLite
export function getLocalDB() {
  if (typeof window !== 'undefined') {
    throw new Error('Database connection should only be used on the server side');
  }
  
  // Check if we're in Edge Runtime - don't create file: URLs
  const isEdgeRuntime = (typeof process !== 'undefined' && process.env.NEXT_RUNTIME === 'edge') ||
                       (typeof globalThis !== 'undefined' && 'EdgeRuntime' in globalThis);
  
  if (isEdgeRuntime) {
    // Return a mock database during build time to avoid the file: URL error
    console.warn('Local SQLite database not supported in Edge Runtime. Using mock database.');
    const mockDb = new Proxy({} as ReturnType<typeof drizzle>, {
      get() {
        throw new Error('Local SQLite database not supported in Edge Runtime. Use D1 database instead.');
      }
    });
    return mockDb;
  }
  
  // Lazy initialization to avoid build-time issues
  if (!localDbInstance) {
    // For synchronous usage, we need to use require (with ESLint disable)
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { createClient } = require('@libsql/client');
    const client = createClient({
      url: 'file:./local.db', // Local SQLite file for development
    });
    localDbInstance = drizzle(client, { schema });
  }
  
  return localDbInstance;
}

// For production with Cloudflare D1
export function getDB(d1Database: D1Database) {
  return drizzleD1(d1Database, { schema });
}

// Smart database getter that works in different environments
export function getDatabaseInstance(): ReturnType<typeof getDB> | ReturnType<typeof getLocalDB> {
  // Check if we're in Edge Runtime first
  const isEdgeRuntime = (typeof process !== 'undefined' && process.env.NEXT_RUNTIME === 'edge') ||
                       (typeof globalThis !== 'undefined' && 'EdgeRuntime' in globalThis);
  
  // Check if we're in Cloudflare Pages build environment
  const isCloudflarePagesBuild = (typeof process !== 'undefined' && 
                                 (process.env.CF_PAGES === 'true' || 
                                  process.env.CLOUDFLARE_PAGES === '1' ||
                                  process.env.NODE_ENV === 'production'));
  
  if (isEdgeRuntime) {
    // In Edge Runtime, we must use D1 - check for Cloudflare bindings
    if (typeof globalThis !== 'undefined' && 'cloudflare' in globalThis) {
      const cf = (globalThis as typeof globalThis & { cloudflare?: { env: { DB: import('@cloudflare/workers-types').D1Database } } }).cloudflare;
      if (cf?.env?.DB) {
        return getDB(cf.env.DB);
      }
    }
    
    // If we're in Cloudflare Pages build but no D1 binding, return a mock for build-time
    if (isCloudflarePagesBuild) {
      console.warn('D1 database binding not available during Cloudflare Pages build. Using mock database.');
      const mockDb = new Proxy({} as ReturnType<typeof getDB>, {
        get() {
          throw new Error('Database operations not available during build time. This should only be called at runtime.');
        }
      });
      return mockDb;
    }
    
    // If no D1 binding available in Edge Runtime, throw error
    throw new Error('D1 database binding required for Edge Runtime. Please ensure Cloudflare D1 bindings are configured properly.');
  }
  
  // Check if we're in a Cloudflare Workers/Pages environment (but not Edge Runtime)
  if (typeof globalThis !== 'undefined' && 'cloudflare' in globalThis) {
    // We're in Cloudflare environment - use D1
    const cf = (globalThis as typeof globalThis & { cloudflare?: { env: { DB: import('@cloudflare/workers-types').D1Database } } }).cloudflare;
    if (cf?.env?.DB) {
      return getDB(cf.env.DB);
    }
  }
  
  // For Node.js runtime (local development), use local DB
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