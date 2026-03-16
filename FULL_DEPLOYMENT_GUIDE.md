# Complete Deployment Guide - Jesus Youth App

This guide covers deploying the app with backend database to production.

## What You're Deploying

- **Frontend**: Next.js with React
- **Backend**: API routes with database
- **Database**: SQLite (default) or PostgreSQL
- **Hosting**: Vercel (free tier available)

---

## Option 1: Deploy to Vercel (Easiest - 5 minutes)

### Prerequisites
- GitHub account
- Code pushed to GitHub
- Vercel account (free signup at vercel.com)

### Step 1: Push to GitHub

```bash
# If not already done
git add .
git commit -m "Jesus Youth app with backend"
git push origin main
```

### Step 2: Deploy to Vercel

1. Go to https://vercel.com/new
2. Click "Import Project"
3. Select your GitHub repository
4. Click "Deploy"
5. Wait ~1 minute for deployment

**That's it!** Your app is live at `your-project.vercel.app`

### Step 3: Configure Environment (Optional for PostgreSQL)

If using PostgreSQL:
1. In Vercel dashboard, go to Settings > Environment Variables
2. Add `DATABASE_URL=your_postgres_url`
3. Redeploy

---

## Option 2: Deploy to Vercel with PostgreSQL (Production)

### Why PostgreSQL?
- Better for production
- Supports more users
- More reliable backups
- Better monitoring tools

### Step 1: Create PostgreSQL Database

Choose one of these free/cheap options:

#### Option A: Neon (Recommended - Serverless PostgreSQL)

1. Go to https://neon.tech
2. Sign up with GitHub
3. Create new project
4. Copy connection string: `postgresql://...`
5. In Vercel Settings, add `DATABASE_URL=<your_connection_string>`

#### Option B: Railway (Simple & Fast)

1. Go to https://railway.app
2. Sign up with GitHub
3. Create new PostgreSQL project
4. Click "Connect"
5. Copy connection string
6. Add to Vercel as `DATABASE_URL`

#### Option C: Render (Free Tier)

1. Go to https://render.com
2. Create PostgreSQL database
3. Copy internal connection string (not external)
4. Add to Vercel as `DATABASE_URL`

### Step 2: Deploy with Vercel

```bash
# Ensure code is pushed
git push origin main
```

1. Go to Vercel dashboard
2. Select your project
3. Settings > Environment Variables
4. Add: `DATABASE_URL=your_database_url`
5. Click "Deploy" button
6. Done!

---

## Option 3: Docker Deployment (Advanced)

### Deploy to Railway with Docker

1. Create `Dockerfile`:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

2. Create `.dockerignore`:

```
node_modules
.next
.git
.env
```

3. Push to GitHub
4. In Railway, click "New Project" > "Deploy from GitHub"
5. Select your repo
6. Add environment variables
7. Railway automatically detects and deploys!

---

## Option 4: Self-Hosted (DigitalOcean, AWS, etc.)

### Using DigitalOcean App Platform

1. Push code to GitHub
2. Go to DigitalOcean > Apps
3. Click "Create App"
4. Select GitHub repo
5. Configure environment variables
6. Deploy!

### Using AWS EC2

1. Create EC2 instance (t3.micro free tier eligible)
2. SSH into instance
3. Clone your GitHub repo
4. Run setup:

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs npm

# Install PM2 for process management
sudo npm i -g pm2

# Setup app
git clone your-repo
cd your-repo
npm install
npm run build

# Start with PM2
pm2 start npm --name "jesus-youth" -- start
pm2 startup
pm2 save
```

5. Setup nginx as reverse proxy
6. Configure SSL with Let's Encrypt

---

## Database Selection Guide

| Database | Cost | Setup | Users | Best For |
|----------|------|-------|-------|----------|
| SQLite | $0 | 5 min | <1K | MVP, Testing, Hobby |
| Neon PostgreSQL | Free-$9 | 5 min | 1K-100K | Production Startup |
| Railway PostgreSQL | $5 | 5 min | 1K-100K | Production |
| AWS RDS | $0-50+ | 15 min | 10K+ | Enterprise |
| Supabase | Free-$25 | 5 min | 1K-100K | Full-stack + Auth |

---

## Post-Deployment

### 1. Verify Database

```bash
# Check Prisma Studio (local only)
npm run db:studio

