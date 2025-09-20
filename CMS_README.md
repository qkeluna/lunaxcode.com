# Lunaxcode CMS - Admin Dashboard

A comprehensive Content Management System built with Next.js 15, Cloudflare D1, and modern React components for managing the Lunaxcode landing page content.

## 🚀 Features

### Content Management
- **Pricing Plans**: Full CRUD operations for service pricing packages
- **Features**: Manage the key features displayed on your landing page
- **Process Steps**: Configure your service workflow and process
- **Hero Section**: Update main headline and call-to-action content
- **Testimonials**: Manage client testimonials and reviews
- **Contact Information**: Update contact details and social links
- **FAQ Management**: Maintain frequently asked questions
- **Form Submissions**: View and manage contact form submissions

### Admin Features
- **Secure Authentication**: JWT-based authentication system
- **Role-based Access**: Admin, Editor, and Viewer roles
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Real-time Updates**: Instant content updates without page refresh
- **Dark/Light Mode**: Built-in theme switching

### Technical Features
- **Database**: Cloudflare D1 (SQLite) with Drizzle ORM
- **Validation**: Comprehensive form validation with Zod
- **TypeScript**: Full type safety throughout the application
- **API Routes**: RESTful API with proper error handling
- **Local Development**: SQLite database for development

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.3 with App Router
- **Database**: Cloudflare D1 / SQLite with Drizzle ORM
- **Authentication**: JWT with bcryptjs
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS v4
- **Validation**: Zod for schema validation
- **Forms**: React Hook Form with resolvers
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## 📁 Project Structure

```
src/
├── app/
│   ├── admin/                 # Admin dashboard pages
│   │   ├── dashboard/         # Main dashboard
│   │   ├── pricing/           # Pricing management
│   │   ├── features/          # Features management
│   │   └── page.tsx          # Admin login
│   └── api/                   # API routes
│       ├── auth/              # Authentication endpoints
│       └── cms/               # Content management endpoints
├── components/
│   ├── admin/                 # Admin-specific components
│   ├── sections/              # Landing page sections
│   └── ui/                    # Reusable UI components
└── lib/
    ├── schema.ts              # Database schema
    ├── db.ts                  # Database connections
    ├── auth.ts                # Authentication utilities
    └── utils.ts               # Helper functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and pnpm
- SQLite3 (for local development)
- Cloudflare account (for production)

### Local Development Setup

1. **Clone and Install**
   ```bash
   git clone <repository>
   cd lunaxcode.com
   pnpm install
   ```

2. **Database Setup**
   ```bash
   # Create local SQLite database
   touch local.db
   
   # Initialize schema
   sqlite3 local.db < drizzle/0000_initial.sql
   
   # Add seed data
   sqlite3 local.db < drizzle/0001_seed.sql
   ```

3. **Environment Variables**
   Create `.env.local` with:
   ```env
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   NEXT_PUBLIC_APP_URL=http://localhost:3001
   NODE_ENV=development
   ```

4. **Start Development Server**
   ```bash
   pnpm dev
   ```

5. **Access Admin Dashboard**
   - Navigate to `http://localhost:3001/admin`
   - Default credentials:
     - Username: `admin`
     - Password: `admin123`

### Production Deployment (Cloudflare)

1. **Create Cloudflare D1 Database**
   ```bash
   pnpm dlx wrangler d1 create lunaxcode-cms
   ```

2. **Update wrangler.toml**
   ```toml
   [[ d1_databases ]]
   binding = "DB"
   database_name = "lunaxcode-cms"
   database_id = "your-database-id-from-step-1"
   ```

3. **Initialize Production Database**
   ```bash
   pnpm dlx wrangler d1 execute lunaxcode-cms --file=./drizzle/0000_initial.sql
   pnpm dlx wrangler d1 execute lunaxcode-cms --file=./drizzle/0001_seed.sql
   ```

4. **Deploy to Production**
   ```bash
   pnpm build
   # Deploy using your preferred method (Vercel, Cloudflare Pages, etc.)
   ```

## 🔐 Authentication

The CMS uses JWT-based authentication with the following features:

- **Secure Password Hashing**: bcryptjs with salt rounds
- **Token Expiration**: 24-hour token validity
- **Role-based Access**: Different permission levels
- **Session Management**: Automatic token refresh

### Default Admin Account
- **Username**: `admin`
- **Email**: `admin@lunaxcode.com`
- **Password**: `admin123`

**⚠️ Important**: Change the default password immediately after first login!

## 📊 Database Schema

### Core Tables
- `pricing_plans` - Service packages and pricing
- `features` - Key product/service features
- `process_steps` - Service workflow steps
- `hero_section` - Landing page hero content
- `testimonials` - Client testimonials
- `contact_info` - Contact details and social links
- `faqs` - Frequently asked questions
- `form_submissions` - Contact form submissions
- `cms_users` - Admin user accounts
- `site_settings` - Global site configuration

