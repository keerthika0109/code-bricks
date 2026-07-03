# CodeBricks — What Was Changed

## 1. Live Thumbnail Fix (the main issue)

### `frontend/src/components/design/DesignCard.jsx`
- **Before**: showed "Preview unavailable" for every card because `design.thumbnail` was always `null`
- **After**: renders a real **live scaled-down iframe** (`SnippetThumbnail` component) using the snippet's own HTML + CSS. The iframe is rendered at 1200×675 px and CSS-scaled to fill the card's 16:9 thumbnail area — so every design looks exactly as it would in a browser. A "View Design" hover overlay is also added.

### `app/Http/Resources/DesignResource.php`
- Added `snippet_html` and `snippet_css` fields to the list API response. Each snippet is tiny (~100–1000 bytes), so including them inline adds negligible payload. The `DesignCard` reads these to power the iframe thumbnail without any extra API call.

---

## 2. Deployment Files (free open-source hosting)

### `frontend/vercel.json` ← **new file**
- Configures Vercel to proxy `/api/*` requests to your Render backend. Without this, the frontend would hit CORS errors in production. Replace `YOUR-API.onrender.com` with your real Render URL after first deploy.

### `render.yaml` ← **new file**
- One-click Render deployment: defines the Laravel web service + a free MySQL database. Render reads this file automatically — just connect your GitHub repo and click Deploy.

### `.github/workflows/ci.yml` ← **updated**
- Added a `frontend-build` job that runs `npm ci && npm run build` on every push, so broken frontend builds are caught in CI before they reach production.

---

## Deployment Steps (summary)

1. Push the project to GitHub (`git init && git add . && git commit -m "init" && git push`)
2. **Backend**: Go to render.com → New → Blueprint → connect repo → `render.yaml` auto-provisions the API + MySQL DB
3. **Frontend**: Go to vercel.com → New Project → import repo → set Root Directory = `frontend` → deploy
4. Update `vercel.json` with your Render URL, update `CORS_ALLOWED_ORIGINS` on Render with your Vercel URL, redeploy both. Done.

Full step-by-step instructions are in `skillforge/DEPLOYMENT.md`.