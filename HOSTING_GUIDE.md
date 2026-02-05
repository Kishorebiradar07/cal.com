# 🚀 Cal.com Local Development Server Setup & Hosting Guide

**Date**: February 5, 2026  
**Status**: Setup instructions provided  

---

## 📋 Prerequisites

Before hosting Cal.com, ensure you have:

### Required Software
- ✅ **Node.js** v18+ (Currently: v25.2.1) ✓
- ✅ **npm** or **yarn** (Currently: npm v11.6.4) ✓
- ✅ **Git** (for version control)
- ✅ **.env files** (configuration)
- ✅ **Database** (PostgreSQL recommended)

### Recommended Hardware
- RAM: 4GB minimum (8GB+ recommended)
- Disk Space: 10GB+
- Processor: Dual core minimum

---

## 🔧 Step 1: Install Dependencies

```bash
# Navigate to project directory
cd c:\Users\hp\Desktop\open source\cal.com

# Install all dependencies
yarn install

# This may take 5-10 minutes the first time
```

**Note**: If you encounter network issues:
```bash
# Try with npm registry
npm install --registry https://registry.npmjs.org/

# Or use yarn with specific registry
yarn install --registry https://registry.npmjs.org/
```

---

## ⚙️ Step 2: Configure Environment Variables

Cal.com requires environment configuration:

### Create `.env` File
```bash
cp .env.example .env
```

### Essential Configuration
Edit `.env` with required values:

```env
# Database Connection
DATABASE_URL=postgresql://user:password@localhost:5432/calcom

# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# App Configuration
CALCOM_WEBAPP_URL=http://localhost:3000
CALCOM_LICENSE_KEY=your-license-key

# Email Configuration
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_USER=test
SMTP_PASSWORD=test
SMTP_FROM=noreply@example.com
```

### Quick Development Setup
For local testing, you can use minimal configuration. See `SETUP_GUIDE.md` for detailed env setup.

---

## 🗄️ Step 3: Setup Database

Cal.com uses Prisma for database management:

```bash
# Generate Prisma client
yarn prisma generate

# Create/migrate database schema
yarn prisma migrate dev --name init

# Optional: Seed database with sample data
yarn prisma db seed
```

---

## 🚀 Step 4: Start Development Server

### Option 1: Standard Development Server
```bash
# Runs on http://localhost:3000
yarn dev
```

### Option 2: With Hot Reload
```bash
# Runs with file watching
yarn dev:watch
```

### Option 3: Production Build
```bash
# Build for production
yarn build

# Start production server
yarn start
```

---

## 🎯 Available Services

Once running, Cal.com provides multiple services:

| Service | Port | Purpose |
|---------|------|---------|
| **Web App** | 3000 | Main application |
| **Website** | 3001 | Marketing website |
| **Embed Core** | 3100 | Embed functionality |
| **Embed React** | 3101 | React embed support |
| **Prisma Studio** | 5555 | Database management UI |
| **Maildev** | 587/1080 | Email testing |

---

## 🎯 Running Specific Services

### Web App (Main)
```bash
yarn dev
```
Runs on `http://localhost:3000`

### Website (Marketing)
```bash
cd apps/website
yarn dev
```
Runs on `http://localhost:3001`

### Prisma Studio (Database UI)
```bash
yarn db-studio
```
Runs on `http://localhost:5555` - View/edit database directly

### Maildev (Email Testing)
```bash
maildev -s 587
```
Runs on `http://localhost:1080` - Test emails locally

---

## ✅ Verification Checklist

After starting the server, verify:

- [ ] **Dependencies Installed**
  ```bash
  yarn list | grep -c packages
  ```
  Should show hundreds of packages

- [ ] **Environment Configured**
  ```bash
  cat .env | grep NEXTAUTH_URL
  ```
  Should show your config

- [ ] **Database Connected**
  - Check `yarn prisma studio` works
  - Can see database tables

- [ ] **Server Running**
  - Visit `http://localhost:3000`
  - Should see Cal.com login page
  - No console errors

- [ ] **Hot Reload Working**
  - Edit a file in `apps/web/pages`
  - Page refreshes automatically (after save)

---

## 🐛 Troubleshooting

### "Port Already in Use"
```bash
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
PORT=3001 yarn dev
```

### "Database Connection Error"
```bash
# Verify database is running
# Check DATABASE_URL in .env
# Run migrations
yarn prisma migrate dev
```

### "Module Not Found"
```bash
# Clean install
rm -r node_modules yarn.lock
yarn install
```

### "Out of Memory"
```bash
# Increase Node memory
$env:NODE_OPTIONS='--max-old-space-size=4096'
yarn dev
```

