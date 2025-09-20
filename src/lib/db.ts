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

// Environment type definitions
declare global {
  interface CloudflareEnv {
    DB: D1Database;
  }
}

// Type helper for database instance
export type Database = ReturnType<typeof getDB>;
export type LocalDatabase = ReturnType<typeof getLocalDB>;