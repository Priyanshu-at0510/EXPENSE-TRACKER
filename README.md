# EXPENSE-TRACKER

A concise, structured README tailored for maintainers and for presenting this project in interviews.

One-line summary
- EXPENSE-TRACKER is a full‑stack expense & income tracking app with a Node.js + Express backend (MongoDB, file upload, JWT auth) and a separate frontend SPA. Backend responsibilities: authentication, CRUD for expenses/incomes, file imports (XLSX) and media handling.

Table of contents
- About
- Features
- Architecture & tech stack
- Repository layout
- Quick start (local)
- .env example
- Common API endpoints (overview)
- Importing sample data
- How to demo (2-minute script)
- Talking points & likely cross‑questions (interview prep)
- Improvements & next steps
- Contributing & license

---

## About
This project demonstrates a practical separation between a backend API and a frontend client. It focuses on user accounts, expense/income records, file uploads (receipts/XLSX), and basic reporting.

---

## Features
- User authentication (JWT)
- CRUD operations: expenses and incomes
- File upload support (multer + Cloudinary integration-ready)
- XLSX import for bulk income/expense data
- MongoDB persistence (Mongoose)

---

## Architecture & tech stack
- Backend: Node.js, Express
- Database: MongoDB + Mongoose
- Auth: JWT (jsonwebtoken)
- Password hashing: bcryptjs
- File upload: multer; Cloudinary integration (env keys present)
- XLSX parsing: xlsx
- Dev tools: nodemon
- Frontend: Separate SPA (see `frontend/` — check frontend/package.json to confirm framework)

Logical flow:
Client (frontend) -> HTTP REST -> backend/routes -> controllers -> models -> MongoDB

---

## Repository layout
- backend/
  - server.js — entrypoint
  - package.json, package-lock.json
  - .env (should not be committed)
  - config/ — DB & config helpers
  - routes/ — route definitions
  - controllers/ — request handlers, business logic
  - models/ — Mongoose schemas
  - middlewares/ — auth, validation, error handlers, upload handlers
  - uploads/ — local storage for uploads (development)
  - income_details.xlsx — sample data for imports
- frontend/
  - (SPA source — open `frontend/package.json` and `frontend/src/` for details)
- .gitignore, etc.

---

## Quick start (local)
Prerequisites: Node.js (16+), npm, MongoDB (local or Atlas)

1. Clone
```bash
git clone https://github.com/Priyanshu-at0510/EXPENSE-TRACKER.git
cd EXPENSE-TRACKER
```

2. Backend
```bash
cd backend
npm install
# create .env from .env.example and fill values
npm run dev    # uses nodemon
# or npm start
```

3. Frontend
```bash
cd ../frontend
npm install
# check frontend/package.json for start script
npm run dev
```

If frontend isn't present or you can't start it, explain to the interviewer that frontend is a separate SPA and show where API base URL and auth handling would be implemented.

---

## .env example (create `.env` from this)
Add a `.env.example` to your repo and copy to `.env` locally. DO NOT commit `.env`.

```env
PORT=8000
MONGODB_URL=mongodb+srv://<username>:<password>@<cluster>/<db>?retryWrites=true&w=majority
JWT_SECRET=replace-with-a-secure-random-string
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

Important: If any real credentials were committed previously, rotate them immediately.

---

## Common API endpoints (overview)
(Check backend/routes for exact paths and names.)

Auth
- POST /api/auth/register
- POST /api/auth/login

Expenses
- GET  /api/expenses
- POST /api/expenses
- GET  /api/expenses/:id
- PUT  /api/expenses/:id
- DELETE /api/expenses/:id

Incomes
- GET  /api/incomes
- POST /api/incomes

Uploads / Import
- POST /api/uploads (receipts)
- POST /api/uploads/import (XLSX import — if implemented)

Auth header: `Authorization: Bearer <token>`

---


