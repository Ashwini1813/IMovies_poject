const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const User = require("../models/userModel");
const Booking = require("../models/bookingModel");
const Movie = require("../models/movieModel");
const Review = require("../models/reviewModel");
const out = (a) => ({
  token: jwt.sign({ id: a._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "7d" }),
  user: { id: a._id, name: a.name, email: a.email, role: "admin" },
});
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, secret } = req.body;
    if (secret !== process.env.ADMIN_SECRET) return res.status(403).json({ message: "Invalid admin secret" });
    if (!name || !email || !password) return res.status(400).json({ message: "All fields required" });
    if (await Admin.findOne({ email })) return res.status(409).json({ message: "Admin already exists" });
    res.status(201).json(out(await Admin.create({ name, email, password: await bcrypt.hash(password, 10) })));
  } catch (e) { next(e); }
};
exports.login = async (req, res, next) => {
  try {
    const a = await Admin.findOne({ email: req.body.email });
    if (!a || !(await bcrypt.compare(req.body.password || "", a.password)))
      return res.status(401).json({ message: "Invalid admin credentials" });
    res.json(out(a));
  } catch (e) { next(e); }
};
exports.stats = async (req, res, next) => {
  try {
    const [users, movies, bookings, rev] = await Promise.all([
      User.countDocuments(), Movie.countDocuments(), Booking.countDocuments({ status: "confirmed" }),
      Booking.aggregate([{ $match: { status: "confirmed" } }, { $group: { _id: null, total: { $sum: "$totalAmount" } } }]),
    ]);
    res.json({ users, movies, bookings, revenue: rev[0]?.total || 0 });
  } catch (e) { next(e); }
};
exports.users = async (req, res, next) => {
  try { res.json(await User.find().select("-password").sort("-createdAt")); } catch (e) { next(e); }
};
exports.deleteUser = async (req, res, next) => {
  try { await User.findByIdAndDelete(req.params.id); res.json({ message: "User removed" }); } catch (e) { next(e); }
};
exports.deleteReview = async (req, res, next) => {
  try { await Review.findByIdAndDelete(req.params.id); res.json({ message: "Review removed" }); } catch (e) { next(e); }
};
