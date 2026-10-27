const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron");
require("dotenv").config({ path: "./.env" });
// Prefer IPv4 results to avoid ::1 (IPv6) connections when providers expect IPv4
const dns = require("dns");
if (dns.setDefaultResultOrder) dns.setDefaultResultOrder("ipv4first");

const { verifyTransport } = require("./utils/mailer");
const { sendReminderEmails } = require("./utils/reminderService");
const { cleanupOldBookings } = require("./utils/cleanupService");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth/admin", require("./routes/adminRoutes")); // keep before /api/auth
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/shows", require("./routes/showRoutes"));
app.use("/api/theatre", require("./routes/theatreRoutes"));
app.use("/api/movie", require("./routes/movieRoutes"));
app.use("/api/favorite", require("./routes/favoriteRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));

app.get("/", (req, res) => res.json({ message: "iMovies API running 🎬" }));

// Error handling middleware
app.use((req, res) => res.status(404).json({ message: "Route not found" }));
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.name === "ValidationError" || err.name === "CastError" ? 400 : err.status || 500;
  res.status(status).json({ message: err.message || "Server error" });
});

const mongoUri = process.env.MONGODB_CONNECTION_LINK;
const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};
mongoose.connection.on("error", (err) => console.error("MongoDB connection error:", err));
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected. Attempting to reconnect...");
  setTimeout(connectToMongo, 5000);
});

const PORT = process.env.PORT || 3000;
connectToMongo().then(() => {
  app.listen(PORT, () => console.log(`Server is running on ${PORT} port`));
  verifyTransport();
  cron.schedule("0 9 * * *", () => sendReminderEmails().catch(console.error)); // daily 9 AM reminders
  cron.schedule("0 3 * * 0", () => cleanupOldBookings().catch(console.error)); // weekly cleanup
});