### Key Features
- **Soft Deletes**: Items can be deactivated without deletion
- **Display Order**: Custom ordering for all content types
- **JSON Fields**: Flexible content storage for complex data
- **Timestamps**: Automatic created/updated tracking
- **Validation**: Database-level constraints and API validation

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Token verification

### Content Management
- `GET/POST/PUT/DELETE /api/cms/pricing` - Pricing plans
- `GET/POST/PUT/DELETE /api/cms/features` - Features
- `GET/POST/PUT/DELETE /api/cms/process` - Process steps
- `GET/POST/PUT/DELETE /api/cms/testimonials` - Testimonials
- `GET/POST/PUT/DELETE /api/cms/hero` - Hero section
- `GET/POST/PUT/DELETE /api/cms/contact` - Contact info

All endpoints require authentication (except GET requests for public content).

## 🎨 Customization

### Adding New Content Types

1. **Update Database Schema** (`src/lib/schema.ts`)
   ```typescript
   export const newContentType = sqliteTable('new_content', {
     id: integer('id').primaryKey({ autoIncrement: true }),
     title: text('title').notNull(),
     // ... other fields
   });
   ```

2. **Create API Routes** (`src/app/api/cms/new-content/route.ts`)
   ```typescript
   // Follow the existing pattern for CRUD operations
   ```

3. **Add Admin UI** (`src/app/admin/new-content/page.tsx`)
   ```typescript
   // Create management interface following existing patterns
   ```

4. **Update Navigation** (`src/components/admin/AdminLayout.tsx`)

### Styling Customization

The CMS uses Tailwind CSS and shadcn/ui components. Customize the theme by:

1. **Colors**: Update `tailwind.config.js`
2. **Components**: Modify files in `src/components/ui/`
3. **Layout**: Edit `src/components/admin/AdminLayout.tsx`

## 🚦 Development Workflow

### Adding New Features
1. Plan the database schema changes
2. Create migration files in `drizzle/`
3. Update the schema in `src/lib/schema.ts`
4. Create API endpoints in `src/app/api/cms/`
5. Build the admin UI in `src/app/admin/`
6. Test thoroughly in development
7. Deploy to production

### Code Quality
- **TypeScript**: Strict mode enabled
- **ESLint**: Configured with Next.js rules
- **Validation**: Zod schemas for all forms
- **Error Handling**: Comprehensive error boundaries
- **Security**: JWT authentication and input validation

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify `local.db` exists and is properly initialized
   - Check file permissions
   - Ensure SQLite3 is installed

2. **Authentication Issues**
   - Verify JWT_SECRET is set in environment variables
   - Check token expiration (24 hours default)
   - Ensure proper headers are sent with requests

3. **Build Errors**
   - Check TypeScript errors with `pnpm build`
   - Verify all dependencies are installed
   - Check for missing environment variables

### Performance Optimization
- **Database**: Use indexes for frequently queried fields
- **API**: Implement pagination for large datasets
- **Frontend**: Use React.memo for expensive components
- **Images**: Optimize and compress all assets

## 📈 Monitoring & Analytics

### Built-in Monitoring
- **Form Submissions**: Track all contact form submissions
- **User Activity**: Monitor admin login times
- **Content Changes**: Automatic timestamps on all updates
- **Error Logging**: Comprehensive error tracking

### Recommended Tools
- **Cloudflare Analytics**: For overall site performance
- **Sentry**: For error tracking and performance monitoring
- **LogRocket**: For user session recording
- **Google Analytics**: For detailed user behavior

## 🔒 Security Considerations

### Authentication Security
- **Password Hashing**: bcryptjs with proper salt rounds
- **JWT Security**: Signed tokens with expiration
- **HTTPS Only**: Enforce secure connections in production
- **CORS**: Properly configured cross-origin requests

### Data Protection
- **Input Validation**: All inputs validated with Zod
- **SQL Injection**: Prevented by Drizzle ORM
- **XSS Protection**: React's built-in escaping
- **CSRF**: Token-based authentication prevents CSRF

### Best Practices
- Change default passwords immediately
- Use strong JWT secrets (minimum 32 characters)
- Regularly update dependencies
- Monitor for suspicious activity
- Backup database regularly

## 📞 Support & Contributing

For issues, questions, or contributions:

1. **Issues**: Create detailed bug reports with reproduction steps
2. **Features**: Propose new features with use cases
3. **Code**: Follow the existing code style and patterns
4. **Documentation**: Keep README and comments up to date

---

Built with ❤️ by the Lunaxcode team. Code at the Speed of Light! ⚡