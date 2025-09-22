const { getLocalDB } = require('../src/lib/db.js');

async function initializeDatabase() {
  console.log('Initializing database...');
  
  try {
    const db = getLocalDB();
    
    // Create the Better Auth tables
    await db.run(`CREATE TABLE IF NOT EXISTS "user" (
      "id" text PRIMARY KEY NOT NULL,
      "name" text NOT NULL,
      "email" text NOT NULL UNIQUE,
      "email_verified" integer DEFAULT 0 NOT NULL,
      "image" text,
      "created_at" integer NOT NULL,
      "updated_at" integer NOT NULL
    )`);

    await db.run(`CREATE TABLE IF NOT EXISTS "session" (
      "id" text PRIMARY KEY NOT NULL,
      "expires_at" integer NOT NULL,
      "token" text NOT NULL UNIQUE,
      "created_at" integer NOT NULL,
      "updated_at" integer NOT NULL,
      "ip_address" text,
      "user_agent" text,
      "user_id" text NOT NULL,
      FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE
    )`);

    await db.run(`CREATE TABLE IF NOT EXISTS "account" (
      "id" text PRIMARY KEY NOT NULL,
      "account_id" text NOT NULL,
      "provider_id" text NOT NULL,
      "user_id" text NOT NULL,
      "access_token" text,
      "refresh_token" text,
      "id_token" text,
      "access_token_expires_at" integer,
      "refresh_token_expires_at" integer,
      "scope" text,
      "password" text,
      "created_at" integer NOT NULL,
      "updated_at" integer NOT NULL,
      FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE
    )`);

    await db.run(`CREATE TABLE IF NOT EXISTS "verification" (
      "id" text PRIMARY KEY NOT NULL,
      "identifier" text NOT NULL,
      "value" text NOT NULL,
      "expires_at" integer NOT NULL,
      "created_at" integer,
      "updated_at" integer
    )`);

    // Create the onboarding_submission table
    await db.run(`CREATE TABLE IF NOT EXISTS "onboarding_submission" (
      "id" text PRIMARY KEY NOT NULL,
      "project_name" text NOT NULL,
      "company_name" text,
      "industry" text,
      "description" text,
      "name" text NOT NULL,
      "email" text NOT NULL,
      "phone" text,
      "preferred_contact" text,
      "service_type" text NOT NULL,
      "budget" text,
      "timeline" text,
      "urgency" text,
      "service_specific_data" text,
      "additional_requirements" text,
      "inspiration" text,
      "add_ons" text,
      "status" text DEFAULT 'pending' NOT NULL,
      "priority" text DEFAULT 'medium',
      "assigned_to" text,
      "internal_notes" text,
      "client_notes" text,
      "created_at" text DEFAULT CURRENT_TIMESTAMP,
      "updated_at" text DEFAULT CURRENT_TIMESTAMP,
      "completed_at" text
    )`);

    // Create other CMS tables
    await db.run(`CREATE TABLE IF NOT EXISTS "pricing_plans" (
      "id" text PRIMARY KEY NOT NULL,
      "name" text NOT NULL,
      "price" text NOT NULL,
      "period" text DEFAULT '',
      "description" text NOT NULL,
      "features" text NOT NULL,
      "button_text" text DEFAULT 'Get Started' NOT NULL,
      "button_variant" text DEFAULT 'outline' NOT NULL,
      "popular" integer DEFAULT 0 NOT NULL,
      "timeline" text NOT NULL,
      "display_order" integer DEFAULT 0 NOT NULL,
      "is_active" integer DEFAULT 1 NOT NULL,
      "created_at" text DEFAULT CURRENT_TIMESTAMP,
      "updated_at" text DEFAULT CURRENT_TIMESTAMP
    )`);

    await db.run(`CREATE TABLE IF NOT EXISTS "features" (
      "id" integer PRIMARY KEY AUTOINCREMENT,
      "title" text NOT NULL,
      "description" text NOT NULL,
      "icon" text NOT NULL,
      "color" text NOT NULL,
      "display_order" integer DEFAULT 0 NOT NULL,
      "is_active" integer DEFAULT 1 NOT NULL,
      "created_at" text DEFAULT CURRENT_TIMESTAMP,
      "updated_at" text DEFAULT CURRENT_TIMESTAMP
    )`);

    await db.run(`CREATE TABLE IF NOT EXISTS "process_steps" (
      "id" integer PRIMARY KEY AUTOINCREMENT,
      "step_number" integer NOT NULL,
      "title" text NOT NULL,
      "description" text NOT NULL,
      "icon" text NOT NULL,
      "details" text,
      "display_order" integer DEFAULT 0 NOT NULL,
      "is_active" integer DEFAULT 1 NOT NULL,
      "created_at" text DEFAULT CURRENT_TIMESTAMP,
      "updated_at" text DEFAULT CURRENT_TIMESTAMP
    )`);

    console.log('Database initialized successfully!');
    console.log('Created tables:');
    console.log('- Better Auth tables (user, session, account, verification)');
    console.log('- onboarding_submission');
    console.log('- pricing_plans');
    console.log('- features');
    console.log('- process_steps');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase();