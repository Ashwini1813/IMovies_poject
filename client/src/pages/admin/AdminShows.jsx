import { useEffect, useState } from "react";
import api, { errMsg } from "../../api";
const empty = { movie: "", theatre: "", screen: 1, date: "", time: "", price: "" };
export default function AdminShows() {
  const [shows, setShows] = useState([]); const [movies, setMovies] = useState([]); const [theatres, setTheatres] = useState([]);
  const [f, setF] = useState(empty); const [err, setErr] = useState("");
  const load = () => api.get("/shows").then((r) => setShows(r.data));
  useEffect(() => { load(); api.get("/movie").then((r) => setMovies(r.data)); api.get("/theatre").then((r) => setTheatres(r.data)); }, []);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const add = async () => {
    try { await api.post("/shows", { ...f, screen: Number(f.screen), price: Number(f.price) }); setF(empty); setErr(""); load(); }
    catch (e) { setErr(errMsg(e)); }
  };
  const del = async (id) => { if (confirm("Delete show?")) { await api.delete(`/shows/${id}`); load(); } };
  return (
    <>
      <h4>Add Show</h4>
      {err && <div className="alert alert-danger py-2">{err}</div>}
      <div className="row g-2 mb-4">
        <div className="col-md-4"><select className="form-select" value={f.movie} onChange={set("movie")}><option value="">Select movie</option>{movies.map((m) => <option key={m._id} value={m._id}>{m.title}</option>)}</select></div>
        <div className="col-md-4"><select className="form-select" value={f.theatre} onChange={set("theatre")}><option value="">Select theatre</option>{theatres.map((t) => <option key={t._id} value={t._id}>{t.name} - {t.location}</option>)}</select></div>
        <div className="col-md-4"><input className="form-control" type="number" min="1" placeholder="Screen no." value={f.screen} onChange={set("screen")} /></div>
        <div className="col-md-3"><input className="form-control" type="date" value={f.date} onChange={set("date")} /></div>
        <div className="col-md-3"><input className="form-control" type="time" value={f.time} onChange={set("time")} /></div>
        <div className="col-md-3"><input className="form-control" type="number" placeholder="Ticket price ₹" value={f.price} onChange={set("price")} /></div>
        <div className="col-md-3"><button className="btn btn-danger w-100" onClick={add}>Add Show</button></div>
      </div>
      <table className="table"><thead><tr><th>Movie</th><th>Theatre</th><th>Date</th><th>Time</th><th>₹</th><th>Booked</th><th></th></tr></thead>
        <tbody>{shows.map((s) => <tr key={s._id}><td>{s.movie?.title}</td><td>{s.theatre?.name}</td><td>{s.date}</td><td>{s.time}</td><td>{s.price}</td><td>{s.bookedSeats.length}/{s.rows * s.cols}</td>
          <td><button className="btn btn-sm btn-outline-danger" onClick={() => del(s._id)}>Delete</button></td></tr>)}</tbody></table>
    </>
  );
}
