# CodeBricks

> Learn front-end development by browsing real, working UI designs — get the code, customize it live, and download it. Built for beginners who learn best by seeing and copying.

CodeBricks is a free, open-source platform with 19 categories (Login, Buttons, Cards, Modals, Forms, Loaders, Dark Mode Toggle, Calendar, Date Picker, Dashboard Components, Notifications, Popups, Contact Forms, Headers, Footers, and more) each holding 50+ ready-to-use HTML/CSS/JS designs. Every design can be previewed live, customized (colors, radius, fonts) in real time, copied, or downloaded as a ready-to-use ZIP.

A **super admin** account manages users, moderates reviews, reads user suggestions, and can publish brand new designs straight from a live code editor — no redeploy needed.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | PHP 8.2+, Laravel 11, JWT Auth (`php-open-source-saver/jwt-auth`) |
| Backend Architecture | Controller → Interface → Service → Contract → Eloquent (strict Service-Repository pattern) |
| Frontend | React 18 (Vite), React Router 6, Tailwind CSS, Axios, lucide-react icons |
| Database | MySQL (default) — SQLite also works for quick local testing |
| Snippet Storage | Flat files on disk (`storage/app/snippets/{section}/{design}/`), paths tracked in DB |
| Auth | Stateless JWT (Bearer tokens), role-gated (`user` / `super_admin`) |

**Everything here is free and open source.** No paid services are required to run or deploy this project (see [DEPLOYMENT.md](./DEPLOYMENT.md)).

---

## Project Structure

```
codebricks/
├── app/
│   ├── Http/
│   │   ├── Controllers/Api/V1/         # Thin controllers — HTTP glue only
│   │   │   ├── AuthController.php
│   │   │   ├── SectionController.php
│   │   │   ├── DesignController.php
│   │   │   ├── WishlistController.php
│   │   │   ├── ReviewController.php
│   │   │   ├── SuggestionController.php
│   │   │   ├── UserController.php
│   │   │   └── Admin/                  # super_admin-only controllers
│   │   │       ├── DashboardController.php
│   │   │       ├── UserController.php
│   │   │       ├── SectionController.php
│   │   │       ├── DesignController.php
│   │   │       ├── ReviewController.php
│   │   │       └── SuggestionController.php
│   │   ├── Requests/                   # Form Request validation, grouped by module
│   │   ├── Resources/                  # API Resource transformers (consistent JSON shape)
│   │   └── Middleware/RoleMiddleware.php
│   │
│   ├── Services/                       # Business logic — ONE folder per module
│   │   ├── Auth/        AuthInterface.php / AuthService.php
│   │   ├── User/        UserInterface.php / UserService.php
│   │   ├── Section/     SectionInterface.php / SectionService.php
│   │   ├── Design/      DesignInterface.php / DesignService.php
│   │   ├── Snippet/     SnippetInterface.php / SnippetService.php   (disk I/O, zip, customizer patch)
│   │   ├── Wishlist/    WishlistInterface.php / WishlistService.php
│   │   ├── Review/      ReviewInterface.php / ReviewService.php
│   │   ├── Suggestion/  SuggestionInterface.php / SuggestionService.php
│   │   └── Dashboard/   DashboardInterface.php / DashboardService.php
│   │
│   ├── Repositories/                   # Data access — ONE folder per module
│   │   ├── User/        UserContract.php / UserEloquent.php
│   │   ├── Section/     SectionContract.php / SectionEloquent.php
│   │   ├── Design/      DesignContract.php / DesignEloquent.php
│   │   ├── Wishlist/    WishlistContract.php / WishlistEloquent.php
│   │   ├── Review/      ReviewContract.php / ReviewEloquent.php
│   │   ├── Suggestion/  SuggestionContract.php / SuggestionEloquent.php
│   │   ├── BaseRepositoryContract.php  # shared CRUD interface
│   │   └── BaseEloquent.php            # shared CRUD implementation
│   │
│   ├── Models/                         # Eloquent models (User, Section, Design, Wishlist, Review, Suggestion)
│   ├── Exceptions/                      # ApiException + typed subclasses + global Handler
│   ├── Helpers/ApiResponse.php          # the trait that standardizes EVERY JSON response
│   └── Providers/
│       ├── RepositoryServiceProvider.php   # binds every Contract → Eloquent
│       └── ServiceServiceProvider.php      # binds every Interface → Service
│
├── routes/api.php                      # THE single source of truth for every endpoint
├── database/
│   ├── migrations/                     # users, sections, designs, wishlists, reviews, suggestions...
│   └── seeders/                        # UserSeeder (super admin!), SectionSeeder, DesignSeeder
├── storage/app/snippets/               # actual index.html / style.css / script.js per design
│
├── frontend/                           # React app (Vite) — lives INSIDE this same repo
│   ├── src/
│   │   ├── api/                        # one file per backend module, mirrors routes/api.php exactly
│   │   ├── context/                    # AuthContext, ThemeContext
│   │   ├── components/
│   │   │   ├── layout/                 # Sidebar, AppLayout, AdminLayout
│   │   │   ├── design/                 # DesignCard, LivePreviewFrame, Customizer, CodeViewer
│   │   │   └── common/                 # Button, Toast
│   │   ├── pages/
│   │   │   ├── auth/                   # Login, Register
│   │   │   ├── user/                   # Home, SectionDesigns, DesignDetail, Wishlist, Profile, ContactForm
│   │   │   └── admin/                  # Dashboard, AdminUsers, AdminSections, AdminDesigns, AdminReviews, AdminSuggestions
│   │   └── routes/guards.jsx           # ProtectedRoute, AdminRoute
│   └── package.json
│
├── docs/CodeBricks.postman_collection.json   # import straight into Postman — every endpoint, ready to run
├── tests/                               # Feature tests (auth, designs, role-gating)
└── .github/workflows/ci.yml             # GitHub Actions: runs the test suite on every push
```

