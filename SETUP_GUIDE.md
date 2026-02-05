# Cal.com Project Setup Guide

## Project Overview

**Cal.com** is an open-source Calendly successor built with modern web technologies. It's a monorepo using **Yarn Workspaces** and **Turbo** for package management and build orchestration.

### Key Technologies

- **Framework**: Next.js (React)
- **Language**: TypeScript
- **Backend**: Node.js with tRPC
- **Database**: PostgreSQL with Prisma ORM
- **Package Manager**: Yarn 4.12.0
- **Build Tool**: Turbo
- **Styling**: Tailwind CSS
- **Video Integration**: Daily.co
- **Authentication**: NextAuth
- **Real-time Communication**: Daily, Twilio
- **Email Service**: SendGrid
- **Testing**: Vitest, Playwright

## Project Structure

```
cal.com/
├── apps/                    # Main applications
│   ├── api/                # API v2 service
│   └── web/                # Main web application (port 3000)
├── packages/               # Shared libraries and utilities
│   ├── app-store/         # App/integration store
│   ├── config/            # Configuration modules
│   ├── emails/            # Email templates
│   ├── embeds/            # Embed functionality
│   ├── features/          # Feature modules
│   ├── prisma/            # Database schema & migrations
│   ├── trpc/              # tRPC setup & routers
│   ├── types/             # Shared TypeScript types
│   ├── ui/                # UI component library
│   └── ...                # Other utilities
├── scripts/               # Utility scripts (seeding, migrations)
├── companion/             # Browser companion extension
├── docs/                  # Documentation site
├── example-apps/          # Example implementations
├── docker-compose.yml     # Local development database setup
├── .env.example           # Example environment variables
├── .env.appStore.example  # App store env variables
├── package.json           # Root workspace config
├── turbo.json            # Turbo build config
└── yarn.lock             # Dependency lock file
```

## Prerequisites

### System Requirements
- **Node.js**: 18.17.0 or higher (recommended 20+)
- **Yarn**: 4.12.0 (specific version managed by `.yarnrc.yml`)
- **PostgreSQL**: 12+ (for local development)
- **Docker** (optional, but recommended for PostgreSQL)
- **Git**: Latest version

### For Windows Users
- PowerShell 5.1 or higher (comes with Windows 10+)
- WSL2 or native Windows support (both work)

## Installation Steps

### 1. Install Dependencies

```bash
# Navigate to the project root
cd c:\Users\hp\Desktop\open source\cal.com

# Install all workspace dependencies using Yarn
yarn install

# This command:
# - Installs all root dependencies
# - Installs dependencies for all workspaces (apps/*, packages/*)
# - Runs postinstall hooks (husky, turbo post-install)
# - Sets up git hooks
```

### 2. Setup Database

#### Option A: Using Docker Compose (Recommended)

```bash
# Start PostgreSQL and Redis containers
docker-compose up -d

# This starts:
# - PostgreSQL on localhost:5450 (credentials: unicorn_user / magical_password)
# - Redis on localhost:6379
# - Creates 'calendso' database

# Verify containers are running
docker-compose ps
```

#### Option B: Local PostgreSQL Installation

If you prefer local PostgreSQL:
1. Install PostgreSQL 12+
2. Create database:
   ```sql
   CREATE DATABASE calendso;
   ```

### 3. Configure Environment Variables

#### Step 1: Create .env file from template
```bash
# Copy the example env file
Copy-Item .env.example .env

# On Linux/Mac: cp .env.example .env
```

#### Step 2: Edit .env file with required variables

**CRITICAL: These MUST be set for local development:**

```bash
# DATABASE CONFIGURATION
DATABASE_URL="postgresql://unicorn_user:magical_password@localhost:5450/calendso"
DATABASE_DIRECT_URL="postgresql://unicorn_user:magical_password@localhost:5450/calendso"

# NEXTAUTH CONFIGURATION (Generate with: openssl rand -base64 32)
NEXTAUTH_URL='http://localhost:3000'
NEXTAUTH_SECRET='your-generated-secret-here'  # Run: openssl rand -base64 32

# ENCRYPTION KEY (Generate with: openssl rand -base64 24)
CALENDSO_ENCRYPTION_KEY='your-generated-key-here'  # Run: openssl rand -base64 24

# WEBAPP URLS
NEXT_PUBLIC_WEBAPP_URL='http://localhost:3000'
NEXT_PUBLIC_WEBSITE_URL='http://localhost:3000'
NEXT_PUBLIC_EMBED_LIB_URL='http://localhost:3000/embed/embed.js'

# CRON API KEY (For scheduled jobs)
CRON_API_KEY='0cc0e6c35519bba620c9360cfe3e68d0'

# ALLOWED HOSTNAMES
ALLOWED_HOSTNAMES='"localhost:3000","127.0.0.1:3000"'
```

