import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { errMsg } from "../api";
export default function Register() {
  const [f, setF] = useState({ name: "", email: "", phone: "", password: "" });
  const [err, setErr] = useState("");
  const { register } = useAuth(); const nav = useNavigate();
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = async () => { try { await register(f); nav("/movies"); } catch (e) { setErr(errMsg(e)); } };
  return (
    <div className="card card-dark p-4 mx-auto" style={{ maxWidth: 420 }}>
      <h4 className="mb-3">Create account</h4>
      {err && <div className="alert alert-danger py-2">{err}</div>}
      <input className="form-control mb-2" placeholder="Full name" value={f.name} onChange={set("name")} />
      <input className="form-control mb-2" placeholder="Email" value={f.email} onChange={set("email")} />
      <input className="form-control mb-2" placeholder="Phone" value={f.phone} onChange={set("phone")} />
      <input className="form-control mb-3" type="password" placeholder="Password (min 6)" value={f.password} onChange={set("password")} />
      <button className="btn btn-danger w-100" onClick={submit}>Register</button>
      <p className="small mt-3 mb-0">Already registered? <Link to="/login">Login</Link></p>
    </div>
  );
}
