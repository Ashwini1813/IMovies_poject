# IMovies - Movie ticket booking made # IMovies - Movie Ticket Booking Made Simple (MERN)

A full-stack movie ticket booking app with seat selection, theatre and show management, bookings, reviews and an admin dashboard.

## Tech Stack
React (Vite) • React Router • Axios • Bootstrap • Node.js • Express • MongoDB Atlas • Mongoose • JWT

## Features
- User registration and login (JWT)
- Browse, search and filter movies
- Seat selection with booked seats blocked (no double booking)
- Booking history and cancellation
- Watchlist and movie reviews
- Admin dashboard to manage movies, theatres, shows, bookings and users

## Project Structure
- `server/` Express + Mongoose backend (models, controllers, routes, middlewares, utils)
- `client/` React frontend

## How to Run
1. Create `server/.env` from `server/.env.example` and add your MongoDB connection link.
2. Backend: `cd server && npm install && npm run dev` (runs on port 3000)
3. Seed sample data and admin: `cd server && node seed.js`
4. Frontend: `cd client && npm install && npm run dev` (runs on http://localhost:5173)
5. Set `VITE_API_URL` in `client/.env` to your backend URL ending with `/api`.

**Admin login:** tick "Login as Admin" with `admin@imovies.com` / `admin123`

## API Endpoints
- `/api/auth` register, login, logout, me
- `/api/auth/admin` register, login, stats, users, bookings
- `/api/movie`, `/api/theatre`, `/api/shows`
- `/api/bookings` create, `/my`, `PUT /:id/cancel`
- `/api/favorite`, `/api/reviews`

> Note: Screenshots below are from the MERN app (React + Express + MongoDB). The demo link is a hosted UI preview of the same project.

## Screenshots 

1. Landing Page <img width="1895" height="502" alt="landing page" src="https://github.com/user-attachments/assets/63533199-bc82-46d5-a8d9-7d8effbc6f47" />

2. Login page<img width="543" height="552" alt="login page" src="https://github.com/user-attachments/assets/5fbe5178-e089-4a4e-a2e2-a2bdcedfe0b1" />


3. Register page <img width="582" height="621" alt="register page" src="https://github.com/user-attachments/assets/623157a3-d391-43c4-ac51-16afdc68fff5" />

4. Admin Dashboard <img width="1802" height="683" alt="admin dashboard" src="https://github.com/user-attachments/assets/539f68b6-c975-4961-87dc-3bf891e38624" />

5. Add movie <img width="1716" height="733" alt="add movie" src="https://github.com/user-attachments/assets/c6f2c809-75a5-462a-b5b8-1ce587084412" />

6. Add show <img width="1692" height="751" alt="add show" src="https://github.com/user-attachments/assets/c1b1adae-a964-45dc-b2c0-8058ba72e615" />

7. Add Theatre <img width="1737" height="375" alt="add theatre" src="https://github.com/user-attachments/assets/99cbb2eb-2e1a-4054-9871-52dbc481a6b1" />

8. Available Movies <img width="1770" height="861" alt="available movies" src="https://github.com/user-attachments/assets/d2e20cf1-eb16-4ec5-b940-5252015f60fa" />

9. Selecting Seat <img width="1416" height="832" alt="selecting seat" src="https://github.com/user-attachments/assets/9080fc17-5344-473a-82d2-2c3b21f5cd02" />

10. Bookings <img width="1865" height="806" alt="booking" src="https://github.com/user-attachments/assets/71852c3f-67c6-480d-87ec-1b258180b83f" />

11. User Watchlist <img width="563" height="696" alt="user watchlist" src="https://github.com/user-attachments/assets/e2f0c44f-889d-4283-8f68-67d3cc87b27f" />


12. User booking <img width="1698" height="502" alt="user bookings" src="https://github.com/user-attachments/assets/3c048d94-ad53-483f-aa05-31f02e913bc1" />


 Codespaces Link https://dreadful-spooky-cadaver-v6w99jrpqx9jfwww9-5173.app.github.dev/book/6ae1648843f98cf76a23ce11 