#### Step 3: Optional Environment Variables

For full functionality, add these if needed:

```bash
# Google Calendar/Meet Integration
GOOGLE_LOGIN_ENABLED=false
GOOGLE_API_CREDENTIALS=
GOOGLE_CALENDAR_API_KEY=

# Email Service (SendGrid)
SENDGRID_API_KEY=
SENDGRID_EMAIL=
SEND_FEEDBACK_EMAIL=your-email@example.com

# Twilio (SMS Reminders)
TWILIO_SID=
TWILIO_TOKEN=
TWILIO_MESSAGING_SID=
TWILIO_PHONE_NUMBER=

# Analytics
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_ORG=
SENTRY_PROJECT=

# Video Conferencing (Daily.co)
DAILY_API_KEY=

# Telemetry
CALCOM_TELEMETRY_DISABLED=1  # Set to 1 to disable anonymous data collection
```

### 4. Setup Database Schema

```bash
# Run Prisma migrations to set up database schema
yarn prisma migrate deploy

# Seed database with sample data (optional but recommended for development)
yarn db-seed

# View database using Prisma Studio (interactive tool)
yarn db-studio
# Opens http://localhost:5555
```

### 5. Verify Installation

```bash
# Run type checking across all packages
yarn type-check

# Run linting
yarn lint

# Run tests
yarn test
```

## Development

### Starting Development Server

```bash
# Start just the web app (default)
yarn dev
# Opens http://localhost:3000

# Start web app with website
yarn dev:website
# Web: http://localhost:3000
# Website: http://localhost:3001

# Start web app with API
yarn dev:api
# Web: http://localhost:3000
# API: http://localhost:3005

# Start web, API, and Console
yarn dev:api:console
# Web: http://localhost:3000
# API: http://localhost:3005
# Console: http://localhost:3100

# Start everything
yarn dev:all
```

### Available Scripts

#### Development
- `yarn dev` - Start web app only
- `yarn dev:api` - Start web + API server
- `yarn dev:website` - Start web + marketing website
- `yarn dx` - Development experience check (runs type-check + lint)

#### Building
- `yarn build` - Production build for web app
- `yarn build:ai` - Build AI features only
- `yarn type-check` - TypeScript type checking

#### Database
- `yarn prisma` - Run Prisma CLI commands
- `yarn db-studio` - Open Prisma Studio (DB GUI)
- `yarn db-seed` - Seed database with sample data
- `yarn db-deploy` - Deploy pending migrations

#### Testing
- `yarn test` - Run unit tests with Vitest
- `yarn test:ui` - Run tests with UI dashboard
- `yarn e2e` - Run end-to-end tests with Playwright
- `yarn test-e2e` - Seed DB + run e2e tests

#### Code Quality
- `yarn lint` - Check code style
- `yarn lint:fix` - Auto-fix code style issues
- `yarn format` - Format code with Biome

#### App Store
- `yarn create-app` - Create new integration
- `yarn edit-app` - Edit existing integration
- `yarn delete-app` - Delete integration

## Key Concepts

### Monorepo Structure

This is a **Yarn workspaces monorepo** managed by **Turbo**:

- **Root workspace**: `./package.json` - manages all dependencies and scripts
- **App workspaces**: `./apps/*` - main applications
- **Package workspaces**: `./packages/*` - shared libraries

All dependencies are installed in a single `node_modules` at root level.

### Turbo Build System

Turbo handles:
- Parallel execution of tasks across workspaces
- Smart caching to avoid rebuilding unchanged packages
- Dependency graph resolution

Key Turbo commands:
```bash
turbo run build              # Build all packages
turbo run build --filter=@calcom/web  # Build specific package
turbo run dev               # Start all dev servers
```

### NextAuth Setup

Cal.com uses NextAuth for authentication:
- Session stored in database (via Prisma adapter)
- JWT-based token system
- Cookie-based session management

