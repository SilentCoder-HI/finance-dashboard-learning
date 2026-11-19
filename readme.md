# Finance Dashboard (Learning Project)

A multi-tenant **billing and finance dashboard** built day by day as a hands-on way to learn full-stack TypeScript. It started as a single invoice table and has grown into a React + Express + MongoDB app with cookie-based JWT authentication and role-based access control.

> **Status:** active learning project (currently at Day 9). It is a portfolio and practice app, not production software. See [Known limitations](#known-limitations).

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Creating your first user](#creating-your-first-user)
- [Architecture](#architecture)
- [API reference](#api-reference)
- [Roles and permissions](#roles-and-permissions)
- [Data model](#data-model)
- [Learning journey](#learning-journey)
- [Known limitations](#known-limitations)
- [Roadmap](#roadmap)

---

## Features

**Dashboard (frontend)**
- Overview page with KPI stat cards (revenue, paid, overdue, average invoice value)
- Invoice table with global search, sorting, pagination, and status chips
- Filtering by status and customer, with KPIs recalculated from the filtered set
- Revenue and customer-mix charts (Recharts), with a year selector for monthly revenue
- Users page backed by the real API, scoped by role
- Profile page, learning journey pages, and a day-by-day learning tracker
- Glassmorphism UI on a muted slate palette, styled with Tailwind CSS v4 and Material UI

**Backend**
- Express 5 REST API with MongoDB (Mongoose)
- Email and password login with bcrypt-hashed passwords
- JWT stored in an `httpOnly` cookie (1 day expiry)
- `verifyJwt` middleware that attaches `userId`, `companyId`, and `role` to the request
- Role-scoped data access: superadmins see every user, everyone else sees only their company

**Frontend access control**
- Redux Toolkit `auth` slice holding the signed-in user
- `ProtectedRoute` and `RoleRoute` guards with toast feedback
- A single `navConfig` that drives both the sidebar and the route guard

---

## Tech stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 19, TypeScript, Vite, React Router 7, Redux Toolkit, Tailwind CSS 4, Material UI, TanStack Table, Recharts, React Hook Form, Zod, lucide-react |
| Backend | Node.js 22+, Express 5, TypeScript, Mongoose, jsonwebtoken, bcryptjs, cookie-parser, cors, dotenv |
| Database | MongoDB (local or Atlas) |
| Tooling | ESLint, React Compiler (Babel preset), tsx for backend dev |

---

## Project structure

```
finance-dashboard-learning/
├── backend/                     Express + MongoDB API
│   └── src/
│       ├── index.ts             Server entry (port 2000), CORS, cookies, route wiring
│       ├── auth/auth.ts         POST /auth/login
│       ├── db/db.ts             MongoDB connection and .env loading
│       ├── middleware/          verifyJWT (in use), requireAuth (unfinished)
│       ├── token/               JWT verify helper
│       ├── model/               Mongoose models: User, Company, Customer, Invoice
│       └── modules/
│           ├── users/           GET /api/users (role-scoped)
│           └── company/         Company routes (stub)
├── frontend/                    React + Vite app
│   └── src/
│       ├── main.tsx             Redux and Toast providers
│       ├── App.tsx              Top-level routes: /, /about, /login, /dashboard/*
│       ├── dashboard/           The main app: layout, Overview, Invoices, Users, Profile
│       ├── pages/               Login, Home, About, and the Day 1-9 journal pages
│       ├── routes/              ProtectedRoute
│       ├── components/          RoleRoute, Sidenav, shared UI
│       ├── nav/config.ts        Role-aware navigation config
│       ├── store/               Redux store and auth slice
│       ├── api/                 API base URL, request helper, endpoint map
│       ├── features/auth/       Auth API calls
│       ├── toast/               Toast context
│       ├── day-1 ... day-5/     Daily notes and early dashboard experiments
│       └── data/                Local sample data used by the early frontend-only days
├── Data/dummy/                  Sample JSON: companies, users, customers, invoices, orders
├── LEARNING_DAY6.md             Day 6 write-up
└── package.json
```

---

## Getting started

### Prerequisites

- **Node.js 22 or newer.** The backend uses `process.loadEnvFile()`, which needs Node 22. A `.nvmrc` is included, so `nvm use` works.
- **A MongoDB database.** A free MongoDB Atlas cluster or a local `mongod` both work.
- npm

### 1. Clone

```bash
git clone https://github.com/SilentCoder-HI/finance-dashboard-learning.git
cd finance-dashboard-learning
```

### 2. Start the backend

```bash
cd backend
nvm use                 # optional, picks Node 22 from .nvmrc
npm install
# create backend/.env (see "Environment variables" below)
npm run dev             # http://localhost:2000
```

You should see `MongoDB connected successfully` followed by the server URL.

### 3. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev             # http://localhost:5173
```

### 4. Sign in

Open `http://localhost:5173/login`. You need at least one user in the database first, so see [Creating your first user](#creating-your-first-user).

### Useful scripts

| Where | Command | What it does |
| --- | --- | --- |
| `backend` | `npm run dev` | Run the API with hot reload (`tsx watch`) |
| `backend` | `npm run build` | Compile TypeScript to `dist/` |
| `backend` | `npm start` | Run the compiled build |
| `frontend` | `npm run dev` | Start the Vite dev server |
| `frontend` | `npm run build` | Type-check and create a production build |
| `frontend` | `npm run lint` | Run ESLint |
| `frontend` | `npm run preview` | Preview the production build |

Run commands from inside `backend/` or `frontend/`. The root `package.json` only holds shared dependencies and is not the place to run the apps.

---

## Environment variables

Create `backend/.env`:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/finance-dashboard
JWT_SECRET=replace-with-a-long-random-string
# NODE_ENV=production   # makes the auth cookie Secure (HTTPS only)
```

| Variable | Required | Description |
| --- | --- | --- |
| `MONGODB_URI` | Yes | MongoDB connection string. The server exits if it is missing. |
| `JWT_SECRET` | Yes | Secret used to sign and verify JWTs. Use a long random value. |
| `NODE_ENV` | No | Set to `production` to mark the cookie `Secure`. |

Never commit `.env`. Generate a secret with:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

The frontend currently calls `http://localhost:2000` (hard-coded in `frontend/src/api/endpoints.ts` and `axiosClient.ts`), and the backend only accepts requests from the origin `http://localhost:5173`. Keep those ports, or update both sides together.

---

## Creating your first user

The app has no seed script and no active registration route yet, so create a user directly in MongoDB.

**1. Generate a password hash** (from the `backend/` folder, after `npm install`):

```bash
node -e "import('bcryptjs').then(b => console.log(b.default.hashSync('ChangeMe123!', 10)))"
```

**2. Insert a superadmin** (a superadmin does not need a company):

```js
// mongosh
use finance-dashboard
db.users.insertOne({
  name: "Platform Super Admin",
  username: "superadmin",
  email: "superadmin@platform.test",
  passwordHash: "<paste the hash from step 1>",
  role: "superadmin",
  companyId: null,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

**3. Sign in** at `/login` with that email and password.

For non-superadmin roles, first create a document in the `companies` collection and use its `_id` as the user's `companyId`. Sample company, customer, and invoice data you can import lives in `Data/dummy/`. Those files use string ids like `c1`, so convert them to ObjectIds when importing into Mongoose collections.

---

## Architecture

```
┌────────────────────┐   fetch (credentials: include)   ┌──────────────────────┐
│  React + Vite      │ ───────────────────────────────▶ │  Express 5 API       │
│  localhost:5173    │ ◀─────── JSON + Set-Cookie ───── │  localhost:2000      │
│                    │                                  │                      │
│  Redux: auth.user  │                                  │  verifyJwt           │
│  ProtectedRoute    │                                  │  role-scoped queries │
│  RoleRoute         │                                  └──────────┬───────────┘
└────────────────────┘                                             │ Mongoose
                                                        ┌──────────▼───────────┐
                                                        │  MongoDB             │
                                                        └──────────────────────┘
```

### Authentication flow

1. The user submits email and password on `/login`.
2. `POST /auth/login` looks up the user, selects the hidden `passwordHash`, and compares it with bcrypt.
3. On success the server signs a JWT containing `userId`, `companyId`, and `role`, and sets it as an `httpOnly`, `sameSite=lax` cookie that lasts one day.
4. The response returns the user object, which the frontend stores in Redux and uses to redirect to `/dashboard`.
5. Later requests send the cookie automatically (the frontend uses `credentials: 'include'`). Protected routes run `verifyJwt`, which verifies the token and attaches `req.user`.

Because the token lives in an `httpOnly` cookie, JavaScript on the page cannot read it, which reduces the impact of XSS compared with storing it in `localStorage`.

### Frontend access control

`frontend/src/nav/config.ts` is the single source of truth for which role can see which page. The sidebar filters it by the current user's role, and `RoleRoute` uses the same config to block direct URL access and show a toast.

> The frontend guard is a usability feature only. Real authorization must be enforced on the server, which is why the API scopes every query by the role and company in the verified token.

---

## API reference

Base URL: `http://localhost:2000`

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| `GET` | `/` | None | Health check: `{ "message": "Hello Server is running" }` |
| `POST` | `/auth/login` | None | Log in; sets the `token` cookie and returns the user |
| `GET` | `/api/users` | Cookie JWT | List users, scoped by role (see below) |
| `GET` | `/api/companies/:companyId` | None | Stub, not implemented yet |

### `POST /auth/login`

Request:

```json
{ "email": "admin@c1.test", "password": "ChangeMe123!" }
```

Success (`200`):

```json
{
  "message": "Login successful",
  "user": {
    "id": "...",
    "name": "TechVision Admin",
    "username": "admin@c1",
    "email": "admin@c1.test",
    "role": "admin",
    "companyId": "..."
  }
}
```

Errors: `400` missing fields, `401` unknown user or wrong password, `500` server error.

### `GET /api/users`

Requires the auth cookie. Password hashes are always excluded.

- **Superadmin with no company:** returns every user.
- **Everyone else:** returns only users in their own company.

```json
{ "message": "Users fetched successfully", "count": 3, "data": [ ... ] }
```

---

## Roles and permissions

| Page | superadmin | admin | accountant | viewer |
| --- | :-: | :-: | :-: | :-: |
| Overview | ✅ | ✅ | ✅ | ✅ |
| Invoices | ✅ | ✅ | ✅ | ✅ |
| Customers | ✅ | ✅ | ✅ | ✅ |
| Reports | ✅ | ✅ | ✅ | |
| Team | ✅ | ✅ | | |
| Company settings | ✅ | ✅ | | |
| Companies | ✅ | | | |
| Platform summary | ✅ | | | |
| Profile | ✅ | ✅ | ✅ | ✅ |

This table reflects `navConfig`. Some of these pages are placeholders that are not built yet.

---

## Data model

All models include `createdAt` and `updatedAt` timestamps.

- **Company**: `name`, `slug` (unique), `businessType`, `currency` (default `USD`), `timezone`, `modules[]`, `isActive`
- **User**: `name`, `username` (unique), `email` (unique), `passwordHash` (never returned by default), `role` (`superadmin | admin | accountant | viewer`), `companyId` (required unless superadmin), `isActive`
- **Customer**: `companyId`, `name`, `email`, `phone`, `city`, `status` (`active | inactive`)
- **Invoice**: `companyId`, `invoiceNumber` (unique per company), `customerId`, `customerName`, `description`, `amount`, `paidAmount`, `status` (`draft | pending | paid | overdue | cancelled`), `issueDate`, `dueDate`, `paidDate`

Invoices are indexed by `companyId` with `invoiceNumber`, `issueDate`, and `status`, so tenant-scoped queries stay fast.

---

## Learning journey

Each day added one layer. The in-app **Learning Journey** pages and the notes under `frontend/src/day-*` cover the details.

| Day | Focus |
| --- | --- |
| 1 | Typed invoice model, dashboard layout, KPI cards, searchable and paginated table (TanStack Table), revenue and customer-mix charts |
| 2 | Column sorting, monthly revenue aggregation, year selector derived from the data |
| 3 | Customer and status filters, KPIs derived from filtered data, memoized filtering |
| 4 | Redux basics: store, slices, reducers, `useSelector` and `useDispatch`, protected pages |
| 5 | Customer-scoped invoice page, login flow prototype, why client-side filtering is not security |
| 6 | Tailwind CSS v4, design polish, glassmorphism UI, auth response alignment, TypeScript fixes (see `LEARNING_DAY6.md`) |
| 7 | Express + MongoDB (Mongoose), bcrypt password hashing, Node 22 setup, dedicated `/login` route |
| 8 | Backend and data-model work (company and user schemas, role model) |
| 9 | Cookie-based JWT auth, `verifyJwt` middleware, role-scoped `/api/users`, frontend wired to the real API |

---

## Known limitations

This is a learning project, and these gaps are known:

- **No seed script and no active registration endpoint.** The `/auth/register` handler is commented out, so create users manually (see above).
- **`verifyJwt` swallows errors.** An invalid or expired token currently leaves the request hanging instead of returning `401`. It should reply with `401` in its `catch` block.
- **`requireAuth` is unfinished.** It checks for a cookie but never verifies it or calls `next()`. Use `verifyJwt` for now.
- **No logout endpoint.** There is no route to clear the cookie yet.
- **Company routes are stubs.** `GET /api/companies/:companyId` logs the id but does not respond.
- **Invoices, customers, and charts use local sample data.** Only auth and users are API-backed so far.
- **Hard-coded URLs.** The API base URL and CORS origin are fixed to `localhost`.
- **Login does not persist across refresh.** The user lives in Redux memory, so a reload clears it until a "current user" endpoint is added.
- **No tests or CI yet.**

---

## Roadmap

- [ ] Fix `verifyJwt` error handling and finish or remove `requireAuth`
- [ ] Add `POST /auth/logout` and a `GET /auth/me` endpoint to restore the session on reload
- [ ] Add a seed script for companies, users, customers, and invoices
- [ ] Move invoices and customers to API-backed, company-scoped endpoints with pagination
- [ ] Build the Reports, Customers, Team, and Company settings pages
- [ ] Move API URLs and CORS origin into environment variables
- [ ] Add input validation on the API (Zod) and rate limiting on login
- [ ] Add unit and integration tests, plus CI
- [ ] Export invoices to CSV and PDF
- [ ] Dockerize and deploy

---

## Contributing

This is a personal learning repo, but feedback and suggestions are welcome. Open an issue to discuss an idea before sending a pull request.

## License

No license has been specified yet. Until one is added, all rights are reserved by the author.