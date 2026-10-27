import { useEffect, useState } from "react";
import api, { errMsg } from "../api";
export default function MyBookings() {
  const [list, setList] = useState([]);
  const load = () => api.get("/bookings/my").then((r) => setList(r.data));
  useEffect(() => { load(); }, []);
  const cancel = async (id) => {
    if (!confirm("Cancel this booking?")) return;
    try { await api.put(`/bookings/${id}/cancel`); load(); } catch (e) { alert(errMsg(e)); }
  };
  return (
    <>
      <h4 className="mb-3">My Bookings</h4>
      {!list.length && <p className="text-secondary">No bookings yet.</p>}
      {list.map((b) => (
        <div key={b._id} className="card card-dark p-3 mb-3">
          <div className="d-flex justify-content-between flex-wrap">
            <div>
              <h6>{b.show?.movie?.title}</h6>
              <div className="small text-secondary">{b.show?.theatre?.name} • {b.show?.date} {b.show?.time}</div>
              <div>Seats: {b.seats.join(", ")} • ₹{b.totalAmount} • {b.payment?.method} ({b.payment?.status})</div>
            </div>
            <div className="text-end">
              <span className={`badge ${b.status === "confirmed" ? "bg-success" : "bg-secondary"}`}>{b.status}</span><br />
              {b.status === "confirmed" && <button className="btn btn-sm btn-outline-danger mt-2" onClick={() => cancel(b._id)}>Cancel</button>}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
