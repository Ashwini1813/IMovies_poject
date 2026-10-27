const r = require("express").Router();
const c = require("../controllers/reviewController");
const { fetchUser } = require("../middlewares/fetchUser");
r.get("/movie/:movieId", c.forMovie);
r.post("/", fetchUser, c.create);
r.delete("/:id", fetchUser, c.remove);
module.exports = r;
