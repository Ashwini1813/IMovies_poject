import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api, { errMsg } from "../api";
export default function SeatSelection() {
  const { showId } = useParams(); const nav = useNavigate();
  const [show, setShow] = useState(null); const [sel, setSel] = useState([]);
  const [method, setMethod] = useState("card"); const [err, setErr] = useState("");
  const load = () => api.get(`/shows/${showId}`).then((r) => setShow(r.data));
  useEffect(() => { load(); const t = setInterval(load, 5000); return () => clearInterval(t); }, [showId]); // near real-time availability
  if (!show) return <p>Loading...</p>;
  const rows = Array.from({ length: show.rows }, (_, i) => String.fromCharCode(65 + i));
  const toggle = (s) => setSel((p) => (p.includes(s) ? p.filter((x) => x !== s) : p.length < 10 ? [...p, s] : p));
  const pay = async () => {
    try { await api.post("/bookings", { showId, seats: sel, paymentMethod: method }); alert("Payment successful! Booking confirmed 🎉"); nav("/bookings"); }
    catch (e) { setErr(errMsg(e)); setSel([]); load(); }
  };
  return (
    <div className="text-center">
      <h4>{show.movie?.title}</h4>
      <p className="text-secondary">{show.theatre?.name} • {show.date} {show.time} • Screen {show.screen} • ₹{show.price}/seat</p>
      <div className="screen" /><p className="small text-secondary">SCREEN</p>
      {err && <div className="alert alert-danger py-2">{err}</div>}
      {rows.map((r) => (
        <div key={r}>{Array.from({ length: show.cols }, (_, c) => {
          const id = `${r}${c + 1}`; const taken = show.bookedSeats.includes(id);
          return <button key={id} disabled={taken} className={`seat ${taken ? "taken" : ""} ${sel.includes(id) ? "sel" : ""}`} onClick={() => toggle(id)}>{id}</button>;
        })}</div>
      ))}
      <div className="my-3 small"><span className="seat d-inline-block" /> Available <span className="seat sel d-inline-block ms-3" /> Selected <span className="seat taken d-inline-block ms-3" /> Booked</div>
      <div className="card card-dark p-3 mx-auto" style={{ maxWidth: 420 }}>
        <p className="mb-1">Seats: {sel.join(", ") || "-"}</p>
        <h5>Total: ₹{sel.length * show.price}</h5>
        <select className="form-select my-2" value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="card">Credit/Debit Card</option><option value="upi">UPI</option><option value="netbanking">Net Banking</option></select>
        <button className="btn btn-danger" disabled={!sel.length} onClick={pay}>Pay & Confirm</button>
        <small className="text-secondary mt-2">Demo mode: payment is simulated.</small>
      </div>
    </div>
  );
}