### tRPC Integration

tRPC provides end-to-end type safety for API calls:
- Type-safe client/server communication
- Auto-generated types
- No OpenAPI/GraphQL schema needed

### Prisma ORM

Database access through Prisma:
- Type-safe database queries
- Automatic migrations
- Studio for data visualization

## Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Find and kill process on port 3000
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Then kill the process
kill -9 <PID>
taskkill /PID <PID> /F  # Windows
```

#### 2. Database Connection Error
```bash
# Check PostgreSQL is running
docker-compose ps

# If not running:
docker-compose up -d

# Test connection
psql -U unicorn_user -d calendso -h localhost -p 5450
```

#### 3. Node/Yarn Version Mismatch
```bash
# Check Node version
node --version  # Should be 18.17.0+

# Check Yarn version (should be managed by .yarnrc.yml)
yarn --version  # Should be 4.12.0

# If wrong version, reinstall:
corepack enable
corepack prepare yarn@4.12.0 --activate
```

#### 4. Build Failures
```bash
# Clean install
yarn clean
rm -rf node_modules yarn.lock  # or del on Windows
yarn install

# Re-run type checking
yarn type-check
```

#### 5. Migration Issues
```bash
# Reset database (⚠️ DELETES ALL DATA)
yarn prisma migrate reset

# Or run migrations without reset:
yarn prisma migrate deploy

# Check migration status:
yarn prisma migrate status
```

### Debugging

Enable debug output:
```bash
# General debug
DEBUG=* yarn dev

# Prisma debug
DEBUG=prisma:* yarn dev

# Next.js debug
DEBUG=next:* yarn dev
```

## CI/CD Integration

### GitHub Actions
- Tests run on PR creation
- Build verification required
- E2E tests on specific branches
- Auto-formatting checks

### Pre-commit Hooks
Husky manages git hooks:
```bash
# Automatically runs on commit:
# - lint-staged (format/lint changed files)
# - type checking
```

To skip hooks (not recommended):
```bash
git commit --no-verify
```

## Performance Tips

### Faster Development

1. **Use specific dev commands**: Only start services you need
   ```bash
   yarn dev  # Just web app is faster than yarn dev:all
   ```

2. **Turbo caching**: Don't clean cache unnecessarily
   ```bash
   # Cache is at .turbo/
   # Clearing it removes speed benefits
   ```

3. **TypeScript**: Use IDE for type-checking instead of running `yarn type-check` repeatedly

### Production Build

```bash
# Full production build
yarn build

# Takes ~5-10 minutes depending on machine
# Output at: apps/web/.next/
```

## Next Steps

1. ✅ Run `yarn install`
2. ✅ Setup database with Docker Compose
3. ✅ Create `.env` file with required variables
4. ✅ Run `yarn db-seed`
5. ✅ Start dev server: `yarn dev`
6. ✅ Visit http://localhost:3000

## Additional Resources

- **Documentation**: `./docs/` folder
- **Contributing Guide**: `CONTRIBUTING.md`
- **GitHub Discussions**: https://github.com/calcom/cal.com/discussions
- **Issues**: https://github.com/calcom/cal.com/issues
- **Roadmap**: https://cal.com/roadmap

## Environment Templates

### For Minimal Local Development
```bash
DATABASE_URL="postgresql://unicorn_user:magical_password@localhost:5450/calendso"
DATABASE_DIRECT_URL="postgresql://unicorn_user:magical_password@localhost:5450/calendso"
NEXTAUTH_URL='http://localhost:3000'
NEXTAUTH_SECRET='your-secret-here'
CALENDSO_ENCRYPTION_KEY='your-key-here'
NEXT_PUBLIC_WEBAPP_URL='http://localhost:3000'
NEXT_PUBLIC_WEBSITE_URL='http://localhost:3000'
NEXT_PUBLIC_EMBED_LIB_URL='http://localhost:3000/embed/embed.js'
CRON_API_KEY='0cc0e6c35519bba620c9360cfe3e68d0'
CALCOM_TELEMETRY_DISABLED=1
```

### For Full Feature Development
Use `.env.example` as base and fill in API keys for:
- Google Calendar/Meet
- SendGrid
- Twilio
- Daily.co
- Sentry
- Other integrations

## License

Cal.com is licensed under **AGPLv3**. See `LICENSE` file for details.
For commercial use, contact: https://cal.com/sales
