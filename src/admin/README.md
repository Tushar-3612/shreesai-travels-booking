# Admin Panel — Shirdi Car Rental

A completely separate, production-style admin panel for the car rental
website. It lives entirely in `src/admin/` and does **not** touch any user
facing page, component or data file.

## Routes

| URL                    | Page                    |
| ---------------------- | ----------------------- |
| `/admin/login`         | Admin login (JWT)       |
| `/admin/dashboard`     | Statistics dashboard    |
| `/admin/bookings`      | Booking management      |
| `/admin/packages`      | Route packages CRUD     |
| `/admin/vehicles`      | Fleet management        |
| `/admin/services`      | Services management     |
| `/admin/gallery`       | Gallery with reorder    |
| `/admin/reviews`       | Review moderation       |
| `/admin/media`         | Media library           |
| `/admin/settings`      | Full website settings   |
| `/admin/profile`       | Profile & password      |

Every admin route is protected. Unauthenticated visitors are redirected to
`/admin/login`.

## Default login

```
Email:    admin@shirdicarrental.com
Password: admin123
```

Override with environment variables (server side only):

```
ADMIN_EMAIL=you@example.com
ADMIN_PASSWORD=your-strong-password
ADMIN_JWT_SECRET=a-long-random-secret
```

The admin credentials are stored hashed (SHA-256) in `admin-data/credentials.json`
which is created automatically on first use and is git-ignored. You can change
the password from **Profile → Change Password**.

## Authentication

- Login is handled by `POST /api/admin/login`.
- On success a **JWT (HS256)** is issued (8 hour expiry) and stored in an
  `httpOnly`, `SameSite=Lax` cookie.
- `src/admin/lib/server/auth.ts` verifies the cookie on every admin page
  (`requireAdminPage`) and every admin API route (`requireAdminApi`).
- The JWT is signed/verified with Web Crypto (no external dependency) in
  `src/admin/lib/jwt.ts`.

## Architecture

```
src/admin/
├── config.ts               # credentials, JWT & upload config
├── types.ts                # all admin types
├── styles/admin.css        # admin component styles
├── lib/
│   ├── jwt.ts              # HS256 sign/verify (Web Crypto)
│   ├── storage.ts          # localStorage helpers
│   ├── seed.ts             # initial data (mirrors the live site)
│   ├── db.ts               # useCollection / useSettings data hooks
│   ├── constants.ts        # nav, icons, categories
│   ├── auth.ts             # client-side auth API calls
│   ├── api.ts              # upload & media API calls
│   ├── toast.ts            # toast notifications
│   └── server/             # server-only code (fs, cookies, JWT)
│       ├── auth.ts         # login / session / guards
│       ├── credentials.ts  # credentials.json read/write
│       └── media.ts        # file upload / list / delete
└── components/
    ├── AdminShell.tsx      # sidebar + topbar layout
    ├── Sidebar.tsx / Topbar.tsx
    ├── auth/LoginForm.tsx
    ├── ui/                 # Card, Modal, ImageUpload, Toaster, ...
    ├── dashboard/          # dashboard page
    ├── bookings/           # bookings page
    ├── packages/           # packages page
    ├── vehicles/           # vehicles page
    ├── services/           # services page
    ├── reviews/            # reviews page
    ├── gallery/            # gallery page
    ├── media/              # media library page
    ├── settings/           # settings page
    └── profile/            # profile page
```

`src/app/admin/**/page.tsx` files are thin route wrappers (a few lines each)
that render the real components from `src/admin`. `src/app/api/admin/**`
route handlers are equally thin wrappers around `src/admin/lib/server/*`.

## APIs

Only where actually required (auth + file uploads):

| Endpoint                   | Method   | Purpose                    |
| -------------------------- | -------- | -------------------------- |
| `/api/admin/login`         | POST     | Login, sets JWT cookie     |
| `/api/admin/logout`        | POST     | Clears session             |
| `/api/admin/me`            | GET      | Current admin profile      |
| `/api/admin/profile`       | POST     | Update name / photo        |
| `/api/admin/change-password` | POST   | Change password            |
| `/api/admin/upload`        | POST     | Image upload (max 5 MB)    |
| `/api/admin/media`         | GET/DELETE | List / delete media files |

Uploads are saved to `public/admin/media/` and served statically.

## Data & storage

All admin content is stored **server-side** as JSON files in the git-ignored
`admin-data/` directory:

```
admin-data/
├── credentials.json   # hashed admin credentials
├── bookings.json      # booking management
├── packages.json      # taxi packages
├── vehicles.json      # fleet
├── services.json      # services
├── reviews.json       # review moderation (incl. website submissions)
├── gallery.json       # gallery images
└── settings.json      # hero, about, why-choose-us, contact, social, SEO
```

Files are seeded automatically on first read from the existing site content
(`src/data/packages.ts`, `src/data/reviews.ts`) by `src/lib/cms/store.ts`.
The admin panel reads and writes them through `GET/POST /api/admin/data`
(JWT protected). The public website consumes the exact same data through the
read-only `GET /api/site` endpoint, so every admin edit is instantly live on
the frontend after refresh.

## Integrations with the user website

- **Everything is synchronized**: Hero slides, packages, vehicles, reviews,
  gallery, about, why-choose-us, trust statistics, most booked routes,
  contact details, social links, business name, logo, favicon, footer and
  SEO settings all flow from `admin-data/*.json` → `GET /api/site` → the
  frontend components (via `SiteProvider` in `src/lib/site.ts`).
- **Reviews**: the website feedback form posts to `POST /api/site/reviews`,
  which creates a `pending` review in `admin-data/reviews.json`. Approving /
  rejecting it in the admin Reviews page publishes or hides it on the
  website immediately.
- **Favicon**: when Settings → Branding saves a favicon hosted under
  `/admin/media/`, it is copied to `public/favicon.ico` so it works on every
  page.
- **No hardcoded content**: user-facing components no longer import content
  from `src/data/*`; they consume the site API. The data files remain only
  as the seed source for the store.

## Notes

- Requires a Node runtime with file-system access (local `next dev` /
  `next start`). File uploads and the credentials file will not work on
  read-only hosting (e.g. Vercel free tier) — on such hosts, back
  `src/admin/lib/server/` with a database/object-storage service.
- Change the default password and `ADMIN_JWT_SECRET` before going live.
- Uploaded media lives in `public/admin/` and is git-ignored.
