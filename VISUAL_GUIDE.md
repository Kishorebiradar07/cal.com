# Cal.com Setup - Visual Guide & Summary

## 🎯 Project at a Glance

```
┌─────────────────────────────────────────────────────────┐
│                    CAL.COM PROJECT                      │
│     Open-source Calendly alternative                    │
│     Built with Next.js, React, TypeScript, Prisma       │
└─────────────────────────────────────────────────────────┘
```

### Key Numbers
- **20+** Package workspaces
- **2** Main applications (web + api)
- **100+** External integrations
- **4.12.0** Yarn version (Berry)
- **5.9.3** TypeScript version
- **15-20 min** Setup time

---

## 📚 Documentation Map

### Start Here Based on Your Goal

```
┌─────────────────────────────────────────────────────────┐
│                YOUR SITUATION                           │
└─────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
   ┌────▼────┐   ┌───────▼────┐   ┌──────▼────┐
   │ I'm on  │   │ I want to  │   │ I want to │
   │ Windows │   │understand  │   │contribute│
   │and want │   │the project │   │to cal.com│
   │to start │   │first       │   │           │
   │quickly  │   │            │   │           │
   └────┬────┘   └───────┬────┘   └──────┬────┘
        │                │               │
   QUICKSTART_    PROJECT_         CONTRIBUTING.md
   WINDOWS.md    ANALYSIS.md        + SETUP_GUIDE.md
        │                │               │
        └────────┬───────┴───────┬───────┘
                 │               │
          ┌──────▼───────────────▼──────┐
          │ SETUP_CHECKLIST.md          │
          │ (Verify each step)          │
          └─────────┬────────────────────┘
                    │
          ┌─────────▼──────────┐
          │ Ready to develop!  │
          │ See Quick Commands │
          │ below              │
          └────────────────────┘
```

---

## ⚡ Quick Command Reference

### Installation (5-10 minutes)
```powershell
# 1. Install dependencies
yarn install

# 2. Start database
docker-compose up -d

# 3. Setup environment
node setup-env.js

# 4. Setup database
yarn prisma migrate deploy
yarn db-seed  # Optional

# 5. Start development
yarn dev
```

### Daily Development
```powershell
# Start development server
yarn dev

# Type checking (in another terminal)
yarn type-check

# Linting & formatting
yarn lint:fix
yarn format

# Run tests
yarn test

# Open database GUI
yarn db-studio
```

### Building & Deployment
```powershell
# Production build
yarn build

# Type check everything
yarn type-check

# Clean artifacts
yarn clean
```

---

## 📊 Project Structure Tree

```
cal.com/
│
├── 📁 apps/
│   ├── web/                 🌐 Main web app (React + Next.js)
│   └── api/                 🔌 REST API server (Node.js)
│
├── 📁 packages/
│   ├── prisma/             🗄️  Database schema & migrations
│   ├── ui/                 🎨 React component library
│   ├── types/              🔷 Shared TypeScript types
│   ├── trpc/               🔌 Type-safe API (tRPC)
│   ├── features/           ⚙️  Feature modules
│   ├── app-store/          🛒 Integration marketplace
│   ├── lib/                🛠️  Utility functions
│   ├── emails/             📧 Email templates
│   └── ... (more)          📦 Other libraries
│
├── 📁 scripts/             🔧 Database scripts
├── 📁 docs/                📖 Documentation site
├── 📁 companion/           🔗 Browser extension
├── 📁 example-apps/        📚 Example implementations
│
├── 📄 package.json         📋 Root workspace
├── 📄 turbo.json          🚀 Build configuration
├── 📄 .yarnrc.yml         🧵 Yarn configuration
├── 📄 docker-compose.yml  🐳 Database containers
├── 📄 .env.example        ⚙️  Environment template
└── 📄 .env               ⚙️  Your local config (create this)
```

---

## 🔄 Development Workflow

```
┌──────────────┐
│ Start Dev    │
│ yarn dev     │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────┐
│ Code Changes                     │
│ - Edit components                │
│ - Update database schema         │
│ - Add API endpoints              │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│ Test Locally                     │
│ - View in browser (HMR)          │
│ - Run tests: yarn test           │
│ - Run linting: yarn lint:fix     │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│ Verify Quality                   │
│ - Type check: yarn type-check    │
│ - Format: yarn format            │
│ - Build: yarn build              │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│ Commit & Push                    │
│ - Git commit                     │
│ - Pre-commit hooks auto-run      │
│ - Push to branch                 │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│ Create Pull Request              │
│ - Link related issues            │
│ - Describe changes               │
│ - Wait for review                │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│ PR Merged to Main                │
│ - CI/CD runs tests               │
│ - Auto-deployed to production    │
└──────────────────────────────────┘
```

