import { useEffect, useState } from "react";
import api, { errMsg } from "../../api";
export default function AdminDashboard() {
  const [s, setS] = useState({}); const [bookings, setBookings] = useState([]); const [users, setUsers] = useState([]);
  const load = () => {
    api.get("/auth/admin/stats").then((r) => setS(r.data));
    api.get("/auth/admin/bookings").then((r) => setBookings(r.data));
    api.get("/auth/admin/users").then((r) => setUsers(r.data));
  };
  useEffect(load, []);
  const cancel = async (id) => { try { await api.put(`/bookings/${id}/cancel`); load(); } catch (e) { alert(errMsg(e)); } };
  const rmUser = async (id) => { if (confirm("Remove user?")) { await api.delete(`/auth/admin/users/${id}`); load(); } };
  const cards = [["Users", s.users], ["Movies", s.movies], ["Bookings", s.bookings], ["Revenue", `₹${s.revenue ?? 0}`]];
  return (
    <>
      <h4 className="mb-3">Admin Dashboard</h4>
      <div className="row mb-4">{cards.map(([k, v]) => (
        <div key={k} className="col-6 col-md-3 mb-2"><div className="card card-dark p-3 text-center"><div className="text-secondary">{k}</div><h3>{v ?? 0}</h3></div></div>))}</div>
      <h5>Bookings & Payments</h5>
      <div className="table-responsive"><table className="table table-sm"><thead><tr><th>User</th><th>Movie</th><th>Show</th><th>Seats</th><th>₹</th><th>Payment</th><th>Status</th><th></th></tr></thead>
        <tbody>{bookings.map((b) => (
          <tr key={b._id}><td>{b.user?.name}</td><td>{b.show?.movie?.title}</td><td>{b.show?.date} {b.show?.time}</td><td>{b.seats.join(", ")}</td>
            <td>{b.totalAmount}</td><td>{b.payment?.method}/{b.payment?.status}</td><td>{b.status}</td>
            <td>{b.status === "confirmed" && <button className="btn btn-sm btn-outline-danger" onClick={() => cancel(b._id)}>Cancel</button>}</td></tr>))}</tbody></table></div>
      <h5 className="mt-4">Users</h5>
      <table className="table table-sm"><thead><tr><th>Name</th><th>Email</th><th>Phone</th><th></th></tr></thead>
        <tbody>{users.map((u) => <tr key={u._id}><td>{u.name}</td><td>{u.email}</td><td>{u.phone}</td>
          <td><button className="btn btn-sm btn-outline-danger" onClick={() => rmUser(u._id)}>Remove</button></td></tr>)}</tbody></table>
    </>
  );
}