### Why this structure?

- **Controllers never contain business logic.** They validate (via Form Requests), call exactly one Service method, and return a response via the `ApiResponse` trait.
- **Services never touch Eloquent directly.** They depend on a `Contract` interface, so the data layer is swappable and unit-testable.
- **Repositories never contain business rules.** They only know how to fetch/persist data.
- Every module — `User`, `Section`, `Design`, `Wishlist`, `Review`, `Suggestion` — follows the **exact same** four-file shape, so once you understand one module you understand them all.

---

## Quick Start (Local Development)

### Prerequisites
- PHP 8.2+, Composer
- Node.js 18+, npm
- MySQL 8+ (or SQLite for a zero-config option)

### 1. Clone & install backend

```bash
git clone https://github.com/<your-username>/codebricks.git
cd codebricks

composer install
cp .env.example .env
php artisan key:generate
php artisan jwt:secret          # generates and writes JWT_SECRET into .env
```

Edit `.env` and set your database credentials (or switch `DB_CONNECTION=sqlite` and run `touch database/database.sqlite` for the zero-config path).

```bash
php artisan migrate
php artisan db:seed             # creates super admin, sections, and sample designs
php artisan storage:link
```

### 2. Install & run the frontend

```bash
cd frontend
npm install
cd ..
```

### 3. Run both servers concurrently

