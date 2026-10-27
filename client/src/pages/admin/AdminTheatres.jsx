import { useEffect, useState } from "react";
import api, { errMsg } from "../../api";
export default function AdminTheatres() {
  const [list, setList] = useState([]); const [f, setF] = useState({ name: "", location: "", screens: 1 }); const [err, setErr] = useState("");
  const load = () => api.get("/theatre").then((r) => setList(r.data));
  useEffect(() => { load(); }, []);
  const add = async () => { try { await api.post("/theatre", { ...f, screens: Number(f.screens) }); setF({ name: "", location: "", screens: 1 }); setErr(""); load(); } catch (e) { setErr(errMsg(e)); } };
  const del = async (id) => { if (confirm("Delete theatre?")) { await api.delete(`/theatre/${id}`); load(); } };
  return (
    <>
      <h4>Add Theatre</h4>
      {err && <div className="alert alert-danger py-2">{err}</div>}
      <div className="row g-2 mb-4">
        <div className="col-md-4"><input className="form-control" placeholder="Theatre name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></div>
        <div className="col-md-4"><input className="form-control" placeholder="Location" value={f.location} onChange={(e) => setF({ ...f, location: e.target.value })} /></div>
        <div className="col-md-2"><input className="form-control" type="number" min="1" placeholder="Screens" value={f.screens} onChange={(e) => setF({ ...f, screens: e.target.value })} /></div>
        <div className="col-md-2"><button className="btn btn-danger w-100" onClick={add}>Add</button></div>
      </div>
      <table className="table"><thead><tr><th>Name</th><th>Location</th><th>Screens</th><th></th></tr></thead>
        <tbody>{list.map((t) => <tr key={t._id}><td>{t.name}</td><td>{t.location}</td><td>{t.screens}</td>
          <td><button className="btn btn-sm btn-outline-danger" onClick={() => del(t._id)}>Delete</button></td></tr>)}</tbody></table>
    </>
  );
}
