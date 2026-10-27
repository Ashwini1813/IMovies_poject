const r = require("express").Router();
const c = require("../controllers/bookingController");
const { fetchUser } = require("../middlewares/fetchUser");
r.post("/", fetchUser, c.create);
r.get("/my", fetchUser, c.mine);
r.put("/:id/cancel", fetchUser, c.cancel);
module.exports = r;
