import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import MovieCard from "../components/MovieCard";
export default function Landing() {
  const [movies, setMovies] = useState([]);
  useEffect(() => { api.get("/movie").then((r) => setMovies(r.data.slice(0, 8))).catch(() => {}); }, []);
  return (
    <>
      <div className="hero text-center mb-5">
        <h1 className="fw-bold">IMovies - Movie ticket booking made simple.</h1>
        <p className="lead">Browse movies, pick your seats in real time and pay securely.</p>
        <Link to="/movies" className="btn btn-light btn-lg">Book Tickets</Link>
      </div>
      <h4 className="mb-3">Now Showing</h4>
      <div className="row">{movies.map((m) => <MovieCard key={m._id} m={m} />)}</div>
      {!movies.length && <p className="text-secondary">No movies yet. Admin can add movies from the dashboard.</p>}
    </>
  );
}
