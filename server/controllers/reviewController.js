const mongoose = require("mongoose");
const Review = require("../models/reviewModel");
const Movie = require("../models/movieModel");
const refresh = async (movieId) => {
  const s = await Review.aggregate([
    { $match: { movie: new mongoose.Types.ObjectId(String(movieId)) } },
    { $group: { _id: null, avg: { $avg: "$rating" }, n: { $sum: 1 } } }]);
  await Movie.findByIdAndUpdate(movieId, { rating: s[0] ? +s[0].avg.toFixed(1) : 0, ratingCount: s[0]?.n || 0 });
};
exports.forMovie = async (req, res, next) => {
  try { res.json(await Review.find({ movie: req.params.movieId }).populate("user", "name").sort("-createdAt")); } catch (e) { next(e); }
};
exports.create = async (req, res, next) => {
  try {
    const { movie, rating, comment } = req.body;
    const r = await Review.create({ user: req.user.id, movie, rating, comment });
    await refresh(r.movie); res.status(201).json(r);
  } catch (e) { next(e); }
};
exports.remove = async (req, res, next) => {
  try {
    const r = await Review.findById(req.params.id);
    if (!r) return res.status(404).json({ message: "Not found" });
    if (req.user.role !== "admin" && String(r.user) !== req.user.id) return res.status(403).json({ message: "Not allowed" });
    await r.deleteOne(); await refresh(r.movie); res.json({ message: "Deleted" });
  } catch (e) { next(e); }
};
