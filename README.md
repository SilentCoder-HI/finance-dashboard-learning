# Finance Dashboard

A learning project with a React/TypeScript frontend and a separate Express/TypeScript backend. Run each part in its own terminal; they are separate npm projects with separate dependencies.

## Project layout

```text
.
├── Data/             # JSON data used by the backend
├── backend/          # Express API
└── frontend/         # React application built with Vite
```

## Frontend

The frontend is a React application using TypeScript, Vite, Material UI, React Router, Redux Toolkit, TanStack Table, and Recharts. The UI includes the finance dashboard, invoice views, and learning pages. Its entry point is `frontend/src/main.tsx`; page routes are configured in `frontend/src/App.tsx`.

The frontend currently uses local JSON/data modules for invoice and user-related screens. The login page sends a username-only request to the backend at `http://localhost:2000/auth/login`. The password field is present in the UI but is not currently sent or checked by the API, so this is a demo flow, not secure authentication. The backend wraps the login result in a `data` property, while the frontend currently treats the full response as the user object; those response shapes need to be aligned for the login state to contain the expected user fields.

### Run the frontend

```sh
cd frontend
npm install
npm run dev
```

Vite prints the local URL (normally `http://localhost:5173`). Other scripts available in `frontend/package.json` are `npm run build`, `npm run lint`, and `npm run preview`.

## Backend

The backend is an Express API written in TypeScript. `backend/src/index.ts` creates the server, enables JSON request parsing and CORS for the Vite development origin, and mounts the authentication router under `/auth`. User data is read from `Data/user/data.json` through the data helper in `backend/src/data/user.ts`.

### Current API endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/` | Returns a small server health message. |
| `POST` | `/auth/login` | Looks up a user by username or company name and responds with the matching user data under a `data` property. |

Send JSON to the login endpoint, for example:

```json
{
  "username": "example"
}
```

The endpoint does not validate passwords. Invoice JSON and helper functions exist, but an invoice API route is not currently registered in the Express server.

### Run the backend

```sh
cd backend
npm install
npm run dev
```

The API listens at `http://localhost:2000`. The backend also defines `npm run build` and `npm start` scripts in `backend/package.json`.

## Run both parts together

1. Open one terminal in `backend/` and run `npm install`, then `npm run dev`.
2. Open a second terminal in `frontend/` and run `npm install`, then `npm run dev`.
3. Open the Vite URL and use the UI. The frontend login request expects the backend to be running on port `2000`.

There is no root-level start script; install and run each app from its own folder.
