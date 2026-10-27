# IMovies - Movie ticket booking made simple (MERN)

## Structure
- `server/` Express + Mongoose (MVC: models / controllers / routes, middlewares, utils)
- `client/` React (Vite) + React Router + Axios + Bootstrap

## Run
1. MongoDB local chalu rakho (ya Atlas link `.env` mein daalo)
2. Backend:
   cd server && npm install && npm run dev      -> http://localhost:3000
3. Frontend (naya terminal):
   cd client && npm install && npm run dev      -> http://localhost:5173
4. Admin banane ke liye (ek baar, Postman/Thunder Client):
   POST http://localhost:3000/api/auth/admin/register
   { "name":"Admin", "email":"admin@imovies.com", "password":"admin123", "secret":"change_admin_secret" }
5. Login page par "Login as Admin" tick karke login karo -> Add Theatre -> Add Movie -> Add Show
6. Normal user register karke booking test karo.

## API
/api/auth (register, login, logout, me) | /api/auth/admin (register, login, stats, users, bookings)
/api/movie | /api/theatre | /api/shows | /api/bookings (POST, /my, PUT /:id/cancel)
/api/favorite | /api/reviews
