# Hostel Management System

A full-stack hostel management application built with the MERN stack (MongoDB, Express, React, Node.js).

> **This project was built using [Claude Code](https://claude.ai/code) as a hands-on practice project to explore AI-assisted development.**

## Features

- **Dashboard** — Live stats: total rooms, available/occupied rooms, active bookings, total students
- **Room Management** — Add, edit, delete rooms; track status (available / occupied / maintenance)
- **Student Management** — Add, edit, delete student records with contact and guardian info
- **Booking Management** — Create bookings, check out students, delete records; room status auto-updates on booking/checkout

## Tech Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Frontend | React 18, React Router v6, Vite   |
| Backend  | Node.js, Express.js               |
| Database | MongoDB + Mongoose                |
| HTTP     | Axios                             |

## Prerequisites

- Node.js 18+
- MongoDB running locally on `localhost:27017`

## Setup

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd hostel-management
```

### 2. Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
MONGO_URI=mongodb://localhost:27017/hostel_db
PORT=5000
```

Then start the server:

```bash
npm run dev     # development (nodemon)
npm start       # production
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

## Running

| Service  | URL                      |
|----------|--------------------------|
| Frontend | http://localhost:5173    |
| Backend  | http://localhost:5000    |

The Vite dev server proxies `/api` requests to the backend automatically.

## API Endpoints

| Method | Endpoint                        | Description              |
|--------|---------------------------------|--------------------------|
| GET    | `/api/rooms`                    | List all rooms           |
| POST   | `/api/rooms`                    | Create room              |
| PUT    | `/api/rooms/:id`                | Update room              |
| DELETE | `/api/rooms/:id`                | Delete room              |
| GET    | `/api/students`                 | List all students        |
| POST   | `/api/students`                 | Create student           |
| PUT    | `/api/students/:id`             | Update student           |
| DELETE | `/api/students/:id`             | Delete student           |
| GET    | `/api/bookings`                 | List all bookings        |
| POST   | `/api/bookings`                 | Create booking           |
| PUT    | `/api/bookings/:id/checkout`    | Check out a booking      |
| DELETE | `/api/bookings/:id`             | Delete booking           |
| GET    | `/api/bookings/stats/summary`   | Dashboard stats          |