---

## 🛠️ Technology Stack Visualization

```
┌─────────────────────────────────────────────┐
│           FRONTEND (Browser)                │
├─────────────────────────────────────────────┤
│ React 19 + Next.js + TypeScript             │
│ Tailwind CSS + Headless UI                  │
│ TanStack Query (State Management)           │
│ tRPC Client (Type-safe API)                 │
└──────────────────┬──────────────────────────┘
                   │ HTTP/WebSocket
┌──────────────────▼──────────────────────────┐
│           BACKEND (Node.js)                 │
├─────────────────────────────────────────────┤
│ Express + tRPC (Type-safe API)              │
│ Prisma ORM (Database access)                │
│ NextAuth (Authentication)                   │
│ Bull (Job queue)                            │
└──────────────────┬──────────────────────────┘
                   │ SQL
┌──────────────────▼──────────────────────────┐
│          DATABASE & CACHE                   │
├─────────────────────────────────────────────┤
│ PostgreSQL 12+ (Primary database)           │
│ Redis (Caching & sessions)                  │
│ PgBouncer (Connection pooling)              │
└─────────────────────────────────────────────┘
```

---

## 📈 Feature Support

```
Core Features
├── ✅ Event type creation
├── ✅ Availability scheduling
├── ✅ Booking system
├── ✅ Calendar sync (Google, Microsoft)
├── ✅ Team management
├── ✅ Workflows & automation
├── ✅ Email reminders
├── ✅ SMS notifications
├── ✅ Video conferencing
├── ✅ Webhooks
├── ✅ Custom branding
└── ✅ Multi-language support

Integrations
├── 🔗 Google Workspace
├── 🔗 Microsoft 365
├── 🔗 Daily.co
├── 🔗 Twilio
├── 🔗 SendGrid
├── 🔗 Stripe
├── 🔗 Zapier
└── ... 20+ more

Developer Features
├── 🔌 REST API
├── 🔌 tRPC API (type-safe)
├── 🔌 Webhooks
├── 🔌 Embed widget
├── 🔌 SDKs
└── 🔌 Platform API
```

---

## 🚀 Setup Timeline

```
Total Time: 15-20 minutes

┌─────────────────────────────────────┐
│ Prerequisites Check: 5 min          │  ✓ Node.js 18.17.0+
│                                     │  ✓ Yarn 4.12.0
│                                     │  ✓ Git configured
└─────────────────────────────────────┘
                ▼
┌─────────────────────────────────────┐
│ Install Dependencies: 5-10 min      │  yarn install
│                                     │  (Downloads ~2GB)
└─────────────────────────────────────┘
                ▼
┌─────────────────────────────────────┐
│ Database Setup: 2-3 min             │  docker-compose up -d
│                                     │  or local PostgreSQL
└─────────────────────────────────────┘
                ▼
┌─────────────────────────────────────┐
│ Environment Setup: 2-3 min          │  node setup-env.js
│                                     │  (auto generates secrets)
└─────────────────────────────────────┘
                ▼
┌─────────────────────────────────────┐
│ Database Schema: 1-2 min            │  yarn prisma migrate deploy
│                                     │  yarn db-seed (optional)
└─────────────────────────────────────┘
                ▼
┌─────────────────────────────────────┐
│ Start Dev Server: 2-3 min           │  yarn dev
│                                     │  Compiling...
└─────────────────────────────────────┘
                ▼
┌─────────────────────────────────────┐
│ ✅ READY!                           │  http://localhost:3000
│                                     │  Start developing!
└─────────────────────────────────────┘
```

---

## 📋 Documentation Files Created

| File | Purpose | Size |
|------|---------|------|
| SETUP_GUIDE.md | Complete setup instructions | ~25 KB |
| PROJECT_ANALYSIS.md | Project architecture & overview | ~30 KB |
| QUICKSTART_WINDOWS.md | Fast Windows setup (5-10 min) | ~15 KB |
| YARN_TURBO_REFERENCE.md | Build system reference | ~20 KB |
| SETUP_CHECKLIST.md | Verification checklist | ~20 KB |
| setup-env.js | Interactive setup script | ~8 KB |
| DOCUMENTATION_GUIDE.md | This guide + meta docs | ~15 KB |

