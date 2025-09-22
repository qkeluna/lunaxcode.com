#!/usr/bin/env tsx

/**
 * Migration script to set up Cloudflare D1 database
 * This script helps you migrate from local SQLite to Cloudflare D1
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { readFileSync, existsSync } from 'fs';
import path from 'path';

const execAsync = promisify(exec);

interface D1Database {
  name: string;
  uuid: string;
  version: string;
  created_at: string;
}

interface WranglerListResponse {
  success: boolean;
  errors: unknown[];
  messages: unknown[];
  result: D1Database[];
}

async function checkWranglerAuth(): Promise<boolean> {
  try {
    await execAsync('wrangler whoami');
    return true;
  } catch (error) {
    console.error('❌ Wrangler authentication failed. Please run: wrangler login');
    return false;
  }
}

async function createD1Database(name: string): Promise<string | null> {
  try {
    console.log(`🚀 Creating D1 database: ${name}...`);
    const { stdout } = await execAsync(`wrangler d1 create ${name}`);
    
    // Extract database ID from output
    const match = stdout.match(/database_id = "([^"]+)"/);
    if (match && match[1]) {
      console.log(`✅ Created database ${name} with ID: ${match[1]}`);
      return match[1];
    } else {
      console.log(`⚠️  Database ${name} may already exist. Checking existing databases...`);
      return await getDatabaseId(name);
    }
  } catch (error: any) {
    if (error.message.includes('already exists')) {
      console.log(`⚠️  Database ${name} already exists. Getting ID...`);
      return await getDatabaseId(name);
    }
    console.error(`❌ Failed to create database ${name}:`, error.message);
    return null;
  }
}

async function getDatabaseId(name: string): Promise<string | null> {
  try {
    const { stdout } = await execAsync('wrangler d1 list --json');
    const response: WranglerListResponse = JSON.parse(stdout);
    
    if (response.success) {
      const database = response.result.find(db => db.name === name);
      if (database) {
        console.log(`✅ Found existing database ${name} with ID: ${database.uuid}`);
        return database.uuid;
      }
    }
    
    console.error(`❌ Database ${name} not found`);
    return null;
  } catch (error: any) {
    console.error('❌ Failed to list databases:', error.message);
    return null;
  }
}

async function updateWranglerConfig(prodId: string, devId?: string): Promise<void> {
  try {
    const wranglerPath = path.join(process.cwd(), 'wrangler.toml');
    let content = readFileSync(wranglerPath, 'utf-8');
    
    // Update production database ID
    content = content.replace(
      /database_id = "your-database-id-here"/,
      `database_id = "${prodId}"`
    );
    
    // Update development database ID if provided
    if (devId) {
      content = content.replace(
        /preview_database_id = "your-dev-database-id-here"/,
        `preview_database_id = "${devId}"`
      );
    }
    
    // Write back to file
    require('fs').writeFileSync(wranglerPath, content);
    console.log('✅ Updated wrangler.toml with database IDs');
  } catch (error: any) {
    console.error('❌ Failed to update wrangler.toml:', error.message);
  }
}

async function runMigrations(): Promise<void> {
  try {
    console.log('🚀 Running database migrations...');
    
    // First, generate migrations if needed
    if (!existsSync('./drizzle/0000_initial.sql')) {
      console.log('📝 Generating migrations...');
      await execAsync('pnpm d1:generate');
    }
    
    // Apply migrations to local development
    console.log('🔄 Applying migrations to local development database...');
    await execAsync('pnpm d1:migrate-dev');
    
    console.log('✅ Migrations completed successfully');
    console.log('💡 To apply migrations to production, run: pnpm d1:migrate-prod');
  } catch (error: any) {
    console.error('❌ Failed to run migrations:', error.message);
    console.log('💡 You may need to run migrations manually using: pnpm d1:migrate-dev');
  }
}

async function main(): Promise<void> {
  console.log('🚀 Starting Cloudflare D1 migration...\n');
  
  // Check authentication
  if (!(await checkWranglerAuth())) {
    process.exit(1);
  }
  
  // Create production database
  const prodId = await createD1Database('lunaxcode-cms');
  if (!prodId) {
    console.error('❌ Failed to create production database');
    process.exit(1);
  }
  
  // Create development database
  const devId = await createD1Database('lunaxcode-cms-dev');
  
  // Update wrangler.toml
  await updateWranglerConfig(prodId, devId || undefined);
  
  // Run migrations
  await runMigrations();
  
  console.log('\n🎉 Migration setup completed!\n');
  console.log('Next steps:');
  console.log('1. Update your environment variables with the database IDs:');
  console.log(`   CLOUDFLARE_DATABASE_ID=${prodId}`);
  if (devId) {
    console.log(`   CLOUDFLARE_DEV_DATABASE_ID=${devId}`);
  }
  console.log('2. Deploy your application to Cloudflare Pages');
  console.log('3. Run: pnpm d1:migrate-prod (when ready for production)');
  console.log('\n✨ Your application is now ready for Cloudflare D1!');
}

// Run the migration
main().catch((error) => {
  console.error('❌ Migration failed:', error);
  process.exit(1);
});
