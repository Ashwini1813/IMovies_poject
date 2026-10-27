const r = require("express").Router();
const c = require("../controllers/movieController");
const { fetchUser, adminOnly } = require("../middlewares/fetchUser");
r.get("/", c.list);
r.get("/:id", c.get);
r.post("/", fetchUser, adminOnly, c.create);
r.put("/:id", fetchUser, adminOnly, c.update);
r.delete("/:id", fetchUser, adminOnly, c.remove);
module.exports = r;
