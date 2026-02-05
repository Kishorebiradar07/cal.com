# Cal.com Development Environment Setup Checklist

Use this checklist to ensure your local development environment is properly configured.

---

## ✅ Prerequisites (5 minutes)

- [ ] **Node.js** - Version 18.17.0 or higher installed
  ```powershell
  node --version
  ```
  - If not installed: https://nodejs.org/
  - Recommended: Node 20+ LTS

- [ ] **Yarn** - Version 4.12.0 installed via Corepack
  ```powershell
  yarn --version
  ```
  - If needed:
    ```powershell
    corepack enable
    corepack prepare yarn@4.12.0 --activate
    ```

- [ ] **Git** - Latest version installed
  ```powershell
  git --version
  ```

- [ ] **PostgreSQL or Docker** - For database
  - Docker: https://www.docker.com/products/docker-desktop
  - PostgreSQL: https://www.postgresql.org/download/windows/

- [ ] **VS Code** - Text editor (optional but recommended)
  - https://code.visualstudio.com/
  - Recommended extensions:
    - TypeScript Vue Plugin
    - ESLint
    - Prettier
    - Tailwind CSS IntelliSense

---

## ✅ Repository Setup (2 minutes)

- [ ] Repository cloned to local machine
  - Location: `c:\Users\hp\Desktop\open source\cal.com`
  
- [ ] Verify git configuration
  ```powershell
  git config user.name
  git config user.email
  git branch  # Should show 'main'
  ```

---

## ✅ Dependency Installation (10 minutes)

- [ ] Navigate to project root
  ```powershell
  cd "c:\Users\hp\Desktop\open source\cal.com"
  pwd  # Verify location
  ```

- [ ] Install all workspace dependencies
  ```powershell
  yarn install
  ```
  - ⏱️ First time takes 5-10 minutes
  - ✅ Should complete without errors
  - Watch for any "peer dependency" warnings (usually OK to ignore)

- [ ] Verify installation
  ```powershell
  yarn --version  # Should be 4.12.0
  yarn workspaces list  # Should list all workspaces
  ```

---

## ✅ Database Setup (5 minutes)

### Option A: Docker (Recommended)

- [ ] Docker installed and running
  ```powershell
  docker --version
  docker ps  # Should show no errors
  ```

- [ ] Start PostgreSQL and Redis containers
  ```powershell
  docker-compose up -d
  ```

- [ ] Verify containers are running
  ```powershell
  docker-compose ps
  ```
  - Should show:
    - `database` - postgres - running
    - `redis` - redis - running

- [ ] Test database connection
  ```powershell
  psql -U unicorn_user -d calendso -h localhost -p 5450 -c "SELECT 1"
  ```
  - Should return: `1`

### Option B: Local PostgreSQL

- [ ] PostgreSQL installed locally
  ```powershell
  psql --version
  ```

- [ ] PostgreSQL service running
  - Check Windows Services or task manager

- [ ] Create database
  ```powershell
  psql -U postgres
  CREATE DATABASE calendso;
  \q
  ```

---

## ✅ Environment Variables Setup (5 minutes)

### Method 1: Automated Setup (Recommended)

- [ ] Run setup helper
  ```powershell
  node setup-env.js
  ```
  
- [ ] Answer prompts:
  - Database host: `localhost` (press Enter)
  - Database port: `5450` (press Enter)
  - Database user: `unicorn_user` (press Enter)
  - Database password: `magical_password` (press Enter)
  - When asked to generate secrets: type `y`
  - Press Enter for remaining prompts

### Method 2: Manual Setup

- [ ] Copy template file
  ```powershell
  Copy-Item .env.example .env
  ```

- [ ] Edit `.env` file
  ```powershell
  code .env
  ```

- [ ] Set required variables:
  ```env
  DATABASE_URL="postgresql://unicorn_user:magical_password@localhost:5450/calendso"
  DATABASE_DIRECT_URL="postgresql://unicorn_user:magical_password@localhost:5450/calendso"
  NEXTAUTH_URL='http://localhost:3000'
  NEXTAUTH_SECRET='<generate-secret>'
  CALENDSO_ENCRYPTION_KEY='<generate-key>'
  NEXT_PUBLIC_WEBAPP_URL='http://localhost:3000'
  NEXT_PUBLIC_WEBSITE_URL='http://localhost:3000'
  NEXT_PUBLIC_EMBED_LIB_URL='http://localhost:3000/embed/embed.js'
  CRON_API_KEY='0cc0e6c35519bba620c9360cfe3e68d0'
  CALCOM_TELEMETRY_DISABLED=1
  ```

- [ ] Verify `.env` file exists
  ```powershell
  Test-Path .env
  ```

---

## ✅ Database Schema Setup (3 minutes)

- [ ] Run Prisma migrations
  ```powershell
  yarn prisma migrate deploy
  ```
  - ✅ Should complete successfully
  - Shows list of applied migrations

- [ ] (Optional) Seed database with sample data
  ```powershell
  yarn db-seed
  ```
  - Creates sample user: admin@example.com / admin
  - Creates sample event types and availability

- [ ] Verify database with Prisma Studio
  ```powershell
  yarn db-studio
  ```
  - Opens: http://localhost:5555
  - Should show database tables
  - Press Ctrl+C to exit

---

## ✅ Code Quality Verification (3 minutes)

- [ ] Type checking passes
  ```powershell
  yarn type-check
  ```
  - ✅ No TypeScript errors
  - May take 1-2 minutes first run

- [ ] Linting passes
  ```powershell
  yarn lint
  ```
  - ✅ No linting errors
  - Some warnings are OK

- [ ] Code formatting is correct
  ```powershell
  yarn format
  ```
  - Formats code with Biome

