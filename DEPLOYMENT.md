# Deployment Guide (GitHub + VPS + Docker)

This project is designed to be **easy to clone, run, and deploy**.

## 1) Quick local run

```bash
git clone <your-repo-url>
cd v0-program-management-app
npm install
cp .env.example .env.local
npm run dev
```

App: `http://localhost:3000`

## 2) Production run (without Docker)

```bash
npm install
cp .env.example .env.local
npm run build
npm run start
```

## 3) One-command Docker deployment

```bash
cp .env.example .env
docker compose up -d --build
```

App: `http://<server-ip>:3000`

Health check: `http://<server-ip>:3000/api/health`

## 4) VPS deployment checklist

1. Install Docker + Docker Compose plugin.
2. Clone repo to VPS.
3. Create `.env` from `.env.example` and set a secure admin password.
4. Run `docker compose up -d --build`.
5. Put Nginx/Caddy in front (optional but recommended for TLS/domain).

## 5) Important security note

Current auth/authorization is **client-side only** (localStorage based) and should be treated as community/internal-grade auth.
For a true SaaS-grade multi-tenant security model, migrate to:
- server-side auth (NextAuth/Auth0/Supabase Auth)
- server-side database (Postgres)
- RBAC/tenant isolation
- audited API authorization checks