# Or check through your database provider's dashboard
```

### 2. Seed Data

The app comes pre-seeded with 8 example programs.

To add more:
1. Use admin panel in app (if UI implemented)
2. Or use Prisma Studio: `npm run db:studio`

### 3. Setup Monitoring

#### For Vercel

Go to Settings > Monitoring to view:
- Request metrics
- Error rates
- Response times
- Function duration

#### For Database

- **Neon**: Dashboard shows connections, queries, performance
- **Railway**: Built-in monitoring for CPU, memory, database
- **AWS RDS**: CloudWatch for detailed metrics

### 4. Backups

#### SQLite
- Vercel automatically backs up to their system
- Manual: Keep `.db` file in git history (exclude from repo)

#### PostgreSQL
- **Neon**: Automatic backups included
- **Railway**: Automatic snapshots
- **AWS**: Configure backup retention period

---

## Domain Configuration

### Add Custom Domain to Vercel

1. In Vercel dashboard, go to Project Settings > Domains
2. Add your domain (e.g., `jesusyouth.org`)
3. Follow DNS setup instructions
4. Wait for DNS propagation (5-24 hours)
5. Configure SSL (automatic with Vercel)

### Update .env Variables

After getting your domain:

```env
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

Redeploy for changes to take effect.

---

## Monitoring & Maintenance

### Regular Tasks

- **Daily**: Monitor error logs
- **Weekly**: Check database size
- **Monthly**: Review analytics, plan improvements

### Warning Signs

- High response times (>1s) → Optimize queries
- Database size growing fast → Implement cleanup
- High error rate → Check logs for issues

### Scaling

When you hit limits:
1. SQLite → PostgreSQL (follow migration guide in BACKEND_SETUP.md)
2. Add caching (Redis)
3. Implement CDN (Vercel edge network)
4. Database optimization (indexing)

---

## Troubleshooting

### "Database connection failed"

Check:
```bash
# Verify DATABASE_URL is set
echo $DATABASE_URL

# Test connection locally
npm run db:studio
```

### "Build fails on deploy"

1. Check build logs in Vercel
2. Common causes:
   - Missing environment variable
   - TypeScript error
   - Missing migration

### "App runs slow"

1. Check database queries
2. Review Vercel analytics
3. Enable caching if needed

### "Out of database connections"

SQLite: Upgrade to PostgreSQL
PostgreSQL: Increase connection pool or use PgBouncer

---

## Rollback

If something breaks after deployment:

### Vercel
1. Go to Deployments tab
2. Click "..." on previous working version
3. Click "Promote to Production"

### Database
1. Use provider's rollback feature
2. Or restore from backup
3. Redeploy app

---

## Security Checklist

- [ ] Environment variables set in production
- [ ] Database URL uses environment variable (not hardcoded)
- [ ] SSL/HTTPS enabled (automatic with Vercel)
- [ ] API routes validate input
- [ ] Admin password changed from default
- [ ] Database backups configured
- [ ] Error logs reviewed regularly

---

## Next Steps

1. ✓ Backend is deployed
2. Implement authentication
3. Add email/SMS notifications
4. Setup monitoring and alerts
5. Configure automated backups
6. Performance optimization

---

## Support

For issues:

1. **Vercel**: https://vercel.com/help
2. **Prisma**: https://www.prisma.io/docs
3. **Your database provider's docs**: Neon, Railway, etc.
4. **GitHub Issues**: If using open source components

---

## Cost Summary (Monthly)

| Component | Free Tier | Paid Tier |
|-----------|-----------|-----------|
| Hosting (Vercel) | ✓ Included | $20+/month |
| Database (SQLite) | ✓ Included | N/A |
| Database (PostgreSQL) | Neon $0-9 | $9+/month |
| Email (Resend) | $0 (10/day) | $0.2 per email |
| SMS (Twilio) | $0 | $0.01 per SMS |
| Domain | $0 | $8-15/year |
| **Total (Minimal)** | **$0** | **$20/month** |

---

Congratulations! Your Jesus Youth app is now production-ready! 🚀
