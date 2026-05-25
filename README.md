# TaskFlow - Full-Stack Task Manager

TaskFlow is a polished Kanban task manager built for an internship assignment. Registered users receive a private workspace where they can create, edit, delete and move tasks through **Todo**, **In Progress** and **Done** stages.

## Features

- JWT authentication with register, login, persisted session and logout
- Password hashing with `bcrypt`
- Protected API endpoints and user-owned task data only
- Responsive three-column Kanban dashboard
- CRUD task management with modal forms and stage dropdowns
- Drag-and-drop task movement across columns
- Task search and stage filter
- Toast feedback, loading spinner, API error display and empty states
- Deployment-ready CORS configuration and SPA rewrites

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React, Vite, Tailwind CSS, Axios, React Router DOM |
| Backend | Node.js, Express.js, Mongoose, JWT, bcrypt, CORS |
| Database | MongoDB Atlas |
| Hosting | Vercel/Netlify for frontend, Render/Railway for backend |

## Project Structure

```text
taskflow-manager/
  backend/
    config/          MongoDB connection
    controllers/     Auth and task request handling
    middleware/      JWT protection and error handling
    models/          User and Task Mongoose schemas
    routes/          Express API route definitions
    server.js
    .env.example
    package.json
  frontend/
    public/          Netlify SPA redirect
    src/
      components/    Board, navigation, modal and shared UI
      context/       Authentication session context
      pages/         Login, register and dashboard pages
      services/      Axios API client
    .env.example
    package.json
    vercel.json      Vercel SPA routing rewrite
  README.md
```

## Local Setup

### Prerequisites

- Node.js 18 or newer
- A MongoDB Atlas cluster and database user

### 1. Install dependencies

From the project root:

```bash
npm run install:all
```

Or install each app independently:

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure the backend

Create `backend/.env` from `backend/.env.example`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskflow?retryWrites=true&w=majority
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

In MongoDB Atlas, allow access from your development IP address and ensure the database username/password in `MONGODB_URI` is valid.

### 3. Configure the frontend

Create `frontend/.env` from `frontend/.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Run the apps

In two terminals from the project root:

```bash
npm run dev:backend
npm run dev:frontend
```

Open `http://localhost:5173`.

## API Reference

All protected endpoints require:

```http
Authorization: Bearer <jwt-token>
```

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Public | Create account and return user/token |
| POST | `/api/auth/login` | Public | Authenticate and return user/token |
| GET | `/api/auth/me` | Protected | Return signed-in user |
| GET | `/api/tasks` | Protected | Get signed-in user's tasks |
| POST | `/api/tasks` | Protected | Create a task |
| PUT | `/api/tasks/:id` | Protected | Update fields or stage |
| DELETE | `/api/tasks/:id` | Protected | Delete a task |
| GET | `/api/health` | Public | Health response for hosting checks |

### Task Data Shape

```json
{
  "title": "Build authentication flow",
  "description": "Implement JWT login and protected routes",
  "stage": "in-progress"
}
```

Allowed `stage` values are `todo`, `in-progress` and `done`. MongoDB timestamps provide `createdAt` and `updatedAt`.

## Production Build

Build the frontend locally:

```bash
npm run build --prefix frontend
```

The generated static assets are written to `frontend/dist`.

Start the production API:

```bash
npm start --prefix backend
```

## Deployment

### Backend on Render

1. Push this project to a Git provider and create a new **Web Service** in Render.
2. Set **Root Directory** to `backend`.
3. Set **Build Command** to `npm install`.
4. Set **Start Command** to `npm start`.
5. Add environment variables:

```env
MONGODB_URI=<your MongoDB Atlas connection string>
JWT_SECRET=<strong random production secret>
JWT_EXPIRES_IN=7d
CLIENT_URL=https://<your-frontend-domain>
NODE_ENV=production
```

6. Deploy and retain the backend URL, for example `https://taskflow-api.onrender.com`.

Railway may be used instead with the same `backend` root directory, `npm start` start command and environment variables.

### Frontend on Vercel

1. Create a Vercel project from the repository.
2. Set **Root Directory** to `frontend`.
3. Select the Vite preset or use:

```text
Build Command: npm run build
Output Directory: dist
```

4. Configure:

```env
VITE_API_URL=https://<your-backend-domain>/api
```

5. Deploy. `frontend/vercel.json` ensures React Router URLs resolve correctly on refresh.
6. Update the backend `CLIENT_URL` to the final frontend deployment URL and redeploy the API.

### Frontend on Netlify

Alternatively, choose `frontend` as the base directory, `npm run build` as the build command and `dist` as the publish directory. Set the same `VITE_API_URL`. The included `public/_redirects` supports SPA navigation.

## Assumptions

- A user needs only one private board, rather than multiple projects or shared boards.
- Task stages are fixed to the three requested values.
- Drag-and-drop uses the browser HTML drag-and-drop API for a lightweight desktop interaction; the stage dropdown remains accessible and mobile-friendly.
- JWTs are stored in `localStorage` as requested by the assignment.

## Technical Decisions

- The API filters task lookup, update and deletion by `userId` so knowing another task ID never exposes or modifies it.
- Password hashes use bcrypt with 12 salt rounds.
- The client verifies a saved JWT at startup with `/api/auth/me` before displaying protected content.
- UI updates optimistically when moving a task between stages and revert if the API request fails.
- CORS is restricted through `CLIENT_URL`; multiple deployed origins can be supplied comma-separated.

## Tradeoffs

- `localStorage` JWT persistence is simple for an assignment and works with independent frontend/backend hosting, but an HTTP-only secure cookie approach provides stronger protection against token theft in a larger production system.
- Native drag-and-drop keeps dependencies small, but a dedicated accessible drag-and-drop library would improve touch gestures and keyboard reordering if board interaction grows.
- The implementation avoids pagination because a personal internship-demo task board is expected to remain small; high-volume usage should add pagination and indexes tailored to queries.

