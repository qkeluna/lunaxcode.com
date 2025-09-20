-- Initial migration for Lunaxcode CMS
CREATE TABLE `cms_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`role` text DEFAULT 'admin' NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`last_login` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `contact_info` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type` text NOT NULL,
	`label` text NOT NULL,
	`value` text NOT NULL,
	`icon` text,
	`is_primary` integer DEFAULT false NOT NULL,
	`display_order` integer DEFAULT 0 NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `faqs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`question` text NOT NULL,
	`answer` text NOT NULL,
	`category` text,
	`display_order` integer DEFAULT 0 NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `features` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`icon` text NOT NULL,
	`color` text NOT NULL,
	`display_order` integer DEFAULT 0 NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `form_submissions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`form_type` text NOT NULL,
	`name` text,
	`email` text,
	`phone` text,
	`company` text,
	`project_type` text,
	`message` text,
	`form_data` text NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`source` text,
	`ip_address` text,
	`user_agent` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `hero_section` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`headline` text NOT NULL,
	`subheadline` text NOT NULL,
	`cta_text` text DEFAULT 'Get Started' NOT NULL,
	`cta_variant` text DEFAULT 'default' NOT NULL,
	`secondary_cta_text` text,
	`secondary_cta_variant` text DEFAULT 'outline',
	`background_video` text,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `pricing_plans` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`price` text NOT NULL,
	`period` text DEFAULT '',
	`description` text NOT NULL,
	`features` text NOT NULL,
	`button_text` text DEFAULT 'Get Started' NOT NULL,
	`button_variant` text DEFAULT 'outline' NOT NULL,
	`popular` integer DEFAULT false NOT NULL,
	`timeline` text NOT NULL,
	`display_order` integer DEFAULT 0 NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `process_steps` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`step_number` integer NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`icon` text NOT NULL,
	`details` text,
	`display_order` integer DEFAULT 0 NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `site_settings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`key` text NOT NULL,
	`value` text NOT NULL,
	`type` text DEFAULT 'text' NOT NULL,
	`description` text,
	`is_public` integer DEFAULT true NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `testimonials` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`client_name` text NOT NULL,
	`client_company` text,
	`client_role` text,
	`testimonial` text NOT NULL,
	`rating` integer DEFAULT 5 NOT NULL,
	`avatar` text,
	`project_type` text,
	`display_order` integer DEFAULT 0 NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX `cms_users_username_unique` ON `cms_users` (`username`);
CREATE UNIQUE INDEX `cms_users_email_unique` ON `cms_users` (`email`);
CREATE UNIQUE INDEX `site_settings_key_unique` ON `site_settings` (`key`);

-- Insert default admin user (password: admin123)
INSERT INTO `cms_users` (`username`, `email`, `password_hash`, `role`) VALUES 
('admin', 'admin@lunaxcode.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/UnuWOdcKUt.SFpJhq', 'admin');

-- Insert initial site settings
INSERT INTO `site_settings` (`key`, `value`, `type`, `description`) VALUES
('site_name', 'Lunaxcode', 'text', 'Website name'),
('site_tagline', 'Code at the Speed of Light', 'text', 'Website tagline'),
('contact_email', 'hello@lunaxcode.com', 'text', 'Primary contact email'),
('contact_phone', '+63 912 345 6789', 'text', 'Primary contact phone'),
('business_hours', '9:00 AM - 6:00 PM (PHT)', 'text', 'Business hours'),
('response_time', '24 hours', 'text', 'Response time promise');