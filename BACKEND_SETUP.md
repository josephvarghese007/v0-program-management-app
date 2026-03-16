# Backend Setup Guide

This application uses **Prisma ORM** with **SQLite** as the default database for simplicity, but can be easily switched to PostgreSQL for production.

## Quick Start (5 minutes)

### 1. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 2. Setup Database

```bash
# Create and initialize SQLite database
npm run db:push

# Seed with initial programs
npm run db:seed
```

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` - the app is now fully functional with backend!

---

## Architecture

### Database Schema

The application uses 4 main tables:

1. **Program** - Event/program information (daily prayers, weekly meetings, monthly events)
2. **User** - User accounts with admin flag
3. **Registration** - User registrations for programs
4. **Subscription** - User notification preferences by category

### API Endpoints

#### Programs
- `GET /api/programs` - List all programs (with optional `?category=` filter)
- `POST /api/programs` - Create new program (admin only)
- `GET /api/programs/:id` - Get single program
- `PUT /api/programs/:id` - Update program (admin only)
- `DELETE /api/programs/:id` - Delete program (admin only)

#### Registrations
- `GET /api/registrations?userId=X` - Get user's registrations
- `POST /api/registrations` - Register for a program
- `DELETE /api/registrations/:id` - Cancel registration

---

## Database Configuration

### SQLite (Default - Development)

SQLite is configured by default and requires **zero setup**:

```env
DATABASE_URL="file:./prisma/dev.db"
```

**Pros:**
- No external database needed
- Works locally and in production
- Perfect for small to medium apps
- Auto-scaling on Vercel

**Cons:**
- Limited concurrent users
- No advanced features

### PostgreSQL (Recommended for Production)

Switch to PostgreSQL for better scalability:

```env
DATABASE_URL="postgresql://user:password@host:5432/jesus_youth"
```

**Free PostgreSQL Options:**
- **Neon** (serverless) - https://neon.tech
- **Railway** - https://railway.app
- **Render** - https://render.com
- **Supabase** - https://supabase.com

### MySQL Alternative

```env
DATABASE_URL="mysql://user:password@host:3306/jesus_youth"
```

---

## Database Commands

### Development

```bash
# View database in Prisma Studio (GUI)
npm run db:studio

# Create new migration
npm run db:migrate

# Push schema to database (SQLite only)
npm run db:push
```

### Production

```bash
# Apply migrations
npm run build  # Includes prisma migrate deploy

# The build command automatically runs migrations
```

---

## Deployment

### Vercel + SQLite

The simplest deployment option:

1. Push code to GitHub
2. Connect to Vercel
3. Deploy - that's it!

SQLite database file is created automatically.

### Vercel + PostgreSQL

1. Create PostgreSQL database (use Neon, Railway, etc.)
2. Set `DATABASE_URL` environment variable in Vercel
3. Push to GitHub and deploy

### Environment Variables

Set in Vercel dashboard under "Settings > Environment Variables":

```
DATABASE_URL=your_database_url
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

---

## Monitoring & Maintenance

### Check Database Health

```bash
# Connect to database
npm run db:studio
```

### Backup Database (SQLite)

```bash
# Just copy the database file
cp prisma/dev.db prisma/dev.db.backup
```

### Reset Database

```bash
# Remove database and restart
rm prisma/dev.db
npm run db:push
npm run db:seed
```

---

## Scaling

### When to Upgrade Databases

| Apps | Users | Programs | Recommendation |
|------|-------|----------|-----------------|
| MVP | < 100 | < 50 | SQLite ✓ |
| Small | 100-1K | 50-500 | SQLite or PostgreSQL |
| Medium | 1K-10K | 500-5K | PostgreSQL ✓ |
| Large | 10K+ | 5K+ | PostgreSQL + Caching |

### Migration Path

SQLite → PostgreSQL is a one-command process:

```bash
# 1. Export SQLite data
sqlite3 prisma/dev.db .dump > backup.sql

# 2. Change DATABASE_URL to PostgreSQL
# 3. Run migrations
npm run build

# 4. Done!
```

---

## Troubleshooting

### "Database file not found"

```bash
npm run db:push
npm run db:seed
```

### "Cannot connect to database"

Check `DATABASE_URL` in `.env`:
```bash
cat .env | grep DATABASE_URL
```

### "Port already in use"

```bash
npm run dev -- -p 3001
```

### "Migration conflicts"

```bash
# Reset and start fresh
rm prisma/migrations
npm run db:migrate
```

---

## Security Notes

- Never commit `.env` file (use `.env.example`)
- Use strong passwords for PostgreSQL
- Enable SSL for remote databases
- Rotate API keys regularly
- Use Prisma's parameterized queries (built-in)

---

## Next Steps

1. ✓ Database is ready
2. Implement authentication (see AUTH_SETUP.md)
3. Add email notifications (see NOTIFICATIONS.md)
4. Setup monitoring (see MONITORING.md)
5. Configure backups (see BACKUPS.md)
