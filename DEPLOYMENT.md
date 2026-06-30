# Deployment Guide

This guide covers two things, in order:

1. **Pushing the project to GitHub**
2. **Hosting it live, 100% free** — frontend on Vercel, backend (Laravel API + MySQL) on a free-tier host

> Vercel does not run PHP/Laravel servers — it's built for static sites and serverless JS functions. So we deploy the **React frontend to Vercel** and the **Laravel API to Render** (or Railway), both of which have free tiers. This is the standard, recommended pairing for a Laravel + React project and costs $0.

---

## Part 1 — Push to GitHub

### 1. Create the repository
Go to [github.com/new](https://github.com/new), name it `codebricks`, leave it empty (no README/.gitignore — we already have ours), and create it.

### 2. Initialize and push locally

```bash
cd codebricks

git init
git add .
git commit -m "Initial commit: CodeBricks — Laravel + React UI snippet platform"
git branch -M main
git remote add origin https://github.com/<your-username>/codebricks.git
git push -u origin main
```

### 3. Double-check secrets are NOT committed
Open `.gitignore` and confirm `.env` is listed (it already is). Never commit your real `.env` — only `.env.example` should be in the repo.

```bash
git status   # .env should NOT appear here
```

---

## Part 2 — Deploy the Backend (Laravel API)

We'll use **Render** (free tier, supports PHP + MySQL natively). Railway is an equally good free alternative — steps are nearly identical.

### Option A: Render (recommended)

1. Go to [render.com](https://render.com) → sign up with GitHub.
2. **New → PostgreSQL or MySQL**: Render's free tier offers PostgreSQL natively; for MySQL, use Render's free **"Railway"-style** add-on or switch to PlanetScale (see below) — *or* simply set `DB_CONNECTION=pgsql` in `.env` and Laravel works identically with PostgreSQL. (Recommended: use PlanetScale for MySQL, see step 4.)
3. **New → Web Service** → connect your `codebricks` GitHub repo.
4. **Database**: Create a free MySQL database on [PlanetScale](https://planetscale.com) (generous free tier, zero-downtime migrations). Copy the connection string it gives you.
5. Configure the Web Service:
   - **Environment**: PHP
   - **Build Command**:
     ```bash
     composer install --no-dev --optimize-autoloader && php artisan config:cache && php artisan migrate --force && php artisan db:seed --force
     ```
   - **Start Command**:
     ```bash
     php artisan serve --host 0.0.0.0 --port $PORT
     ```
   - **Environment Variables** (Render dashboard → Environment tab):
     ```
     APP_NAME=CodeBricks
     APP_ENV=production
     APP_KEY=                      # leave blank, see step 6 below
     APP_DEBUG=false
     APP_URL=https://your-api.onrender.com

     DB_CONNECTION=mysql
     DB_HOST=<from PlanetScale>
     DB_PORT=3306
     DB_DATABASE=<from PlanetScale>
     DB_USERNAME=<from PlanetScale>
     DB_PASSWORD=<from PlanetScale>

     JWT_SECRET=                   # leave blank, see step 6 below
     JWT_TTL=60
     JWT_REFRESH_TTL=20160

     CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app

     FILESYSTEM_DISK=local
     CACHE_STORE=database
     SESSION_DRIVER=database
     QUEUE_CONNECTION=database
     ```

6. **Generate `APP_KEY` and `JWT_SECRET` locally**, then paste the values into Render's env vars (Render's shell access on free tier is limited, so generate locally):
   ```bash
   php artisan key:generate --show       # copy the output into APP_KEY
   php artisan tinker --execute="echo bin2hex(random_bytes(32));"   # copy into JWT_SECRET
   ```
7. Click **Deploy**. Render will build, migrate, and seed automatically (including your super admin).
8. Your API is now live at `https://your-api.onrender.com/api/v1`.

> **Free tier note:** Render's free web services spin down after inactivity and take ~30s to wake on the next request. This is fine for a learning/portfolio project; upgrade to a paid instance later if you need always-on uptime.

### Option B: Railway (alternative)
Railway's flow is nearly identical: connect GitHub repo → it auto-detects PHP → add a MySQL plugin (one click, free tier included) → set the same environment variables as above → deploy. Railway's free tier includes usage-based credits rather than a sleep/wake cycle.

---

## Part 3 — Deploy the Frontend (Vercel)

1. Go to [vercel.com](https://vercel.com) → sign up with GitHub.
2. **Add New → Project** → import your `codebricks` repo.
3. **Root Directory**: set this to `frontend` (important — Vercel needs to know the React app isn't at the repo root).
4. **Framework Preset**: Vite (Vercel auto-detects this).
5. **Build Command**: `npm run build` (default, leave as-is).
6. **Output Directory**: `dist` (default for Vite, leave as-is).
7. **Environment Variables**: none required by default since `frontend/vite.config.js` proxies `/api` only in **local dev**. For production, the React app calls relative `/api/v1/...` paths — so you need Vercel to forward those to your Render API. Add a `frontend/vercel.json`:

   ```json
   {
     "rewrites": [
       { "source": "/api/:path*", "destination": "https://your-api.onrender.com/api/:path*" }
     ]
   }
   ```

   This makes `https://your-frontend.vercel.app/api/v1/sections` transparently proxy to your Render-hosted Laravel API — no CORS headaches, no hardcoded API URLs in the React code.

8. Click **Deploy**. Vercel builds and gives you a live URL like `https://codebricks.vercel.app`.

9. **Go back to Render** and update `CORS_ALLOWED_ORIGINS` to your real Vercel URL (from step 8), then redeploy the backend so it accepts requests from your live frontend.

---

## Part 4 — Verify Everything Works

1. Visit your Vercel URL.
2. Login with `rohit@xyz.com` / `Pass@word1` → you should land on `/admin/dashboard` with real stats.
3. Logout, register a new normal account → browse a section → open a design → confirm the live preview renders, the customizer changes colors instantly, and **Download ZIP** gives you a working `index.html`.
4. Open `docs/CodeBricks.postman_collection.json` in Postman, change `base_url` to your live Render URL, and run a few requests to confirm the API responds correctly in production too.

---

## Updating the Live Site Later

Both Vercel and Render auto-deploy on every `git push` to `main` by default:

```bash
git add .
git commit -m "Add 10 more button designs"
git push
```

Render rebuilds and re-migrates the API; Vercel rebuilds the frontend. No manual redeploy steps needed.

---

## Free-Tier Cost Summary

| Service | What it hosts | Free tier limit |
|---|---|---|
| Vercel | React frontend | Generous free tier, unlimited personal projects |
| Render | Laravel API | Free web service (sleeps after inactivity) |
| PlanetScale | MySQL database | Free tier with generous storage/row limits |
| GitHub | Source code + CI | Free for public (and private) repos |

**Total cost: $0/month** for a learning project or portfolio piece. Upgrade any single piece later if traffic grows.
