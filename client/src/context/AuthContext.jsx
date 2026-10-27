import { createContext, useContext, useState } from "react";
import api from "../api";
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user") || "null"));
  const save = ({ token, user }) => {
    localStorage.setItem("token", token); localStorage.setItem("user", JSON.stringify(user)); setUser(user); return user;
  };
  const login = async (email, password, admin = false) =>
    save((await api.post(admin ? "/auth/admin/login" : "/auth/login", { email, password })).data);
  const register = async (form) => save((await api.post("/auth/register", form)).data);
  const logout = () => { localStorage.clear(); setUser(null); };
  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
}
