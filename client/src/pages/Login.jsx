import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { errMsg } from "../api";
export default function Login() {
  const [f, setF] = useState({ email: "", password: "" });
  const [admin, setAdmin] = useState(false);
  const [err, setErr] = useState("");
  const { login } = useAuth(); const nav = useNavigate();
  const submit = async () => {
    try { const u = await login(f.email, f.password, admin); nav(u.role === "admin" ? "/admin" : "/movies"); }
    catch (e) { setErr(errMsg(e)); }
  };
  return (
    <div className="card card-dark p-4 mx-auto" style={{ maxWidth: 420 }}>
      <h4 className="mb-3">Login</h4>
      {err && <div className="alert alert-danger py-2">{err}</div>}
      <input className="form-control mb-2" placeholder="Email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
      <input className="form-control mb-2" type="password" placeholder="Password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} />
      <div className="form-check mb-3">
        <input id="adm" className="form-check-input" type="checkbox" checked={admin} onChange={(e) => setAdmin(e.target.checked)} />
        <label htmlFor="adm" className="form-check-label">Login as Admin</label>
      </div>
      <button className="btn btn-danger w-100" onClick={submit}>Login</button>
      <p className="small mt-3 mb-0">New here? <Link to="/register">Register</Link></p>
    </div>
  );
}
