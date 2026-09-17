# RegLogFrontendApp

This is the React frontend for the Registration and Login application, built with Vite.

## Requirements
- Node.js (v18+)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Environment Configuration:
   You can configure the backend URL in a `.env` file at the root of the frontend project:
   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

## How to Run

Start the development server:
```bash
npm run dev
```

The application will typically start on `http://localhost:5173`.

## Architecture & Flow
- **Framework**: React + Vite + React Router DOM
- **Styling**: Vanilla CSS with modern SaaS-like design (index.css)
- **API**: Axios instance configured with `withCredentials: true` to handle HTTP-only cookies automatically.

### Application Flow
1. **Registration**: `/signup` -> Submits to backend -> Redirects to login on success.
2. **Login**: `/login` -> Submits credentials -> Backend sets HTTP-only JWT cookie -> Redirects to Home.
3. **Home**: `/home` -> Protected route, checks `/api/user/me` on mount. If valid, shows dashboard. If not, redirects to login.
4. **Logout**: Clicks logout -> Calls backend -> Clears cookie -> Redirects to login.
