## Backend Repository

[View Backend Repository](https://github.com/AMIRUL1104/BookBridge-Server)

---

# BookBridge

### Live Link --- [View Live Application](https://bookbridgebd.vercel.app)

A student-to-student academic book marketplace for Bangladesh — enabling students to buy, sell, and donate used textbooks through a peer-to-peer platform.

## Project Overview

BookBridge addresses the high cost of academic materials by connecting students who have completed courses with those who need books for upcoming semesters. The platform reduces financial barriers to education while promoting sustainability through book reuse.

**Problem Solved:** Students in Bangladesh often struggle with expensive textbooks. BookBridge creates a structured marketplace where students can list books they no longer need and find affordable alternatives from peers.

**Target Users:** University and college students across Bangladesh looking to buy, sell, or donate academic books.

**Core Value:** Affordable access to educational resources through community-driven exchange.

---

## Features

### Authentication

- Secure authentication via **Better Auth** (email/password)
- User registration and login
- Protected routes with role-based access control (User / Admin)
- Session management with Better Auth tokens

### Book Management

- Create book listings with multiple books per post
- Edit and delete own listings
- Image upload via ImgBB integration
- Detailed book information display (condition, price, category, location)

### Browse & Discovery

- Search books by title, author, or keywords
- Filter by category, condition (like_new / good / fair), listing type (sell / donate)
- Sort by newest, oldest, price
- Pagination support

### Book Request System

- Send purchase/donation requests to sellers
- Duplicate request prevention
- Seller can accept requests — accepted books marked as sold
- Remaining pending requests automatically cancelled
- Availability restored if accepted request is cancelled

### User Dashboard

- Overview with stats (active posts, pending requests, books sold, books donated)
- Manage own posts (edit, delete, view requests)
- View sent requests with status tracking
- View received requests with accept/decline actions
- Profile management

### Admin Dashboard

- Platform overview (total users, active posts, pending reviews, knowledge base count)
- User management (search, filter, paginate, role/status updates)
- Post management with soft-delete capability
- Knowledge base review queue

### Responsive Design

- Mobile-first layout with Tailwind CSS
- Tablet and desktop optimized breakpoints
- Collapsible sidebar navigation on dashboard
- Touch-friendly interactive elements

---

## Tech Stack

| Category               | Technologies                                            |
| ---------------------- | ------------------------------------------------------- |
| **Framework**          | Next.js 16 (App Router)                                 |
| **Language**           | TypeScript                                              |
| **Styling**            | Tailwind CSS v4, HeroUI v3                              |
| **Forms & Validation** | React Hook Form, Zod                                    |
| **Authentication**     | Better Auth (React client + MongoDB adapter)            |
| **Data Fetching**      | Server Components with native `fetch`, custom API layer |
| **State/Session**      | Server-side session via Better Auth, client hooks       |
| **Notifications**      | React Toastify                                          |
| **Charts**             | Recharts (dashboard statistics)                         |
| **Animation**          | Framer Motion                                           |
| **Icons**              | Lucide React                                            |
| **Image Hosting**      | ImgBB                                                   |
| **Deployment**         | Vercel (frontend), Render (backend)                     |
| **Linting**            | ESLint (Next.js config)                                 |
| **Package Manager**    | npm                                                     |

---

## Authentication

BookBridge uses **Better Auth** for authentication with a MongoDB adapter.

### Flow

1. **Registration** — Email/password signup via `/auth/signup`
2. **Login** — Email/password signin via `/auth/signin`
3. **Session** — JWT-based sessions stored in HTTP-only cookies
4. **Protected Routes** — Middleware validates session on dashboard routes
5. **Role-Based Access** — `user` or `admin` role determines dashboard layout and permissions

### Implementation Details

- **Server-side session retrieval**: `auth.api.getSession()` in Server Components
- **Client-side session**: `useSession()` hook from `better-auth/react`
- **API Authentication**: Bearer token attached via `Authorization` header for protected backend calls
- **Route Protection**: `requireRole()` utility redirects unauthorized users to `/unauthorized`

---

## Application Structure / Major Sections

| Route                             | Description                                                          | Access        |
| --------------------------------- | -------------------------------------------------------------------- | ------------- |
| `/`                               | Home page — hero, featured books, how it works, categories, FAQ, CTA | Public        |
| `/books`                          | Browse all books with search, filters, pagination                    | Public        |
| `/books/[id]`                     | Book detail page — images, metadata, seller info, request button     | Public        |
| `/books/add`                      | Create new book listing (multi-book post)                            | Authenticated |
| `/auth/signin`                    | Login page                                                           | Public        |
| `/auth/signup`                    | Registration page                                                    | Public        |
| `/dashboard/user`                 | User dashboard — stats, recent activity, quick actions               | User          |
| `/dashboard/user/posts`           | Manage own listings (edit/delete)                                    | User          |
| `/dashboard/user/requests`        | Sent & received request management                                   | User          |
| `/dashboard/admin`                | Admin overview — platform stats, recent activity                     | Admin         |
| `/dashboard/admin/users`          | User management table (search, filter, paginate)                     | Admin         |
| `/dashboard/admin/posts`          | Post management with soft-delete                                     | Admin         |
| `/dashboard/admin/knowledge-base` | Knowledge base review queue                                          | Admin         |
| `/profile`                        | User profile management                                              | Authenticated |
| `/about`                          | Platform mission, vision, values, statistics                         | Public        |
| `/faq`                            | Frequently asked questions (accordion)                               | Public        |
| `/privacy`                        | Privacy policy                                                       | Public        |
| `/terms`                          | Terms & conditions                                                   | Public        |
| `/unauthorized`                   | Access denied page with redirect options                             | Public        |

---

## Backend & API Integration

The frontend communicates with a REST API (Express.js + MongoDB) deployed separately.

### API Communication

- **Base URL**: `NEXT_PUBLIC_API_URL` environment variable
- **Method**: Server-side `fetch` with `cache: 'no-store'` for dynamic data
- **Authentication**: Bearer token from Better Auth session attached to protected requests
- **Error Handling**: Failed requests return `null`; UI renders fallback states

### API Client Layer

Located in `src/services/server/`:

- `api.ts` — Public & protected endpoints (posts, requests, user dashboard, profile)
- `adminApi.ts` — Admin-only endpoints (users, posts, dashboard, book requests)
- `core/serverFetch.ts` — Shared fetch utilities (`serverFetch`, `protectedFetch`, `authHeader`)
- `core/session.ts` — Server-side session & token retrieval

### Main API Categories

| Category            | Endpoints (Frontend)                                                                                                             |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Posts**           | `GET /api/posts`, `GET /api/posts/[id]`, `GET /api/posts/my`, `GET /api/posts/featured`, `GET /api/posts/admin`                  |
| **Book Requests**   | `GET /api/book-requests/check`, `GET /api/book-requests/sent`, `GET /api/book-requests/received`, `GET /api/admin/book-requests` |
| **User Dashboard**  | `GET /api/dashboard/user`                                                                                                        |
| **Admin Dashboard** | `GET /api/dashboard/admin`                                                                                                       |
| **Users**           | `GET /api/users`, `GET /api/users/admin`                                                                                         |
| **Auth**            | Handled via Better Auth at `/api/auth/[...all]`                                                                                  |

---

## Responsive Design

Built with **Tailwind CSS v4** using a mobile-first approach:

- **Mobile** (< 640px): Single-column layouts, collapsible navigation, stacked cards
- **Tablet** (640px–1024px): Two-column grids, sidebar navigation
- **Desktop** (> 1024px): Multi-column layouts, full sidebar, expanded grids

All dashboard pages, book grids, forms, and navigation components adapt fluidly across breakpoints.

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm (project uses npm)
- Backend API running (see backend repository)

### Installation

```bash
# Clone the repository
git clone https://github.com/AMIRUL1104/BookBridge.git

# Navigate to project
cd BookBridge

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_BASE_URL=
NEXT_PUBLIC_API_URL=
BETTER_AUTH_URL=
CLIENT_URL=
```

| Variable               | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| `NEXT_PUBLIC_BASE_URL` | Frontend URL (e.g., `http://localhost:3000`)         |
| `NEXT_PUBLIC_API_URL`  | Backend API base URL (e.g., `http://localhost:5000`) |
| `BETTER_AUTH_URL`      | Better Auth callback URL                             |
| `CLIENT_URL`           | Frontend origin for CORS                             |

### Development

```bash
# Start development server
npm run dev
```

Open `http://localhost:3000`

### Production Build

```bash
# Build for production
npm run build

# Run production server
npm start
```

---

## Available Commands

| Command         | Description                             |
| --------------- | --------------------------------------- |
| `npm run dev`   | Start development server with Turbopack |
| `npm run build` | Build production bundle                 |
| `npm start`     | Run production server                   |
| `npm run lint`  | Run ESLint                              |

---

## Project Structure (Key Directories)

```
src/
├── app/                    # Next.js App Router pages & layouts
│   ├── auth/               # Sign in / sign up pages
│   ├── books/              # Browse, detail, add post
│   ├── dashboard/          # User & admin dashboards
│   ├── api/auth/           # Better Auth route handler
│   └── (static pages)      # about, faq, privacy, terms
├── components/
│   ├── layout/             # Navbar, Footer, Sidebar
│   ├── home/               # Home page sections
│   ├── browse-books/       # Book grid, filters, pagination
│   ├── book-details/       # Detail view, request modal
│   ├── dashboard/          # Dashboard overview, stats, tables
│   ├── add-post/           # Multi-step post creation form
│   └── shared/             # Reusable UI components
├── services/
│   ├── server/             # Server-side API client (api.ts, adminApi.ts)
│   └── core/               # Shared fetch, session utilities
├── lib/
│   ├── auth.ts             # Better Auth server config
│   ├── auth-client.ts      # Better Auth React client
│   ├── dashboard/          # Nav config, filters
│   └── validations/        # Zod schemas
├── interface/              # TypeScript interfaces
└── public/                 # Static assets
```

---

## Engineering Highlights

- **Server Components First** — Data fetching at the route level, minimal client JS
- **Component-Based Architecture** — Reusable, composable UI components with clear separation
- **Type Safety** — End-to-end TypeScript with Zod validation schemas
- **Protected Routes** — Role-based access at layout and page level
- **API Abstraction Layer** — Centralized fetch utilities with auth header injection
- **Form Validation** — React Hook Form + Zod for type-safe validation
- **Error Boundaries** — Graceful fallbacks for failed API calls
- **Loading States** — Next.js `loading.tsx` for route-level streaming
- **Responsive Design** — Tailwind CSS with mobile-first breakpoints
- **Environment-Based Config** — All external URLs via environment variables
- **Production Deployment** — Configured for Vercel with proper metadata/SEO

---

## Repository Links

- **Frontend**: https://github.com/AMIRUL1104/BookBridge
- **Backend**: https://github.com/AMIRUL1104/BookBridge-Server

---

## License

This project is created for educational purposes.
