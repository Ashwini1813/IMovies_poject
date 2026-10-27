const jwt = require("jsonwebtoken");
exports.fetchUser = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : req.headers["auth-token"];
  if (!token) return res.status(401).json({ message: "Please login first" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET); // { id, role }
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
exports.adminOnly = (req, res, next) =>
  req.user?.role === "admin" ? next() : res.status(403).json({ message: "Admin access only" });
