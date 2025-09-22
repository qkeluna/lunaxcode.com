import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull().default(false),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", { mode: "timestamp" }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", { mode: "timestamp" }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
});

export const onboardingSubmission = sqliteTable("onboarding_submission", {
  id: text("id").primaryKey(),
  
  // Basic Information (common to all services)
  projectName: text("project_name").notNull(),
  companyName: text("company_name"),
  industry: text("industry"),
  description: text("description"),
  
  // Contact Information
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  preferredContact: text("preferred_contact"),
  
  // Service Information
  serviceType: text("service_type").notNull(), // 'landing_page', 'web_app', 'mobile_app'
  budget: text("budget"),
  timeline: text("timeline"),
  urgency: text("urgency"),
  
  // Service-specific fields (stored as JSON)
  serviceSpecificData: text("service_specific_data", { mode: "json" }),
  
  // Additional Requirements
  additionalRequirements: text("additional_requirements"),
  inspiration: text("inspiration"),
  
  // Add-ons
  addOns: text("add_ons", { mode: "json" }), // Array of selected add-ons
  
  // Status and tracking
  status: text("status").notNull().default("pending"), // 'pending', 'in-progress', 'completed', 'rejected'
  priority: text("priority").default("medium"), // 'low', 'medium', 'high', 'urgent'
  assignedTo: text("assigned_to"), // User ID of assigned team member
  
  // Notes and communication
  internalNotes: text("internal_notes"),
  clientNotes: text("client_notes"),
  
  // Timestamps
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  completedAt: integer("completed_at", { mode: "timestamp" }),
});