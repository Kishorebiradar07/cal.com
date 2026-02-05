# Cal.com - Yarn & Build System Reference

## Understanding the Monorepo Structure

Cal.com uses **Yarn Workspaces v4** (Berry) with **Turbo** for intelligent build management.

### Key Concepts

**Workspace**: A package with its own `package.json`
```
packages/ui/package.json → workspace named @calcom/ui
apps/web/package.json → workspace named @calcom/web
```

**Root Dependencies**: All node_modules installed at project root
- Single lock file (`yarn.lock`)
- Faster installation
- Dependency deduplication

**Turbo**: Task runner that:
- Runs tasks in parallel when possible
- Caches results to avoid rebuilding
- Respects dependency graph

---

## Yarn Workspace Commands

### Installation & Updates

```bash
# Install all dependencies for all workspaces
yarn install

# Add package to root (devDependencies)
yarn add --dev <package>

# Add package to specific workspace
yarn workspace @calcom/web add react-query

# Remove package from workspace
yarn workspace @calcom/web remove react-query

# Update all dependencies
yarn upgrade-interactive

# List installed packages
yarn list

# List workspaces
yarn workspaces list
```

### Running Scripts

```bash
# Run script in specific workspace
yarn workspace @calcom/web build

# Run script in multiple workspaces
yarn workspaces foreach run build

# Run script only in workspaces with changes
yarn workspaces foreach --since main run build

# Run script from root
yarn build
```

### Workspace Information

```bash
# List all workspaces
yarn workspaces list

# Show workspace information
yarn workspace @calcom/web run info

# Check what workspaces depend on a package
yarn workspaces foreach --dependents-of @calcom/ui
```

### Monorepo Utilities

```bash
# Check dependency consistency across workspaces
yarn workspaces foreach --all run sync-pack

# Clean all node_modules
yarn clean

# Reinstall from scratch
rm -r node_modules yarn.lock
yarn install
```

---

## Turbo Commands

### Basic Usage

```bash
# Run task in all workspaces
turbo run build

# Run task in specific workspace
turbo run build --filter=@calcom/web

# Run multiple tasks
turbo run build test lint

# Run with watch mode
turbo run dev --parallel

# Run only changed packages
turbo run build --since main
```

### Filtering

```bash
# Run in specific package
turbo run build --filter=@calcom/web

# Run in package and its dependents
turbo run build --filter=@calcom/ui...

# Run in package and its dependencies
turbo run build --filter=...@calcom/ui

# Run in packages matching pattern
turbo run build --filter="@calcom/*"

# Run in changed files
turbo run build --since HEAD
```

### Caching & Debugging

```bash
# Force rebuild (skip cache)
turbo run build --force

# Show task execution details
turbo run build --verbose

# Show cache status
turbo run build --graph

# Output dependency graph
turbo run build --graph=out.html  # Opens visualization

# Dry run (show what would run)
turbo run build --dry=json
```

---

## Common Yarn Patterns

### Development Workflow

```bash
# 1. Install dependencies
yarn install

# 2. Run type checking
yarn type-check

# 3. Run linting
yarn lint

# 4. Start development
yarn dev

# 5. In another terminal - run tests
yarn test:watch

# 6. Build when ready
yarn build
```

### Working with Specific Apps

```bash
# Install dependency for web app only
yarn workspace @calcom/web add lodash

# Run commands in web app
yarn workspace @calcom/web dev
yarn workspace @calcom/web build
yarn workspace @calcom/web test

# Install dev dependency for UI package
yarn workspace @calcom/ui add --dev @testing-library/react
```

### Git Hooks Integration

```bash
# Husky + lint-staged automatically:
# 1. Run on git commit
# 2. Check staged files only
# 3. Auto-fix if possible
# 4. Prevent commit if errors

# Manually run pre-commit checks
yarn pre-commit

# Skip hooks (not recommended)
git commit --no-verify
```

---

## Yarn v4 (Berry) Specifics

### Features

```bash
# Workspaces protocol - reference internal packages
# In package.json dependencies:
"@calcom/ui": "workspace:*"  # Uses local version
"@calcom/types": "workspace:~"  # Allows patch updates

# Zero-installs
# With yarn.lock committed, no need to run yarn install
# Monorepo is ready to code immediately
```

### Configuration

The `.yarnrc.yml` file configures:

```yaml
# Use node-modules linker (all packages in node_modules)
nodeLinker: node-modules

# Don't use global cache (each project manages its own)
enableGlobalCache: false

# Yarn version path
yarnPath: .yarn/releases/yarn-4.12.0.cjs

# Compression
compressionLevel: mixed
```

### Handling Resolutions

```bash
# Resolve dependency conflicts in package.json
{
  "resolutions": {
    "react": "19.2.4",
    "typescript": "5.9.3"
  }
}

# Apply resolutions
yarn install
```

---

## Root Scripts Reference

### Development Scripts

```bash
yarn dev                    # Start web app (port 3000)
yarn dev:api               # Start web + API (ports 3000, 3005)
yarn dev:website           # Start web + website (ports 3000, 3001)
yarn dev:api:console       # Start web + API + console (3000, 3005, 3100)
yarn dev:all               # Start all apps

yarn dx                    # Development experience check
```

### Build Scripts

```bash
yarn build                 # Production build
yarn type-check            # Type checking only
yarn type-check:ci         # Type checking for CI
```

