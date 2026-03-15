# Beginner Guide: Verify and Deploy This App

If you are new, follow this exactly.

## A) Verify locally (copy-paste)

```bash
git clone <your-repo-url>
cd v0-program-management-app
cp .env.example .env.local
npm run verify:local
```

If successful, you'll see a ✅ message and a health JSON response.

## B) Run locally for normal use

```bash
npm run dev
```

Open: http://localhost:3000

## C) Deploy to VPS (Docker)

On your VPS:

```bash
git clone <your-repo-url>
cd v0-program-management-app
cp .env.example .env
# edit .env and set NEXT_PUBLIC_ADMIN_PASSWORD
npm run deploy:vps
```

Then open: `http://<your-vps-ip>:3000`

Health check: `http://<your-vps-ip>:3000/api/health`

## D) What to verify in the UI

1. Home page loads and shows tabs (Home, Daily, Weekly, Monthly, Calendar).
2. Sign in as user works.
3. Admin login works with configured password.
4. Add/Edit/Delete program works in Admin dashboard.
5. Export menu downloads iCalendar/CSV/JSON.

## E) Important limitation (current version)

Authentication and data are browser-local (`localStorage`).
That means this is not yet true multi-tenant SaaS auth.
For enterprise-grade SaaS, migrate auth and data to backend services.
