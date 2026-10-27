const mongoose = require("mongoose");
const showSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  theatre: { type: mongoose.Schema.Types.ObjectId, ref: "Theatre", required: true },
  screen: { type: Number, default: 1 },
  date: { type: String, required: true }, // YYYY-MM-DD
  time: { type: String, required: true }, // HH:mm
  price: { type: Number, required: true },
  rows: { type: Number, default: 8 },
  cols: { type: Number, default: 10 },
  bookedSeats: { type: [String], default: [] }, // e.g. "A1"
}, { timestamps: true });
module.exports = mongoose.model("Show", showSchema);
