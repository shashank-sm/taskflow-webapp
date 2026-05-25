# TaskFlow: VS Code Implementation Guide

This guide explains how to recreate and run the TaskFlow full-stack task manager in Visual Studio Code from scratch.

## 1. Create the Workspace

Open VS Code, choose **Terminal > New Terminal**, and run:

```powershell
mkdir taskflow-manager
cd taskflow-manager
mkdir backend
npm create vite@latest frontend -- --template react
code .
```

The application uses two independent projects:

```text
taskflow-manager/
  backend/    Node.js and Express REST API
  frontend/   React and Vite single-page application
```

## 2. Backend Setup

From the project directory:

```powershell
cd backend
npm init -y
npm install express mongoose bcrypt jsonwebtoken cors dotenv
npm install -D nodemon
mkdir config, controllers, middleware, models, routes
ni server.js, .env, .env.example
```

Update the backend scripts in `backend/package.json`:

```json
{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  }
}
```

### Backend Folder Layout

```text
backend/
  config/
    db.js
  controllers/
    authController.js
    taskController.js
  middleware/
    authMiddleware.js
    errorMiddleware.js
  models/
    User.js
    Task.js
  routes/
    authRoutes.js
    taskRoutes.js
  .env
  .env.example
  package.json
  server.js
```

### Backend Environment Variables

Create `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskflow?retryWrites=true&w=majority
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Create a MongoDB Atlas cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas), add a database user, permit your IP address, and replace the connection credentials in `MONGODB_URI`.

### Backend Build Order

1. Create `config/db.js` to connect the server to MongoDB using Mongoose.
2. Create the `User` model with `name`, `email` and hashed `password` fields.
3. Create the `Task` model with `title`, `description`, `stage`, `userId` and timestamps.
4. Implement registration and login in `controllers/authController.js`.
5. Implement JWT validation in `middleware/authMiddleware.js`.
6. Implement task CRUD operations in `controllers/taskController.js`.
7. Attach auth and task routes under `/api/auth` and `/api/tasks`.
8. Configure Express, CORS, JSON parsing and error handling in `server.js`.

Each task operation must filter by `userId: req.user._id`, ensuring users only access their own data.

## 3. Frontend Setup

In a second terminal:

```powershell
cd frontend
npm install
npm install axios react-router-dom react-hot-toast lucide-react
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

Configure Tailwind in `frontend/tailwind.config.js`:

```js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {}
  },
  plugins: []
};
```

Create the frontend folders:

```powershell
cd src
mkdir components, context, pages, services
```

### Frontend Folder Layout

```text
frontend/src/
  components/
    AuthLayout.jsx
    Column.jsx
    EmptyState.jsx
    Navbar.jsx
    ProtectedRoute.jsx
    Spinner.jsx
    TaskCard.jsx
    TaskModal.jsx
  context/
    AuthContext.jsx
  pages/
    Dashboard.jsx
    Login.jsx
    NotFound.jsx
    Register.jsx
  services/
    api.js
  App.jsx
  index.css
  main.jsx
```

### Frontend Environment Variable

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

### Frontend Build Order

1. Create an Axios client in `services/api.js` that reads the JWT token from `localStorage`.
2. Implement auth session methods and `/auth/me` restoration in `context/AuthContext.jsx`.
3. Create public registration/login pages and a `ProtectedRoute`.
4. Implement `Dashboard.jsx` to fetch and manage tasks.
5. Create reusable Kanban components for cards, columns and the edit/create modal.
6. Add toast notifications, loading states, error feedback and empty states.
7. Add drag-and-drop movement, search and stage filtering.
8. Configure routes in `App.jsx`.

## 4. API Endpoints

The backend exposes:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in and receive a JWT |
| GET | `/api/auth/me` | Restore authenticated user |
| GET | `/api/tasks` | Retrieve the user's tasks |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Edit a task or move its stage |
| DELETE | `/api/tasks/:id` | Delete a task |

Protected API calls send:

```http
Authorization: Bearer <jwt-token>
```

## 5. Run the Application in VS Code

Open two VS Code terminals.

Terminal 1:

```powershell
cd backend
npm run dev
```

Terminal 2:

```powershell
cd frontend
npm run dev
```

Open `http://localhost:5173`, then:

1. Register a user.
2. Create tasks in each stage.
3. Edit, move and delete tasks.
4. Search and filter tasks.
5. Log out and confirm dashboard access redirects to login.

## 6. Deployment

### Render or Railway Backend

Use `backend` as the service root with:

```text
Build Command: npm install
Start Command: npm start
```

Configure:

```env
MONGODB_URI=<production MongoDB Atlas connection string>
JWT_SECRET=<strong production secret>
JWT_EXPIRES_IN=7d
CLIENT_URL=https://<frontend-domain>
NODE_ENV=production
```

### Vercel or Netlify Frontend

Use `frontend` as the project root with:

```text
Build Command: npm run build
Output Directory: dist
```

Configure:

```env
VITE_API_URL=https://<backend-domain>/api
```

The provided Vercel rewrite and Netlify redirect files support React Router refresh navigation in production.

## 7. Submission Checklist

- Add valid MongoDB Atlas credentials only to local or hosted environment variables, never to source control.
- Demonstrate registration, login, protected routes and logout.
- Demonstrate task creation, updating, deletion and stage movement.
- Include `README.md`, `.env.example` files and both package files.
- Deploy the frontend and backend with production environment variables configured.

