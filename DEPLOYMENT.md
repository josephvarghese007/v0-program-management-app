# Jesus Youth App - Deployment Guide

## Quick Deployment to Vercel

### Prerequisites
- GitHub account with the repository connected
- Vercel account (free tier is sufficient)

### Step 1: Push Code to GitHub
```bash
git add .
git commit -m "Initial commit: Jesus Youth app"
git push origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Framework preset: **Next.js** (auto-detected)
5. Click "Deploy"

**That's it!** Your app is now live at a Vercel URL.

### Step 3: Configure Custom Domain (Optional)
1. In Vercel project settings, go to "Domains"
2. Add your custom domain (e.g., jesusyouth-angamaly.com)
3. Follow DNS setup instructions

---

## Environment Variables (If Using Advanced Features Later)

No environment variables needed for current deployment!

If you add features later:
- Create `.env.local` for local development
- Add same variables in Vercel Dashboard → Settings → Environment Variables

---

## Features Currently Supported

### Working Features
✅ User authentication (email/password login)
✅ Program CRUD operations (Admin add/edit/delete)
✅ User registration for programs
✅ Program browsing and calendar view
✅ Settings page for user preferences
✅ Notification preferences (for future implementation)
✅ Data export (CSV, JSON, iCal)

### Data Storage
- All data stored in browser's localStorage
- Data persists across page reloads
- Data is local to each browser/device
- No server-side database needed

---

## Future Improvements

### Option 1: Add Backend Database (Recommended)
To add persistent data across devices:
1. Create Supabase project ([supabase.com](https://supabase.com))
2. Create tables for programs, users, registrations
3. Add Supabase environment variables to Vercel
4. Update React context to use Supabase instead of localStorage
5. Redeploy to Vercel

See `/v0_plans/prime-outline.md` for detailed schema.

### Option 2: Add Email Notifications
1. Sign up for Resend ([resend.com](https://resend.com))
2. Get API key and add to Vercel environment variables
3. Create API route `/api/notifications/send-email`
4. Implement notification scheduling

### Option 3: Add Real-time Features
1. Implement WebSocket connections for live updates
2. Add push notifications for user engagement

---

## Troubleshooting

### App shows "Loading..." then errors
**Issue**: Hydration mismatch (fixed in latest version)
**Solution**: Hard refresh browser (Ctrl+Shift+R on Windows/Linux, Cmd+Shift+R on Mac)

### Data disappears after closing browser
**Expected behavior**: localStorage is browser-specific
**Solution**: This changes after adding database backend

### Can't log in
**Issue**: Password must be correctly entered
**Note**: No email verification currently (comes with Supabase auth)

---

## Performance Optimization

Current app is already optimized:
- All data in localStorage (no network latency)
- Client-side rendering (fast page loads)
- Minimal JavaScript bundle
- No external API calls

---

## Security Notes

### Current (localStorage)
- Data stored locally, not sent to server
- Good for development/demo
- Suitable for open community data

### With Database Backend
- Add Row-Level Security (RLS) policies
- Implement proper authentication
- Use HTTPS only (Vercel provides this)
- Validate all inputs server-side

---

## Monitoring & Logging

### Vercel Deployment
- View logs: Vercel Dashboard → project → "Deployments" → "Functions"
- Enable Vercel Analytics for performance tracking
- Set up error alerts in Vercel settings

### Local Development
```bash
npm run dev
# App runs at http://localhost:3000
# Check browser console for errors
```

---

## Support

For issues:
1. Check browser console (F12) for errors
2. Hard refresh page (clear cache)
3. Clear localStorage: `localStorage.clear()` in console
4. Check `/DEPLOYMENT.md` troubleshooting section
5. Review error logs in Vercel dashboard

---

## Next Steps After Launch

1. **Week 1**: Monitor performance, gather user feedback
2. **Week 2**: Fix bugs, improve UI based on feedback
3. **Week 3**: Add database backend (Supabase)
4. **Week 4**: Implement email notifications
5. **Week 5+**: Add new features based on user requests
