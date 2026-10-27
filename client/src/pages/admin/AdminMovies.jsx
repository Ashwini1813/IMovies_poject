import { useEffect, useState } from "react";
import api, { errMsg } from "../../api";
const empty = { title: "", description: "", genre: "", language: "", duration: "", cast: "", poster: "", releaseDate: "" };
export default function AdminMovies() {
  const [list, setList] = useState([]); const [f, setF] = useState(empty); const [editId, setEditId] = useState(null); const [err, setErr] = useState("");
  const load = () => api.get("/movie").then((r) => setList(r.data));
  useEffect(() => { load(); }, []);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const save = async () => {
    const body = { ...f, duration: Number(f.duration), cast: String(f.cast).split(",").map((s) => s.trim()).filter(Boolean) };
    try { editId ? await api.put(`/movie/${editId}`, body) : await api.post("/movie", body); setF(empty); setEditId(null); setErr(""); load(); }
    catch (e) { setErr(errMsg(e)); }
  };
  const edit = (m) => { setEditId(m._id); setF({ ...m, cast: m.cast?.join(", "), releaseDate: m.releaseDate?.slice(0, 10) || "" }); window.scrollTo(0, 0); };
  const del = async (id) => { if (confirm("Delete movie?")) { await api.delete(`/movie/${id}`); load(); } };
  return (
    <>
      <h4>{editId ? "Edit Movie" : "Add Movie"}</h4>
      {err && <div className="alert alert-danger py-2">{err}</div>}
      <div className="row g-2 mb-4">
        {[["title", "Title"], ["genre", "Genre"], ["language", "Language"], ["duration", "Duration (min)"], ["poster", "Poster URL"], ["cast", "Cast (comma separated)"]].map(([k, p]) => (
          <div className="col-md-4" key={k}><input className="form-control" placeholder={p} value={f[k] || ""} onChange={set(k)} /></div>))}
        <div className="col-md-4"><input className="form-control" type="date" value={f.releaseDate} onChange={set("releaseDate")} /></div>
        <div className="col-md-8"><input className="form-control" placeholder="Description" value={f.description || ""} onChange={set("description")} /></div>
        <div className="col-12"><button className="btn btn-danger" onClick={save}>{editId ? "Update" : "Add Movie"}</button>
          {editId && <button className="btn btn-outline-light ms-2" onClick={() => { setEditId(null); setF(empty); }}>Cancel</button>}</div>
      </div>
      <table className="table"><thead><tr><th>Title</th><th>Genre</th><th>Language</th><th>Duration</th><th>Rating</th><th></th></tr></thead>
        <tbody>{list.map((m) => <tr key={m._id}><td>{m.title}</td><td>{m.genre}</td><td>{m.language}</td><td>{m.duration}m</td><td>{m.rating}</td>
          <td><button className="btn btn-sm btn-outline-light me-1" onClick={() => edit(m)}>Edit</button>
            <button className="btn btn-sm btn-outline-danger" onClick={() => del(m._id)}>Delete</button></td></tr>)}</tbody></table>
    </>
  );
}
