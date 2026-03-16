# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MERN stack hostel management application. MongoDB runs locally at `mongodb://localhost:27017/hostel_db`.

## Development Commands

**Backend** (port 5000):
```bash
cd backend
npm run dev    # nodemon hot-reload
npm start      # production
```

**Frontend** (port 5173):
```bash
cd frontend
npm run dev      # Vite dev server
npm run build    # production build
```

Both directories require `npm install` on first setup. No test or lint scripts are configured.

## Architecture

```
frontend/src/pages/  →  Axios HTTP  →  backend/routes/  →  backend/models/  →  MongoDB
```

The Vite dev server proxies `/api` to `http://localhost:5000`, so frontend calls use relative paths like `/api/rooms`.

**Backend** (`backend/`):
- `server.js` — Express app entry, MongoDB connection, CORS, route mounting
- `models/` — Mongoose schemas: `Room`, `Student`, `Booking`
- `routes/` — Express routers: `rooms.js`, `students.js`, `bookings.js`

**Frontend** (`frontend/src/`):
- `App.jsx` — React Router layout with sidebar navigation
- `pages/` — Four pages: `Dashboard`, `Rooms`, `Students`, `Bookings`. Each page manages its own state and fetches data directly via Axios.
- `index.css` — All styles (no CSS framework)
- `components/` — Currently empty

## Key Domain Logic

- Creating a booking sets the room status to `occupied`; checking out sets it back to `available`
- `GET /api/bookings` populates both `student` and `room` references
- `GET /api/bookings/stats/summary` powers the Dashboard (totalRooms, availableRooms, occupiedRooms, totalStudents, activeBookings)
- Room types: `single | double | triple`; Room statuses: `available | occupied | maintenance`
- Booking statuses: `active | checked-out | cancelled`
- `Student.email` and `Student.studentId` are unique indexes
