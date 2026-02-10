# Student PG & Roommate Finder (MERN)

Production-ready MERN application to help students discover verified PG accommodations and compatible roommates based on lifestyle and budget.

## Project Structure

- `backend/` - Express + MongoDB + JWT + MVC architecture
- `frontend/` - React (Vite) + React Router + Axios

## Backend Setup

1. Go to backend:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create env file:
   ```bash
   cp .env.example .env
   ```
4. Update `.env` values and run:
   ```bash
   npm run dev
   ```

Backend runs on `http://localhost:5000`.

## Frontend Setup

1. Open another terminal and go to frontend:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create env file:
   ```bash
   cp .env.example .env
   ```
4. Run frontend:
   ```bash
   npm run dev
   ```

Frontend runs on `http://localhost:5173`.

## API Highlights

- Auth: `/api/auth/register`, `/api/auth/login`
- Student profile: `/api/students/profile`
- PG listing CRUD + filters: `/api/pgs`
- Reviews: `/api/reviews`
- Roommate match + request: `/api/roommates/matches`, `/api/roommates/requests`

## Matching Logic

Roommate compatibility score is calculated and sorted using:
- Budget similarity
- Sleep-time alignment
- Study habits similarity
- Smoking/Drinking habits
- Cleanliness level proximity

## Roles

- **Student**: profile management, browse PGs, roommate matches, roommate requests, reviews.
- **PG Owner**: create/edit/delete PGs, view reviews.
