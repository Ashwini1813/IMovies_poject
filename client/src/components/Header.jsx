import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdMovie } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
export default function Header() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-imovies px-3">
      <Link className="navbar-brand brand" to="/"><MdMovie /> iMovies</Link>
      <div className="navbar-nav me-auto">
        <NavLink className="nav-link" to="/movies">Movies</NavLink>
        {user?.role === "user" && <>
          <NavLink className="nav-link" to="/favorites">Watchlist</NavLink>
          <NavLink className="nav-link" to="/bookings">My Bookings</NavLink></>}
        {user?.role === "admin" && <>
          <NavLink className="nav-link" to="/admin">Dashboard</NavLink>
          <NavLink className="nav-link" to="/admin/movies">Movies</NavLink>
          <NavLink className="nav-link" to="/admin/theatres">Theatres</NavLink>
          <NavLink className="nav-link" to="/admin/shows">Shows</NavLink></>}
      </div>
      {user ? (
        <div className="d-flex align-items-center gap-3">
          <span className="small">Hi, {user.name} ({user.role})</span>
          <button className="btn btn-sm btn-outline-light" onClick={() => { logout(); nav("/"); }}>Logout</button>
        </div>
      ) : (
        <div className="d-flex gap-2">
          <Link className="btn btn-sm btn-outline-light" to="/login">Login</Link>
          <Link className="btn btn-sm btn-danger" to="/register">Register</Link>
        </div>
      )}
    </nav>
  );
}
