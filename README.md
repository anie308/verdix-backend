# Verdix Backend (Express + MongoDB)

## Setup

1. Create a `.env` file with the following variables:

```
NODE_ENV=development
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/verdix
JWT_SECRET=replace-with-strong-secret
CLIENT_ORIGIN=http://localhost:3000
UPLOADS_DIR=uploads
```

2. Install dependencies and start the server:

```
yarn --cwd backend install
yarn --cwd backend dev
```

The server will run at `http://localhost:4000`.

## Routes

- Auth: `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`
- Profiles: `GET /api/profiles/me`, `PATCH /api/profiles/me`, `GET /api/profiles/:id`
- Posts: `GET /api/posts`, `POST /api/posts`
- Comments: `GET /api/comments/:postId`, `POST /api/comments/:postId`
- Likes: `POST /api/likes/toggle/:postId`
- Scans: `GET /api/scans`, `POST /api/scans/upload` (multipart field name: `file`)

## Notes

- Static uploads are served under `/uploads`.
- Replace Supabase calls in the frontend with these endpoints. Use the `Authorization: Bearer <token>` header for protected routes.

