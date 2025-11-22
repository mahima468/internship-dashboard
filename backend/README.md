# Internship Dashboard Backend

Node.js/Express/MongoDB backend for the Internship Dashboard Next.js frontend.

## Tech Stack
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- bcrypt password hashing
- CORS
- dotenv

## Environment Variables
Create a `.env` file in `backend/` with:

- `PORT` – Server port (e.g. `5000`)
- `MONGO_URI` – MongoDB connection string
- `JWT_SECRET` – Secret key for signing JWTs
- `JWT_EXPIRE` – Token lifetime (e.g. `7d`)
- `NODE_ENV` – `development` or `production`

## Scripts

From the `backend` folder:

- `npm install`
- `npm run dev` – Start dev server with nodemon
- `npm start` – Start production server

## API Base URL

All endpoints are prefixed with:

- `http://localhost:5000/api`

## Auth Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`

Both return `{ success, token, user }` where `user` has `id`, `name`, `email`, `createdAt`.

## User Endpoints
- `GET /api/user/profile` – requires `Authorization: Bearer <token>`
- `PUT /api/user/profile` – requires `Authorization: Bearer <token>`

Profile shape:

```json
{
  "id": "...",
  "name": "...",
  "email": "...",
  "createdAt": "..."
}
```

## Task Endpoints
All require `Authorization: Bearer <token>`.

- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

Task shape:

```json
{
  "id": "...",
  "title": "...",
  "description": "...",
  "status": "pending" | "completed",
  "createdAt": "..."
}
```

## CORS & Frontend Integration

CORS is configured to accept requests from:

- `http://localhost:3000`

The frontend should:

- Store the JWT in `localStorage` (e.g. `localStorage.setItem('token', token)`)
- Send `Authorization: Bearer <token>` header on protected requests.
