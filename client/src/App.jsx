import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import SeatSelection from "./pages/SeatSelection";
import MyBookings from "./pages/MyBookings";
import Favorites from "./pages/Favorites";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMovies from "./pages/admin/AdminMovies";
import AdminTheatres from "./pages/admin/AdminTheatres";
import AdminShows from "./pages/admin/AdminShows";

export default function App() {
  const admin = (el) => <ProtectedRoute role="admin">{el}</ProtectedRoute>;
  const user = (el) => <ProtectedRoute role="user">{el}</ProtectedRoute>;
  return (
    <>
      <Header />
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/book/:showId" element={user(<SeatSelection />)} />
          <Route path="/bookings" element={user(<MyBookings />)} />
          <Route path="/favorites" element={user(<Favorites />)} />
          <Route path="/admin" element={admin(<AdminDashboard />)} />
          <Route path="/admin/movies" element={admin(<AdminMovies />)} />
          <Route path="/admin/theatres" element={admin(<AdminTheatres />)} />
          <Route path="/admin/shows" element={admin(<AdminShows />)} />
          <Route path="*" element={<h3 className="text-center">404 - Page not found</h3>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
