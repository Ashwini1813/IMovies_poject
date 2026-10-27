import { Link } from "react-router-dom";
export default function MovieCard({ m }) {
  return (
    <div className="col-6 col-md-4 col-lg-3 mb-4">
      <div className="card card-dark h-100">
        {m.poster ? <img src={m.poster} className="card-img-top poster" alt={m.title} />
          : <div className="poster d-flex align-items-center justify-content-center fs-1">🎬</div>}
        <div className="card-body">
          <h6 className="card-title">{m.title}</h6>
          <p className="small text-secondary mb-2">{m.genre} • {m.language} • {m.duration}m</p>
          <span className="badge bg-warning text-dark">⭐ {m.rating || "New"}</span>
          <Link to={`/movie/${m._id}`} className="btn btn-sm btn-danger float-end">Book</Link>
        </div>
      </div>
    </div>
  );
}