### "Port 3000 In Use"
```bash
# Find and kill process
$processes = Get-Process | Where-Object { $_.Port -eq 3000 }
$processes | Stop-Process -Force

# Or use different port
$env:PORT=3001
yarn dev
```

---

## 📊 Development Workflow

### Daily Development

**Start of Day**
```bash
# Pull latest changes
git pull origin main

# Install any new dependencies
yarn install

# Start dev server
yarn dev
```

**During Development**
- Edit files in `apps/web`, `packages/*`
- Server auto-reloads (hot reload)
- Check `http://localhost:3000`
- Open DevTools (F12) for debugging

**Before Committing**
```bash
# Type check
yarn type-check

# Lint code
yarn lint

# Run tests
yarn test

# Build check
yarn build
```

---

## 🎨 Frontend Development

### Key Directories
```
apps/web/
├── pages/              # Page routes
├── components/         # React components
├── styles/            # CSS/Tailwind
├── public/            # Static files
└── lib/               # Utilities
```

### Component Development
```bash
# Start dev server
yarn dev

# Edit component in apps/web/components/
# Changes auto-reload
# Use DevTools to inspect
```

### Styling
Cal.com uses Tailwind CSS:
```bash
# Tailwind is auto-compiled
# Edit tailwind.config.js to customize
# Use Tailwind classes directly
```

---

## 🔗 Useful Commands

### Development
```bash
yarn dev              # Start dev server
yarn build            # Build for production
yarn start            # Start production server
yarn type-check       # TypeScript type checking
yarn lint             # Run ESLint
yarn lint:fix         # Auto-fix linting issues
yarn test             # Run tests
yarn db-studio        # Open Prisma Studio
```

### Database
```bash
yarn prisma generate  # Generate Prisma client
yarn prisma migrate   # Run migrations
yarn prisma reset     # Reset database (DEV ONLY)
yarn prisma seed      # Seed sample data
yarn prisma studio    # Open visual DB editor
```

### Build & Deploy
```bash
yarn build            # Production build
yarn start            # Run production server
yarn export           # Static export
```

---

## 📱 Testing the Application

### Create Test Account
1. Visit `http://localhost:3000`
2. Click "Sign Up"
3. Create account with test email
4. Verify email (check Maildev at `http://localhost:1080`)
5. Set up calendar (optional)

### Test Features
- Create event types
- Book appointments
- Test calendar sync
- Check emails in Maildev

---

## 🔍 Debugging Tips

### VS Code Extensions
Install for better development:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Thunder Client (API testing)

### Console Logging
```typescript
// Add logging to find issues
console.log('DEBUG:', variable);
console.error('ERROR:', error);

// Check in browser DevTools (F12)
```

### Network Requests
```bash
# Check API calls
# F12 → Network tab
# Look for failed requests
# Check error messages
```

### Database Issues
```bash
# Open Prisma Studio to inspect DB
yarn prisma studio

# Check migrations
yarn prisma migrate status

# View logs
tail -f logs/error.log
```

---

## 🚀 Performance Optimization

### For Development
```bash
# Already optimized for hot reload
# No special config needed
```

### For Production
```bash
# Build optimized version
yarn build

# This creates:
# - Optimized bundles
# - Minified code
# - Cached assets
```

---

## 📚 Documentation References

For more detailed information, see:
- `SETUP_GUIDE.md` - Complete setup guide
- `PROJECT_ANALYSIS.md` - Project structure analysis
- `QUICKSTART_WINDOWS.md` - Windows-specific setup
- `README.md` - Cal.com main documentation

---

## ✨ Next Steps

After hosting is successful:

1. **Access the Application**
   - Open `http://localhost:3000` in browser
   - Create a test account
   - Explore the interface

2. **Test Email Invites Feature** (if installed)
   - Go to team event types
   - Try the new email invite feature
   - Verify it works as expected

3. **Make Changes**
   - Edit files in `apps/web`
   - See changes auto-reload
   - Test in browser

4. **Submit PR** (if ready)
   - Commit your feature code
   - Push to GitHub
   - Create pull request

---

## 🆘 Need Help?

If you encounter issues:

1. **Check Port Usage**
   ```bash
   netstat -ano | findstr :3000
   ```

2. **Check Logs**
   ```bash
   # Look at console output
   # Check for error messages
   # Search for "ERROR" or "error"
   ```

3. **Restart Server**
   ```bash
   # Kill current process
   # Run: yarn dev again
   ```

4. **Clean Install**
   ```bash
   rm -r node_modules yarn.lock
   yarn install
   yarn dev
   ```

---

## 🎉 Success!

Once you see this in console:
```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

**Your Cal.com development server is running!** 🚀

Visit `http://localhost:3000` to access the application.

---

**Happy developing! 🎊**