---

## ✅ Development Server Startup (5 minutes)

- [ ] Start development server
  ```powershell
  yarn dev
  ```
  - ⏱️ Takes 2-3 minutes to compile first time
  - Wait for: "ready - started server on 0.0.0.0:3000"

- [ ] Server is running
  ```
  http://localhost:3000
  ```
  - Should see Cal.com login page
  - No errors in console

- [ ] Login with sample credentials (if seeded)
  - Email: `admin@example.com`
  - Password: `admin`
  - Or create new account

- [ ] Basic navigation works
  - [ ] See dashboard
  - [ ] Can view settings
  - [ ] Can see event types

---

## ✅ Testing Setup (2 minutes)

- [ ] Unit tests run
  ```powershell
  yarn test
  ```
  - ✅ Tests pass (or at least run)

- [ ] E2E tests installed
  ```powershell
  yarn e2e --help
  ```
  - Should show Playwright options

---

## ✅ Git Hooks Configuration (1 minute)

- [ ] Husky hooks installed
  ```powershell
  .husky
  ```
  - Directory should exist with hook files

- [ ] Pre-commit hooks work
  ```powershell
  git add .
  git commit -m "test"  # Should run pre-commit checks
  ```
  - Press Ctrl+C to cancel

---

## ✅ Documentation Review (5 minutes)

- [ ] Read SETUP_GUIDE.md
  - [ ] Understand monorepo structure
  - [ ] Know available commands
  - [ ] Know troubleshooting steps

- [ ] Read PROJECT_ANALYSIS.md
  - [ ] Understand architecture
  - [ ] Know tech stack
  - [ ] Understand file organization

- [ ] Read CONTRIBUTING.md
  - [ ] Know code standards
  - [ ] Understand PR process
  - [ ] Know file naming conventions

- [ ] Read YARN_TURBO_REFERENCE.md
  - [ ] Understand workspace commands
  - [ ] Know Turbo usage
  - [ ] Know common patterns

---

## ✅ VS Code Setup (Optional - 5 minutes)

- [ ] Extensions installed:
  ```
  - TypeScript Vue Plugin (Vue)
  - ESLint
  - Prettier - Code formatter
  - Tailwind CSS IntelliSense
  - GitLens
  ```

- [ ] Settings configured:
  - [ ] Default formatter: Prettier
  - [ ] Format on save: enabled
  - [ ] Auto-fix on save: enabled

- [ ] Workspace opened
  ```powershell
  code .
  ```

---

## ✅ First Development Task (10 minutes)

### Simple Change to Test Setup

- [ ] Open `apps/web/components` folder
- [ ] Edit any component file
- [ ] Make small change (e.g., change text)
- [ ] Save file (Ctrl+S)
- [ ] See hot reload in browser at http://localhost:3000
- [ ] Revert change
  ```powershell
  git checkout apps/web/components/<file>
  ```

### Try Running Commands

- [ ] Stop dev server: Ctrl+C
- [ ] Run type checking:
  ```powershell
  yarn type-check
  ```
  - Should complete in 1-2 minutes

- [ ] Run linting:
  ```powershell
  yarn lint
  ```
  - Should show any style issues

- [ ] Restart dev server:
  ```powershell
  yarn dev
  ```

---

## ✅ Final Verification

- [ ] Project root contains:
  - [ ] `package.json` (root workspace)
  - [ ] `.env` (environment variables)
  - [ ] `node_modules/` (dependencies)
  - [ ] `yarn.lock` (lock file)

- [ ] Development server running
  - [ ] Accessible at http://localhost:3000
  - [ ] No errors in terminal
  - [ ] Hot reload working

- [ ] Database connected
  - [ ] Prisma migrations applied
  - [ ] Database contains tables
  - [ ] Can query with Prisma Studio

- [ ] Code quality tools working
  - [ ] Type checking: `yarn type-check`
  - [ ] Linting: `yarn lint`
  - [ ] Testing: `yarn test`

---

## 🎉 You're Ready!

If all checkboxes above are checked, your development environment is properly configured!

### Next Steps

1. **Read the docs**: Review CONTRIBUTING.md for development standards
2. **Explore the code**: Understand the structure in PROJECT_ANALYSIS.md
3. **Make a change**: Practice with a simple modification
4. **Run tests**: Ensure your changes don't break anything
5. **Create a PR**: Follow the contributing guidelines

### Common First Tasks

- [ ] Fix a small bug
- [ ] Improve documentation
- [ ] Add a comment to explain code
- [ ] Refactor a small component
- [ ] Add a test case

### Helpful Commands Reminder

```powershell
yarn dev              # Start development server
yarn type-check       # Check types
yarn lint             # Check code style
yarn test             # Run tests
yarn build            # Production build
yarn db-seed          # Add sample data
yarn db-studio        # View database GUI
```

---

## 🆘 Troubleshooting

If anything fails:

1. **Check logs carefully** - Error messages usually explain the issue
2. **Review SETUP_GUIDE.md** - Detailed troubleshooting section
3. **Check GitHub issues** - https://github.com/calcom/cal.com/issues
4. **Ask in discussions** - https://github.com/calcom/cal.com/discussions

---

## 📞 Support Resources

- **Documentation**: `SETUP_GUIDE.md`, `PROJECT_ANALYSIS.md`
- **Code Examples**: Look at existing packages in `packages/` and `apps/`
- **Testing**: Check test files ending in `.test.ts` or `.spec.ts`
- **Types**: Review `packages/types/` for shared type definitions
- **Components**: Explore `packages/ui/` for component examples

---

**Last Updated**: February 5, 2026
**Status**: ✅ Ready for Development
