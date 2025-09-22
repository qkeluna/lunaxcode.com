#!/usr/bin/env tsx

/**
 * Data Migration Script for Cloudflare D1
 * This script migrates all existing data from local SQLite to D1 databases
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';

const execAsync = promisify(exec);

// Tables to migrate (CMS schema only, excluding auth tables)
const CMS_TABLES = [
  'cms_users',
  'pricing_plans', 
  'addon_services',
  'features',
  'process_steps',
  'hero_section',
  'testimonials',
  'contact_info',
  'faqs',
  'site_settings',
  'onboarding_submission',
  'form_submissions'
];

interface TableCounts {
  [key: string]: number;
}

async function checkLocalDatabase(): Promise<boolean> {
  const dbPath = './local.db';
  if (!existsSync(dbPath)) {
    console.error('❌ Local database not found at ./local.db');
    return false;
  }
  
  try {
    await execAsync('sqlite3 local.db ".tables"');
    console.log('✅ Local SQLite database found and accessible');
    return true;
  } catch (error) {
    console.error('❌ Cannot access local database:', error);
    return false;
  }
}

async function getTableCounts(database: 'local' | 'dev' | 'prod'): Promise<TableCounts> {
  const counts: TableCounts = {};
  
  for (const table of CMS_TABLES) {
    try {
      let command: string;
      
      if (database === 'local') {
        command = `sqlite3 local.db "SELECT COUNT(*) FROM ${table};"`;
      } else if (database === 'dev') {
        command = `wrangler d1 execute lunaxcode-cms-dev --local --command="SELECT COUNT(*) FROM ${table};"`;
      } else {
        command = `wrangler d1 execute lunaxcode-cms --remote --command="SELECT COUNT(*) FROM ${table};"`;
      }
      
      const { stdout } = await execAsync(command);
      counts[table] = parseInt(stdout.trim()) || 0;
    } catch (error) {
      console.warn(`⚠️  Could not get count for ${table} in ${database}:`, error);
      counts[table] = 0;
    }
  }
  
  return counts;
}

async function exportTableData(tableName: string): Promise<string[]> {
  try {
    console.log(`📤 Exporting data from ${tableName}...`);
    
    // Get the INSERT statements for all data in the table
    const { stdout } = await execAsync(`sqlite3 local.db ".mode insert ${tableName}" "SELECT * FROM ${tableName};"`);
    
    if (!stdout.trim()) {
      console.log(`   No data found in ${tableName}`);
      return [];
    }
    
    // Split into individual INSERT statements and clean them up
    const insertStatements = stdout
      .trim()
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.startsWith('INSERT INTO'))
      .map(line => {
        // Ensure the statement ends with semicolon
        return line.endsWith(';') ? line : line + ';';
      });
    
    console.log(`   Found ${insertStatements.length} records in ${tableName}`);
    return insertStatements;
  } catch (error) {
    console.error(`❌ Failed to export data from ${tableName}:`, error);
    return [];
  }
}

async function importDataToD1(
  insertStatements: string[], 
  tableName: string, 
  target: 'dev' | 'prod'
): Promise<boolean> {
  if (insertStatements.length === 0) {
    console.log(`   No data to import for ${tableName} to ${target}`);
    return true;
  }
  
  try {
    console.log(`📥 Importing ${insertStatements.length} records to ${tableName} (${target})...`);
    
    // Create a temporary SQL file with all the INSERT statements
    const tempFileName = `temp_${tableName}_${target}.sql`;
    const sqlContent = insertStatements.join('\n');
    writeFileSync(tempFileName, sqlContent);
    
    // Execute the SQL file against D1
    const dbName = target === 'dev' ? 'lunaxcode-cms-dev' : 'lunaxcode-cms';
    const flag = target === 'dev' ? '--local' : '--remote';
    
    const command = `wrangler d1 execute ${dbName} ${flag} --file=${tempFileName}`;
    const { stdout } = await execAsync(command);
    
    // Clean up temp file
    try {
      const fs = await import('fs');
      fs.unlinkSync(tempFileName);
    } catch (cleanupError) {
      console.warn(`⚠️  Could not clean up temp file ${tempFileName}`);
    }
    
    console.log(`   ✅ Successfully imported ${insertStatements.length} records to ${tableName} (${target})`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to import data to ${tableName} (${target}):`, error);
    return false;
  }
}

async function clearTableData(tableName: string, target: 'dev' | 'prod'): Promise<void> {
  try {
    const dbName = target === 'dev' ? 'lunaxcode-cms-dev' : 'lunaxcode-cms';
    const flag = target === 'dev' ? '--local' : '--remote';
    
    const command = `wrangler d1 execute ${dbName} ${flag} --command="DELETE FROM ${tableName};"`;
    await execAsync(command);
    console.log(`   🗑️  Cleared existing data from ${tableName} (${target})`);
  } catch (error) {
    console.warn(`⚠️  Could not clear ${tableName} (${target}):`, error);
  }
}

async function migrateTable(tableName: string, targets: ('dev' | 'prod')[]): Promise<void> {
  console.log(`\n🔄 Migrating table: ${tableName}`);
  
  // Export data from local database
  const insertStatements = await exportTableData(tableName);
  
  if (insertStatements.length === 0) {
    console.log(`   ⏭️  Skipping ${tableName} (no data)`);
    return;
  }
  
  // Import to each target
  for (const target of targets) {
    // Clear existing data first (optional - comment out if you want to keep existing data)
    await clearTableData(tableName, target);
    
    // Import the data
    await importDataToD1(insertStatements, tableName, target);
  }
}

async function verifyMigration(targets: ('dev' | 'prod')[]): Promise<void> {
  console.log('\n📊 Migration Verification Report:');
  console.log('=====================================');
  
  // Get counts from all databases
  const localCounts = await getTableCounts('local');
  const devCounts = targets.includes('dev') ? await getTableCounts('dev') : {};
  const prodCounts = targets.includes('prod') ? await getTableCounts('prod') : {};
  
  console.log('\nTable'.padEnd(20) + 'Local'.padEnd(8) + 'Dev'.padEnd(8) + 'Prod'.padEnd(8) + 'Status');
  console.log('-'.repeat(50));
  
  let allMatched = true;
  
  for (const table of CMS_TABLES) {
    const local = localCounts[table] || 0;
    const dev = devCounts[table] || 0;
    const prod = prodCounts[table] || 0;
    
    let status = '✅';
    if (targets.includes('dev') && local !== dev) status = '❌ Dev mismatch';
    if (targets.includes('prod') && local !== prod) status = '❌ Prod mismatch';
    if (status !== '✅') allMatched = false;
    
    console.log(
      table.padEnd(20) + 
      local.toString().padEnd(8) + 
      (targets.includes('dev') ? dev.toString() : '-').padEnd(8) + 
      (targets.includes('prod') ? prod.toString() : '-').padEnd(8) + 
      status
    );
  }
  
  console.log('\n' + '='.repeat(50));
  if (allMatched) {
    console.log('🎉 Migration completed successfully! All data matches.');
  } else {
    console.log('⚠️  Some tables have mismatched counts. Please review the migration.');
  }
}

async function main(): Promise<void> {
  console.log('🚀 Starting Data Migration to Cloudflare D1...\n');
  
  // Check prerequisites
  if (!(await checkLocalDatabase())) {
    process.exit(1);
  }
  
  // Get migration targets from command line arguments
  const args = process.argv.slice(2);
  const targets: ('dev' | 'prod')[] = [];
  
  if (args.includes('--dev') || args.includes('--development')) {
    targets.push('dev');
  }
  
  if (args.includes('--prod') || args.includes('--production')) {
    targets.push('prod');
  }
  
  // Default to dev if no targets specified
  if (targets.length === 0) {
    targets.push('dev');
    console.log('ℹ️  No target specified, defaulting to development database');
    console.log('   Use --dev or --prod flags to specify target databases');
  }
  
  console.log(`🎯 Migration targets: ${targets.join(', ')}\n`);
  
  // Show initial counts
  console.log('📊 Current Data Overview:');
  const localCounts = await getTableCounts('local');
  const totalRecords = Object.values(localCounts).reduce((sum, count) => sum + count, 0);
  
  console.log(`   Total records to migrate: ${totalRecords}`);
  console.log(`   Tables with data: ${Object.entries(localCounts).filter(([, count]) => count > 0).length}`);
  
  if (totalRecords === 0) {
    console.log('ℹ️  No data found to migrate. Exiting.');
    return;
  }
  
  // Confirm migration
  console.log(`\n⚠️  This will replace all existing data in the target D1 database(s).`);
  console.log('   Make sure you have backups if needed.\n');
  
  // Migrate each table
  for (const table of CMS_TABLES) {
    if (localCounts[table] > 0) {
      await migrateTable(table, targets);
    }
  }
  
  // Verify migration
  await verifyMigration(targets);
  
  console.log('\n✨ Data migration completed!');
  console.log('\nNext steps:');
  if (targets.includes('dev')) {
    console.log('1. Test your application locally with: pnpm dev');
  }
  if (targets.includes('prod')) {
    console.log('2. Deploy your application with: pnpm deploy:pages');
  }
}

// Run the migration
main().catch((error) => {
  console.error('❌ Migration failed:', error);
  process.exit(1);
});
