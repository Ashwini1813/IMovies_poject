const Favorite = require("../models/favoriteModel");
exports.list = async (req, res, next) => {
  try { res.json(await Favorite.find({ user: req.user.id }).populate("movie")); } catch (e) { next(e); }
};
exports.toggle = async (req, res, next) => {
  try {
    const q = { user: req.user.id, movie: req.params.movieId };
    const ex = await Favorite.findOne(q);
    if (ex) { await ex.deleteOne(); return res.json({ favorite: false }); }
    await Favorite.create(q); res.json({ favorite: true });
  } catch (e) { next(e); }
};
