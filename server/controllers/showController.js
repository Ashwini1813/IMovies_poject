const Show = require("../models/showModel");
const crud = require("../utils/crud")(Show, "movie theatre");
crud.list = async (req, res, next) => {
  try {
    const f = {};
    if (req.query.movie) f.movie = req.query.movie;
    if (req.query.date) f.date = req.query.date;
    res.json(await Show.find(f).populate("movie theatre").sort("date time"));
  } catch (e) { next(e); }
};
module.exports = crud;