### Database Scripts

```bash
yarn prisma               # Prisma CLI
yarn db-deploy            # Deploy migrations
yarn db-seed              # Seed database
yarn db-studio            # Prisma Studio GUI (http://localhost:5555)
```

### Testing Scripts

```bash
yarn test                 # Run all unit tests
yarn test:ui              # Run with UI dashboard
yarn tdd                  # Watch mode testing
yarn e2e                  # Run Playwright tests
yarn test-e2e             # Seed + Playwright tests
yarn test-playwright      # Playwright CLI
```

### Code Quality Scripts

```bash
yarn lint                 # Check code style
yarn lint:fix             # Auto-fix issues
yarn lint:report          # Generate report
yarn format               # Format with Biome
yarn env-check:common     # Validate .env
```

### App Store Scripts

```bash
yarn create-app           # Create new integration
yarn edit-app             # Edit app
yarn delete-app           # Delete app
yarn app-store            # App store CLI
```

---

## Workspace Dependency Graph

```
@calcom/web (main app)
├── @calcom/ui (components)
├── @calcom/types (types)
├── @calcom/prisma (ORM)
├── @calcom/trpc (API)
├── @calcom/features (features)
├── @calcom/lib (utilities)
└── ... (20+ more)

@calcom/api (REST API)
├── @calcom/trpc (routers)
├── @calcom/prisma (ORM)
├── @calcom/types (types)
└── ... (other packages)

@calcom/ui (component library)
├── @calcom/types (types)
└── React + Tailwind

@calcom/features (feature modules)
├── @calcom/prisma (ORM)
├── @calcom/ui (components)
└── ... (multiple)
```

### Installation Order

Yarn automatically installs in dependency order:
1. Packages with no dependencies
2. Packages that depend on level 1
3. Packages that depend on level 2
4. And so on...

---

## Performance Tips

### Faster Installation

```bash
# Use --prefer-offline flag
yarn install --prefer-offline

# Skip optional dependencies
yarn install --ignore-optional

# Use shallow clone for large repos
yarn install --immutable
```

### Faster Development

```bash
# Only watch specific workspace
turbo run dev --filter=@calcom/web

# Skip unnecessary type checking while coding
# (IDE provides type checking)

# Use Turbo caching
# (don't clear .turbo/ folder unnecessarily)
```

### Faster Builds

```bash
# Use --concurrency for parallel builds
turbo run build --concurrency=4

# Force specific workers
NODE_OPTIONS="--max-old-space-size=4096" yarn build
```

---

## Troubleshooting Yarn Issues

### Clear Cache

```bash
# Clear Yarn cache
yarn cache clean

# Remove node_modules and reinstall
yarn clean
rm -r node_modules
rm yarn.lock
yarn install
```

### Workspace Not Found

```bash
# Check workspace names
yarn workspaces list

# Verify package.json exists in workspace
ls packages/ui/package.json

# Refresh workspaces cache
yarn install
```

### Dependency Conflicts

```bash
# Show dependency tree
yarn workspaces foreach run info

# Check for duplicate installations
yarn dedupe

# Verify resolutions
cat package.json | grep -A 5 resolutions
```

### Script Not Found

```bash
# Check if script exists in workspace
yarn workspace @calcom/web run --list

# Run with explicit workspace
yarn workspace @calcom/web build

# List all scripts in package.json
cat packages/web/package.json | grep -A 20 '"scripts"'
```

---

## Best Practices

### For Development

1. **Use workspace references** - Type-safe dependency references
2. **Run type-check frequently** - Catch errors early
3. **Use Turbo filtering** - Only build what changed
4. **Keep package.json clean** - Remove unused dependencies
5. **Test locally before committing** - Use pre-commit hooks

### For Maintenance

1. **Update dependencies carefully** - Test after each major update
2. **Use resolutions for conflicts** - Don't duplicate dependencies
3. **Monitor lock file** - Commit yarn.lock to git
4. **Clean cache periodically** - `yarn cache clean` monthly
5. **Document workspace purposes** - Add README to new packages

### For CI/CD

```bash
# Install in CI (frozen lockfile)
yarn install --frozen-lockfile

# Run build verification
yarn type-check && yarn build

# Run all tests
yarn test && yarn e2e
```

---

## Quick Reference Card

```
INSTALLATION
yarn install                  Install all dependencies
yarn workspace @calcom/web add <pkg>  Add to specific workspace

DEVELOPMENT
yarn dev                      Start development server
yarn dev:api                  Start with API

BUILDING
yarn build                    Production build
yarn type-check              Type checking

DATABASE
yarn db-seed                 Add sample data
yarn db-studio               Open database GUI

TESTING
yarn test                    Run tests
yarn e2e                     E2E tests

QUALITY
yarn lint                    Check code
yarn lint:fix               Fix code issues
yarn format                 Format code

MONOREPO
yarn workspaces list        List all workspaces
turbo run build             Build all packages
turbo run build --filter=@calcom/web  Build specific
```

---

## Related Files

- **Package.json**: Root workspace definition and scripts
- **.yarnrc.yml**: Yarn configuration
- **turbo.json**: Turbo build configuration
- **CONTRIBUTING.md**: Contribution guidelines
- **SETUP_GUIDE.md**: Complete setup instructions
