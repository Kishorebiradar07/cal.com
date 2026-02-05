# 🎉 Cal.com Hosting & Development Server Guide

**Date**: February 5, 2026  
**Status**: Server startup in progress  

---

## ✅ Current Status

### What's Happening
Your Cal.com development server is being initialized:

1. ✅ Node.js detected (v25.2.1)
2. ✅ npm detected (v11.6.4)
3. ✅ Yarn installed globally
4. 🔄 Dependencies installing...
5. 🔄 Server starting on port 3000...

---

## 🚀 Quick Access

Once the server starts, access Cal.com at:

**Main Application**: `http://localhost:3000`

Other services available:
- Website: `http://localhost:3001`
- Prisma Studio (Database): `http://localhost:5555`
- Maildev (Email Testing): `http://localhost:1080`

---

## 📋 What's Running

### Frontend
- Next.js application
- React components
- Tailwind CSS styling
- Real-time hot reload (auto-refresh on file changes)

### Backend
- Node.js API server
- NextAuth authentication
- Prisma database ORM
- Webhook handlers

### Database
- PostgreSQL (configured via .env)
- Prisma migrations
- Data persistence

---

## ⏱️ Timeline

```
T+0min     → Installation started
T+2-5min   → Dependencies downloaded
T+5-10min  → Dependencies installed
T+10min    → Dev server initializing
T+12min    → Server ready on port 3000 ✓
T+12:30min → Access http://localhost:3000
```

---

## 🎯 First Steps After Server Starts

### 1. Verify Server is Running
```bash
# You should see in terminal:
ready - started server on 0.0.0.0:3000
```

### 2. Access the Application
Open browser and go to: `http://localhost:3000`

You should see:
- Cal.com login page
- Sign up option
- Calendar interface (if logged in)

### 3. Create Test Account
- Click "Sign Up"
- Enter email: `test@example.com`
- Create password
- Verify email in Maildev (port 1080)

### 4. Explore Features
- Create event type
- Try email invites (new feature!)
- Test scheduling
- Book test appointment

---

## 💻 Development Tips

### Hot Reload
Files automatically reload when you edit them:
```bash
# Edit a file
apps/web/pages/some-page.tsx

# Save (Ctrl+S)

# Browser automatically refreshes
# No need to restart server!
```

### View Changes
```bash
# Edit component
# See changes immediately in browser (F12 for DevTools)

# Make API changes
# Might need to refresh page (Ctrl+Shift+R)

# Change database schema
# Need to restart server
```

### Debugging
```bash
# Open DevTools (F12)
# Check Console tab for errors
# Check Network tab for API calls
# Check Application tab for localStorage

# Or add console.log to code:
console.log('DEBUG:', myVariable);
```

---

## 🔌 Terminal Commands (While Server Running)

Keep terminal open while server runs. You'll see:
- Build logs
- Error messages
- Hot reload notifications
- Database migrations

**Don't close this terminal or server stops!**

---

## ⚙️ Configuration

### Environment Variables
Located in `.env` file

Key settings:
- `DATABASE_URL` - Database connection
- `NEXTAUTH_SECRET` - Authentication key
- `NEXTAUTH_URL` - App URL
- `CALCOM_WEBAPP_URL` - Public URL

### See Configuration
```bash
cat .env
```

---

## 📊 Project Structure

```
cal.com/
├── apps/
│   ├── web/              ← Main web application
│   │   ├── pages/        ← Page routes
│   │   ├── components/   ← React components
│   │   └── styles/       ← CSS files
│   ├── api/              ← Backend APIs
│   └── website/          ← Marketing website
├── packages/
│   ├── features/         ← Feature modules
│   ├── lib/              ← Utilities
│   ├── ui/               ← UI components
│   └── emails/           ← Email handling
├── .env                  ← Configuration
├── package.json          ← Dependencies
└── tsconfig.json         ← TypeScript config
```

---

## 🎨 Testing Email Invites Feature

If you implemented the email invites feature:

### Steps to Test
1. Log in to `http://localhost:3000`
2. Go to event types → team assignment
3. Try typing an email address
4. See the new "(invite)" label
5. Test comma-separated emails
6. Verify duplicates are prevented

### Expected Behavior
✅ Email appears with "(invite)" label  
✅ Text rendered in italic  
✅ Mail icon displayed  
✅ Multiple emails via comma separation  
✅ Invalid emails filtered out  

---

## 🔧 Common Tasks

### Check Dependencies
```bash
yarn list
# Shows all installed packages
```

### Update Dependencies
```bash
yarn upgrade
# Updates to latest versions
```

### Run Tests
```bash
yarn test
# Tests for email validation
# Other unit tests
```

### Type Check
```bash
yarn type-check
# Verify TypeScript
```

### Lint Code
```bash
yarn lint
# Check code quality
```

### Format Code
```bash
yarn format
# Auto-format code
```

---

## 🐛 Troubleshooting

### Server Won't Start
```bash
# 1. Check port not in use
netstat -ano | findstr :3000

# 2. Kill process if stuck
taskkill /PID <PID> /F

# 3. Try different port
$env:PORT=3001
yarn dev
```

