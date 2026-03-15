# Jesus Youth Angamaly Zone Programs

A modern web application for managing and discovering Jesus Youth community programs in the Angamaly Zone. Features include daily prayers, weekly meetings, monthly events, user registration, and more.

## Features

- **Program Management**: Browse daily prayers, weekly meetings, and monthly events
- **User Registration**: Sign up and register for programs you're interested in
- **Calendar View**: Interactive calendar showing recurring weekly events
- **Admin Dashboard**: Manage programs with full CRUD operations
- **Notification Preferences**: Users can customize how they want to receive updates
- **Event Export**: Export programs to iCalendar (.ics), CSV, or JSON formats
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Data Persistence**: All data stored locally (localStorage) with no backend required

## Program Categories

- **Daily Prayers**: Online prayer sessions via Zoom or Google Meet
- **Weekly Meetings**: In-person community gatherings with fixed schedule
- **Monthly Events**: Special monthly events and gatherings

## Getting Started

### Installation

```bash
# 1) Clone
git clone <your-repo-url>
cd v0-program-management-app

# 2) Install dependencies
npm install

# 3) Configure environment
cp .env.example .env.local

# 4) Start development server
npm run dev
```

The app will be available at `http://localhost:3000`.

### Environment Setup

Use `.env.example` as a template.

```bash
cp .env.example .env.local
```

- `NEXT_PUBLIC_ADMIN_PASSWORD` - admin login password used by the app UI (defaults to `jesusyouth2024` if unset).

The app uses localStorage for data persistence.

## Super Simple Verification (for non-technical users)

If you just want to confirm everything works:

```bash
npm run verify:local
```

This command will install dependencies, run type checks, build the app, start it, and verify `/api/health`.

For full beginner instructions, see [QUICKSTART_FOR_BEGINNERS.md](./QUICKSTART_FOR_BEGINNERS.md).

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

## Data Storage

All data is stored in the browser's localStorage:
- Programs (default programs provided)
- User accounts and profiles
- Program registrations
- Notification preferences
- Subscriptions

To reset all data, clear your browser's localStorage for this site.

## Deployment

### Option A: Docker (recommended for VPS)

```bash
cp .env.example .env
docker compose up -d --build
```

- App URL: `http://<server-ip>:3000`
- Health URL: `http://<server-ip>:3000/api/health`

### Option B: Node.js process

```bash
npm install
cp .env.example .env.local
npm run build
npm run start
```

### Full deployment playbook

For GitHub-to-VPS steps, reverse proxy notes, and production checklist, see [DEPLOYMENT.md](./DEPLOYMENT.md).

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

**Important**: Change this in production using `NEXT_PUBLIC_ADMIN_PASSWORD` in your `.env` file or deployment environment variables.

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

Currently all data is client-side. In a future backend-integrated version, the following API routes would be available:

- `POST /api/programs` - Create program
- `GET /api/programs` - Get all programs
- `PATCH /api/programs/[id]` - Update program
- `DELETE /api/programs/[id]` - Delete program
- `POST /api/registrations` - Register for program
- `GET /api/users/registrations` - Get user registrations
- `POST /api/notifications/send` - Send notifications

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
