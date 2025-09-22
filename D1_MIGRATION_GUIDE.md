# Cloudflare D1 Migration Guide

This guide will help you complete the migration from local SQLite to Cloudflare D1 database.

## 🚀 Quick Start

### Prerequisites
1. **Cloudflare Account**: Sign up at [cloudflare.com](https://cloudflare.com)
2. **Wrangler CLI**: Already installed in your project dependencies
3. **API Token**: Create a Cloudflare API token with permissions

### Step 1: Authenticate with Cloudflare

```bash
# Login to Cloudflare
pnpm wrangler login

# Or set API token directly
export CLOUDFLARE_API_TOKEN="your_api_token_here"
```

### Step 2: Run the Migration Script

```bash
# This script will create D1 databases and configure everything
pnpm tsx scripts/migrate-to-d1.ts
```

### Step 3: Update Environment Variables

Create a `.env.local` file with the database IDs from Step 2:

```env
# Cloudflare Configuration
CLOUDFLARE_API_TOKEN=your_cloudflare_api_token_here
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id_here
CLOUDFLARE_DATABASE_ID=your_production_database_id_here
CLOUDFLARE_D1_TOKEN=your_d1_token_here

# Development Database (Optional)
CLOUDFLARE_DEV_DATABASE_ID=your_dev_database_id_here

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Authentication
BETTER_AUTH_SECRET=your_secret_key_here
BETTER_AUTH_URL=http://localhost:3000
```

### Step 4: Deploy to Cloudflare Pages

```bash
# First, build your application
pnpm build

# Deploy to Cloudflare Pages
pnpm wrangler pages deploy

# Or connect your GitHub repository to Cloudflare Pages for automatic deployments
```

## 📋 Manual Setup (Alternative)

If you prefer manual setup or the script doesn't work:

### 1. Create D1 Databases

```bash
# Create production database
pnpm wrangler d1 create lunaxcode-cms

# Create development database
pnpm wrangler d1 create lunaxcode-cms-dev
```

### 2. Update wrangler.toml

Replace the placeholder database IDs in `wrangler.toml`:

```toml
[[ d1_databases ]]
binding = "DB"
database_name = "lunaxcode-cms"
database_id = "your-actual-production-database-id"

[env.development]
[[ env.development.d1_databases ]]
binding = "DB"
database_name = "lunaxcode-cms-dev"
preview_database_id = "your-actual-dev-database-id"
```

### 3. Run Database Migrations

```bash
# Apply migrations to local development database
pnpm d1:migrate-dev

# Apply migrations to production (when ready)
pnpm d1:migrate-prod
```

## 🛠 Available Commands

After migration, you can use these npm scripts:

```bash
# Database Management
pnpm d1:create          # Create production database
pnpm d1:create-dev      # Create development database
pnpm d1:migrate         # Generate migrations
pnpm d1:migrate-dev     # Apply migrations to dev database
pnpm d1:migrate-prod    # Apply migrations to production
pnpm d1:generate        # Generate new migrations
pnpm d1:studio          # Open Drizzle Studio
pnpm d1:shell           # Open D1 shell for production
pnpm d1:shell-dev       # Open D1 shell for development

# Development
pnpm dev                # Start development server (uses local DB)
pnpm build              # Build for production
pnpm start              # Start production server
```

## 🔧 Database Connection Logic

The application uses smart database detection:

- **Local Development**: Uses SQLite file (`./local.db`)
- **Cloudflare Pages**: Automatically uses D1 database
- **Traditional Deployment**: Falls back to local SQLite

### API Routes

All API routes have been updated to use `getDatabaseInstance()` which automatically:
1. Detects the environment
2. Uses D1 in Cloudflare Pages
3. Falls back to local SQLite in development

## 🚨 Important Notes

### Environment Variables
- Add all environment variables to Cloudflare Pages dashboard
- Never commit `.env.local` to version control
- Use different databases for development and production

### Database Schema
Your existing schema is already D1-compatible since it uses SQLite syntax.

### Migrations
- Always test migrations on development database first
- Run `pnpm d1:migrate-dev` before `pnpm d1:migrate-prod`
- Keep migration files in version control

## 🔍 Troubleshooting

### Common Issues

**1. "D1 database binding not found"**
- Ensure environment variables are set correctly
- Check Cloudflare Pages environment variables
- Verify database IDs in wrangler.toml

**2. "wrangler command not found"**
- Use `pnpm wrangler` instead of `wrangler`
- Ensure you're in the project directory

**3. "Database connection failed"**
- Check network connectivity
- Verify API token permissions
- Try running `pnpm wrangler whoami`

**4. "Migration failed"**
- Check syntax errors in migration files
- Ensure D1 database exists
- Verify permissions

### Debug Commands

```bash
# Check authentication
pnpm wrangler whoami

# List D1 databases
pnpm wrangler d1 list

# Check database tables
pnpm d1:shell-dev

# View logs
pnpm wrangler pages deployment list lunaxcode-cms
```

## 📈 Performance Benefits

After migration to D1, you'll get:

- **Global Edge Distribution**: Database close to users worldwide
- **Auto-scaling**: No capacity planning needed
- **Zero Cold Starts**: Always-on database
- **Cost Effective**: Pay only for what you use
- **Built-in Backups**: Automatic point-in-time recovery

## 🔐 Security

D1 provides:
- **Automatic Encryption**: Data encrypted at rest and in transit
- **Network Isolation**: Database not exposed to public internet
- **Access Control**: Only your Cloudflare Workers can access it
- **Audit Logging**: All database access is logged

## 📚 Next Steps

1. **Deploy to Production**: Set up continuous deployment
2. **Monitoring**: Add error tracking and performance monitoring
3. **Backup Strategy**: Configure additional backup policies
4. **Scale Testing**: Test with production-like data volumes

## 🆘 Support

If you encounter issues:

1. Check the [Cloudflare D1 documentation](https://developers.cloudflare.com/d1/)
2. Review [Drizzle ORM D1 docs](https://orm.drizzle.team/docs/get-started-sqlite#cloudflare-d1)
3. Check Cloudflare Dashboard for error logs
4. Use Drizzle Studio for database inspection: `pnpm d1:studio`

---

**Migration completed!** 🎉 Your application is now powered by Cloudflare D1.