**Total**: 7 comprehensive guides + 1 setup script

---

## 🎯 Quick Answers

### "How do I start?"
→ Follow `QUICKSTART_WINDOWS.md` (5-10 minutes)

### "What does this project do?"
→ Read `PROJECT_ANALYSIS.md` (architecture overview)

### "Where's the database config?"
→ Create `.env` from `.env.example` or run `node setup-env.js`

### "How do I run the dev server?"
→ `yarn dev` (opens http://localhost:3000)

### "What are the available commands?"
→ See "Quick Command Reference" section above or `SETUP_GUIDE.md`

### "I'm stuck on setup"
→ Check `SETUP_CHECKLIST.md` and `SETUP_GUIDE.md` troubleshooting

### "How does the monorepo work?"
→ Read `YARN_TURBO_REFERENCE.md`

### "What are the code standards?"
→ Check `CONTRIBUTING.md`

---

## ✨ Key Features of This Documentation

✅ **Comprehensive** - Covers all aspects of setup and development  
✅ **Progressive** - From quick start to deep technical knowledge  
✅ **Practical** - Step-by-step instructions with examples  
✅ **Visual** - Diagrams and ASCII charts for clarity  
✅ **Windows-Focused** - Specific guidance for Windows users  
✅ **Troubleshooting** - Solutions to common problems  
✅ **Reference** - Command checklists and guides  
✅ **Interactive** - Setup script to automate configuration  

---

## 🎓 Learning Paths

### **Quickest Path (Just Want to Run)**
1. QUICKSTART_WINDOWS.md (5 min read)
2. Run `node setup-env.js` (2 min)
3. Run setup commands (10 min)
4. Start coding! ✅

### **Best Practice Path (Want to Understand)**
1. PROJECT_ANALYSIS.md (15 min read)
2. SETUP_GUIDE.md (10 min read)
3. SETUP_CHECKLIST.md (verify steps)
4. Start coding with context! ✅

### **Deep Dive Path (Want to Master)**
1. PROJECT_ANALYSIS.md (architecture)
2. YARN_TURBO_REFERENCE.md (build system)
3. CONTRIBUTING.md (standards)
4. Explore the code
5. Become a contributor! ✅

---

## 🔗 Resource Map

```
Need Help?
│
├─ Setup Issues
│  └─ SETUP_GUIDE.md → Troubleshooting section
│
├─ Understanding Project
│  └─ PROJECT_ANALYSIS.md → Architecture section
│
├─ Build System Questions
│  └─ YARN_TURBO_REFERENCE.md → Command section
│
├─ GitHub Resources
│  ├─ Issues: github.com/calcom/cal.com/issues
│  └─ Discussions: github.com/calcom/cal.com/discussions
│
└─ External Help
   ├─ TypeScript Docs: typescriptlang.org
   ├─ Next.js Docs: nextjs.org
   ├─ React Docs: react.dev
   ├─ Prisma Docs: prisma.io
   └─ tRPC Docs: trpc.io
```

---

## ✅ Success Criteria

You'll know you're ready when:

- [ ] `yarn dev` starts without errors
- [ ] http://localhost:3000 loads
- [ ] Can login (or create account)
- [ ] `yarn type-check` passes
- [ ] `yarn lint` passes
- [ ] `yarn test` runs successfully
- [ ] Database accessible via `yarn db-studio`

---

## 🚀 You Are Now Ready!

Everything is set up for you to:
- ✅ Run Cal.com locally
- ✅ Make code changes
- ✅ Contribute to the project
- ✅ Understand the architecture
- ✅ Troubleshoot issues

**Next Step**: Open `QUICKSTART_WINDOWS.md` or `SETUP_GUIDE.md` and start!

---

**Questions?** Check the relevant documentation:
- Setup → SETUP_GUIDE.md
- Architecture → PROJECT_ANALYSIS.md  
- Build System → YARN_TURBO_REFERENCE.md
- Verification → SETUP_CHECKLIST.md

**Last Updated**: February 5, 2026  
**Status**: ✅ Complete and Ready for Use
