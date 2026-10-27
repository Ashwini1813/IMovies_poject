import { useEffect, useState } from "react";
import api from "../api";
import MovieCard from "../components/MovieCard";
export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [q, setQ] = useState({ q: "", genre: "", language: "", minRating: "" });
  useEffect(() => {
    const t = setTimeout(() => {
      const params = Object.fromEntries(Object.entries(q).filter(([, v]) => v));
      api.get("/movie", { params }).then((r) => setMovies(r.data)).catch(() => {});
    }, 300);
    return () => clearTimeout(t);
  }, [q]);
  const set = (k) => (e) => setQ({ ...q, [k]: e.target.value });
  return (
    <>
      <div className="row g-2 mb-4">
        <div className="col-md-4"><input className="form-control" placeholder="Search title..." value={q.q} onChange={set("q")} /></div>
        <div className="col-md-3"><input className="form-control" placeholder="Genre (e.g. Action)" value={q.genre} onChange={set("genre")} /></div>
        <div className="col-md-3"><input className="form-control" placeholder="Language" value={q.language} onChange={set("language")} /></div>
        <div className="col-md-2">
          <select className="form-select" value={q.minRating} onChange={set("minRating")}>
            <option value="">Any rating</option>{[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}+ ⭐</option>)}
          </select>
        </div>
      </div>
      <div className="row">{movies.map((m) => <MovieCard key={m._id} m={m} />)}</div>
      {!movies.length && <p className="text-secondary">No movies found.</p>}
    </>
  );
}
