import { useEffect, useState } from "react";
import api from "../api";
import MovieCard from "../components/MovieCard";
export default function Favorites() {
  const [list, setList] = useState([]);
  useEffect(() => { api.get("/favorite").then((r) => setList(r.data)); }, []);
  return (
    <>
      <h4 className="mb-3">My Watchlist</h4>
      <div className="row">{list.filter((f) => f.movie).map((f) => <MovieCard key={f._id} m={f.movie} />)}</div>
      {!list.length && <p className="text-secondary">Nothing saved yet.</p>}
    </>
  );
}
