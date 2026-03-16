# Jesus Youth App - Quick Start Guide

## Deploy to Vercel in 3 Steps (5 Minutes)

### 1️⃣ Push Code to GitHub
```bash
git add .
git commit -m "Jesus Youth App - Ready to deploy"
git push origin main
```

### 2️⃣ Create Vercel Project
1. Go to https://vercel.com
2. Click "New Project"
3. Select your GitHub repository
4. Click "Deploy"

### 3️⃣ That's It! 🎉
- Your app is live at: `https://your-project-name.vercel.app`
- Share this URL with your team
- Start using the app!

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (runs at http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## Default Test Account

```
Email: admin@example.com
Password: admin123
```

---

## Key Features to Try

| Feature | How to Access |
|---------|--------------|
| **Browse Programs** | Click tabs: Home, Daily, Weekly, Monthly, Calendar |
| **Login/Register** | Click "Sign In" button |
| **Register for Program** | Login, then click "Register Now" on any program |
| **Admin Features** | Login with test account, click "👑 Admin" |
| **Add Program** | Click "👑 Admin" → "Add Program" |
| **View Calendar** | Click "Calendar" tab |
| **Export Data** | Click export icon (📊) in header |
| **Change Settings** | Click "⚙️" Settings button |

---

## First-Time Checklist

- [ ] Deploy to Vercel
- [ ] Test login with admin account
- [ ] Add a test program
- [ ] Register a user for a program
- [ ] Export program data
- [ ] View calendar
- [ ] Test on mobile device
- [ ] Share URL with team

---

## Important Links

| Link | Purpose |
|------|---------|
| `DEPLOYMENT.md` | Detailed deployment guide |
| `GETTING_STARTED.md` | Development setup guide |
| `DEPLOYMENT_CHECKLIST.md` | Pre-deployment verification |
| `IMPROVEMENTS.md` | What's been improved |
| `README.md` | Full feature documentation |

---

## Troubleshooting

**"Hydration failed" error?**
→ Hard refresh browser (Ctrl+Shift+R)

**Data disappears after closing?**
→ This is normal with localStorage (Phase 2 adds database)

**Can't login?**
→ Check email and password, clear browser cache

**Admin features not showing?**
→ Make sure you're logged in, test account is admin@example.com

---

## Next Phase: Add Database

When ready to add persistent storage:

1. Create Supabase account
2. Create database tables
3. Update app to use Supabase instead of localStorage
4. Redeploy to Vercel

See `DEPLOYMENT.md` for detailed instructions.

---

## Security Notes

✅ **Current**: Data stored locally (secure for demo)
⚠️ **Important**: This data is device-specific, not backed up
📌 **Phase 2**: Add database for persistent, secure storage

---

## Support

For issues:
1. Check browser console (F12) for errors
2. Hard refresh page
3. Clear localStorage: `localStorage.clear()` in console
4. Review `DEPLOYMENT.md` troubleshooting

---

## Quick Command Reference

```bash
# Start development
npm run dev

# Check for build errors
npm run build

# Run production
npm start

# Format code
npm run lint
```

---

## Important Files

```
📁 Project Root
├── 📄 DEPLOYMENT.md          ← Read this first
├── 📄 GETTING_STARTED.md     ← Local development
├── 📄 QUICK_START.md         ← You are here
├── 📁 app/
│   ├── page.tsx              ← Main app
│   ├── layout.tsx            ← Page layout
│   └── globals.css           ← Global styles
├── 📁 components/            ← React components
├── 📁 lib/                   ← Utilities & context
└── 📁 public/                ← Images & assets
```

---

## Your App is Ready! 🚀

Next steps:
1. Deploy to Vercel
2. Test with your team
3. Gather feedback
4. Plan Phase 2 (optional)

Questions? Check the documentation files!
