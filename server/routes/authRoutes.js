const r = require("express").Router();
const c = require("../controllers/authController");
const { fetchUser } = require("../middlewares/fetchUser");
r.post("/register", c.register);
r.post("/login", c.login);
r.post("/logout", c.logout);
r.get("/me", fetchUser, c.me);
module.exports = r;