Add this to the **root** `package.json` (create one if it doesn't exist) or just run two terminals:

```bash
# Terminal 1 — Laravel API on :8000
php artisan serve

# Terminal 2 — React dev server on :5173 (proxies /api to :8000, see frontend/vite.config.js)
cd frontend && npm run dev
```

Or, to run both with a single command, install `concurrently` at the repo root:

```bash
npm init -y                     # only if you don't have a root package.json yet
npm install --save-dev concurrently
```

Add to root `package.json`:

```json
{
  "scripts": {
    "dev": "concurrently -n API,WEB -c blue,green \"php artisan serve\" \"npm run dev --prefix frontend\""
  }
}
```

Then simply:

```bash
npm run dev
```

Visit **http://localhost:5173** — the React app — which talks to the Laravel API at `:8000` automatically.

### 4. Login

| Role | Email | Password |
|---|---|---|
| Super Admin | `rohit@xyz.com` | `Pass@word1` |
| Sample normal user | `aarav@example.com` | `password` |

---

## API Reference

Base URL: `http://localhost:8000/api/v1`

Every response — success or error — follows this exact envelope:

**Success:**
```json
{
  "success": true,
  "message": "Designs fetched successfully.",
  "data": [ /* ... */ ],
  "meta": { "pagination": { "current_page": 1, "per_page": 24, "total": 6, "last_page": 1 } }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Invalid email or password.",
  "errors": null,
  "error_code": "UNAUTHORIZED"
}
```

Common `error_code` values: `VALIDATION_ERROR` (422), `UNAUTHORIZED` (401), `FORBIDDEN` (403), `NOT_FOUND` (404), `TOKEN_EXPIRED` / `TOKEN_INVALID` (401), `METHOD_NOT_ALLOWED` (405), `SERVER_ERROR` (500).

> **Import `docs/CodeBricks.postman_collection.json` into Postman** — it has every route below pre-built, with a script that auto-captures the JWT into a collection variable after login.

### Public

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Create a normal user account |
| POST | `/auth/login` | Login (works for both `user` and `super_admin`) |
| GET | `/sections` | List all sidebar categories |
| GET | `/sections/{slug}` | Get one category |
| GET | `/designs?section_slug=login&search=glass` | List/filter/search designs |
| GET | `/designs/{id}` | Design detail + raw html/css/js code |
| POST | `/designs/{id}/preview` | Get html/css/js with customizer overrides applied |
| POST | `/designs/{id}/download` | Download a ready-to-use ZIP |
| GET | `/designs/{id}/reviews` | Approved reviews for a design |
| POST | `/suggestions` | Submit a contact/suggestion message (guest or logged in) |

### Authenticated (any logged-in user)

Send `Authorization: Bearer <token>` on all of these.

| Method | Endpoint | Description |
|---|---|---|
| GET / PUT | `/profile` | View / update your profile |
| GET | `/wishlist` | Your saved designs |
| POST | `/wishlist` | Add a design (`{ "design_id": 1 }`) |
| POST | `/wishlist/{id}/toggle` | Toggle add/remove with one call |
| DELETE | `/wishlist/{id}` | Remove a design |
| POST | `/reviews` | Submit a review (goes to admin as "pending") |
| GET | `/reviews/mine` | Your submitted reviews |

### Super Admin only (`/admin/*`)

Requires a `super_admin` token — normal user tokens get `403 FORBIDDEN`.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/admin/dashboard` | Total/new/old users, unread suggestions, pending reviews |
| GET | `/admin/users` , `/admin/users/stats` | List users / new-vs-old breakdown |
| PATCH | `/admin/users/{id}/activate`, `/deactivate` | Toggle user access |
| DELETE | `/admin/users/{id}` | Remove a user |
| GET / POST / PUT / DELETE | `/admin/sections` | Manage sidebar categories |
| POST | `/admin/designs` | **Publish a brand new design** (paste html/css/js, pick section) |
| PUT | `/admin/designs/{id}/meta` , `/files` | Edit metadata or the code itself |
| DELETE | `/admin/designs/{id}` | Remove a design |
| GET | `/admin/reviews?status=pending` | Moderation queue |
| PATCH | `/admin/reviews/{id}/approve`, `/reject` | Moderate |
| GET | `/admin/suggestions` | Inbox of contact-form messages |
| PATCH | `/admin/suggestions/{id}/read`, `/resolve` | Manage inbox |

---

## How the Customizer Works

Every `Design` row stores a `customizable_vars` JSON map, e.g.:

```json
{ "--primary-color": "#6366f1", "--border-radius": "20px" }
```

These map 1:1 to actual CSS custom properties declared in a `:root { }` block inside the design's `style.css` on disk. When the frontend customizer changes a value:

1. React calls `POST /designs/{id}/preview` with `{ "overrides": { "--primary-color": "#ff0000" } }`.
2. `SnippetService::applyCustomization()` reads the base CSS, validates the override keys against the design's own `customizable_vars` (so arbitrary CSS can't be injected), and patches the `:root` block.
3. The patched `html`/`css`/`js` come back and re-render instantly inside a sandboxed `<iframe>`.
4. Hitting **Download** sends the same `overrides` to `/designs/{id}/download`, so the ZIP you get matches exactly what you saw in the live preview.

---

## Adding a New Design as Super Admin

1. Login as `rohit@xyz.com`.
2. Go to **Admin → Designs**.
3. Pick a section, paste your HTML/CSS/JS — the live preview updates as you type.
4. Hit **Publish** — it's instantly live for every user, no deploy required.

Behind the scenes this calls `POST /admin/designs`, which writes the files to `storage/app/snippets/{section}/{slug}/` and creates the `designs` row referencing that path.

---

## Suggested Improvements (Roadmap)

A few ideas worth considering as the project grows:

- **Search relevance**: move from `LIKE` queries to a proper search index (Meilisearch / Laravel Scout) once design count grows past a few hundred.
- **Thumbnails**: auto-generate design thumbnails server-side (e.g. headless Chrome screenshot of the iframe) instead of requiring admin-uploaded images.
- **Versioning designs**: keep a history when admin edits a published design's files, so a bad edit can be rolled back.
- **Public profile pages**: let users showcase their wishlist publicly (great portfolio piece for beginners).
- **Design categories beyond the sidebar**: tags-based browsing across sections ("show me everything tagged `dark-mode`").
- **Email notifications**: notify admin by email when a new suggestion/review arrives (Mailer is already stubbed in `.env.example`).
- **Rate limiting**: add Laravel's built-in throttle middleware to `/auth/*` and `/suggestions` to prevent abuse on a public deployment.

---

## License

MIT — free and open source. Use it, fork it, teach with it.