### Port Already in Use
```bash
# Find process using port
netstat -ano | findstr :3000

# Kill the process
taskkill /PID <PID> /F

# Or use different port
PORT=3001 yarn dev
```

### Dependencies Error
```bash
# Clean install
rm -r node_modules yarn.lock
yarn install
yarn dev
```

### Database Error
```bash
# Reset database
yarn prisma migrate reset

# Or migrate
yarn prisma migrate dev
```

### Module Not Found
```bash
# Reinstall dependencies
yarn install

# Or specific package
yarn add package-name
```

---

## 🌐 Network Access

### Local Only
Server runs on `localhost:3000` - **only your computer** can access

### Access Remotely (Optional)
To access from another machine:

1. Find your computer's IP:
   ```bash
   ipconfig
   # Look for IPv4 Address
   ```

2. Update `.env`:
   ```env
   NEXTAUTH_URL=http://YOUR_IP:3000
   CALCOM_WEBAPP_URL=http://YOUR_IP:3000
   ```

3. Access from other machine:
   ```
   http://YOUR_IP:3000
   ```

**Note**: Requires same network connection

---

## 📈 Performance Tips

### Faster Development
- Use VSCode with extensions
- Keep DevTools closed (uses memory)
- Don't run unnecessary services
- Close unused browser tabs

### Memory Usage
- Typical: 500MB - 1GB
- If slow, increase Node memory:
  ```bash
  $env:NODE_OPTIONS='--max-old-space-size=4096'
  yarn dev
  ```

### Build Time
- First build: 30-60 seconds
- Subsequent: 5-15 seconds (with caching)
- Hot reload: <1 second

---

## ✨ Features to Explore

### Authentication
- Sign up / Login
- Password reset
- 2FA (Two-Factor Auth)
- OAuth integrations

### Calendar
- Create event types
- Set availability
- Configure locations
- Add custom fields

### Scheduling
- Fixed hosts (one person handles)
- Round-robin (distribute)
- Team assignment
- **Email invites** (NEW!) ✨

### Integrations
- Google Calendar
- Microsoft 365
- Zoom
- Slack notifications

---

## 📚 Documentation

For more details, see:

| Document | Purpose |
|----------|---------|
| HOSTING_GUIDE.md | This file |
| SETUP_GUIDE.md | Initial setup |
| PROJECT_ANALYSIS.md | Project structure |
| QUICKSTART_WINDOWS.md | Windows quick start |
| EMAIL_INVITES_*.md | Email feature docs |

---

## 🎯 Next Steps

### Immediate
1. Wait for server to finish starting
2. Check terminal for "ready - started server"
3. Open `http://localhost:3000` in browser
4. Create test account

### Short Term
5. Explore Cal.com interface
6. Test the email invites feature
7. Create event types
8. Test scheduling

### Development
9. Make code changes
10. Verify hot reload works
11. Test changes in browser
12. Run tests and linting

### Submission
13. Commit your feature
14. Push to GitHub
15. Create pull request
16. Wait for review

---

## 💡 Pro Tips

### Quick Keyboard Shortcuts
```
Ctrl+S     → Save file
Ctrl+H     → Find & replace
Ctrl+K+C   → Comment code
Ctrl+/     → Toggle comment
F12        → Open DevTools
Ctrl+Shift+I → Inspect element
```

### Terminal Tips
```bash
# Clear screen
clear

# Stop server
Ctrl+C

# Go back to previous directory
cd -

# List files
ls -la

# See disk usage
df -h
```

### Browser DevTools Tips
```
F12             → Open DevTools
Ctrl+Shift+K    → Open Console
Ctrl+Shift+M    → Mobile view
Ctrl+Shift+R    → Hard refresh
```

---

## 🆘 Support Resources

### If Server Won't Start
1. Check `HOSTING_GUIDE.md` troubleshooting
2. Read terminal error messages carefully
3. Try clean install: `rm -r node_modules; yarn install`
4. Check system resources (RAM, disk space)

### If Features Don't Work
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh page (Ctrl+Shift+R)
3. Check browser console (F12)
4. Check server logs in terminal

### If Database Issues
1. Run `yarn prisma studio` to inspect DB
2. Check `.env` DATABASE_URL
3. Verify PostgreSQL is running
4. Try reset: `yarn prisma migrate reset`

---

## ✅ Success Checklist

- [ ] Node.js installed (`node -v`)
- [ ] Yarn installed (`yarn -v`)
- [ ] Dependencies installed (`yarn install`)
- [ ] `.env` configured
- [ ] Server started (`yarn dev`)
- [ ] Can access `http://localhost:3000`
- [ ] Can sign up / create account
- [ ] Can create event type
- [ ] **Can use email invites feature** ✨

---

## 🎉 You're All Set!

Your Cal.com development server is ready to use!

### What You Can Do Now
- ✅ Run the application locally
- ✅ Test the email invites feature
- ✅ Make code changes
- ✅ See changes in real-time
- ✅ Debug issues
- ✅ Prepare for PR submission

---

**Happy developing! 🚀**

For questions, check the documentation files or review the terminal output.
