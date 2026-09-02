# Milbe

A peer-to-peer marketplace where students in Bangladesh buy, sell, and donate used academic textbooks.

[![Live Demo](https://img.shields.io/badge/Live-milbe%2Evercel.app-35858E)](https://milbe.vercel.app)
[![Frontend](https://img.shields.io/badge/Frontend-Milbe-35858E?logo=nextdotjs)](https://github.com/AMIRUL1104/Milbe)
[![Backend](https://img.shields.io/badge/Backend-Milbe--Server-35858E?logo=express)](https://github.com/AMIRUL1104/Milbe-Server)

---

## Overview

**Milbe** is a student-to-student academic book marketplace built for Bangladesh. It connects students who have completed a course with those who need textbooks for upcoming semesters, reducing the cost of educational materials and extending the life of used books through reuse.

- **For:** University and college students across Bangladesh.
- **Value:** Affordable access to textbooks; sustainability through book reuse; a trusted, peer-driven exchange.
- **Live application:** [https://milbe.vercel.app](https://milbe.vercel.app)

### Architecture at a glance

Milbe is split across two repositories that communicate over HTTP:

1. **Frontend (this repo)** — a Next.js 16 application. It owns the UI, the static pages, and **authentication** (Better Auth with a MongoDB adapter, running as a route handler at `/api/auth/[...all]`).
2. **Backend** — a separate Express.js + MongoDB REST API (`[Milbe-Server](https://github.com/AMIRUL1104/Milbe-Server)`, deployed on Render) that stores and serves domain data (posts, book requests, users, and dashboard statistics).

The frontend calls the backend REST API using server-side `fetch` (`cache: "no-store"` for dynamic data) and attaches a Bearer token from the Better Auth session to every protected request.

---

## Key Features

### Authentication

- Email & password sign-up / sign-in with **Better Auth** (MongoDB adapter).
- On registration, a user profile record is created automatically.
- Session management via Better Auth (HTTP-only cookies, JWT-backed session token).
- Role-based access control — **`user`** and **`admin`** — enforced with `requireRole()` in the dashboard layouts and per-page session guards on protected routes (`/books/add`, `/profile`).
- Protected API calls carry an `Authorization: Bearer <token>` header.

### Book Listings

- Create listings that bundle **multiple books** in a single post (a "bundle").
- Single cover image per post, uploaded via **ImgBB** (`next/image` optimized from `i.ibb.co`).
- Rich post data: category, listing type (sell / donate), condition (new / excellent / good / fair), price, location (district + area), description, and seller contact (phone / WhatsApp / messenger).
- Delete your own listings.

### Browse & Discover (home page)

- Keyword search across title, author, and ISBN.
- Filter by category, condition, listing type, district, and area.
- Sort by newest, oldest, title A–Z, or title Z–A.
- Server-side pagination with "nearby books" personalized to the logged-in user's district (or a selected location).
- Public listing is available without signing in; nearby personalization requires a profile.

### Book Request System

- Send a purchase/donation request directly from a book's detail page.
- Duplicate-request prevention — the platform refuses requests from the owner or from a requester who already has a pending request.
- Sellers can **accept** or **reject** a request (an accepted request marks the post as sold); requesters can **cancel**.
- Request lifecycle tracked through `pending`, `accepted`, `rejected`, and `cancelled` states.

### User Dashboard (`/dashboard/user`)

- Overview with stats: active posts, pending requests, books sold, books donated.
- Recent activity feed and quick actions.
- **My Posts** — list and delete your own listings.
- **Requests** — view sent requests (with status tracking) and received requests (accept/decline).
- **Profile** — manage full name, phone, district, area, and avatar.

### Admin Dashboard (`/dashboard/admin`)

- Overview with platform stats: total users, active posts, pending reviews, and knowledge-base count.
- Recent activity feed.
- **User management** — search, filter by role/status, and paginate registered users.
- **Post management** — browse all listings and remove them.
- **Knowledge Base** — admin review section (currently a placeholder until resources are curated).

### Responsive Design

- Mobile-first styling with **Tailwind CSS v4** and a custom token system (CSS variables for brand, status, and spacing).
- **HeroUI** components for UI primitives.
- Collapsible dashboard sidebar; a bottom navigation bar on mobile.
- Touch-friendly controls across all breakpoints.

---

## Core User Flow

1. **Browse** — Land on the home page, search or filter by category / location / type, and page through results.
2. **Request** — Open a listing, then send a book request (sign-in required). Contact details are visible only to the seller.
3. **List** — Sign in, click **Sell / Donate**, fill the multi-book form, upload an image (ImgBB), and publish.
4. **Transact** — Sellers accept requests from the dashboard; accepted requests mark the post as sold and close out pending requests.
5. **Manage** — Use the dashboard to track your posts and requests, or edit your profile.

---

## Technology Stack

| Category           | Technologies                                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------------ |
| Framework          | Next.js 16.2.10 (App Router, Turbopack dev server)                                                                 |
| Language           | TypeScript 5                                                                                                       |
| Runtime            | React 19.2.4 / React DOM 19.2.4                                                                                    |
| Styling            | Tailwind CSS v4 (PostCSS), HeroUI v3                                                                               |
| Forms & Validation | React Hook Form, Zod v4, @hookform/resolvers                                                                       |
| Authentication     | Better Auth v1.6.23 (`@better-auth/mongo-adapter`), MongoDB driver                                                 |
| Data Layer         | Server Components + native `fetch`; `src/services/` API client (`serverFetch`, `protectedFetch`, `serverMutation`) |
| Session            | Server-side `getUserSession()`; client `useSession()` hook                                                         |
| Notifications      | React Toastify                                                                                                     |
| Icons              | Lucide React                                                                                                       |
| Image Hosting      | ImgBB (`next/image` optimized)                                                                                     |
| Linting            | ESLint (`eslint-config-next`, core-web-vitals)                                                                     |
| Package Manager    | npm                                                                                                                |

> Note: `recharts` and `framer-motion` are listed in `package.json` but are not currently imported by the application.

---

## Project Structure

```
src/
├── app/                         # Next.js App Router (pages, layouts, route handlers)
│   ├── (auth)/                  # /auth/signin, /auth/signup
│   ├── books/[id]/              # Book detail page
│   ├── books/add/               # Create-listing form
│   ├── dashboard/user/          # User dashboard (overview, posts, requests)
│   ├── dashboard/admin/         # Admin dashboard (overview, users, posts, knowledge base)
│   ├── about/  faq/  privacy/  terms/  profile/  # Static & account pages
│   ├── api/auth/[...all]/        # Better Auth route handler
│   ├── layout.tsx, globals.css, page.tsx (home)
│   └── sitemap.ts, robots.ts
├── components/                  # UI components (layout, home, book-details, dashboard, add-post, shared)
├── services/                    # Server-side API client layer
│   ├── core/                    # serverFetch, serverMutation, session helpers
│   └── features/                # posts, bookRequests, userProfile, dashboard, admin
├── lib/                         # auth config, validation schemas (Zod), dashboard nav/filters
├── interface/                   # TypeScript data models
└── public/                      # Static assets
```

---

## Important Engineering Highlights

- **Server Components first** — data is fetched at the route level (`async` Server Components); Client Components are used only where interaction is required.
- **API abstraction** — all backend communication flows through `src/services/core/serverFetch.ts` and `server.ts`, which centralize base-URL handling, `no-store` caching, Bearer-token injection, and typed `ApiResponse` / `ApiError` handling.
- **Type safety end-to-end** — TypeScript interfaces model every backend response, and every form is validated with Zod schemas (`src/lib/validaions/`).
- **Bundled listings** — a single post carries a `books[]` array, so one listing can advertise an entire course's textbooks.
- **Guarded routes without middleware** — access control is declarative: dashboard layouts call `requireRole(...)`, and gated pages call `getUserSession()` then `redirect()`.
- **Environment-driven config** — all external URLs and keys come from environment variables; the only exception is the database name hard-coded for the Better Auth MongoDB adapter in `src/lib/auth.ts` (a candidate for later externalization).

---

## Screenshots

> Screenshots are not yet committed to the repository. Add them under `public/screenshots/` and update the paths below.

| Screen                       | Path                               |
| ---------------------------- | ---------------------------------- |
| Home (browse + nearby books) | `/screenshots/home.png`            |
| Book detail + request        | `/screenshots/book-detail.png`     |
| Create listing form          | `/screenshots/add-post.png`        |
| User dashboard               | `/screenshots/user-dashboard.png`  |
| Requests (sent & received)   | `/screenshots/requests.png`        |
| Admin dashboard              | `/screenshots/admin-dashboard.png` |

---

## Local Development Setup

> The Express backend ([Milbe-Server](https://github.com/AMIRUL1104/Milbe-Server)) must be running locally before the frontend can fetch domain data. Authentication runs in this Next.js app and needs a MongoDB connection of its own.

```bash
# Clone this frontend repo
git clone https://github.com/AMIRUL1104/Milbe.git
cd Milbe

# Install dependencies
npm install

# Create a .env.local with the required values (see Environment Variables below)
```

Run the backend (Express / MongoDB) from the `Milbe-Server` repo, then:

```bash
npm run dev     # http://localhost:3000  (Next.js + Turbopack)
npm run lint    # ESLint (core-web-vitals)
npm run build   # production build
npm start       # production server
```

---

## Environment Variables

Create a `.env.local` (never commit it — `.env*` is gitignored). The values below are **placeholders only**; generate a real `BETTER_AUTH_SECRET`, a MongoDB Atlas connection string, and an ImgBB API key.

| Variable                    | Purpose                                               | Local example                         |
| --------------------------- | ----------------------------------------------------- | ------------------------------------- |
| `NEXT_PUBLIC_BASE_URL`      | Frontend origin (Better Auth callback base)           | `http://localhost:3000`               |
| `NEXT_PUBLIC_API_URL`       | Backend Express REST API base URL                     | `http://localhost:4000`               |
| `BETTER_AUTH_SECRET`        | Secret used to sign Better Auth sessions/tokens       | `a-random-32+-char-string`            |
| `MONGODB_URI`               | MongoDB connection string for the Better Auth adapter | `mongodb+srv://USER:PASS@cluster0...` |
| `NEXT_PUBLIC_IMGBB_API_KEY` | ImgBB API key for image uploads                       | your-imgbb-key                        |

In production, `NEXT_PUBLIC_API_URL` points to the hosted Express backend (deployed on Render).

---

## API / Backend

The frontend is a typed client of the `Milbe-Server` Express API. All requests go through the helper layer in `src/services/core/` and return a uniform `ApiResponse<T>` shape (`{ success, statusCode, message, data, meta }`).

| Category      | Endpoints (from `src/services/features`)                                                                                                                                                                                                                                         |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Posts         | `GET /api/posts`, `GET /api/posts/:id`, `GET /api/posts/my`, `GET /api/posts/featured`, `GET /api/posts/admin`, `POST /api/posts`, `DELETE /api/posts/:id`                                                                                                                       |
| Book Requests | `POST /api/book-requests`, `GET /api/book-requests/check`, `GET /api/book-requests/sent`, `GET /api/book-requests/received`, `GET /api/admin/book-requests`, `PATCH /api/book-requests/:id/accept`, `PATCH /api/book-requests/:id/reject`, `PATCH /api/book-requests/:id/cancel` |
| Users         | `GET /api/users` (profile), `POST /api/users` (create profile), `PATCH /api/users` (update profile), `GET /api/users/admin` (admin list)                                                                                                                                         |
| Dashboards    | `GET /api/dashboard/user`, `GET /api/dashboard/admin`                                                                                                                                                                                                                            |
| Auth          | Better Auth route handler at `/api/auth/[...all]` (email/password sign-in/up, session)                                                                                                                                                                                           |

Authentication for protected endpoints uses a session token issued by Better Auth; `protectedFetch` attaches it as an `Authorization: Bearer <token>` header.

---

## Deployment

- **Frontend** — Next.js production build, deployed at [https://milbe.vercel.app](https://milbe.vercel.app) (Vercel).
- **Backend** — Express.js + MongoDB REST API hosted on Render.
- **Data** — MongoDB (Atlas) for both the Better Auth adapter and the backend's domain store.

---

## Future Improvements

- Enable real social/OAuth sign-in (a Google UI stub exists in `SocialAuth.tsx`).
- Add the ability to **edit** existing listings (currently create/delete only).
- Ship a multi-image gallery for posts (a per-book image field already exists).
- Implement hard/soft-delete controls and a restore UI in the admin post manager.
- Add user ratings/reviews for completed transactions.
- Replace the Knowledge Base placeholder with a live review queue.

---

## Author

Built by [AMIRUL1104](https://github.com/AMIRUL1104) — Frontend: [`Milbe`](https://github.com/AMIRUL1104/Milbe) · Backend: [`Milbe-Server`](https://github.com/AMIRUL1104/Milbe-Server)

---

## License

This project is built for educational purposes.
