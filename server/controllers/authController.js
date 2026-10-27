const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const sign = (id, role) => jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
const out = (u, role) => ({ token: sign(u._id, role), user: { id: u._id, name: u.name, email: u.email, role } });

exports.register = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Name, email and password are required" });
    if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" });
    if (await User.findOne({ email })) return res.status(409).json({ message: "Email already registered" });
    const user = await User.create({ name, email, phone, password: await bcrypt.hash(password, 10) });
    res.status(201).json(out(user, "user"));
  } catch (e) { next(e); }
};
exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password || "", user.password)))
      return res.status(401).json({ message: "Invalid email or password" });
    res.json(out(user, "user"));
  } catch (e) { next(e); }
};
exports.me = async (req, res, next) => {
  try { res.json(await User.findById(req.user.id).select("-password")); } catch (e) { next(e); }
};
exports.logout = (req, res) => res.json({ message: "Logged out" }); // JWT is stateless; client drops the token
