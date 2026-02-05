# Cal.com Quick Start Guide for Windows

## 🚀 Quick Start (5-10 minutes)

### Prerequisites Check

```powershell
# Check Node.js version (should be 18.17.0+)
node --version

# Check if Yarn is available
yarn --version

# Check Docker is running (if using Docker)
docker --version
docker ps
```

### Step 1: Clone & Install Dependencies

```powershell
# Navigate to the project
cd "c:\Users\hp\Desktop\open source\cal.com"

# Install all dependencies
yarn install

# This will take 3-5 minutes...
```

### Step 2: Start PostgreSQL (Choose one)

**Option A: Using Docker (Recommended)**
```powershell
# Start containers in background
docker-compose up -d

# Verify it's running
docker-compose ps
# Should show: database running on :5450, redis on :6379
```

**Option B: Using Local PostgreSQL**

If you have PostgreSQL installed locally:
```powershell
# Start PostgreSQL service
# (usually already running on Windows)

# Create database in PowerShell using psql:
# You may need to add PostgreSQL to PATH or use full path
psql -U postgres -c "CREATE DATABASE calendso;"
```

### Step 3: Setup Environment Variables (2 choices)

**Option A: Automated Setup (Recommended)**
```powershell
# Run the interactive setup script
node setup-env.js

# Answer the prompts:
# - Database host: press Enter (localhost)
# - Database port: press Enter (5450)
# - Database user: press Enter (unicorn_user)
# - Database password: press Enter (magical_password)
# - When asked to generate secrets: type 'y'
# - For everything else: press Enter
```

**Option B: Manual Setup**
```powershell
# Copy example file
Copy-Item .env.example .env

# Edit with VS Code or any text editor
code .env

# Key variables to set:
# DATABASE_URL="postgresql://unicorn_user:magical_password@localhost:5450/calendso"
# DATABASE_DIRECT_URL="postgresql://unicorn_user:magical_password@localhost:5450/calendso"
# NEXTAUTH_SECRET=<generate-random-string>  # Run: openssl rand -base64 32
# NEXTAUTH_URL='http://localhost:3000'
# CALENDSO_ENCRYPTION_KEY=<generate-another-string>
# NEXT_PUBLIC_WEBAPP_URL='http://localhost:3000'
```

### Step 4: Setup Database

```powershell
# Run migrations
yarn prisma migrate deploy

# (Optional) Seed with sample data
yarn db-seed

# Verify database
# This opens Prisma Studio GUI at http://localhost:5555
yarn db-studio
# Press Ctrl+C to exit
```

### Step 5: Start Development Server

```powershell
# Start the app
yarn dev

# Wait for it to compile...
# Should see: "ready - started server on 0.0.0.0:3000, url: http://localhost:3000"
```

### Step 6: Open in Browser

```
http://localhost:3000
```

You should see Cal.com! 🎉

### Default Login (if seeded)

If you ran `yarn db-seed`, you can login with:
- **Email**: admin@example.com
- **Password**: admin

---

## 📋 Troubleshooting

### Port 3000 Already in Use

```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill it (replace XXXX with PID from above)
taskkill /PID XXXX /F

# Try again
yarn dev
```

### Database Connection Error

```powershell
# Check if Docker containers are running
docker-compose ps

# If not, start them
docker-compose up -d

# If already running, check logs
docker-compose logs database

# Reset database (⚠️ DELETES DATA)
yarn prisma migrate reset
```

### Node/Yarn Version Issues

```powershell
# Check Node version
node --version  # Need 18.17.0+

# Check Yarn version (should be 4.12.0)
yarn --version

# If wrong version, use Corepack:
corepack enable
corepack prepare yarn@4.12.0 --activate
yarn --version  # Should now be 4.12.0
```

### Build Fails

```powershell
# Clean everything
yarn clean
rm -r node_modules
rm yarn.lock

# Reinstall
yarn install

# Try again
yarn dev
```

### "NEXTAUTH_SECRET is not set" Error

Make sure your `.env` file has:
```
NEXTAUTH_SECRET=<your-generated-secret>
```

Generate one:
```powershell
# Using Node:
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### "CALENDSO_ENCRYPTION_KEY is not set" Error

Make sure your `.env` file has:
```
CALENDSO_ENCRYPTION_KEY=<your-generated-key>
```

### Slow Installation

- Yarn is downloading all dependencies (~2GB)
- First time takes 5-10 minutes
- Close other heavy apps (VS Code, browsers, etc.)

---

## ✨ Basic Usage

Once running at http://localhost:3000:

1. **Signup** - Create new account
2. **Setup Availability** - Set your working hours
3. **Create Event Type** - Define meeting length, etc.
4. **Get Booking Link** - Share with others
5. **View Calendar** - See bookings and availability

---

## 🛠️ Useful Commands

```powershell
# Development
yarn dev              # Start app on http://localhost:3000
yarn dev:api          # Start with API on http://localhost:3005
yarn dev:website      # Start with marketing site

# Database
yarn db-seed          # Add sample data
yarn db-studio        # Open database GUI
yarn prisma ...       # Run Prisma CLI

# Testing
yarn test             # Run unit tests
yarn e2e              # Run end-to-end tests

# Quality
yarn lint             # Check code style
yarn lint:fix         # Auto-fix issues
yarn type-check       # Check TypeScript

# Building
yarn build            # Production build

# Clean
yarn clean            # Clean build artifacts
```

---

## 📚 Documentation

- **Full Setup Guide**: `SETUP_GUIDE.md`
- **Project Analysis**: `PROJECT_ANALYSIS.md`
- **Contributing**: `CONTRIBUTING.md`
- **README**: `README.md`

---

## 🆘 Still Having Issues?

1. Check the SETUP_GUIDE.md for detailed instructions
2. Review PROJECT_ANALYSIS.md for architecture understanding
3. Check existing issues: https://github.com/calcom/cal.com/issues
4. Ask in discussions: https://github.com/calcom/cal.com/discussions

---

## ⏱️ Time Estimate

- Prerequisites setup: 5 minutes
- Dependency installation: 5-10 minutes
- Database setup: 2-3 minutes
- Total: **15-20 minutes** for full working development environment

---

## Next Steps

- ✅ Explore the codebase
- ✅ Read CONTRIBUTING.md for development standards
- ✅ Try making a small change and test it
- ✅ Check out the architecture in PROJECT_ANALYSIS.md
- ✅ Join the community discussions on GitHub

Happy coding! 🚀
