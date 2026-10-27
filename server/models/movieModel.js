const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  genre: { type: String, required: true },
  language: { type: String, required: true },
  duration: { type: Number, required: true }, // minutes
  cast: [String],
  poster: String,
  releaseDate: Date,
  rating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
}, { timestamps: true });
module.exports = mongoose.model("Movie", movieSchema);
