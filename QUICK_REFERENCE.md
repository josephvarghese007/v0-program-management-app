# Quick Reference Card

## Essential Commands

```bash
# Development
npm run dev              # Start dev server → localhost:3000
npm run build           # Build for production
npm start              # Run production server

# Database
npm run db:push        # Sync schema to database
npm run db:migrate     # Create migration
npm run db:seed        # Populate with example data
npm run db:studio      # Open Prisma Studio (GUI)

# Cleanup
npm run lint           # Check code quality
rm -rf .next          # Clear cache
rm prisma/dev.db      # Delete database
```

---

## File Locations

| Task | File |
|------|------|
| Add/edit programs | `prisma/schema.prisma` → Program table |
| Database config | `.env.local` → DATABASE_URL |
| API routes | `app/api/programs/` |
| Frontend | `app/page.tsx`, `components/` |
| Styles | `app/globals.css` |
| Database seed | `scripts/init-db.ts` |

---

## Environment Variables

```bash
# Copy template
cp .env.example .env.local

# Edit
DATABASE_URL="file:./prisma/dev.db"          # SQLite (default)
DATABASE_URL="postgresql://..."              # PostgreSQL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## API Endpoints

```bash
# Programs
curl http://localhost:3000/api/programs
curl http://localhost:3000/api/programs/1
curl -X POST http://localhost:3000/api/programs \
  -H "Content-Type: application/json" \
  -d '{"title":"...","category":"daily",...}'

# Registrations
curl "http://localhost:3000/api/registrations?userId=1"
curl -X POST http://localhost:3000/api/registrations \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"programId":1}'
```

---

## Database Schema

```sql
Program {
  id, title, category, icon, type, link, platform,
  time, venue, day, occurrence, note, description,
  createdAt, updatedAt
}

User {
  id, name, email, phone, password, isAdmin,
  createdAt, updatedAt
}

Registration {
  id, userId, programId, createdAt
}

Subscription {
  id, userId, category, createdAt
}
```

---

## Deployment Checklist

- [ ] Test locally: `npm run dev`
- [ ] Build: `npm run build` (checks for errors)
- [ ] Commit: `git add . && git commit -m "..."`
- [ ] Push: `git push origin main`
- [ ] Deploy: Vercel → Import Project → Deploy

---

## Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| `Database not found` | `npm run db:push && npm run db:seed` |
| `Port 3000 in use` | `npm run dev -- -p 3001` |
| `Build fails` | Check `.env.local` exists, run `npm install` |
| `Migration conflicts` | `rm -rf prisma/migrations && npm run db:migrate` |
| `Data lost` | Database reset - reimport backup or reseed |

---

## Switching Databases

### SQLite → PostgreSQL

```bash
# 1. Create PostgreSQL (use Neon, Railway, etc.)
# 2. Update .env.local
DATABASE_URL="postgresql://user:password@host:5432/db"

# 3. Deploy
npm run build
git push origin main
```

---

## Testing Locally

```bash
# Check API response
curl http://localhost:3000/api/programs | jq

# View database
npm run db:studio

# Check build
npm run build && npm start
```

---

## Project Structure Quick Look

```
src/
├── app/
│   ├── api/programs/[id]/route.ts    # Program detail endpoint
│   ├── api/programs/route.ts         # Programs list endpoint
│   ├── api/registrations/[id]/route.ts
│   ├── api/registrations/route.ts
│   ├── page.tsx                       # Main page
│   └── layout.tsx                     # Root layout
├── components/                        # React components
├── lib/
│   ├── db.ts                         # Prisma client
│   └── types.ts                      # TypeScript types
├── prisma/
│   ├── schema.prisma                 # Database schema
│   ├── migrations/                   # Migration files
│   └── dev.db                        # SQLite (auto-created)
└── public/                           # Static files
```

---

## Performance Tips

```bash
# Check build size
npm run build  # Look for optimized output

# Analyze performance
npm run dev    # Check Chrome DevTools

# Database optimization
npm run db:studio  # View indexes and query performance
```

---

## Deployment Platforms

| Platform | Command | Free Tier |
|----------|---------|-----------|
| **Vercel** | Push to GitHub | ✅ Yes |
| **Railway** | Connect GitHub | ✅ Yes |
| **Render** | Connect GitHub | ✅ Yes |
| **Netlify** | Connect GitHub | ✅ Yes |

---

## Documentation

- `README.md` - Project overview
- `BACKEND_SETUP.md` - Database details
- `FULL_DEPLOYMENT_GUIDE.md` - Deployment options
- `QUICK_START.md` - 5-minute setup
- `ARCHITECTURE.md` - System design

---

## Quick Deploy (1 minute)

```bash
git add .
git commit -m "Ready"
git push origin main
# Go to vercel.com/new → Deploy
```

Done! Your app is live! 🚀

---

**Need help?** Check the documentation files or GitHub issues.
