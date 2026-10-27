import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api, { errMsg } from "../api";
import { useAuth } from "../context/AuthContext";
export default function MovieDetails() {
  const { id } = useParams(); const { user } = useAuth(); const nav = useNavigate();
  const [movie, setMovie] = useState(null); const [shows, setShows] = useState([]); const [reviews, setReviews] = useState([]);
  const [rv, setRv] = useState({ rating: 5, comment: "" }); const [msg, setMsg] = useState("");
  const load = () => {
    api.get(`/movie/${id}`).then((r) => setMovie(r.data));
    api.get("/shows", { params: { movie: id } }).then((r) => setShows(r.data));
    api.get(`/reviews/movie/${id}`).then((r) => setReviews(r.data));
  };
  useEffect(load, [id]);
  const fav = async () => {
    if (!user) return nav("/login");
    try { const r = await api.post(`/favorite/${id}`); setMsg(r.data.favorite ? "Added to watchlist ❤️" : "Removed from watchlist"); } catch (e) { setMsg(errMsg(e)); }
  };
  const review = async () => {
    try { await api.post("/reviews", { movie: id, ...rv }); setRv({ rating: 5, comment: "" }); load(); } catch (e) { setMsg(errMsg(e)); }
  };
  if (!movie) return <p>Loading...</p>;
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = shows.filter((s) => s.date >= today);
  return (
    <div className="row">
      <div className="col-md-4 mb-3">
        {movie.poster ? <img src={movie.poster} className="img-fluid rounded" alt="" /> : <div className="poster rounded d-flex align-items-center justify-content-center fs-1">🎬</div>}
      </div>
      <div className="col-md-8">
        <h2>{movie.title} <span className="badge bg-warning text-dark fs-6">⭐ {movie.rating || "New"} ({movie.ratingCount})</span></h2>
        <p className="text-secondary">{movie.genre} • {movie.language} • {movie.duration} min • {movie.releaseDate?.slice(0, 10)}</p>
        <p>{movie.description}</p>
        <p><b>Cast:</b> {movie.cast?.join(", ")}</p>
        <button className="btn btn-outline-danger mb-2" onClick={fav}>❤ Watchlist</button> <span className="small ms-2">{msg}</span>
        <h5 className="mt-4">Shows</h5>
        {upcoming.length ? (
          <table className="table table-sm align-middle"><thead><tr><th>Theatre</th><th>Date</th><th>Time</th><th>₹</th><th></th></tr></thead>
            <tbody>{upcoming.map((s) => (
              <tr key={s._id}><td>{s.theatre?.name} <small className="text-secondary">{s.theatre?.location}</small></td><td>{s.date}</td><td>{s.time}</td><td>{s.price}</td>
                <td><Link className="btn btn-sm btn-danger" to={`/book/${s._id}`}>Select seats</Link></td></tr>))}</tbody></table>
        ) : <p className="text-secondary">No upcoming shows.</p>}
        <h5 className="mt-4">Reviews</h5>
        {user?.role === "user" && (
          <div className="card card-dark p-3 mb-3">
            <select className="form-select mb-2 w-auto" value={rv.rating} onChange={(e) => setRv({ ...rv, rating: +e.target.value })}>
              {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} ⭐</option>)}</select>
            <textarea className="form-control mb-2" rows="2" placeholder="Write your review" value={rv.comment} onChange={(e) => setRv({ ...rv, comment: e.target.value })} />
            <button className="btn btn-sm btn-danger align-self-start" onClick={review}>Submit review</button>
          </div>)}
        {reviews.map((r) => <div key={r._id} className="border-bottom border-secondary py-2"><b>{r.user?.name}</b> • {"⭐".repeat(r.rating)}<br />{r.comment}</div>)}
      </div>
    </div>
  );
}
