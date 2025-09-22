/**
 * Cloudflare Pages Adapter for Next.js API Routes
 * This adapter helps handle D1 database bindings in Cloudflare Pages environment
 */

import { NextRequest, NextResponse } from 'next/server';
import { getDB } from './db';
import type { Database } from './db';

// Cloudflare environment interface
interface CloudflareEnv {
  DB: import('@cloudflare/workers-types').D1Database;
  ASSETS: import('@cloudflare/workers-types').Fetcher;
  [key: string]: unknown;
}

// Extended request interface for Cloudflare
interface CloudflareRequest extends NextRequest {
  env?: CloudflareEnv;
  cf?: import('@cloudflare/workers-types').IncomingRequestCfProperties;
  ctx?: import('@cloudflare/workers-types').ExecutionContext;
}

// Context interface for API routes
export interface ApiContext {
  db: Database;
  env: CloudflareEnv;
  cf: import('@cloudflare/workers-types').IncomingRequestCfProperties | null;
  ctx: import('@cloudflare/workers-types').ExecutionContext | null;
}

/**
 * Wraps a Next.js API route handler to work with Cloudflare D1
 * This function extracts D1 bindings from the Cloudflare environment
 */
export function withCloudflareD1(
  handler: (request: NextRequest, context: ApiContext) => Promise<NextResponse | Response> | NextResponse | Response
) {
  return async (request: NextRequest, routeContext?: unknown): Promise<NextResponse | Response> => {
    try {
      // Extract Cloudflare environment from request
      const cfRequest = request as CloudflareRequest;
      
      // Get D1 binding from various possible sources
      let d1Database: import('@cloudflare/workers-types').D1Database | null = null;
      
      // Method 1: From request.env (Cloudflare Pages Functions)
      if (cfRequest.env?.DB) {
        d1Database = cfRequest.env.DB;
      }
      
      // Method 2: From global cloudflare object
      if (!d1Database && typeof globalThis !== 'undefined' && (globalThis as typeof globalThis & { cloudflare?: { env: CloudflareEnv } }).cloudflare?.env?.DB) {
        d1Database = (globalThis as typeof globalThis & { cloudflare: { env: CloudflareEnv } }).cloudflare.env.DB;
      }
      
      // Method 3: From route context (if provided by platform)
      if (!d1Database && routeContext && typeof routeContext === 'object' && routeContext !== null && 'env' in routeContext) {
        const env = (routeContext as { env?: unknown }).env;
        if (env && typeof env === 'object' && env !== null && 'DB' in env) {
          d1Database = (env as CloudflareEnv).DB;
        }
      }
      
      if (!d1Database) {
        console.warn('D1 database binding not found, falling back to local database');
        // In development or when D1 is not available, use local database
        const { getLocalDB } = await import('./db');
        const db = getLocalDB();
        
        const context: ApiContext = {
          db: db as unknown as Database,
          env: {} as CloudflareEnv,
          cf: null,
          ctx: null,
        };
        
        return await handler(request, context);
      }
      
      // Create database instance with D1
      const db = getDB(d1Database);
      
      // Create context object
      const context: ApiContext = {
        db,
        env: cfRequest.env || {} as CloudflareEnv,
        cf: cfRequest.cf || null,
        ctx: cfRequest.ctx || null,
      };
      
      return await handler(request, context);
    } catch (error) {
      console.error('Error in Cloudflare D1 adapter:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}

/**
 * Simple wrapper that uses smart database detection
 * This is backwards compatible with existing API routes
 */
export function withDatabase(
  handler: (request: NextRequest, context: { db: Database }) => Promise<NextResponse | Response> | NextResponse | Response
) {
  return async (request: NextRequest): Promise<NextResponse | Response> => {
    try {
      const { getDatabaseInstance } = await import('./db');
      const db = getDatabaseInstance();
      
      const context = { db: db as Database };
      return await handler(request, context);
    } catch (error) {
      console.error('Error in database adapter:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}

/**
 * Environment detection utilities
 */
export const isCloudflarePages = (): boolean => {
  return typeof globalThis !== 'undefined' && 'cloudflare' in globalThis;
};

export const isLocalDevelopment = (): boolean => {
  return typeof process !== 'undefined' && process.env.NODE_ENV === 'development';
};

export const isDevelopment = (): boolean => {
  return isLocalDevelopment() || process.env.NODE_ENV === 'development';
};

export const isProduction = (): boolean => {
  return process.env.NODE_ENV === 'production';
};
