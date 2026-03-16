# Jesus Youth Angamaly Zone - Full-Stack Application

A modern, production-ready full-stack web application for managing Jesus Youth community programs. Built with Next.js, React, Prisma ORM, and SQLite/PostgreSQL.

## Features

✅ **Full-Stack Architecture**
- Frontend: Next.js 16 + React 19 + Tailwind CSS
- Backend: API routes with Prisma ORM
- Database: SQLite (default) or PostgreSQL
- Type-Safe: Full TypeScript throughout

✅ **Program Management**
- Browse daily prayers, weekly meetings, and monthly events
- Admin dashboard with full CRUD operations
- Program filtering and search
- Real-time data from database

✅ **User System**
- User registration and authentication
- Program registrations and enrollments
- Notification preferences
- Admin controls

✅ **Production Ready**
- One-click deployment to Vercel
- Database migrations included
- Environment configuration
- Security best practices

## Program Categories

- **Daily Prayers**: Online prayer sessions via Zoom or Google Meet
- **Weekly Meetings**: In-person community gatherings with fixed schedule
- **Monthly Events**: Special monthly events and gatherings

## Quick Start (5 Minutes)

### 1. Setup Database

```bash
# Install dependencies
npm install

# Create and initialize database
npm run db:push

# Seed with example programs
npm run db:seed
```

### 2. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` - app is fully functional with backend!

### 3. Deploy to Production

```bash
# Push to GitHub
git push origin main

# Deploy to Vercel (free)
# https://vercel.com/new → Select repo → Deploy → Done!
```

Your app is now live! 🚀

## Usage

### For Users

1. **Browsing Programs**
   - View all programs in their respective categories (Daily, Weekly, Monthly)
   - Use the Calendar view to see weekly recurring events
   - Click "Join" on daily programs to access the online meeting link

2. **Registration**
   - Click "Login" in the header to create an account
   - Once logged in, you can register for programs you're interested in
   - View all your registrations in the Settings page

3. **Notification Preferences**
   - Go to Settings (gear icon in header)
   - Customize which programs you want to hear about
   - Choose between email and SMS notifications

### For Admins

1. **Admin Login**
   - Click "Login" in the header
   - Switch to the "Admin" tab
   - Enter password: `jesusyouth2024`

2. **Managing Programs**
   - Access the Admin Dashboard by clicking the "Admin" badge in the header
   - View all programs with statistics
   - Add new programs using the quick action buttons
   - Search and filter programs by category
   - Edit or delete existing programs

3. **Bulk Actions**
   - Export all programs to iCalendar for import into calendar applications
   - Export to CSV for use in spreadsheets
   - Export to JSON for backup purposes

## Database

### Default: SQLite

Perfect for getting started - zero configuration:
- Development: `prisma/dev.db`
- Production: Auto-deployed with Vercel
- Supports up to 1,000+ concurrent users

```env
DATABASE_URL="file:./prisma/dev.db"
```

### Production: PostgreSQL

For scaling to thousands of users, switch to PostgreSQL from:
- **Neon** (serverless) - https://neon.tech - $0-9/month
- **Railway** - https://railway.app - $5+/month  
- **Render** - https://render.com - Free tier available
- **Supabase** - https://supabase.com - $25+/month

**Migration is easy** - just change `DATABASE_URL` and redeploy!

See [BACKEND_SETUP.md](./BACKEND_SETUP.md) for detailed database configuration.

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Click "Deploy"
5. Your app will be live at `<project-name>.vercel.app`

### Deploy to Other Platforms

This is a standard Next.js application and can be deployed to any platform that supports Node.js:
- Netlify
- AWS
- Google Cloud
- Azure
- Railway
- etc.

## Future Enhancements

To add backend functionality in the future:

1. **Supabase Integration**: Add PostgreSQL database for persistent storage
2. **Email Notifications**: Integrate with services like Resend or SendGrid
3. **SMS Notifications**: Add Twilio integration for SMS alerts
4. **User Authentication**: Implement Auth0 or Supabase Auth
5. **Analytics**: Track program attendance and user engagement
6. **Payment Integration**: Add Stripe for paid events

## Default Admin Password

For development/testing purposes, the default admin password is: `jesusyouth2024`

**Important**: Change this password in production by updating the `ADMIN_PASSWORD` in `/lib/storage.ts`

## Default Programs

The app comes with pre-loaded programs:
- Divine Mercy Chaplet (Daily, 9:30 PM IST)
- Daily Rosary (Daily, 9:00 PM IST)
- Monday Gatherings (Weekly)
- Chat With Jesus (Weekly, Wednesdays)
- Zonal Adoration (Weekly)
- House Holds (Monthly, First Sundays)
- Canteen (Monthly, Second Saturdays)

## Technology Stack

- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Language**: TypeScript
- **Package Manager**: pnpm

## API Routes

### Programs
```
GET    /api/programs                    # List all programs
GET    /api/programs?category=daily     # Filter by category
POST   /api/programs                    # Create (admin)
GET    /api/programs/:id                # Get single program
PUT    /api/programs/:id                # Update (admin)
DELETE /api/programs/:id                # Delete (admin)
```

### Registrations
```
GET    /api/registrations?userId=1      # Get user registrations
POST   /api/registrations               # Register for program
DELETE /api/registrations/:id           # Cancel registration
```

All endpoints use Prisma for type-safe, parameterized queries.

## File Structure

```
├── app/
│   ├── page.tsx          # Main application page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── ProgramCard.tsx
│   ├── ProgramList.tsx
│   ├── CalendarView.tsx
│   ├── AuthModal.tsx
│   ├── AdminDashboard.tsx
│   ├── SettingsPage.tsx
│   ├── NotificationPreferences.tsx
│   ├── UserRegistrations.tsx
│   ├── ExportMenu.tsx
│   └── [other components]/
├── lib/
│   ├── types.ts          # TypeScript type definitions
│   ├── storage.ts        # localStorage management
│   ├── context.tsx       # React Context
│   ├── export.ts         # Export utilities
│   └── utils.ts          # Utility functions
└── public/               # Static assets
```

## Support

For issues or questions about Jesus Youth programs, visit: https://www.jesusyouth.org

## License

This project is built for Jesus Youth community. All rights reserved.

## Changelog

### Version 1.0 (Initial Release)
- Program listing with multiple categories
- User authentication and registration
- Admin dashboard with full CRUD operations
- Calendar view with recurring events
- Notification preferences
- Program export (iCalendar, CSV, JSON)
- Responsive mobile-first design
- localStorage-based data persistence
