const Movie = require("../models/movieModel");
const crud = require("../utils/crud")(Movie);
crud.list = async (req, res, next) => {
  try {
    const { q, genre, language, minRating } = req.query;
    const f = {};
    const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (q) f.title = new RegExp(esc(q), "i");
    if (genre) f.genre = new RegExp(`^${esc(genre)}$`, "i");
    if (language) f.language = new RegExp(`^${esc(language)}$`, "i");
    if (minRating) f.rating = { $gte: Number(minRating) };
    res.json(await Movie.find(f).sort("-createdAt"));
  } catch (e) { next(e); }
};
module.exports = crud;
