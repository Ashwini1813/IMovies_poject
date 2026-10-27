const r = require("express").Router();
const c = require("../controllers/favoriteController");
const { fetchUser } = require("../middlewares/fetchUser");
r.get("/", fetchUser, c.list);
r.post("/:movieId", fetchUser, c.toggle);
module.exports = r;
