# Getting Started - Jesus Youth App

## Local Development

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/jesus-youth-app.git
   cd jesus-youth-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

---

## Default Test Account

To test the app locally:

**Email**: admin@example.com
**Password**: admin123

(Admin account can add/edit programs)

---

## Project Structure

```
app/
  ├── page.tsx              # Main app component
  ├── layout.tsx            # Root layout with metadata
  ├── globals.css           # Global styles
  └── components/           # Reusable React components

lib/
  ├── types.ts              # TypeScript type definitions
  ├── storage.ts            # localStorage utilities
  ├── context.tsx           # React Context for state management
  └── export.ts             # Export utilities (CSV, JSON, iCal)

components/
  ├── ProgramCard.tsx       # Single program card
  ├── ProgramList.tsx       # List of programs
  ├── CalendarView.tsx      # Calendar grid view
  ├── AdminDashboard.tsx    # Admin panel
  ├── AuthModal.tsx         # Login/register modal
  ├── HeroSection.tsx       # Hero banner
  ├── SettingsPage.tsx      # User preferences
  └── ClientOnly.tsx        # Hydration helper

public/
  └── images/               # Static images
```

---

## Key Features to Try

### 1. Browse Programs
- Click "Home" tab to see featured programs
- Switch tabs: Daily, Weekly, Monthly, Calendar

### 2. User Registration
- Click "Sign In" button
- Register with email and phone
- Browse and register for programs

### 3. Admin Features (use test account)
- Click "👑 Admin" button (visible when logged in as admin)
- View dashboard with program counts
- Add/Edit/Delete programs
- See registrations and exports

### 4. Program Calendar
- Click "Calendar" tab
- View all recurring programs
- See weekly events in calendar format
- Export to iCal format

### 5. Settings & Preferences
- Click "⚙️" Settings button
- View your registrations
- Manage notification preferences
- Export your data

---

## Common Tasks

### Add a New Program (Admin Only)

1. Login as admin (admin@example.com / admin123)
2. Click "👑 Admin" → "Add Program"
3. Fill in:
   - Title: "Morning Meditation"
   - Category: "Daily Online"
   - Platform: "Zoom"
   - Link: "https://zoom.us/..."
   - Time: "6:00 AM IST"
4. Click "Add"

### Register for a Program (User)

1. Login as user or create account
2. Browse to any program
3. Click "Register Now"
4. Confirm registration

### Export Data

1. Click export button in header (📊)
2. Choose format: CSV, JSON, or iCal
3. File downloads to your computer

---

## Troubleshooting

### "Hydration failed" error
**Solution**: Hard refresh your browser (Ctrl+Shift+R)

### Data not persisting
**Expected**: Using localStorage - data is device-specific
**Note**: Data will persist in this browser until you clear cache

### Login not working
**Check**:
1. Email and password are correct
2. Browser console (F12) for error messages
3. Clear browser cache and try again

### Calendar not showing events
**Solution**:
1. Add some programs first
2. Refresh page
3. Make sure programs have valid times/days

---

## Development Commands

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Format code
npm run format
```

---

## Deployment

### Deploy to Vercel (Easiest)

1. Push code to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Select your GitHub repository
5. Click "Deploy"
6. Your app is live!

See `DEPLOYMENT.md` for detailed instructions.

---

## Adding Features Later

### Want to add a database?
See `DEPLOYMENT.md` → "Future Improvements" → "Option 1: Add Backend Database"

### Want to add email notifications?
See `DEPLOYMENT.md` → "Future Improvements" → "Option 2: Add Email Notifications"

### Want to customize the design?
1. Edit color scheme in `app/globals.css`
2. Modify component styles in individual `.tsx` files
3. Use Tailwind CSS classes

---

## Need Help?

1. Check the README.md in project root
2. Review `DEPLOYMENT.md` for deployment issues
3. Check browser console for error details (F12)
4. Clear localStorage: `localStorage.clear()` in console

---

## Next Steps

- [ ] Run locally and test features
- [ ] Deploy to Vercel
- [ ] Share with Jesus Youth team
- [ ] Gather feedback
- [ ] Plan Phase 2: Database backend + emails
